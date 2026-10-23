/* Avisos dentro de la app; sin permisos del navegador ni servicio de mensajes externo. */
(() => {
  let owner='',data=null,timer;const el=id=>document.getElementById(id),key=()=> 'tiza_notifications_v1:'+owner;
  const status=o=>FoodManagement.statusOf(o);
  function persist(){localStorage.setItem(key(),JSON.stringify(data));}
  function render(){if(!data)return;const unread=data.items.filter(n=>!n.read).length;el('notificationCount').textContent=unread?String(unread):'';el('btnNotifications').setAttribute('aria-label','Notificaciones'+(unread?', '+unread+' sin leer':''));const list=el('notificationList');list.replaceChildren();if(!data.items.length){const p=document.createElement('p');p.textContent='Todavía no hay notificaciones. Aquí aparecerán los cambios de tus pedidos.';list.append(p);}for(const n of data.items){const article=document.createElement('article'),title=document.createElement('strong'),text=document.createElement('p'),date=document.createElement('small');article.className='notification-item';title.textContent='Pedido '+n.folio;text.textContent=n.text;date.textContent=new Date(n.at).toLocaleString('es-MX',{timeZone:'America/Mexico_City'});article.append(title,text,date);list.append(article);}}
  function observe(email,orders){if(!email)return;if(owner!==email){owner=email;try{const saved=JSON.parse(localStorage.getItem(key())||'null');data=saved&&saved.seen&&Array.isArray(saved.items)?saved:null;}catch(e){data=null;}el('notificationPopup').classList.add('hidden');el('notificationPanel').classList.add('hidden');}
    if(!data){data={seen:{},items:[]};for(const o of orders)data.seen[o.folio]=status(o);persist();render();return;}
    const changes=[];for(const o of orders){const current=status(o),previous=data.seen[o.folio];if(previous&&previous!==current){const text=({'En preparación':'Tu pedido se está preparando.','En camino':'Tu pedido va en camino.','Entregado':'Tu pedido fue entregado. Ya puedes calificar la entrega.','Cancelado':'Tu pedido fue cancelado.'})[current]||'Estado actualizado: '+current;changes.push({folio:String(o.folio),text,at:Date.now(),read:false});}data.seen[o.folio]=current;}
    if(changes.length){data.items=[...changes.reverse(),...data.items].slice(0,50);el('notificationPopupText').textContent=changes.length===1?'Pedido '+changes[0].folio+': '+changes[0].text:'Tienes '+changes.length+' actualizaciones de pedidos.';el('notificationPopup').classList.remove('hidden');clearTimeout(timer);timer=setTimeout(()=>el('notificationPopup').classList.add('hidden'),8000);}
    persist();render();
  }
  el('btnNotifications').addEventListener('click',()=>{el('notificationPanel').classList.remove('hidden');el('btnNotifications').setAttribute('aria-expanded','true');if(data){data.items.forEach(n=>n.read=true);persist();render();}el('notificationClose').focus();});
  function close(){el('notificationPanel').classList.add('hidden');el('btnNotifications').setAttribute('aria-expanded','false');el('btnNotifications').focus();}
  el('notificationClose').addEventListener('click',close);
  el('notificationPopupClose').addEventListener('click',()=>el('notificationPopup').classList.add('hidden'));
  el('notificationClear').addEventListener('click',()=>{if(data){data.items=[];persist();render();}});
  window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!el('notificationPanel').classList.contains('hidden'))close();});
  window.FoodNotifications={observe};
})();
