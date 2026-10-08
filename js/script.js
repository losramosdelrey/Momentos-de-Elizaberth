/* Momentos — Interactive */
(function () {
  if (!window.AOS) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-aos]').forEach(function (el) { el.removeAttribute('data-aos'); });
    return;
  }
  AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 48 });
})();

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

if (hamburger && navLinks) {
  const setMenu = (open) => {
    hamburger.classList.toggle('active', open);
    navLinks.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('active')));
  navLinks.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) { setMenu(false); hamburger.focus(); }
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
    let text = en ? `Hello Momentos! 👋\n\n*Name:* ${name}` : `¡Hola Momentos! ✨\n\nLlego desde su sitio web y me gustaría contactarlos.\n\n*Nombre:* ${name}`;
    if (email) text += `\n*Email:* ${email}`;
    if (phone) text += `\n*${en ? 'Phone' : 'Teléfono'}:* ${phone}`;
    text += `\n\n*${en ? 'Message' : 'Mensaje'}:*\n${msg}`;
    window.open(`https://wa.me/17868266446?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    form.reset();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> ' + (en ? 'Opening WhatsApp…' : 'Abriendo WhatsApp…');
      setTimeout(() => btn.innerHTML = orig, 2500);
    }
  });
}

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
    m.innerHTML = `<div class="install-box" role="dialog" aria-modal="true" aria-labelledby="install-title"><h3 id="install-title">${en ? 'Install Momentos' : 'Instalar Momentos'}</h3><p>${steps}</p><button class="btn btn-primary" type="button">${en ? 'Got it' : 'Entendido'}</button></div>`;
    const opener = document.activeElement;
    const close = () => { m.remove(); document.removeEventListener('keydown', onKey); if (opener && opener.focus) opener.focus(); };
    const onKey = (ev) => { if (ev.key === 'Escape') close(); };
    m.addEventListener('click', (ev) => { if (ev.target === m || ev.target.closest('button')) close(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(m);
    const ok = m.querySelector('button'); if (ok) ok.focus();
  };
  document.querySelectorAll('[data-install]').forEach((b) => b.addEventListener('click', async () => {
    if (deferred) { deferred.prompt(); await deferred.userChoice; deferred = null; } else { help(); }
  }));
})();

// ===== Reserva por fechas → WhatsApp =====
(function () {
  const f = document.querySelector('[data-booking]');
  if (!f) return;
  const en = document.documentElement.lang === 'en';
  const inp = f.querySelector('[name=in]'), out = f.querySelector('[name=out]');
  const guests = f.querySelector('[name=guests]'), room = f.querySelector('[name=room]');
  const err = f.querySelector('.booking-error');
  const iso = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  const parse = (s) => new Date(s + 'T00:00:00');
  const fmt = (s) => parse(s).toLocaleDateString(en ? 'en-US' : 'es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  inp.min = iso(new Date());
  inp.addEventListener('change', () => {
    if (!inp.value) return;
    const n = parse(inp.value); n.setDate(n.getDate() + 1);
    out.min = iso(n);
    if (out.value && out.value <= inp.value) out.value = '';
  });
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!inp.value || !out.value) { err.textContent = en ? 'Please choose your check-in and check-out dates.' : 'Elige las fechas de llegada y salida.'; return; }
    if (out.value <= inp.value) { err.textContent = en ? 'Check-out must be after check-in.' : 'La salida debe ser posterior a la llegada.'; return; }
    err.textContent = '';
    const nights = Math.round((parse(out.value) - parse(inp.value)) / 864e5);
    const g = guests.value, r = room.value;
    const text = en
      ? `Hello Momentos! 👋 I'd like to check availability:\n\n📅 Check-in: ${fmt(inp.value)}\n📅 Check-out: ${fmt(out.value)} (${nights} night${nights > 1 ? 's' : ''})\n👥 Guests: ${g}${r ? `\n🛏️ Room: ${r}` : ''}\n\nCould you tell me the rate and availability? Thank you!`
      : `¡Hola Momentos! 👋 Quisiera consultar disponibilidad:\n\n📅 Llegada: ${fmt(inp.value)}\n📅 Salida: ${fmt(out.value)} (${nights} noche${nights > 1 ? 's' : ''})\n👥 Huéspedes: ${g}${r ? `\n🛏️ Habitación: ${r}` : ''}\n\n¿Me pueden indicar precio y disponibilidad? ¡Gracias!`;
    window.open('https://wa.me/17868266446?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
})();

// ===== Menú de llamada (Cuba / internacional) =====
(function () {
  const btn = document.getElementById('call-toggle'), menu = document.getElementById('call-menu');
  if (!btn || !menu) return;
  const set = (open) => { menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); };
  btn.addEventListener('click', (e) => { e.stopPropagation(); set(menu.hidden); });
  document.addEventListener('click', (e) => { if (!menu.contains(e.target)) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
})();
