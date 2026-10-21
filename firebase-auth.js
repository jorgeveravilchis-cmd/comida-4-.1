/* Firebase Authentication mediante su API REST oficial. Sin SDK remoto ni Analytics.
   La autenticación es de Firebase; catálogo, dirección y pedidos siguen en el prototipo local.
   No se guardan contraseñas ni tokens de Firebase en archivos o almacenamiento del navegador. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./firebase-config'));else root.FoodFirebase=factory(root.TizaFirebaseConfig);})(typeof globalThis!=='undefined'?globalThis:this,function(config){
  const errors={
    EMAIL_EXISTS:'Ese correo ya está registrado en Firebase. Elige Iniciar sesión.',
    INVALID_LOGIN_CREDENTIALS:'Correo o contraseña incorrectos.',EMAIL_NOT_FOUND:'Correo o contraseña incorrectos.',INVALID_PASSWORD:'Correo o contraseña incorrectos.',
    INVALID_EMAIL:'Escribe un correo válido.',USER_DISABLED:'Esta cuenta fue deshabilitada en Firebase.',
    OPERATION_NOT_ALLOWED:'Activa Correo electrónico/contraseña en Firebase → Authentication → Sign-in method.',
    PASSWORD_LOGIN_DISABLED:'Activa Correo electrónico/contraseña en Firebase → Authentication → Sign-in method.',
    CONFIGURATION_NOT_FOUND:'Termina la configuración de Authentication en la consola de Firebase.',
    API_KEY_INVALID:'La configuración de Firebase no es válida. Revisa firebase-config.js.',
    TOO_MANY_ATTEMPTS_TRY_LATER:'Hay demasiados intentos. Espera un momento antes de volver a entrar.',
    QUOTA_EXCEEDED:'Firebase alcanzó su límite temporal de solicitudes. Intenta más tarde.',
    PASSWORD_DOES_NOT_MEET_REQUIREMENTS:'La contraseña no cumple la política configurada en Firebase.',
    WEAK_PASSWORD:'Usa una contraseña más fuerte, de al menos 8 caracteres.',
    ADMIN_ONLY_OPERATION:'La creación de cuentas está restringida en la configuración de Firebase.'
  };
  const emailOf=v=>String(v||'').trim().toLowerCase();
  const validEmail=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)&&v.length<=120;
  function credentials(email,password){email=emailOf(email);if(!validEmail(email))throw Error('Para Firebase escribe tu correo electrónico, no el usuario local.');if(typeof password!=='string'||password.length<8||password.length>256)throw Error('Escribe una contraseña de 8 a 256 caracteres.');return{email,password};}
  function registration(b){
    const c=credentials(b.email,b.password),name=String(b.name||'').trim(),username=String(b.username||'').trim().toLowerCase();
    if(name.length<2||name.length>100||!/^[a-z0-9@._+-]{3,120}$/.test(username))throw Error('Escribe nombre y un usuario válido de al menos 3 caracteres.');
    const parts={};for(const k of ['street','houseNumber','neighborhood','municipality','state','postalCode']){parts[k]=String((b.addressParts||{})[k]||'').trim();if(!parts[k]||parts[k].length>100)throw Error('Completa todos los campos de dirección.');}
    if(!/^\d{5}$/.test(parts.postalCode))throw Error('El código postal debe tener 5 dígitos.');
    return{name,username,email:c.email,addressParts:parts,address:`${parts.street} ${parts.houseNumber}, ${parts.neighborhood}, ${parts.municipality}, ${parts.state}, C.P. ${parts.postalCode}`};
  }
  function staffRegistration(b){const c=credentials(b.email||b.username,b.password),name=String(b.name||'').trim();if(name.length<2||name.length>100)throw Error('Escribe el nombre completo del empleado.');return{name,username:c.email,email:c.email,address:'',addressParts:null};}
  function available(users,profile,exceptUid){if(users.some(u=>!(exceptUid&&u.authProvider==='firebase'&&u.firebaseUid===exceptUid)&&[u.username,u.email].some(v=>v&&[profile.username,profile.email].includes(v))))throw Error('Ese usuario o correo ya tiene una cuenta en esta aplicación. Si es una cuenta anterior, usa Pasar mi cuenta anterior a Firebase.');}
  function profile(identity,users,details,assignedRole){
    if(!identity||typeof identity.localId!=='string'||!identity.localId||identity.localId.length>128||!validEmail(emailOf(identity.email)))throw Error('Firebase devolvió una identidad incompleta. Vuelve a iniciar sesión.');
    const existing=users.find(u=>u.authProvider==='firebase'&&u.firebaseUid===identity.localId);
    const role=assignedRole||(existing&&existing.role)||'cliente';if(!['dueno','empleado','cliente'].includes(role))throw Error('Tipo de cuenta no válido.');
    const email=emailOf(identity.email);
    const user={...(existing||details||{name:String(identity.displayName||email.split('@')[0]).slice(0,100),username:email,address:'',addressParts:null}),email,authProvider:'firebase',firebaseUid:identity.localId,role};
    delete user.passwordHash;delete user.salt;
    available(users,user,identity.localId);return user;
  }
  function link(identity,users,legacy){
    const role=legacy.role||'cliente',existing=users.find(u=>u.authProvider==='firebase'&&u.firebaseUid===identity.localId);
    if(existing&&existing.role!=='cliente'&&existing.role!==role)throw Error('Esa cuenta Firebase ya corresponde a otro tipo de acceso. Usa otro correo.');
    if(role==='cliente'&&validEmail(emailOf(legacy.email))&&emailOf(legacy.email)!==emailOf(identity.email))throw Error('Para conservar tus pedidos, vincula el mismo correo de tu cuenta anterior.');
    return profile(identity,users.filter(u=>(u.username||u.email)!==legacy.username&&!(u.authProvider==='firebase'&&u.firebaseUid===identity.localId)),{...legacy},role);
  }
  function store(users,user,legacyUsername){return users.filter(u=>!(u.authProvider==='firebase'&&u.firebaseUid===user.firebaseUid)&&(!legacyUsername||(u.username||u.email)!==legacyUsername)).concat(user);}
  function client(fetchImpl){
    async function call(action,body){
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);let response;
      try{response=await fetchImpl('https://identitytoolkit.googleapis.com/v1/accounts:'+action+'?key='+encodeURIComponent(config.apiKey),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...body,returnSecureToken:true}),signal:controller.signal});}
      catch(e){throw Error('No se pudo conectar con Firebase. Revisa internet e inténtalo de nuevo. Necesitas internet para iniciar sesión.');}
      finally{clearTimeout(timeout);}
      let result;try{result=await response.json();}catch(e){throw Error('Firebase devolvió una respuesta inválida. Intenta nuevamente.');}
      if(!response.ok){const code=String(result.error&&result.error.message||'').split(' : ')[0];throw Error(errors[code]||(response.status===403?'Firebase rechazó la conexión. Revisa las restricciones de la clave y Authentication en la consola.':'No se pudo autenticar con Firebase. Revisa la configuración del proyecto.'));}
      // Conserva solo la identidad; los tokens y la contraseña se descartan.
      if(typeof result.localId!=='string'||!validEmail(emailOf(result.email)))throw Error('Firebase devolvió una identidad incompleta.');
      return{localId:result.localId,email:emailOf(result.email),displayName:result.displayName||''};
    }
    return{signUp:(email,password)=>call('signUp',credentials(email,password)),signIn:(email,password)=>call('signInWithPassword',credentials(email,password))};
  }
  return Object.freeze({client,registration,staffRegistration,available,profile,link,store});
});
