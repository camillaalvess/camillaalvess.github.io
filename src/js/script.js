/* ============================================================
   PORTFÓLIO — Camilla Vitoria
   Script (script.js)
   ============================================================ */

// Menu mobile
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// Sombra no nav ao rolar
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  updateActive();
});

// Link ativo conforme seção visível
const sections = document.querySelectorAll('section[id],header[id]');
const menuLinks = document.querySelectorAll('.nav-links a');

function updateActive() {
  let current = '';
  sections.forEach((s) => {
    const top = window.scrollY + 120;
    if (top >= s.offsetTop) current = s.id;
  });
  menuLinks.forEach((l) =>
    l.classList.toggle('active', l.getAttribute('href') === '#' + current)
  );
}

// Reveal ao rolar
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Ano no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// Formulário de contato
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !email || !mensagem) {
    msg.textContent = 'Por favor, preencha nome, e-mail e mensagem.';
    msg.style.color = 'var(--pink)';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = 'Digite um e-mail válido.';
    msg.style.color = 'var(--pink)';
    return;
  }

  // Envia via mailto (sem backend)
  const body = encodeURIComponent('Nome: ' + nome + '\nE-mail: ' + email + '\n\n' + mensagem);
  window.location.href =
    'mailto:camillav704@gmail.com?subject=' +
    encodeURIComponent(document.getElementById('assunto').value || 'Contato pelo portfólio') +
    '&body=' +
    body;

  msg.textContent = 'Abrindo seu aplicativo de e-mail. Obrigada pela mensagem!';
  msg.style.color = 'var(--purple)';
  form.reset();
});