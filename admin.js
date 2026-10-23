/* Paneles de dueño y empleado. Los permisos se verifican en el servidor. */
(() => {
  let staffUser = null, products = [], refreshTimer = null;
  const el = id => document.getElementById(id);
  const escape = value => String(value == null ? '' : value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const price = n => '$'+Number(n||0).toFixed(2);
  async function request(route,method='GET',body) {
    const response = await fetch('api/'+route,{method,cache:'no-store',headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
    const data=await response.json();if(!response.ok)throw Error(data.error||'No se pudo completar la operación.');return data;
  }
  function message(text,error=false){el('staffMessage').textContent=text;el('staffMessage').style.color=error?'#b91c1c':'#166534';}
  async function orders() {
    const data=await request('admin/orders');
    el('staffOrderList').innerHTML=data.orders.length?data.orders.map(o=>{
      const status=FoodManagement.statusOf(o),index=FoodManagement.states.indexOf(status),next=index>=0?FoodManagement.states[index+1]:null;
      return '<article class="staff-record"><h3>Pedido '+escape(o.folio)+'</h3><p>'+escape(o.date)+' · '+escape(o.branch)+'</p><p>Cliente: '+escape(o.customer||o.owner)+'</p><p>Entrega: '+escape(o.address)+'</p>'+(o.deliveryNotes?'<p>Instrucciones: '+escape(o.deliveryNotes)+'</p>':'')+'<ul>'+(o.items||[]).map(i=>'<li>'+escape(i.qty)+' × '+escape(i.name)+'</li>').join('')+'</ul><p><strong>Total: '+price(o.total)+'</strong></p><p>Pago: '+escape(o.payment&&o.payment.method)+' · '+escape(o.payment&&o.payment.status||'Sin estado de cobro')+'</p>'+(o.payment&&o.payment.reference?'<p>Referencia: '+escape(o.payment.reference)+'</p>':'')+(o.payment&&o.payment.demo?'<p>Pago de demostración. Sin cobro real.</p>':'')+(o.payment&&o.payment.method==='Efectivo'?'<p>Paga con: '+price(o.payment.cashAmount)+' · Cambio: '+price(o.payment.change)+'</p>':'')+(o.discount>0?'<p>Cupón '+escape(o.couponCode)+': −'+price(o.discount)+'</p>':'')+(o.deliveryRating?'<p>Calificación de entrega: <strong>'+o.deliveryRating.stars+' de 5 ★</strong></p><p>'+escape(o.deliveryRating.comment)+'</p>':'')+'<p>Estado: <strong>'+escape(status)+'</strong></p>'+(next?'<button type="button" class="btn btn-main" data-advance-order="'+escape(o.folio)+'" data-next-status="'+escape(next)+'">Pasar a '+escape(next)+'</button>':'')+'</article>';
    }).join(''):'<p>Todavía no hay pedidos. Crea uno desde una cuenta de cliente y aparecerá aquí.</p>';
  }
  async function sales() {
    const data=await request('admin/summary?period='+el('salesPeriod').value);
    const cards=[['Pedidos recibidos',data.count],['En proceso',data.active],['Entregados',data.delivered],['Cancelados',data.cancelled],['Importe de pedidos sin cancelar',price(data.orderTotal)],['Ventas entregadas',price(data.sales)]];
    el('salesSummary').innerHTML=cards.map(([label,value])=>'<article class="staff-record sales-card"><span>'+escape(label)+'</span><strong>'+escape(value)+'</strong></article>').join('');
    el('salesMethods').innerHTML='<h3>Pedidos sin cancelar por método de pago</h3><div class="sales-table-wrap"><table class="sales-table"><thead><tr><th>Método</th><th>Pedidos</th><th>Importe</th></tr></thead><tbody>'+Object.entries(data.methods).map(([method,value])=>'<tr><td>'+escape(method)+'</td><td>'+value.count+'</td><td>'+price(value.total)+'</td></tr>').join('')+'</tbody></table></div>';
  }
  async function productList() {
    products=(await request('admin/products')).products;
    el('staffProductList').innerHTML=products.map(p=>'<article class="staff-record"><h3>'+escape(p.name)+' · '+price(p.price)+'</h3><p>'+escape(p.cat)+'</p><p>'+escape(p.desc)+'</p><p><strong>'+ (p.soldOut?'Agotado':'Disponible') +'</strong></p><button type="button" class="btn btn-ghost" data-toggle-stock="'+p.id+'">'+(p.soldOut?'Marcar disponible':'Marcar agotado')+'</button><button type="button" class="btn btn-ghost" data-edit-product="'+p.id+'">Editar</button><button type="button" class="btn btn-ghost" data-delete-product="'+p.id+'">Quitar</button></article>').join('')||'<p>No hay productos. Agrega el primero con el formulario.</p>';
  }
  async function employees() {
    const data=await request('admin/employees');el('staffEmployeeList').innerHTML=data.users.map(u=>'<article class="staff-record"><strong>'+escape(u.name)+'</strong><p>Correo: '+escape(u.email)+(u.authProvider==='firebase'?'':' · Pendiente de vincular con Firebase')+'</p></article>').join('')||'<p>Aún no hay empleados.</p>';
  }
  async function hours(){const data=await request('admin/hours');el('hoursEnabled').checked=data.hours.enabled;el('hoursDays').innerHTML=FoodHours.days.map((name,i)=>'<div class="hours-row"><strong>'+name+'</strong><label><input type="checkbox" data-day-closed="'+i+'" '+(data.hours.days[i].closed?'checked':'')+'> Cerrado</label><label>Apertura <input type="time" data-day-open="'+i+'" value="'+data.hours.days[i].open+'" required></label><label>Cierre <input type="time" data-day-close="'+i+'" value="'+data.hours.days[i].close+'" required></label></div>').join('');el('hoursPreview').textContent=FoodHours.status(data.hours).text;}
  el('hoursForm').addEventListener('submit',async e=>{e.preventDefault();const button=e.submitter;button.disabled=true;try{const value={enabled:el('hoursEnabled').checked,days:FoodHours.days.map((_,i)=>({closed:document.querySelector('[data-day-closed="'+i+'"]').checked,open:document.querySelector('[data-day-open="'+i+'"]').value,close:document.querySelector('[data-day-close="'+i+'"]').value}))};await request('admin/hours','PUT',FoodHours.validate(value));await hours();window.dispatchEvent(new Event('restaurant-hours-changed'));message('Horarios guardados.');}catch(err){message(err.message,true);}finally{button.disabled=false;}});
  async function tab(name) {
    if(name!=='orders'&&staffUser.role!=='dueno')return;
    for(const key of ['orders','products','employees','sales','hours'])el('staff'+key[0].toUpperCase()+key.slice(1)).classList.toggle('hidden',key!==name);
    document.querySelectorAll('[data-staff-tab]').forEach(b => { if (b.dataset.staffTab === name) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
    try { await ({orders,products:productList,employees,sales,hours}[name])();message(''); } catch(err){message(err.message,true);}
  }
  window.showStaffPanel=async user=>{
    staffUser=user;for(const id of ['splash','welcome','register','app'])el(id).classList.add('hidden');el('staffPanel').classList.remove('hidden');
    el('staffTitle').textContent=user.role==='dueno'?'Panel del dueño':'Panel del empleado';el('staffUser').textContent=user.name+' · '+user.email;
    document.querySelectorAll('.owner-only').forEach(e=>e.classList.toggle('hidden',user.role!=='dueno'));
    await tab('orders');clearInterval(refreshTimer);refreshTimer=setInterval(()=>{if(!el('staffOrders').classList.contains('hidden'))orders().catch(err=>message(err.message,true));},15000);
  };
  document.querySelectorAll('[data-staff-tab]').forEach(b=>b.addEventListener('click',()=>tab(b.dataset.staffTab)));
  el('salesPeriod').addEventListener('change',()=>sales().catch(err=>message(err.message,true)));
  el('refreshSales').addEventListener('click',()=>sales().catch(err=>message(err.message,true)));
  el('staffOrderList').addEventListener('click',async e=>{
    const button=e.target.closest('[data-advance-order]');if(!button)return;button.disabled=true;
    try{await request('admin/orders/'+encodeURIComponent(button.dataset.advanceOrder)+'/status','PATCH',{status:button.dataset.nextStatus});await orders();message('Estado actualizado. El cliente verá el cambio en su seguimiento.');}
    catch(err){message(err.message,true);button.disabled=false;}
  });
  el('refreshOrders').addEventListener('click',()=>orders().catch(err=>message(err.message,true)));
  el('staffLogout').addEventListener('click',async()=>{try{await request('logout','POST');['tizafood_user','tizafood_orders','tizafood_cart','tizafood_favs'].forEach(k=>localStorage.removeItem(k));location.reload();}catch(err){message(err.message,true);}});
  let imageSelection = 0, imageBusy = false;
  function showProductImage(name='Imagen guardada') {
    const image=FoodManagement.imagePath(el('productImg').value);if(image)el('productImg').value=image;
    if(image)el('productImagePreview').src=image;else el('productImagePreview').removeAttribute('src');
    el('productImagePreview').classList.toggle('hidden',!image);
    el('removeProductImage').classList.toggle('hidden',!image);
    el('productImageName').textContent=image?name:'Sin imagen seleccionada';
    el('productImageError').textContent='';
  }
  function resetImageSelection(){imageSelection++;imageBusy=false;el('productImageFile').value='';showProductImage();}
  el('chooseProductImage').addEventListener('click',()=>el('productImageFile').click());
  el('removeProductImage').addEventListener('click',()=>{el('productImg').value='';resetImageSelection();});
  el('productImageFile').addEventListener('change',async e=>{
    const file=e.target.files[0];if(!file)return;
    const selection=++imageSelection;imageBusy=true;el('productImageError').textContent='Preparando imagen…';
    let url='';
    try {
      if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Elige una imagen JPG, PNG o WEBP.');
      if(file.size>10*1024*1024)throw Error('Elige una imagen de hasta 10 MB.');
      url=URL.createObjectURL(file);const image=new Image();
      await new Promise((resolve,reject)=>{image.onload=resolve;image.onerror=()=>reject(Error('No se pudo abrir esa imagen. Elige otra.'));image.src=url;});
      const scale=Math.min(1,640/Math.max(image.naturalWidth,image.naturalHeight));
      const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
      const context=canvas.getContext('2d');context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);context.drawImage(image,0,0,canvas.width,canvas.height);
      let data=canvas.toDataURL('image/jpeg',.8);if(data.length>220000)data=canvas.toDataURL('image/jpeg',.5);
      if(!FoodManagement.validImage(data))throw Error('Esta imagen es demasiado pesada. Elige otra más pequeña.');
      if(selection!==imageSelection)return;
      el('productImg').value=data;showProductImage(file.name);
    } catch(error) {if(selection===imageSelection)el('productImageError').textContent=error.message;}
    finally {if(url)URL.revokeObjectURL(url);if(selection===imageSelection){imageBusy=false;e.target.value='';}}
  });
  el('cancelProduct').addEventListener('click',()=>{el('productForm').reset();el('productId').value='';el('productImg').value='';resetImageSelection();message('Nuevo producto.');});
  el('staffProductList').addEventListener('click',async e=>{
    const stock=e.target.closest('[data-toggle-stock]');
    if(stock){const product=products.find(p=>p.id===Number(stock.dataset.toggleStock));if(!product)return;stock.disabled=true;try{await request('admin/products/'+product.id+'/availability','PATCH',{soldOut:!product.soldOut});await productList();message('Disponibilidad actualizada.');}catch(err){message(err.message,true);stock.disabled=false;}return;}
    const edit=e.target.closest('[data-edit-product]'),del=e.target.closest('[data-delete-product]');
    if(edit){const p=products.find(p=>p.id===Number(edit.dataset.editProduct));if(!p)return;for(const [id,key]of [['Id','id'],['Name','name'],['Cat','cat'],['Price','price'],['Img','img'],['Desc','desc']])el('product'+id).value=p[key]||'';resetImageSelection();el('productName').focus();el('productForm').scrollIntoView({behavior:'smooth'});}
    if(del&&confirm('¿Quitar este producto del menú?')){try{await request('admin/products/'+del.dataset.deleteProduct,'DELETE');await productList();message('Producto eliminado.');}catch(err){message(err.message,true);}}
  });
  el('productForm').addEventListener('submit',async e=>{e.preventDefault();if(imageBusy){message('Espera a que termine de prepararse la imagen.',true);return;}const button=e.submitter;button.disabled=true;try{const id=el('productId').value;await request('admin/products'+(id?'/'+id:''),id?'PUT':'POST',{name:el('productName').value,cat:el('productCat').value,price:Number(el('productPrice').value),img:el('productImg').value,desc:el('productDesc').value});el('productForm').reset();el('productId').value='';el('productImg').value='';resetImageSelection();await productList();message('Producto guardado. Los clientes verán el cambio al volver a abrir o recargar la tienda.');}catch(err){message(err.message,true);}finally{button.disabled=false;}});
  el('employeeForm').addEventListener('submit',async e=>{e.preventDefault();if(el('employeePassword').value!==el('employeePasswordConfirm').value){message('Las contraseñas del empleado no coinciden.',true);el('employeePasswordConfirm').focus();return;}const button=e.submitter;button.disabled=true;try{await request('admin/employees','POST',{name:el('employeeName').value,username:el('employeeUsername').value,password:el('employeePassword').value});el('employeeForm').reset();await employees();message('Empleado creado en Firebase. Ya puede entrar con su correo y contraseña.');}catch(err){message(err.message,true);}finally{button.disabled=false;}});
  el('authConnectionNotice').classList.toggle('hidden',location.protocol!=='file:' || window.localSchoolDemo === true);
  if(location.protocol!=='file:' || window.localSchoolDemo === true)request('setup-status').then(data=>el('btnOwnerSetup').classList.toggle('hidden',!data.needsOwner)).catch(()=>{});
})();
