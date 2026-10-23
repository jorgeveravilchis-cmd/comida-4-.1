/* Segundo factor SMS real de Firebase. No genera códigos locales, no guarda tokens y no activa facturación. */
(() => {
  const el=id=>document.getElementById(id);let sdkPromise=null,active=null;
  const messages={
    'auth/invalid-login-credentials':'Correo o contraseña incorrectos.','auth/invalid-credential':'Correo o contraseña incorrectos.','auth/wrong-password':'Correo o contraseña incorrectos.','auth/user-not-found':'Correo o contraseña incorrectos.',
    'auth/email-already-in-use':'Ese correo ya está registrado. Inicia sesión.','auth/invalid-email':'Escribe un correo válido.','auth/weak-password':'Usa una contraseña de al menos ocho caracteres.',
    'auth/invalid-verification-code':'El código SMS es incorrecto. Revisa los seis dígitos.','auth/code-expired':'El código venció. Solicita otro SMS.','auth/session-expired':'La verificación venció. Vuelve a iniciar sesión.',
    'auth/invalid-phone-number':'Escribe un celular válido con código de país, por ejemplo +52 y diez dígitos.',
    'auth/too-many-requests':'Se hicieron demasiados intentos. Espera antes de solicitar otro código.','auth/quota-exceeded':'Firebase alcanzó el límite de SMS. Intenta más tarde.',
    'auth/billing-not-enabled':'El proyecto necesita activar la facturación de Firebase para enviar SMS.',
    'auth/operation-not-allowed':'El proyecto todavía no tiene configurada esta verificación. Revisa Identity Platform y la opción de varios factores por SMS.',
    'auth/unauthorized-domain':'Este dominio no está autorizado en Firebase para verificar el teléfono.',
    'auth/captcha-check-failed':'No se pudo comprobar reCAPTCHA. Intenta nuevamente.','auth/invalid-app-credential':'No se pudo verificar la aplicación. Revisa el dominio y reCAPTCHA en Firebase.',
    'auth/unverified-email':'Primero verifica tu correo electrónico.','auth/network-request-failed':'No se pudo conectar con Firebase. Revisa internet.'
  };
  function errorText(e){return messages[e&&e.code]||(e&&e.message&&!String(e.message).startsWith('Firebase:')?e.message:'No se pudo completar la verificación con Firebase. Revisa la configuración del proyecto.');}
  async function api(route,body){const response=await fetch('api/'+route,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}),data=await response.json();if(!response.ok)throw Error(data.error||'No se pudo verificar tu acceso.');return data;}
  async function load(){
    if(location.protocol!=='https:')throw Error('Los SMS necesitan la versión web HTTPS con dominio autorizado. No funcionan abriendo index.html directamente. Consulta GUIA-SMS-FIREBASE.md.');
    if(!sdkPromise)sdkPromise=Promise.all([import('https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js'),import('https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js')]).then(([app,sdk])=>{const instance=app.initializeApp(TizaFirebaseConfig,'tizafood-sms');const auth=sdk.initializeAuth(instance,{persistence:sdk.inMemoryPersistence});auth.languageCode='es';return{sdk,auth};}).catch(e=>{sdkPromise=null;throw Error('No se pudo cargar Firebase para verificar el teléfono. Revisa internet.');});return sdkPromise;
  }
  function clearCaptcha(s){if(s.captcha){s.captcha.clear();s.captcha=null;}el('smsRecaptcha').innerHTML='';}
  function busy(s,value){if(active!==s)return;s.busy=value;window.firebaseSmsBusy=value;for(const id of ['smsEmailSend','smsEmailCheck','smsPhone','smsFactor','smsConsent','smsCode','smsVerify'])el(id).disabled=value;tick(s);}
  function tick(s){if(active!==s)return;const left=Math.max(0,Math.ceil(((s.nextSend||0)-Date.now())/1000));el('smsSend').disabled=s.busy||left>0;el('smsSend').textContent=left?'Solicitar otro SMS en '+left+' s':s.verificationId?'Enviar otro código':'Enviar código por SMS';}
  function show(s,phase){
    if(active!==s)return;s.phase=phase;el('smsError').textContent='';el('smsStatus').textContent='';el('smsEmailStep').classList.toggle('hidden',phase!=='email');el('smsPhoneStep').classList.toggle('hidden',phase==='email');el('smsPhoneField').classList.toggle('hidden',phase!=='enroll');el('smsFactorField').classList.toggle('hidden',phase!=='signin');el('smsCodeForm').classList.toggle('hidden',!s.verificationId);
    el('smsAccount').textContent='Cuenta: '+s.email;el('smsInstructions').textContent=phase==='email'?'Primero verifica tu correo para proteger la vinculación del teléfono.':phase==='enroll'?'Agrega el celular que recibirá tus códigos de acceso. Solo tienes que vincularlo una vez.':'Confirma el acceso con el código que enviaremos a tu celular registrado.';
    if(phase==='signin'){el('smsFactor').innerHTML='';for(let i=0;i<s.hints.length;i++){const option=document.createElement('option');option.value=String(i);option.textContent='Celular terminado en '+String(s.hints[i].phoneNumber||'').slice(-4);el('smsFactor').append(option);}}
    el('smsModal').classList.add('open');el('smsModal').setAttribute('aria-hidden','false');busy(s,false);
  }
  async function finish(s,result,error){
    if(active!==s)return;active=null;clearInterval(s.timer);clearCaptcha(s);window.firebaseSmsBusy=false;el('smsModal').classList.remove('open');el('smsModal').setAttribute('aria-hidden','true');el('smsPhone').value='';el('smsCode').value='';el('smsConsent').checked=false;el('smsFactor').innerHTML='';el('smsError').textContent='';
    await s.sdk.signOut(s.auth).catch(()=>{});if(error){await api('logout',{}).catch(()=>{});s.reject(error);}else s.resolve(result);
  }
  async function complete(s){const idToken=await s.user.getIdToken(true);const result=await api('firebase-session',{idToken});await finish(s,result);}
  async function authenticate(body,options={}){
    if(active)throw Error('Termina o cancela la verificación actual.');const{sdk,auth}=await load();await sdk.signOut(auth);await api('logout',{});
    if(options.register)await api('firebase-registration-check',body);
    let user=null,resolver=null;try{const credential=options.register?await sdk.createUserWithEmailAndPassword(auth,body.email,body.password):await sdk.signInWithEmailAndPassword(auth,body.username,body.password);user=credential.user;}catch(e){if(e.code==='auth/multi-factor-auth-required')resolver=sdk.getMultiFactorResolver(auth,e);else throw Error(errorText(e));}finally{body.password='';el('rPassword').value='';el('rPasswordConfirm').value='';}
    const details=options.register?{name:body.name,username:body.username,email:body.email,addressParts:body.addressParts}:null;
    const email=String(body.email||body.username).trim();
    return new Promise((resolve,reject)=>{
      const s={sdk,auth,user,resolver,email,resolve,reject,busy:false,verificationId:'',nextSend:0,hints:resolver?resolver.hints.filter(h=>h.factorId===sdk.PhoneMultiFactorGenerator.FACTOR_ID):[]};active=s;s.timer=setInterval(()=>tick(s),1000);
      (async()=>{if(resolver){if(!s.hints.length)throw Error('Esta cuenta no tiene un segundo factor por SMS compatible.');show(s,'signin');return;}
        const prepared=await api('firebase-prepare',{idToken:await user.getIdToken(true),...(details?{details}:{})});
        if(!prepared.requiresSms){await complete(s);return;}
        show(s,prepared.emailVerified?'enroll':'email');
      })().catch(e=>finish(s,null,Error(errorText(e))));
    });
  }
  el('smsEmailSend').addEventListener('click',async()=>{const s=active;if(!s||s.busy)return;if(s.nextEmail&&Date.now()<s.nextEmail){el('smsError').textContent='Espera un minuto antes de solicitar otro correo.';return;}busy(s,true);try{await s.sdk.sendEmailVerification(s.user);s.nextEmail=Date.now()+60000;el('smsError').textContent='';el('smsStatus').textContent='Correo enviado. Revisa tu bandeja de entrada y spam; después pulsa Ya verifiqué mi correo.';}catch(e){el('smsError').textContent=errorText(e);}finally{busy(s,false);}});
  el('smsEmailCheck').addEventListener('click',async()=>{const s=active;if(!s||s.busy)return;busy(s,true);try{await s.sdk.reload(s.user);if(!s.user.emailVerified)throw Error('Tu correo todavía no está verificado. Abre el enlace que recibiste y vuelve a comprobarlo.');await s.user.getIdToken(true);show(s,'enroll');}catch(e){el('smsError').textContent=errorText(e);}finally{busy(s,false);}});
  el('smsSend').addEventListener('click',async()=>{const s=active;if(!s||s.busy||Date.now()<s.nextSend)return;el('smsError').textContent='';if(!el('smsConsent').checked){el('smsError').textContent='Acepta recibir el código de acceso en tu celular.';return;}
    let phone=el('smsPhone').value.replace(/[\s()-]/g,'');if(s.phase==='enroll'){if(/^\d{10}$/.test(phone))phone='+52'+phone;if(!/^\+[1-9]\d{7,14}$/.test(phone)){el('smsError').textContent='Escribe tu celular con código de país: +52 y diez dígitos para México.';return;}}
    busy(s,true);try{clearCaptcha(s);s.captcha=new s.sdk.RecaptchaVerifier(s.auth,'smsRecaptcha',{size:'normal'});const provider=new s.sdk.PhoneAuthProvider(s.auth);const info=s.phase==='enroll'?{phoneNumber:phone,session:await s.sdk.multiFactor(s.user).getSession()}:{multiFactorHint:s.hints[Number(el('smsFactor').value)],session:s.resolver.session};const id=await provider.verifyPhoneNumber(info,s.captcha);if(active!==s)return;s.verificationId=id;s.nextSend=Date.now()+60000;el('smsCode').value='';el('smsCodeForm').classList.remove('hidden');el('smsInstructions').textContent='Código enviado. Escríbelo abajo para continuar.';el('smsCode').focus();}catch(e){if(active===s){clearCaptcha(s);el('smsError').textContent=errorText(e);}}finally{busy(s,false);}});
  el('smsCode').addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,6));
  el('smsCodeForm').addEventListener('submit',async e=>{e.preventDefault();const s=active;if(!s||s.busy||!s.verificationId)return;const code=el('smsCode').value;if(!/^\d{6}$/.test(code)){el('smsError').textContent='Escribe los seis dígitos del SMS.';return;}busy(s,true);el('smsError').textContent='';
    try{const cred=s.sdk.PhoneAuthProvider.credential(s.verificationId,code),assertion=s.sdk.PhoneMultiFactorGenerator.assertion(cred);
      if(s.phase==='enroll'){await s.sdk.multiFactor(s.user).enroll(assertion,'Celular de acceso');await finish(s,{requiresNewLogin:true,message:'Tu teléfono quedó vinculado. Inicia sesión otra vez para recibir tu primer código de acceso.'});}
      else{const credential=await s.resolver.resolveSignIn(assertion);if(active!==s)return;s.user=credential.user;await complete(s);}
    }catch(e){if(active===s)el('smsError').textContent=errorText(e);}finally{busy(s,false);}});
  function cancel(){const s=active;if(s)finish(s,null,Error('Verificación cancelada. No se inició sesión.'));}
  el('smsModal').addEventListener('click',e=>{if(e.target===el('smsModal')||e.target.closest('[data-sms-close]'))cancel();});
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&active){e.preventDefault();e.stopImmediatePropagation();cancel();}},true);
  window.FoodSms={authenticate,cancel};
})();
