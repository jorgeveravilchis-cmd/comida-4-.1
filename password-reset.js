/* El enlace lo genera y envía Firebase; la contraseña nueva se establece en su página. */
(() => {
  const el=id=>document.getElementById(id);let busy=false,nextSend=0;
  const valid=email=>email.length<=120&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  function tick(){const left=Math.max(0,Math.ceil((nextSend-Date.now())/1000));el('resetSend').disabled=busy||left>0;el('resetSend').textContent=busy?'Enviando…':left?'Volver a enviar en '+left+' s':'Enviar enlace';}
  el('btnForgotPassword').addEventListener('click',()=>{const email=el('rUsername').value.trim();el('resetEmail').value=valid(email)?email:'';el('resetError').textContent='';el('resetStatus').textContent='';tick();el('passwordResetModal').classList.add('open');el('passwordResetModal').setAttribute('aria-hidden','false');el('resetEmail').focus();});
  el('passwordResetForm').addEventListener('submit',async e=>{e.preventDefault();if(busy||Date.now()<nextSend)return;const email=el('resetEmail').value.trim().toLowerCase();el('resetError').textContent='';el('resetStatus').textContent='';if(!valid(email)){el('resetError').textContent='Escribe un correo electrónico válido.';el('resetEmail').focus();return;}
    busy=true;tick();const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
    try{const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key='+encodeURIComponent(TizaFirebaseConfig.apiKey),{method:'POST',headers:{'Content-Type':'application/json','X-Firebase-Locale':'es'},body:JSON.stringify({requestType:'PASSWORD_RESET',email}),signal:controller.signal}),data=await response.json(),code=String(data.error&&data.error.message||'').split(' : ')[0];
      if(!response.ok&&code!=='EMAIL_NOT_FOUND'){throw Error(({INVALID_EMAIL:'Escribe un correo electrónico válido.',TOO_MANY_ATTEMPTS_TRY_LATER:'Demasiados intentos. Espera antes de volver a solicitar el enlace.',QUOTA_EXCEEDED:'Se alcanzó el límite temporal de correos de Firebase. Intenta más tarde.',OPERATION_NOT_ALLOWED:'La recuperación por correo no está habilitada en este proyecto.',USER_DISABLED:'No se pudo enviar el enlace. Consulta al responsable del proyecto.'})[code]||'Firebase no pudo procesar la solicitud. Intenta más tarde.');}
      nextSend=Date.now()+60000;el('resetStatus').textContent='Si el correo corresponde a una cuenta, recibirás un enlace para restablecer la contraseña. Revisa tu bandeja de entrada y spam. Después vuelve a iniciar sesión con tu contraseña nueva.';
    }catch(err){el('resetError').textContent=err.name==='AbortError'||err instanceof TypeError?'No se pudo conectar con Firebase. Revisa internet e inténtalo de nuevo.':err.message;}finally{clearTimeout(timer);busy=false;tick();}
  });
  setInterval(tick,1000);
})();
