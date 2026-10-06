/* Momentos — Interactive */
if (window.AOS) AOS.init({ duration:800, easing:'ease-out-cubic', once:true, offset:60 });

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

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
    const en = document.documentElement.lang === 'en';
    let text = en ? `Hello Momentos! 👋\n\n*Name:* ${name}\n*Email:* ${email}` : `Hola Momentos! 👋\n\n*Nombre:* ${name}\n*Email:* ${email}`;
    if (phone) text += `\n*${en ? 'Phone' : 'Teléfono'}:* ${phone}`;
    text += `\n\n*${en ? 'Message' : 'Mensaje'}:*\n${msg}`;
    window.open(`https://wa.me/17868266446?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    form.reset();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> ' + (en ? 'Sent!' : '¡Enviado!');
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
      const total = innerWidth < 768 ? 6 : 10;
      for (let i = 0; i < total; i++) {
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

// ===== App instalable (PWA) =====
(function () {
  const root = new URL('../', document.currentScript ? document.currentScript.src : location.href);
  const en = document.documentElement.lang === 'en';
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register(new URL('sw.js', root)).catch(() => {});
  }
  let deferred = null;
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; });
  addEventListener('appinstalled', () => { deferred = null; });
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const help = () => {
    const m = document.createElement('div');
    m.className = 'install-modal';
    const steps = isIOS
      ? (en ? 'Tap <b>Share</b> <i class="fas fa-arrow-up-from-bracket"></i> and choose <b>Add to Home Screen</b>.' : 'Toca <b>Compartir</b> <i class="fas fa-arrow-up-from-bracket"></i> y elige <b>Añadir a pantalla de inicio</b>.')
      : (en ? 'Open your browser menu (<b>⋮</b>) and choose <b>Install app</b> or <b>Add to Home screen</b>.' : 'Abre el menú del navegador (<b>⋮</b>) y elige <b>Instalar aplicación</b> o <b>Añadir a pantalla de inicio</b>.');
    m.innerHTML = `<div class="install-box" role="dialog" aria-modal="true"><h3>${en ? 'Install Momentos' : 'Instalar Momentos'}</h3><p>${steps}</p><button class="btn btn-primary" type="button">${en ? 'Got it' : 'Entendido'}</button></div>`;
    m.addEventListener('click', (ev) => { if (ev.target === m || ev.target.closest('button')) m.remove(); });
    document.body.appendChild(m);
  };
  document.querySelectorAll('[data-install]').forEach((b) => b.addEventListener('click', async () => {
    if (deferred) { deferred.prompt(); await deferred.userChoice; deferred = null; } else { help(); }
  }));
})();
