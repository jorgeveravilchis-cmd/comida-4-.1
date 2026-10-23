/* Horarios semanales en la zona del restaurante; el cierre no cancela pedidos existentes. */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.FoodHours=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const days=['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const defaults=()=>({enabled:false,days:days.map(()=>({closed:false,open:'10:00',close:'22:00'}))});
  const minutes=s=>Number(s.slice(0,2))*60+Number(s.slice(3));
  function validate(value){if(!value||typeof value.enabled!=='boolean'||!Array.isArray(value.days)||value.days.length!==7)throw Error('Completa los horarios de los siete días.');return{enabled:value.enabled,days:value.days.map((d,i)=>{if(!d||typeof d.closed!=='boolean'||![d.open,d.close].every(t=>typeof t==='string'&&/^([01]\d|2[0-3]):[0-5]\d$/.test(t)))throw Error('Revisa el horario de '+days[i]+'.');if(!d.closed&&minutes(d.close)<=minutes(d.open))throw Error('En '+days[i]+', el cierre debe ser posterior a la apertura del mismo día.');return{closed:d.closed,open:d.open,close:d.close};})};}
  function status(value,now=new Date()){
    const config=value?validate(value):defaults();if(!config.enabled)return{open:true,text:'Pedidos disponibles · horario pendiente de activar'};
    const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now).map(p=>[p.type,p.value]));
    const weekday=new Date(Date.UTC(+parts.year,+parts.month-1,+parts.day)).getUTCDay(),time=+parts.hour*60+ +parts.minute,today=config.days[weekday];
    if(!today.closed&&time>=minutes(today.open)&&time<minutes(today.close))return{open:true,text:'Abierto · cerramos a las '+today.close+' (hora de Ciudad de México)'};
    for(let offset=0;offset<=7;offset++){const i=(weekday+offset)%7,d=config.days[i];if(!d.closed&&(offset>0||time<minutes(d.open))){const when=offset===0?'hoy':offset===1?'mañana':days[i].toLowerCase();return{open:false,text:'Cerrado · próxima apertura '+when+' a las '+d.open+' (hora de Ciudad de México)'};}}
    return{open:false,text:'Cerrado · no hay días de atención programados'};
  }
  return{days,defaults,validate,status};
});
