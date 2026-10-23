const FoodManagement = require("./management");
const fs = require('fs'), path = require('path'), crypto = require('crypto');
module.exports = function access(root, helpers) {
  const {send, readBody, readDB, writeDB} = helpers;
  const usersFile = path.join(root, 'usuarios.json');
  const sessions = new Map();
  const FirebaseAuth=require('./firebase-auth');
  const FirebaseSession=require('./firebase-session');
  const firebase=FirebaseAuth.client((...args)=>fetch(...args));
  const legacyDemos=require('./legacy-accounts');
  const allUsers=()=>{const users=readUsers().users;return [...legacyDemos.filter(d=>!users.some(u=>(u.username||u.email)===d.username)),...users];};
  const readUsers = () => JSON.parse(fs.readFileSync(usersFile, 'utf8'));
  const writeUsers = data => {fs.writeFileSync(usersFile+'.tmp', JSON.stringify(data,null,2));fs.renameSync(usersFile+'.tmp',usersFile);};
  const safe = u => ({name:u.name,email:u.email,username:u.username||u.email,role:u.role||'cliente',address:u.address||'',addressParts:u.addressParts||null,authProvider:u.authProvider||'legacy'});
  const current = req => {
    const cookie = String((req.headers||{}).cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('tiza_session='));
    const token = cookie ? cookie.slice(13) : '';
    const session = sessions.get(token);
    if(!session || session.expires<Date.now()) {sessions.delete(token);return null;}
    return readUsers().users.find(u=>u.authProvider==='firebase'&&u.firebaseUid===session.uid&&(u.role!=='cliente'||session.emailVerified===true))||null;
  };
  const start = (res,u,proof,remember) => {const duration=remember===true?7*86400:8*3600;FirebaseSession.requireEmail(u,proof);const token=crypto.randomBytes(32).toString('hex');sessions.set(token,{uid:u.firebaseUid,emailVerified:!!(proof&&proof.emailVerified),expires:Date.now()+duration*1000});res.setHeader('Set-Cookie','tiza_session='+token+'; HttpOnly; SameSite=Strict; Path=/'+(remember===true?'; Max-Age='+duration:''));};
  const migrationAttempts=new Map();
  function end(req,res){const cookie=String((req.headers||{}).cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith('tiza_session='));if(cookie)sessions.delete(cookie.slice(13));res.setHeader('Set-Cookie','tiza_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');}
  function legacyAccount(b){
    const username=String(b.legacyUsername||'').trim().toLowerCase(),password=String(b.legacyPassword||''),attempts=migrationAttempts.get(username)||{count:0,until:0};
    if(attempts.until>Date.now())throw Error('Espera 15 minutos antes de volver a intentar vincular esta cuenta.');
    const u=allUsers().find(u=>u.username===username||u.email===username);let valid=false;
    if(u&&u.authProvider!=='firebase'&&u.salt&&u.passwordHash&&password.length>=8&&password.length<=256){const hash=u.demoAccount?crypto.pbkdf2Sync(password,u.salt,100000,32,'sha256'):crypto.scryptSync(password,u.salt,64),saved=Buffer.from(u.passwordHash,'hex');valid=saved.length===hash.length&&crypto.timingSafeEqual(hash,saved);}
    if(!valid){attempts.count++;if(attempts.count>=5){attempts.count=0;attempts.until=Date.now()+900000;}migrationAttempts.set(username,attempts);throw Error('Usuario o contraseña de la cuenta anterior incorrectos, o la cuenta ya está vinculada.');}
    if(b.staffRole&&b.staffRole!==(u.role||'cliente'))throw Error('La cuenta anterior no corresponde al acceso seleccionado.');
    if((u.role||'cliente')==='cliente'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.email)&&String(b.email||'').trim().toLowerCase()!==u.email.toLowerCase())throw Error('Usa el mismo correo de la cuenta anterior para conservar sus pedidos.');
    migrationAttempts.delete(username);return{...u,username:u.username||u.email,role:u.role||'cliente'};
  }
  const handler = async (req,res,url) => {
    const route=url.pathname;
    if(route==='/api/firebase-registration-check'&&req.method==='POST'){const b=await readBody(req),details=FirebaseAuth.registration(b);FirebaseAuth.available(allUsers(),details);send(res,200,{ok:true});return true;}
    if(['/api/firebase-prepare','/api/firebase-session'].includes(route)&&req.method==='POST'){
      const b=await readBody(req);end(req,res);const identity=await FirebaseSession.identity((...args)=>fetch(...args),b.idToken),details=b.details?FirebaseAuth.registration({...b.details,email:identity.email},false):null;
      const user=FirebaseAuth.profile(identity,allUsers(),details);if(b.staffRole&&b.staffRole!==user.role){send(res,403,{error:'Esta cuenta no tiene permiso para este panel.'});return true;}
      const data=readUsers();data.users=FirebaseAuth.store(data.users,user);writeUsers(data);
      if(route==='/api/firebase-prepare'){send(res,200,{role:user.role,emailVerified:identity.emailVerified,requiresEmailVerification:user.role==='cliente'});return true;}
      start(res,user,identity,b.remember);send(res,200,{user:safe(user)});return true;
    }
    if(req.method==='GET'&&route==='/api/setup-status'){send(res,200,{needsOwner:false});return true;}
    if(route==='/api/setup-owner'){send(res,403,{error:'Vincula la cuenta anterior del dueño con Pasar mi cuenta anterior a Firebase.'});return true;}
    if(req.method==='POST'&&['/api/register','/api/login','/api/firebase-migrate'].includes(route)){
      const b=await readBody(req);end(req,res);let user;
      if(route==='/api/firebase-migrate'){
        const legacy=legacyAccount(b),identity=b.createAccount===true?await firebase.signUp(b.email,b.password):await firebase.signIn(b.email,b.password),data=readUsers();
        user=FirebaseAuth.link(identity,allUsers(),legacy);data.users=FirebaseAuth.store(data.users,user,legacy.username);writeUsers(data);
      }else{
        if(route==='/api/register'&&b.staffRole){send(res,403,{error:'Las cuentas del personal las vincula su titular o las crea el dueño.'});return true;}
        let details=null;if(route==='/api/register'){details=FirebaseAuth.registration(b);FirebaseAuth.available(allUsers(),details);}
        const identity=route==='/api/register'?await firebase.signUp(details.email,b.password):await firebase.signIn(b.email||b.username,b.password);
        user=FirebaseAuth.profile(identity,allUsers(),details);
        if(b.staffRole&&b.staffRole!==user.role){send(res,403,{error:'Esta cuenta no tiene permiso para este panel. Ingresa con una cuenta autorizada.'});return true;}
        const data=readUsers();data.users=FirebaseAuth.store(data.users,user);writeUsers(data);
      }
      start(res,user,undefined,b.remember);send(res,200,{user:safe(user)});return true;
    }
    if(route==='/api/logout'&&req.method==='POST'){end(req,res);send(res,200,{ok:true});return true;}
    if(route==='/api/me'&&req.method==='GET'){const u=current(req);send(res,u?200:401,u?{user:safe(u)}:{error:'Inicia sesión con Firebase.'});return true;}
    if(route.startsWith('/api/admin/')) {
      const user=current(req),role=user&&(user.role||'cliente');
      if(!user){send(res,401,{error:'Inicia sesión.'});return true;}
      if(!['dueno','empleado'].includes(role)){send(res,403,{error:'No tienes permiso.'});return true;}
      if(route==='/api/admin/orders'&&req.method==='GET'){send(res,200,{orders:readDB().orders||[]});return true;}
      const statusRoute=route.match(/^\/api\/admin\/orders\/([^/]+)\/status$/);
      if(statusRoute&&req.method==='PATCH'){
        const b=await readBody(req),db=readDB(),index=(db.orders||[]).findIndex(o=>o.folio===decodeURIComponent(statusRoute[1]));if(index<0){send(res,404,{error:'Pedido no encontrado.'});return true;}
        db.orders[index]=FoodManagement.advance(db.orders[index],b.status,user.name);writeDB(db);send(res,200,{order:db.orders[index]});return true;
      }
      if(role!=='dueno'){send(res,403,{error:'Solo el dueño puede administrar productos y empleados.'});return true;}
      if(route==='/api/admin/hours'){const Hours=require('./hours');if(req.method==='GET'){send(res,200,{hours:readDB().hours||Hours.defaults()});return true;}if(req.method==='PUT'){const db=readDB();db.hours=Hours.validate(await readBody(req));writeDB(db);send(res,200,{hours:db.hours});return true;}}
      if(route==='/api/admin/summary'&&req.method==='GET'){send(res,200,FoodManagement.summary(readDB().orders||[],url.searchParams.get('period')==='all'?'all':'today'));return true;}
      const availability=route.match(/^\/api\/admin\/products\/(\d+)\/availability$/);
      if(availability&&req.method==='PATCH'){
        const b=await readBody(req),db=readDB(),product=(db.products||[]).find(p=>p.id===Number(availability[1]));
        if(!product){send(res,404,{error:'Producto no encontrado.'});return true;}
        if(typeof b.soldOut!=='boolean')throw Error('Disponibilidad inválida.');product.soldOut=b.soldOut;writeDB(db);send(res,200,{product});return true;
      }
      if(route==='/api/admin/employees') {
        if(req.method==='GET'){send(res,200,{users:readUsers().users.filter(u=>u.role==='empleado').map(safe)});return true;}
        if(req.method==='POST'){const b=await readBody(req),details=FirebaseAuth.staffRegistration(b);FirebaseAuth.available(allUsers(),details);const identity=await firebase.signUp(details.email,b.password),data=readUsers(),u=FirebaseAuth.profile(identity,allUsers(),details,'empleado');data.users=FirebaseAuth.store(data.users,u);writeUsers(data);send(res,201,{user:safe(u)});return true;}
      }
      if(route==='/api/admin/products'&&req.method==='GET'){send(res,200,{products:readDB().products||[]});return true;}
      const match=route.match(/^\/api\/admin\/products(?:\/(\d+))?$/);
      if(match&&['POST','PUT','DELETE'].includes(req.method)) {
        const db=readDB();db.products=db.products||[];const id=Number(match[1]),index=db.products.findIndex(p=>p.id===id);
        if(req.method!=='POST'&&index<0){send(res,404,{error:'Producto no encontrado.'});return true;}
        if(req.method==='DELETE'){db.products.splice(index,1);}else{
          const b=await readBody(req),name=String(b.name||'').trim(),cat=String(b.cat||'').trim(),price=Number(b.price),img=String(b.img||'').trim();
          if(!name||name.length>100||!cat||cat.length>60||!Number.isFinite(price)||price<=0||price>100000||!FoodManagement.validImage(img))throw Error('Revisa nombre, categoría, precio e imagen seleccionada.');
          const product=Object.assign({},index>=0?db.products[index]:{}, {id:req.method==='POST'?Math.max(0,...db.products.map(p=>Number(p.id)||0))+1:id,name,cat,price:Math.round(price*100)/100,img,desc:String(b.desc||'').slice(0,600),emoji:'🍽️'});
          if(req.method==='POST')db.products.push(product);else db.products[index]=product;
        }
        writeDB(db);send(res,200,{ok:true});return true;
      }
      send(res,404,{error:'No existe.'});return true;
    }
    const ratingRoute=route.match(/^\/api\/orders\/([^/]+)\/rating$/);
    if(ratingRoute&&req.method==='POST'){
      const user=current(req);if(!user){send(res,401,{error:'Inicia sesión.'});return true;}if((user.role||'cliente')!=='cliente'){send(res,403,{error:'Solo los clientes califican entregas.'});return true;}
      const b=await readBody(req),db=readDB(),index=(db.orders||[]).findIndex(o=>o.folio===decodeURIComponent(ratingRoute[1])&&o.owner===user.email);if(index<0){send(res,404,{error:'Pedido no encontrado.'});return true;}
      db.orders[index]=FoodManagement.rate(db.orders[index],user,b);writeDB(db);send(res,200,{order:db.orders[index]});return true;
    }
    if(route==='/api/orders'&&req.method==='GET') {const user=current(req);if(!user){send(res,401,{error:'Inicia sesión.'});return true;}send(res,200,{orders:(readDB().orders||[]).filter(o=>o.owner===user.email)});return true;}
    return false;
  };
  return {handler,current,safe};
};
