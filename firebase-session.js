/* Comprueba el ID token con Firebase antes de leer sus claims. Nunca acepta un JWT solo por decodificarlo. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory(require('./firebase-config'));else root.FoodFirebaseSession=factory(root.TizaFirebaseConfig);})(typeof globalThis!=='undefined'?globalThis:this,function(config){
  async function identity(fetchImpl,idToken){
    if(typeof idToken!=='string'||idToken.length<30||idToken.length>20000)throw Error('Vuelve a iniciar sesión para verificar tu acceso.');
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);let response,data;
    try{response=await fetchImpl('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key='+encodeURIComponent(config.apiKey),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken}),signal:controller.signal});data=await response.json();}catch(e){throw Error('No se pudo comprobar tu sesión con Firebase. Revisa internet.');}finally{clearTimeout(timer);}
    if(!response.ok||!data.users||data.users.length!==1)throw Error('La sesión de Firebase no es válida. Vuelve a iniciar sesión.');
    let claims;try{const part=idToken.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');claims=JSON.parse(typeof Buffer!=='undefined'?Buffer.from(part,'base64').toString('utf8'):new TextDecoder().decode(Uint8Array.from(atob(part),c=>c.charCodeAt(0))));}catch(e){throw Error('La sesión de Firebase no es válida.');}
    const user=data.users[0],now=Math.floor(Date.now()/1000);
    if(user.disabled||claims.aud!==config.projectId||claims.iss!=='https://securetoken.google.com/'+config.projectId||claims.sub!==user.localId||!Number.isFinite(claims.exp)||claims.exp<=now||!Number.isFinite(claims.auth_time)||claims.auth_time>now+60||now-claims.auth_time>600)throw Error('La sesión venció. Vuelve a iniciar sesión.');
    return{localId:user.localId,email:user.email,displayName:user.displayName||'',emailVerified:user.emailVerified===true};
  }
  function requireEmail(user,proof){if(user.role==='cliente'&&(!proof||proof.emailVerified!==true))throw Error('Verifica tu correo electrónico para entrar a tu cuenta.');}
  return{identity,requireEmail};
});
