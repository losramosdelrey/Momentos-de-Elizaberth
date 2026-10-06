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

// ===== Efectos: burbujas, barra de progreso, brillo que sigue al cursor =====
(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    document.querySelectorAll('.hero-bg, .cta-banner').forEach((box) => {
      for (let i = 0; i < 16; i++) {
        const b = document.createElement('span');
        const s = 8 + Math.random() * 34;
        b.className = 'bubble';
        b.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s}px;animation-duration:${9 + Math.random() * 10}s;animation-delay:-${Math.random() * 14}s;--dx:${(Math.random() - 0.5) * 80}px`;
        box.appendChild(b);
      }
    });
  }
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  const upd = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener('scroll', upd, { passive: true });
  upd();
  document.querySelectorAll('.amenity-card, .room-card').forEach((c) =>
    c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', e.clientX - r.left + 'px');
      c.style.setProperty('--my', e.clientY - r.top + 'px');
    })
  );
})();
