/* Momentos — Interactive */
AOS.init({ duration:800, easing:'ease-out-cubic', once:true, offset:60 });

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
});

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });
  navLinks.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

// Contact form → WhatsApp
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const phone = document.getElementById('phone')?.value || '';
    const msg = document.getElementById('message')?.value || '';
    let text = `Hola Momentos! 👋\n\n*Nombre:* ${name}\n*Email:* ${email}`;
    if (phone) text += `\n*Teléfono:* ${phone}`;
    text += `\n\n*Mensaje:*\n${msg}`;
    window.open(`https://wa.me/17868266446?text=${encodeURIComponent(text)}`, '_blank');
    form.reset();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
      setTimeout(() => btn.innerHTML = orig, 2500);
    }
  });
}

console.log('%c🏠 Momentos', 'font-size:22px;font-weight:bold;color:#0d9488;');
