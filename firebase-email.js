/* Verificación del correo con Firebase REST. Tokens solo en memoria hasta terminar o cancelar. */
(() => {
  const el=id=>document.getElementById(id);let active=null,starting=false;
  async function api(route,body){const r=await fetch('api/'+route,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),d=await r.json();if(!r.ok)throw Error(d.error||'No se pudo comprobar tu acceso.');return d;}
  async function firebase(action,body){
    const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try{const r=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:'+action+'?key='+encodeURIComponent(TizaFirebaseConfig.apiKey),{method:'POST',headers:{'Content-Type':'application/json','X-Firebase-Locale':'es'},body:JSON.stringify(body),signal:controller.signal}),d=await r.json();
      if(!r.ok){const code=String(d.error&&d.error.message||'').split(' : ')[0];throw Error(({EMAIL_EXISTS:'Ese correo ya está registrado. Inicia sesión.',INVALID_LOGIN_CREDENTIALS:'Correo o contraseña incorrectos.',INVALID_PASSWORD:'Correo o contraseña incorrectos.',EMAIL_NOT_FOUND:'Correo o contraseña incorrectos.',TOO_MANY_ATTEMPTS_TRY_LATER:'Demasiados intentos. Espera antes de volver a intentar.',OPERATION_NOT_ALLOWED:'Activa Correo electrónico/contraseña en Firebase.',INVALID_EMAIL:'Escribe un correo válido.',USER_DISABLED:'Esta cuenta está deshabilitada.',INVALID_ID_TOKEN:'La sesión venció. Vuelve a iniciar sesión.',TOKEN_EXPIRED:'La sesión venció. Vuelve a iniciar sesión.',QUOTA_EXCEEDED:'Se alcanzó el límite de correos de Firebase. Intenta más tarde.'})[code]||'Firebase no pudo completar la solicitud. Revisa la configuración del proyecto.');}
      return d;
    }catch(e){if(e.name==='AbortError'||e instanceof TypeError)throw Error('No se pudo conectar con Firebase. Revisa internet.');throw e;}finally{clearTimeout(timer);}
  }
  async function finish(s,result,error){if(active!==s)return;active=null;clearInterval(s.timer);s.token='';el('emailVerificationModal').classList.remove('open');el('emailVerificationModal').setAttribute('aria-hidden','true');if(error){await api('logout',{}).catch(()=>{});s.reject(error);}else s.resolve(result);}
  function busy(s,value){if(active!==s)return;s.busy=value;el('emailVerificationCheck').disabled=value;tick(s);}
  function tick(s){if(active!==s)return;const left=Math.max(0,Math.ceil((s.nextSend-Date.now())/1000));el('emailVerificationSend').disabled=s.busy||left>0;el('emailVerificationSend').textContent=left?'Reenviar en '+left+' s':'Enviar enlace de verificación';}
  async function send(s){if(active!==s||s.busy||Date.now()<s.nextSend)return;busy(s,true);el('emailVerificationError').textContent='';try{await firebase('sendOobCode',{requestType:'VERIFY_EMAIL',idToken:s.token});if(active!==s)return;s.nextSend=Date.now()+60000;el('emailVerificationStatus').textContent='Enlace enviado. Abre tu correo y después pulsa Ya verifiqué mi correo.';}catch(e){if(active===s)el('emailVerificationError').textContent=e.message;}finally{busy(s,false);}}
  async function authenticate(body,options={}){
    if(active||starting)throw Error('Termina o cancela la verificación actual.');starting=true;
    try{await api('logout',{});if(options.register)await api('firebase-registration-check',body);
      let credential;try{credential=await firebase(options.register?'signUp':'signInWithPassword',{email:String(body.email||body.username).trim(),password:body.password,returnSecureToken:true});}finally{body.password='';el('rPassword').value='';el('rPasswordConfirm').value='';}
      if(credential.mfaPendingCredential)throw Error('Esta cuenta aún tiene un segundo factor activado en Firebase. El responsable debe retirarlo antes de usar el acceso por correo.');
      const prepared=await api('firebase-prepare',{idToken:credential.idToken,...(options.register?{details:{name:body.name,username:body.username,email:body.email,addressParts:body.addressParts}}:{})});
      if(!prepared.requiresEmailVerification||prepared.emailVerified)return await api('firebase-session',{idToken:credential.idToken,remember:body.remember===true});
      return new Promise((resolve,reject)=>{const s={remember:body.remember===true,token:credential.idToken,resolve,reject,nextSend:0,busy:false};active=s;el('emailVerificationAccount').textContent='Cuenta: '+credential.email;el('emailVerificationStatus').textContent='';el('emailVerificationError').textContent='';el('emailVerificationModal').classList.add('open');el('emailVerificationModal').setAttribute('aria-hidden','false');s.timer=setInterval(()=>tick(s),1000);busy(s,false);send(s);});
    }finally{starting=false;}
  }
  el('emailVerificationSend').addEventListener('click',()=>{if(active)send(active);});
  el('emailVerificationCheck').addEventListener('click',async()=>{const s=active;if(!s||s.busy)return;busy(s,true);el('emailVerificationError').textContent='';try{const result=await api('firebase-session',{idToken:s.token,remember:s.remember});await finish(s,result);}catch(e){if(active===s)el('emailVerificationError').textContent=e.message;}finally{busy(s,false);}});
  function cancel(){if(active)finish(active,null,Error('Verificación cancelada. No se inició sesión.'));}
  el('emailVerificationModal').addEventListener('click',e=>{if(e.target===el('emailVerificationModal')||e.target.closest('[data-email-close]'))cancel();});
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&active){e.preventDefault();e.stopImmediatePropagation();cancel();}},true);
  window.FoodEmail={authenticate,cancel};
})();
