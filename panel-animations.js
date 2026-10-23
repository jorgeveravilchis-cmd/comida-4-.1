/* La animación es decorativa y no representa el estado de un pedido. */
(() => {
  const preference='tiza_panel_motion_paused_v1',footers=[...document.querySelectorAll('.panel-animation')];
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let paused=localStorage.getItem(preference)==='true';
  function render(){for(const footer of footers){footer.classList.toggle('motion-paused',paused||reduced.matches);const button=footer.querySelector('.panel-animation-toggle');button.disabled=reduced.matches;button.textContent=reduced.matches?'Movimiento reducido':paused?'Reanudar animación':'Pausar animación';button.setAttribute('aria-pressed',String(paused||reduced.matches));}}
  footers.forEach(footer=>footer.querySelector('.panel-animation-toggle').addEventListener('click',()=>{paused=!paused;localStorage.setItem(preference,String(paused));render();}));reduced.addEventListener('change',render);render();
})();
