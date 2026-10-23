/* Demostración escolar local. No sustituye un servidor con seguridad real. */
(() => {
  if(location.protocol!=='file:'&&!['tizafood.web.app','tizafood.firebaseapp.com'].includes(location.hostname))return;
  window.localSchoolDemo = true;
  const DATA = 'tiza_school_db_v1', USERS = 'tiza_school_users_v1', SESSION = 'tiza_school_session_v1', EMAIL_SESSION='tiza_school_email_session_v1';
  const seed = JSON.parse(document.getElementById('schoolSeed').textContent);
  const read = (key, fallback) => {const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback;};
  const write = (key, value) => localStorage.setItem(key,JSON.stringify(value));
  if (!localStorage.getItem(DATA)) write(DATA,seed);
  if (!localStorage.getItem(USERS)) write(USERS,[]);
  const demoAccounts = window.TizaLegacyAccounts||[];
  const allUsers = () => {const users=read(USERS,[]);return [...demoAccounts.filter(d=>!users.some(u=>u.username===d.username)),...users];};
  const nativeFetch = window.fetch.bind(window);
  const safe = u => ({name:u.name,username:u.username,email:u.email,role:u.role,address:u.address||'',addressParts:u.addressParts||null,authProvider:u.authProvider||'legacy'});
  const current = () => allUsers().find(u=>u.username===FoodSession.getItem(SESSION)&&u.authProvider==='firebase'&&u.firebaseUid&&(u.role!=='cliente'||FoodSession.getItem(EMAIL_SESSION)===u.firebaseUid));
  const reply = (status,data) => new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json'}});
  const fail = (message,status=400) => {const e=Error(message);e.status=status;throw e;};
  const requireUser = roles => {const user=current();if(!user)fail('Inicia sesión.',401);if(roles&&!roles.includes(user.role))fail('No tienes permiso para esta acción.',403);return user;};
  const migrationAttempts=new Map();
  const service=()=>{if(!window.FoodFirebase)fail('Recarga la app con Ctrl + F5.');return FoodFirebase.client(nativeFetch);};
  const enter=(user,proof,remember)=>{FoodFirebaseSession.requireEmail(user,proof);FoodSession.save(user,proof,remember);return reply(200,{user:safe(user)});};
  async function legacyAccount(b){
    const username=String(b.legacyUsername||'').trim().toLowerCase(),password=String(b.legacyPassword||'');
    const attempts=migrationAttempts.get(username)||{count:0,until:0};if(attempts.until>Date.now())fail('Espera 15 minutos antes de volver a intentar vincular esta cuenta.',429);
    const user=allUsers().find(u=>u.username===username||u.email===username);let valid=false;
    if(user&&user.authProvider!=='firebase'&&user.salt&&password.length>=8&&password.length<=256){const material=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(user.salt),iterations:100000},material,256);valid=Array.from(new Uint8Array(bits),v=>v.toString(16).padStart(2,'0')).join('')===user.passwordHash;}
    if(!valid){attempts.count++;if(attempts.count>=5){attempts.until=Date.now()+900000;attempts.count=0;}migrationAttempts.set(username,attempts);fail('Usuario o contraseña de la cuenta anterior incorrectos, o la cuenta ya está vinculada.',401);}
    if(b.staffRole&&b.staffRole!==(user.role||'cliente'))fail('La cuenta anterior no corresponde al acceso seleccionado.',403);
    if((user.role||'cliente')==='cliente'&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)&&String(b.email||'').trim().toLowerCase()!==user.email.toLowerCase())fail('Usa el mismo correo de la cuenta anterior para conservar sus pedidos.');
    migrationAttempts.delete(username);return user;
  }
  // Serializa escrituras locales para evitar perder cambios al confirmar dos acciones.
  let queue=Promise.resolve();
  window.fetch=(input,options={})=>{
    const url=new URL(typeof input==='string'?input:input.url,location.href);
    const marker=url.pathname.lastIndexOf('/api/');
    if(url.origin!==location.origin||marker<0)return nativeFetch(input,options);
    const task=queue.then(async()=>{
      try {
        const route=url.pathname.slice(marker+5),method=options.method||'GET',b=options.body?JSON.parse(options.body):{};
        const db=read(DATA,seed);
        for(const item of [...(db.products||[]),...(db.promos||[])])item.img=FoodManagement.imagePath(item.img);
        if(route==='db'&&method==='GET'){const out={...db};delete out.orders;return reply(200,out);}
        if(route==='firebase-registration-check'&&method==='POST'){const details=FoodFirebase.registration(b);FoodFirebase.available(allUsers(),details);return reply(200,{ok:true});}
        if(['firebase-prepare','firebase-session'].includes(route)&&method==='POST'){
          FoodSession.removeItem(SESSION);FoodSession.removeItem(EMAIL_SESSION);
          const identity=await FoodFirebaseSession.identity(nativeFetch,b.idToken),details=b.details?FoodFirebase.registration({...b.details,email:identity.email},false):null;
          const user=FoodFirebase.profile(identity,allUsers(),details);
          if(b.staffRole&&user.role!==b.staffRole)fail('Esta cuenta no tiene permiso para este panel.',403);
          write(USERS,FoodFirebase.store(read(USERS,[]),user));
          if(route==='firebase-prepare')return reply(200,{role:user.role,emailVerified:identity.emailVerified,requiresEmailVerification:user.role==='cliente'});
          return enter(user,identity,b.remember);
        }
        if(route==='setup-status')return reply(200,{needsOwner:false});
        if(route==='setup-owner')fail('Vincula la cuenta anterior del dueño con el botón Pasar mi cuenta anterior a Firebase.',403);
        if(['login','register','firebase-migrate'].includes(route)&&method==='POST'){
          FoodSession.removeItem(SESSION);let user;
          if(route==='firebase-migrate'){
            const legacy=await legacyAccount(b);
            const identity=b.createAccount===true?await service().signUp(b.email,b.password):await service().signIn(b.email,b.password);
            user=FoodFirebase.link(identity,allUsers(),legacy);write(USERS,FoodFirebase.store(read(USERS,[]),user,legacy.username));
          }else{
            if(route==='register'&&b.staffRole)fail('Las cuentas del personal se vinculan desde su acceso o las crea el dueño.',403);
            let details=null;if(route==='register'){details=FoodFirebase.registration(b);FoodFirebase.available(allUsers(),details);}
            const identity=route==='register'?await service().signUp(details.email,b.password):await service().signIn(b.email||b.username,b.password);
            user=FoodFirebase.profile(identity,allUsers(),details);
            if(b.staffRole&&b.staffRole!==user.role)fail('Esta cuenta no tiene permiso para este panel. Ingresa con una cuenta autorizada.',403);
            write(USERS,FoodFirebase.store(read(USERS,[]),user));
          }
          return enter(user,undefined,b.remember);
        }
        if(route==='logout'){FoodSession.removeItem(SESSION);FoodSession.removeItem(EMAIL_SESSION);return reply(200,{ok:true});}
        if(route==='me')return reply(200,{user:safe(requireUser())});
        if(route.startsWith('admin/')) {
          requireUser(['dueno','empleado']);
          if(route==='admin/orders'&&method==='GET')return reply(200,{orders:db.orders||[]});
          const statusRoute=route.match(/^admin\/orders\/([^/]+)\/status$/);
          if(statusRoute&&method==='PATCH'){
            const index=(db.orders||[]).findIndex(o=>o.folio===decodeURIComponent(statusRoute[1]));if(index<0)fail('Pedido no encontrado.',404);
            db.orders[index]=FoodManagement.advance(db.orders[index],b.status,current().name);write(DATA,db);return reply(200,{order:db.orders[index]});
          }
          requireUser(['dueno']);
          if(route==='admin/hours'){if(method==='GET')return reply(200,{hours:db.hours||FoodHours.defaults()});if(method==='PUT'){db.hours=FoodHours.validate(b);write(DATA,db);return reply(200,{hours:db.hours});}}
          if(route==='admin/summary'&&method==='GET')return reply(200,FoodManagement.summary(db.orders||[],url.searchParams.get('period')==='all'?'all':'today'));
          const availability=route.match(/^admin\/products\/(\d+)\/availability$/);
          if(availability&&method==='PATCH'){
            const product=db.products.find(p=>p.id===Number(availability[1]));if(!product)fail('Producto no encontrado.',404);
            if(typeof b.soldOut!=='boolean')fail('Disponibilidad inválida.');product.soldOut=b.soldOut;write(DATA,db);return reply(200,{product});
          }
          if(route==='admin/employees') {
            if(method==='GET')return reply(200,{users:allUsers().filter(u=>u.role==='empleado').map(safe)});
            if(method==='POST'){const details=FoodFirebase.staffRegistration(b);FoodFirebase.available(allUsers(),details);const identity=await service().signUp(details.email,b.password),user=FoodFirebase.profile(identity,allUsers(),details,'empleado');write(USERS,FoodFirebase.store(read(USERS,[]),user));return reply(201,{user:safe(user)});}
          }
          if(route==='admin/products'&&method==='GET')return reply(200,{products:db.products});
          const match=route.match(/^admin\/products(?:\/(\d+))?$/);
          if(match&&['POST','PUT','DELETE'].includes(method)) {
            const id=Number(match[1]),index=db.products.findIndex(p=>p.id===id);
            if(method!=='POST'&&index<0)fail('Producto no encontrado.',404);
            if(method==='DELETE')db.products.splice(index,1);else {
              const name=String(b.name||'').trim(),cat=String(b.cat||'').trim(),price=Number(b.price),img=String(b.img||'').trim();
              if(!name||name.length>100||!cat||cat.length>60||!Number.isFinite(price)||price<=0||price>100000||!FoodManagement.validImage(img))fail('Revisa nombre, categoría, precio e imagen seleccionada.');
              const product={...(index>=0?db.products[index]:{}),id:method==='POST'?Math.max(0,...db.products.map(p=>Number(p.id)||0))+1:id,name,cat,price:Math.round(price*100)/100,img,desc:String(b.desc||'').slice(0,600),emoji:'🍽️'};
              if(method==='POST')db.products.push(product);else db.products[index]=product;
            }
            write(DATA,db);return reply(200,{ok:true});
          }
        }
        const ratingRoute=route.match(/^orders\/([^/]+)\/rating$/);
        if(ratingRoute&&method==='POST'){
          const user=requireUser(['cliente']),index=(db.orders||[]).findIndex(o=>o.folio===decodeURIComponent(ratingRoute[1])&&o.owner===user.email);if(index<0)fail('Pedido no encontrado.',404);
          db.orders[index]=FoodManagement.rate(db.orders[index],user,b);write(DATA,db);return reply(200,{order:db.orders[index]});
        }
        if(route==='orders') {
          const user=requireUser();
          if(method==='GET')return reply(200,{orders:(db.orders||[]).filter(o=>o.owner===user.email)});
          if(method==='POST') {
            if(typeof b.folio!=='string'||!Array.isArray(b.items)||!Number.isFinite(b.total)||b.total<0)fail('Pedido inválido.');
            if((db.orders||[]).some(o=>o.folio===b.folio&&o.owner!==user.email))fail('Pedido de otra cuenta.',403);
            if(!(db.orders||[]).some(o=>o.folio===b.folio))Object.assign(b,FoodManagement.pricing(b.items,b.fee,b.couponCode));
            const payment={method:b.payment&&b.payment.method};
            if(payment.method==='Efectivo') {
              const amount=b.payment.cashAmount;if(!Number.isFinite(amount)||amount<=0||Math.round(amount*100)<Math.round(b.total*100)||!Number.isSafeInteger(Math.round(amount*100))||Math.abs(amount*100-Math.round(amount*100))>0.00001)fail('El efectivo debe cubrir el total.');
              Object.assign(payment,{cashAmount:amount,change:(Math.round(amount*100)-Math.round(b.total*100))/100,status:'Pendiente de cobro'});
            } else if(payment.method==='Transferencia') {
              const reference=String(b.payment.reference||'').trim();if(reference.length<3||reference.length>100||/[\u0000-\u001f\u007f]/.test(reference))fail('Escribe una referencia válida.');
              Object.assign(payment,{reference,status:'Pendiente de verificación',demo:true});
            } else if(payment.method==='Tarjeta')Object.assign(payment,{brand:String(b.payment.brand||'').slice(0,20),last4:String(b.payment.last4||'').slice(0,4),demo:true});else fail('Elige un método de pago.');
            const order=FoodManagement.accept((db.orders||[]).find(o=>o.folio===b.folio),{...b,payment},db,user);db.orders=[order,...(db.orders||[]).filter(o=>o.folio!==order.folio)].slice(0,500);write(DATA,db);return reply(201,{ok:true,order});
          }
        }
        if(route==='reviews'&&method==='POST'){requireUser();db.reviews=[...(db.reviews||[]).filter(r=>r.id!==b.id),b];write(DATA,db);return reply(201,{ok:true});}
        const review=route.match(/^reviews\/(.+)$/);
        if(review&&method==='DELETE'){const user=requireUser();db.reviews=(db.reviews||[]).filter(r=>!(String(r.id)===decodeURIComponent(review[1])&&r.owner===user.email));write(DATA,db);return reply(200,{ok:true});}
        return reply(404,{error:'No existe.'});
      } catch(error) {return reply(error.status||400,{error:error.message||'No se pudo guardar en este navegador.'});}
    });
    queue=task.catch(()=>{});return task;
  };
})();
