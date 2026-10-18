const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = [...document.querySelectorAll('.nav-link')];
const pages = [...document.querySelectorAll('[data-page]')];

function showPage(name) {
  if (!pages.some(page => page.dataset.page === name)) name = 'inicio';
  pages.forEach(page => page.classList.toggle('active-page', page.dataset.page === name));
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.tab === name));
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  history.replaceState(null, '', `#${name}`);
}
document.querySelectorAll('[data-goto]').forEach(control => {
  control.addEventListener('click', event => {
    event.preventDefault();
    showPage(control.dataset.goto);
  });
});
navLinks.forEach(link => link.addEventListener('click', () => showPage(link.dataset.tab)));
menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
const initialPage = location.hash.slice(1);
if (initialPage && pages.some(page => page.dataset.page === initialPage)) {
  pages.forEach(page => page.classList.toggle('active-page', page.dataset.page === initialPage));
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.tab === initialPage));
}

const proposalFilter = document.getElementById('proposalFilter');
proposalFilter.addEventListener('change', () => {
  document.querySelectorAll('.proposal-card').forEach(card => {
    card.hidden = proposalFilter.value !== 'todas' && card.dataset.category !== proposalFilter.value;
  });
});

const message = document.getElementById('message');
const charCount = document.getElementById('charCount');
message.addEventListener('input', () => charCount.textContent = message.value.length);

document.getElementById('suggestionForm').addEventListener('submit', event => {
  event.preventDefault();
  const kind = document.getElementById('kind').value;
  const text = message.value.trim();
  if (!text) {
    message.focus();
    return;
  }
  const whatsappText = `Olá, Nova Onda 42! 👋\n\nTipo de mensagem: ${kind}\n\n${text}\n\n— Enviado pelo site da Nova Onda`;
  window.open(`https://wa.me/5511913600272?text=${encodeURIComponent(whatsappText)}`, '_blank', 'noopener,noreferrer');
});
/* EFEITO DE BOLHAS — cole este bloco no FINAL do script.js atual.
   Não apague o JavaScript que já existe no seu site. */
(() => {
  if (document.querySelector('.bubble-layer')) return;
  const layer = document.createElement('div');
  layer.className = 'bubble-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  function makeBubble() {
    const bubble = document.createElement('span');
    bubble.className = 'screen-bubble';
    const size = 7 + Math.random() * 24;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${9 + Math.random() * 12}s`;
    bubble.style.setProperty('--drift', `${Math.round(Math.random() * 100 - 50)}px`);
    layer.appendChild(bubble);
    bubble.addEventListener('animationend', () => bubble.remove(), { once: true });
  }

  for (let i = 0; i < 15; i++) {
    setTimeout(makeBubble, i * 450);
  }
  setInterval(makeBubble, 850);
})();
