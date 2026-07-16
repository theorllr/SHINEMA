const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.textContent = open ? 'FERMER' : 'MENU';
});

document.querySelectorAll('[data-href]').forEach((el)=>{const go=()=>window.location.href=el.dataset.href;el.addEventListener('click',go);el.addEventListener('keydown',(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});
