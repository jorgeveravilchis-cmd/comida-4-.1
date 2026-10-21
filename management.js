/* Reglas compartidas por el servidor y la demostración escolar. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.FoodManagement=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const states=['Recibido','En preparación','En camino','Entregado'];
  const statusOf=o=>o.cancelled||o.status==='Cancelado'?'Cancelado':o.status==='Pedido recibido'?'Recibido':states.includes(o.status)?o.status:'Recibido';
  function advance(order,status,by){
    const old=statusOf(order),index=states.indexOf(old);
    if(index<0||index===3||states[index+1]!==status)throw Error('El pedido cambió. Actualiza y avanza al siguiente estado disponible.');
    return {...order,status,managed:true,statusHistory:[...(order.statusHistory||[]),{status,at:Date.now(),by}]};
  }
  function available(items,db){
    for(const line of items){
      const product=line.productId!=null?(db.products||[]).find(p=>String(p.id)===String(line.productId)):(db.products||[]).find(p=>p.name===line.name);
      if(product&&product.soldOut===true)throw Error(product.name+' está agotado. Retíralo del pedido.');
      if(!product&&!(line.productId==null&&(db.promos||[]).some(p=>p.name===line.name)))throw Error((line.name||'Producto')+' ya no está disponible.');
    }
  }
  function pricing(items,fee,code='') {
    let subtotalCents=0;
    for(const item of items){const base=Number(item.base),qty=Number(item.qty);if(!Number.isFinite(base)||base<0||!Number.isInteger(qty)||qty<1||qty>20)throw Error('Revisa cantidades y precios del pedido.');let unit=Math.round(base*100);for(const extra of item.extras||[]){const value=Number(extra.price);if(!Number.isFinite(value)||value<0)throw Error('Extra inválido.');unit+=Math.round(value*100);}subtotalCents+=unit*qty;}
    const shipping=Math.round(Number(fee||0)*100);if(!Number.isSafeInteger(subtotalCents)||!Number.isSafeInteger(shipping)||shipping<0)throw Error('Importe inválido.');
    const couponCode=String(code||'').trim().toUpperCase();let discountCents=0;
    if(couponCode==='TIZA10')discountCents=Math.round(subtotalCents*.1);
    else if(couponCode==='ENVIOGRATIS')discountCents=shipping;
    else if(couponCode==='AHORRA20'){if(subtotalCents<10000)throw Error('AHORRA20 requiere al menos $100 en comida, sin envío.');discountCents=2000;}
    else if(couponCode)throw Error('El cupón no existe. Revisa el código.');
    discountCents=Math.min(discountCents,subtotalCents+shipping);
    return {subtotal:subtotalCents/100,fee:shipping/100,discount:discountCents/100,couponCode,total:(subtotalCents+shipping-discountCents)/100};
  }
  function rate(order,user,body){
    if((user.role||'cliente')!=='cliente'||order.owner!==user.email)throw Error('Solo el cliente de este pedido puede calificarlo.');
    if(statusOf(order)!=='Entregado')throw Error('Puedes calificar cuando el pedido esté entregado.');
    if(order.deliveryRating)throw Error('Ya calificaste esta entrega.');
    const stars=Number(body.stars),comment=String(body.comment||'').trim();if(!Number.isInteger(stars)||stars<1||stars>5||comment.length>300)throw Error('Elige de 1 a 5 estrellas y un comentario de hasta 300 caracteres.');
    return {...order,deliveryRating:{stars,comment,at:Date.now()}};
  }
  function accept(previous,incoming,db,user){
    if(previous){
      if(incoming.cancelled===true&&statusOf(previous)!=='Cancelado'){
        if(!['Recibido','En preparación'].includes(statusOf(previous)))throw Error('El pedido ya no se puede cancelar.');
        const cancelFee=Math.round(Number(previous.total)*20)/100;
        return {...previous,status:'Cancelado',cancelled:true,cancelledAt:new Date().toISOString(),cancelFee,refund:Math.round((Number(previous.total)-cancelFee)*100)/100};
      }
      return previous;
    }
    if(!incoming.items||!incoming.items.length)throw Error('El pedido debe incluir productos.');
    available(incoming.items,db);
    return {...incoming,...pricing(incoming.items,incoming.fee,incoming.couponCode),deliveryRating:undefined,owner:user.email,customer:user.name,status:'Recibido',cancelled:false,managed:true,ts:Date.now(),statusHistory:[{status:'Recibido',at:Date.now(),by:user.name}]};
  }
  const day=ts=>new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(ts));
  function summary(orders,period='today',now=Date.now()){
    const list=orders.filter(o=>period==='all'||(Number.isFinite(o.ts)&&day(o.ts)===day(now)));
    const out={count:list.length,cancelled:0,active:0,delivered:0,orderTotal:0,sales:0,methods:{Tarjeta:{count:0,total:0},Efectivo:{count:0,total:0},Transferencia:{count:0,total:0}}};
    for(const o of list){if(statusOf(o)==='Cancelado'){out.cancelled++;continue;}const cents=Math.round((Number(o.total)||0)*100);out.orderTotal+=cents;const entry=out.methods[o.payment&&o.payment.method];if(entry){entry.count++;entry.total+=cents;}if(statusOf(o)==='Entregado'){out.delivered++;out.sales+=cents;}else out.active++;}
    out.orderTotal/=100;out.sales/=100;for(const entry of Object.values(out.methods))entry.total/=100;
    return out;
  }
  function validImage(value){return value==='' || /^img\/[^\x00-\x1f]+$/.test(value) || (value.length<=220000 && /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value));}
  return {states,statusOf,advance,available,accept,summary,validImage,pricing,rate};
});
