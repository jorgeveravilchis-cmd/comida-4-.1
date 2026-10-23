/* Preferencias y sesión del prototipo. Nunca guarda contraseñas ni tokens de Firebase. */
(() => {
  const key='tiza_remembered_session_v1',choice='tiza_cookie_choice_v1';
  function saved(){try{const s=JSON.parse(localStorage.getItem(key)||'null');if(s&&s.values&&typeof s.values==='object'&&Number.isFinite(s.expires)&&s.expires>Date.now())return s;localStorage.removeItem(key);}catch(e){localStorage.removeItem(key);}return null;}
  window.FoodSession={
    getItem(name){const s=saved();return s&&s.values[name]||sessionStorage.getItem(name);},
    removeItem(name){const s=saved();if(s){delete s.values[name];if(Object.keys(s.values).length)localStorage.setItem(key,JSON.stringify(s));else localStorage.removeItem(key);}sessionStorage.removeItem(name);},
    save(user,proof,remember){localStorage.removeItem(key);for(const name of ['tiza_school_session_v1','tiza_school_email_session_v1'])sessionStorage.removeItem(name);const values={tiza_school_session_v1:user.username};if(proof&&proof.emailVerified)values.tiza_school_email_session_v1=user.firebaseUid;if(remember===true)localStorage.setItem(key,JSON.stringify({expires:Date.now()+7*86400000,values}));else for(const[name,value]of Object.entries(values))sessionStorage.setItem(name,value);}
  };
  const banner=document.getElementById('cookieNotice'),status=document.getElementById('cookieChoiceStatus');
  function label(){const value=localStorage.getItem(choice);status.textContent=value==='accepted'?'Preferencias aceptadas.':value==='rejected'?'Cookies opcionales rechazadas.':'';}
  function choose(value){localStorage.setItem(choice,value);banner.classList.add('hidden');label();}
  document.getElementById('cookieAccept').addEventListener('click',()=>choose('accepted'));
  document.getElementById('cookieReject').addEventListener('click',()=>choose('rejected'));
  document.getElementById('cookieSettings').addEventListener('click',()=>{banner.classList.remove('hidden');document.getElementById('cookieReject').focus();});
  if(!['accepted','rejected'].includes(localStorage.getItem(choice)))banner.classList.remove('hidden');label();
})();
