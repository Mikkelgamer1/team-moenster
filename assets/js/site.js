// Sticky top, mobilmenu og diskrete indtoninger. Ingen afhængigheder.
window.__klar = true;

const rod = document.documentElement;
const vedScroll = () => rod.classList.toggle('er-scrollet', scrollY > 24);
addEventListener('scroll', vedScroll, { passive: true });
vedScroll();

const menu = document.getElementById('menu');
// Knapperne har også commandfor/command, så menuen virker uden JavaScript i nyere browsere.
document.querySelector('.top .burger')?.addEventListener('click', () => { if (!menu.open) menu.showModal(); });
menu?.addEventListener('click', (e) => { if (menu.open && e.target.closest('[data-luk], a')) menu.close(); });

const io = new IntersectionObserver((poster) => {
  for (const p of poster) if (p.isIntersecting) { p.target.classList.add('ses'); io.unobserve(p.target); }
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
document.querySelectorAll('[data-vis]').forEach((el) => io.observe(el));

// Tal, der tæller op, når de kommer ind i billedet. Slutværdien står i HTML'en, så intet mangler uden JavaScript.
const roligt = matchMedia('(prefers-reduced-motion: reduce)').matches;
const tael = (el) => {
  const slut = Number(el.dataset.tael), start = performance.now(), varighed = 1100;
  const trin = (nu) => {
    const t = Math.min(1, (nu - start) / varighed);
    el.textContent = Math.round(slut * (1 - Math.pow(1 - t, 3))).toLocaleString('da-DK');
    if (t < 1) requestAnimationFrame(trin);
  };
  requestAnimationFrame(trin);
};
const taeller = new IntersectionObserver((poster) => {
  for (const p of poster) if (p.isIntersecting) { tael(p.target); taeller.unobserve(p.target); }
}, { threshold: 0.4 });
if (!roligt) document.querySelectorAll('[data-tael]').forEach((el) => { el.textContent = '0'; taeller.observe(el); });
