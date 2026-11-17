// Al HTML til sitet. Tekster rettes her; tal, heste og resultater kommer fra data/travinfo.json.
// Kilder til hver påstand står i README.md (offentlig) og LANCERING.md (intern).

export const SITE = {
  // ← Sæt det rigtige domæne, når det er valgt (eller miljøvariablen SITE_URL). På Vercel bruges projektets adresse. teammoenster.dk var ledigt 17.11.2026.
  url: (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL && 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL) || 'https://www.teammoenster.dk').replace(/\/$/, ''),
  navn: 'Team Mønster',
  person: 'Knud Mønster',
  fornavn: 'Knud',
  licens: 41000,
  firma: 'Travtræner Knud Mønster', // navn og CVR fra CVR-registret (datacvr.virk.dk, tjekket 17.11.2026) – skal stå på siden efter e-handelsloven § 7
  cvr: '16892076',
  telefon: '+45 40 32 20 90', // licensregistret og Facebook-siden
  gade: 'Brøndumvej 83',
  vej: 'Brøndumvej',
  sted: 'Hem',
  postnr: '7800',
  by: 'Skive',
  selvstaendig: '1993-05-01', // egen stald i Skive (travservice.dk 22.10.2017, travet.dk 5.9.2026)
  facebook: 'https://www.facebook.com/teammoenster/', // opslag vises som kort, når FB_SIDE/FB_TOKEN er sat i GitHub
  instagram: '', // ingen fundet 17.11.2026
  travinfo: 'https://travinfo.dk/licenseholder-tabs/41000',
  hjemmebane: 'https://www.skive-trav.dk/',
  kort: 'https://www.google.com/maps/search/?api=1&query=Br%C3%B8ndumvej+83%2C+7800+Skive',
  michelle: { navn: 'Michelle Mønster', licens: 47327, travinfo: 'https://travinfo.dk/licenseholder-tabs/47327' },
};

// Billeder: navn → [forhold, bredder…]. Kilder og fotografer i LANCERING.md.
const BILLEDER = {
  'tribune': [1.436, 800, 1334],
  'gaarden': [1.5, 700, 1278],
  'jubel': [1.501, 560, 800],
  'med-hest': [1.501, 560, 800],
  'portraet': [1.412, 500],
  'dm-vinder': [1.501, 560, 800],
  'i-loeb': [1.498, 560, 800],
  'vindercirkel': [1.504, 560, 800],
  'michelle-hest': [1.515, 560, 800],
  'michelle-monte': [1.501, 560, 800],
  'pov-mark': [1.765, 540, 960],
  'fold': [0.972, 540, 933],
  'pov-sti': [0.567, 544],
  'pov-bane': [0.563, 540],
  'bane-hest': [0.563, 540],
};

const BANER = { Sk: 'Skive', 'Ål': 'Aalborg', 'År': 'Aarhus', Od: 'Odense', Ch: 'Charlottenlund', Bi: 'Billund', Bh: 'Bornholm', Ny: 'Nykøbing F.', Bs: 'Skovbo', Kl: 'Klampenborg', 'Åb': 'Åby', 'Jæ': 'Jägersro', Ax: 'Axevalla' };
// Banernes omtrentlige placering [længdegrad, breddegrad] til det skematiske Danmarkskort (svenske baner og Bornholm vises ikke).
const BANE_POS = { Sk: [9.06, 56.56], 'Ål': [9.87, 57.05], 'År': [10.2, 56.14], Od: [10.36, 55.4], Ch: [12.58, 55.75], Bi: [9.12, 55.73], Ny: [11.87, 54.77], Bs: [12.03, 55.46], Kl: [12.59, 55.77] };
const HJEM = 'Sk';
const NAV = [['om-knud/', 'Om Knud'], ['stalden/', 'Stalden'], ['heste/', 'Heste'], ['resultater/', 'Resultater']];

// DM for professionelle travtrænere: medaljer i det officielle DM siden 1999 (travet.dk 5.9.2026). g = guld, s = sølv, b = bronze.
export const DM = [[2000, 's'], [2001, 'b'], [2006, 's'], [2008, 'g'], [2011, 's'], [2013, 's'], [2018, 'b'], [2019, 's'], [2021, 's'], [2026, 'g']];
// Andre milepæle på medaljebanen: Derbyet 2012 (thof.dk) og EM for kuske 2014 (travet.dk 5.9.2026).
const MAERKER = [[2012, 'Derby', 'derby'], [2014, 'EM-guld', 'em']];

// ---------- små hjælpere ----------

let R = ''; // sti tilbage til roden fra den side, der bygges
let V = ''; // versionsmærke til css/js
let KORT;   // Danmarks omrids og projektionstal fra data/danmark.json

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nf = (n) => Number(n).toLocaleString('da-DK');
const kr = (n) => `${nf(n)}&nbsp;kr.`;
const d = (iso) => new Date(`${String(iso).slice(0, 10)}T12:00:00Z`);
const langDato = (iso) => new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d(iso));
const kortDato = (iso) => new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(d(iso));
const ugedag = (iso) => new Intl.DateTimeFormat('da-DK', { weekday: 'long', timeZone: 'UTC' }).format(d(iso));
const dkListe = (a) => (a.length < 2 ? a.join('') : `${a.slice(0, -1).join(', ')} og ${a.at(-1)}`);
const ORD = ['ingen', 'én', 'to', 'tre', 'fire', 'fem', 'seks', 'syv', 'otte', 'ni', 'ti', 'elleve', 'tolv'];
export const talord = (n) => ORD[n] ?? nf(n);
const stort = (s) => s.charAt(0).toUpperCase() + s.slice(1);
// API'et giver kun en kode. Ukendte koder er udenlandske baner (alle danske står i BANER), så de vises som Udlandet.
const bane = (kode) => BANER[kode] ?? 'Udlandet';
const tlfLink = SITE.telefon.replace(/\s/g, '');
const tlfKort = SITE.telefon.replace('+45 ', '');

/** "16,0a" → "1.16,0a". Tomt, hvis der ikke er en tid (fx galop uden tid). */
export const tid = (t) => (/^\d\d,\d/.test(t ?? '') ? `1.${t}` : '');

/** Hurtigste tid i en rekordstreng som "18,7k 14,3m *12,2am" → "1.12,2am". */
export const bedsteRekord = (mark) => {
  const tider = String(mark ?? '').replace(/\*/g, '').split(/\s+/).filter((x) => /^\d\d,\d/.test(x));
  tider.sort((a, b) => parseFloat(a.replace(',', '.')) - parseFloat(b.replace(',', '.')));
  return tider.length ? `1.${tider[0]}` : '';
};

/** Placering som den vises: 1, 2, 3 … "–" for uplaceret, "disk." for diskvalificeret. */
export const plac = (p) => (/^[1-9]\d*$/.test(p) ? p : p === 'd' ? 'disk.' : '–');

/** Hele år fra en dato (YYYY-MM-DD) til i dag: fra 1993-05-01 er det 33 år den 17.11.2026. */
export const helAar = (fra, idag) => Number(idag.slice(0, 4)) - Number(fra.slice(0, 4)) - (idag.slice(5) < fra.slice(5) ? 1 : 0);

/** Kusken ved en kommende start: kun fornavn, når det er Knud eller Michelle selv. */
export const kuskVist = (navn) => (/ Mønster$/.test(navn ?? '') ? navn.split(' ')[0] : navn ?? '');

const pil = '<svg class="pil" viewBox="0 0 22 10" width="22" height="10" aria-hidden="true"><path d="M0 5h20M16 1l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const ud = '<svg class="ud" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><path d="M1 9 9 1M3 1h6v6" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const nyFane = '<span class="sr"> (åbner i ny fane)</span>';
const ekstern = (href, tekst, cls = 'link') => `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${tekst} ${ud}${nyFane}</a>`;
const knap = (href, tekst, cls = '') => `<a class="knap ${cls}" href="${R}${href}">${tekst} ${pil}</a>`;
const link = (href, tekst, cls = '') => `<a class="link ${cls}" href="${R}${href}">${tekst} ${pil}</a>`;

const billede = (navn, alt, { sizes = '100vw', lazy = true, cls = '' } = {}) => {
  const [forhold, ...bredder] = BILLEDER[navn];
  const max = bredder.at(-1);
  return `<img${cls ? ` class="${cls}"` : ''} src="${R}assets/img/${navn}-${bredder[0]}.webp" srcset="${bredder.map((w) => `${R}assets/img/${navn}-${w}.webp ${w}w`).join(', ')}" sizes="${sizes}" width="${max}" height="${Math.round(max / forhold)}" alt="${esc(alt)}"${lazy ? ' loading="lazy" decoding="async"' : ' fetchpriority="high"'}>`;
};
// Lille overskrift med stalddragtens røde striber foran
const etiket = (tekst, attr = '') => `<p class="etiket"${attr}>${tekst}</p>`;

// ---------- afledte tal ----------

function afled(data, idag) {
  const heste = [...data.heste].sort((a, b) => b.praemier - a.praemier || a.navn.localeCompare(b.navn, 'da'));
  const navne = new Map(heste.map((h) => [h.id, h.navn]));
  const medNavn = (r) => ({ ...r, hest: navne.get(r.hestId) ?? r.hest });
  const saeson = data.traenerStatistik.find((s) => s.sejre > 0) ?? data.traenerStatistik.find((s) => s.starter > 0) ?? data.traenerStatistik[0];
  const kusk = data.kuskStatistik.find((s) => s.aar === saeson.aar) ?? data.kuskStatistik[0];
  const mStat = data.michelle?.statistik ?? [];
  const michelle = mStat.find((s) => s.aar === saeson.aar && s.starter > 0) ?? mStat.find((s) => s.starter > 0);
  const iAar = data.resultater.filter((r) => r.dato.startsWith(String(saeson.aar)));
  const prNavn = {};
  for (const r of iAar) {
    const b = (prNavn[bane(r.bane)] ??= { kode: r.bane, navn: bane(r.bane), antal: 0, sejre: 0 });
    b.antal++;
    if (r.placering === '1') b.sejre++;
  }
  const banetal = Object.values(prNavn).sort((a, b) => b.sejre - a.sejre || b.antal - a.antal);
  const traenerAar = data.traenerStatistik.filter((s) => s.starter > 0);
  return {
    heste,
    saeson,
    kusk,
    michelle,
    aarSelvstaendig: helAar(SITE.selvstaendig, idag),
    opdateret: langDato(data.opdateret),
    seneste: data.resultater.slice(0, 10).map(medNavn),
    kommende: data.kommende.filter((k) => k.dato >= idag).map(medNavn),
    banetal,
    sejrsbaner: banetal.filter((b) => b.sejre > 0 || b.kode === HJEM), // til kort og bjælker: baner uden sejre vises ikke
    banerIAar: [...banetal.filter((b) => b.navn !== 'Udlandet').map((b) => b.navn), ...(prNavn.Udlandet ? ['udenlandske baner'] : [])],
    ungheste: heste.filter((h) => h.alder <= 2),
    aldre: [Math.min(...heste.map((h) => h.alder)), Math.max(...heste.map((h) => h.alder))],
    femAar: { aar: traenerAar.length, sejre: traenerAar.reduce((s, x) => s + x.sejre, 0), starter: traenerAar.reduce((s, x) => s + x.starter, 0) },
    traenerAar: [...traenerAar].reverse(), // ældste først til søjlerne
    kuskAar: data.kuskStatistik.filter((s) => s.starter > 0).reverse(),
    fb: (data.facebook ?? []).slice(0, 5),
  };
}

// ---------- fælles dele ----------

const maerke = (cls = '') => `<span class="maerke ${cls}"><i aria-hidden="true"></i>Team <b>Mønster</b></span>`;

const top = (sti) => `
<header class="top">
  <div class="top__inner wrap">
    <a class="top__logo" href="${R || './'}" aria-label="${SITE.navn} – til forsiden">${maerke()}</a>
    <nav class="top__nav" aria-label="Primær navigation">
      ${[...NAV, ['kontakt/', 'Kontakt']].map(([href, navn]) => `<a href="${R}${href}"${sti.startsWith(href) ? ' aria-current="page"' : ''}>${navn}</a>`).join('\n      ')}
    </nav>
    <a class="top__tlf" href="tel:${tlfLink}"><span class="sr">Ring til ${SITE.fornavn}: </span>${tlfKort}</a>
    <button class="burger" type="button" aria-haspopup="dialog" aria-controls="menu" commandfor="menu" command="show-modal"><span>Menu</span><i aria-hidden="true"></i></button>
  </div>
</header>
<dialog class="menu" id="menu" aria-label="Menu">
  <div class="menu__top wrap">
    ${maerke()}
    <button class="burger burger--luk" type="button" data-luk commandfor="menu" command="close"><span>Luk</span><i aria-hidden="true"></i></button>
  </div>
  <nav class="menu__nav wrap" aria-label="Menu">
    <ul>
      ${[['', 'Forside'], ...NAV, ['kontakt/', 'Kontakt']].map(([href, navn], i) => `<li style="--i:${i}"><a href="${R}${href || (R ? '' : './')}"${(href ? sti.startsWith(href) : sti === '') ? ' aria-current="page"' : ''}>${navn}</a></li>`).join('\n      ')}
    </ul>
  </nav>
  <div class="menu__bund wrap">
    <a href="tel:${tlfLink}">${SITE.telefon}</a>
    ${SITE.facebook ? `<a href="${SITE.facebook}" target="_blank" rel="noopener">Team Mønster på Facebook${nyFane}</a>` : ''}
  </div>
</dialog>`;

const kontaktbaand = () => `
<section class="cta">
  <div class="wrap cta__inner">
    <div>
      ${etiket('Kontakt', ' data-vis')}
      <h2 data-vis style="--i:1">Skal din hest i træning hos Team Mønster?</h2>
      <p data-vis style="--i:2">Ring eller send en sms til ${SITE.fornavn} – eller skriv til stalden på Facebook.</p>
    </div>
    <div class="cta__valg" data-vis style="--i:3">
      <a class="cta__tlf" href="tel:${tlfLink}"><span class="sr">Ring til ${SITE.fornavn}: </span>${tlfKort}</a>
      <p class="valg"><a class="knap knap--hvid" href="sms:${tlfLink}">Send en sms ${pil}</a> ${link('kontakt/', 'Alle kontaktoplysninger', 'link--lys')}</p>
    </div>
  </div>
</section>`;

const bund = (o) => `
<footer class="bund">
  <div class="wrap bund__gitter">
    <div class="bund__brand">
      ${maerke('maerke--stor')}
      <p>Travtræner og kusk ${SITE.person} med Skive Trav som hjemmebane. Selvstændig siden 1. maj 1993 – i dag fra gården i ${SITE.sted}.</p>
    </div>
    <nav aria-label="Sider">
      <h2>Sider</h2>
      <ul>
        ${[...NAV, ['kontakt/', 'Kontakt']].map(([href, navn]) => `<li><a href="${R}${href}">${navn}</a></li>`).join('')}
      </ul>
    </nav>
    <div>
      <h2>Kontakt</h2>
      <ul>
        <li><a href="tel:${tlfLink}">${SITE.telefon}</a></li>
        <li><address>${SITE.gade}, ${SITE.sted}<br>${SITE.postnr} ${SITE.by}</address></li>
      </ul>
    </div>
    <div>
      <h2>Følg med</h2>
      <ul>
        ${SITE.facebook ? `<li>${ekstern(SITE.facebook, 'Facebook', '')}</li>` : ''}
        ${SITE.instagram ? `<li>${ekstern(SITE.instagram, 'Instagram', '')}</li>` : ''}
        <li>${ekstern(SITE.travinfo, 'Travinfo', '')}</li>
        <li>${ekstern(SITE.hjemmebane, 'Skive Trav', '')}</li>
      </ul>
    </div>
  </div>
  <div class="wrap bund__linje">
    <p>Resultater og statistik: Dansk Hestevæddeløb · opdateret ${o.opdateret}</p>
    <p>Fotos: Team Mønsters Facebook-side, travet.dk, Gormfoto og Hesselborg Foto</p>
    <p>© ${new Date().getFullYear()} ${SITE.navn} · ${SITE.firma} · CVR ${SITE.cvr}</p>
  </div>
</footer>`;

const organisation = () => ({
  '@type': ['LocalBusiness', 'SportsOrganization'],
  '@id': `${SITE.url}/#stald`,
  name: SITE.navn,
  description: 'Travtræning og kusk med Skive Trav som hjemmebane: træning af løbsheste og tilkøring af ungheste fra gården i Hem ved Skive.',
  url: `${SITE.url}/`,
  telephone: tlfLink,
  image: `${SITE.url}/assets/img/delebillede.jpg`,
  sport: 'Travsport',
  foundingDate: SITE.selvstaendig,
  address: { '@type': 'PostalAddress', streetAddress: SITE.gade, postalCode: SITE.postnr, addressLocality: SITE.by, addressCountry: 'DK' },
  founder: { '@id': `${SITE.url}/#person` },
  sameAs: [SITE.travinfo, SITE.facebook, SITE.instagram].filter(Boolean),
});
const person = () => ({
  '@type': 'Person',
  '@id': `${SITE.url}/#person`,
  name: SITE.person,
  jobTitle: 'Professionel travtræner og kusk',
  url: `${SITE.url}/om-knud/`,
  image: `${SITE.url}/assets/img/jubel-800.webp`,
  worksFor: { '@id': `${SITE.url}/#stald` },
  award: ['Dansk mester for professionelle travtrænere 2008 og 2026', 'Europamester for professionelle travkuske 2014'],
  sameAs: [SITE.travinfo],
});

function layout({ sti, titel, beskrivelse, indhold, o, klasse = '', noindex = false }) {
  const kanonisk = `${SITE.url}/${sti}`;
  const sideNavn = [...NAV, ['kontakt/', 'Kontakt']].find(([href]) => href === sti)?.[1];
  const graf = [
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: `${SITE.url}/`, name: SITE.navn, inLanguage: 'da-DK' },
    organisation(),
    person(),
    ...(sideNavn ? [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Forside', item: `${SITE.url}/` }, { '@type': 'ListItem', position: 2, name: sideNavn, item: kanonisk }] }] : []),
  ];
  return `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titel)}</title>
<meta name="description" content="${esc(beskrivelse)}">
${noindex ? '<meta name="robots" content="noindex">' : '<link rel="canonical" href="' + kanonisk + '">'}
<meta name="theme-color" content="#ffffff">
<meta property="og:type" content="website">
<meta property="og:locale" content="da_DK">
<meta property="og:site_name" content="${SITE.navn}">
<meta property="og:title" content="${esc(titel)}">
<meta property="og:description" content="${esc(beskrivelse)}">
<meta property="og:url" content="${kanonisk}">
<meta property="og:image" content="${SITE.url}/assets/img/delebillede.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Team Mønster – travtræner og kusk Knud Mønster, Skive">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" sizes="48x48" href="${R}assets/img/ikon-48.png">
<link rel="apple-touch-icon" href="${R}assets/img/ikon-180.png">
<link rel="preload" href="${R}assets/fonts/saira-800.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${R}assets/fonts/hanken.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${R}assets/css/site.css?v=${V}">
<script>document.documentElement.classList.add('js');setTimeout(function(){window.__klar||document.documentElement.classList.remove('js')},2500)</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graf }).replace(/</g, '\\u003c')}</script>
</head>
<body class="${klasse}">
<a class="skip" href="#indhold">Spring til indhold</a>
${top(sti)}
<main id="indhold">
${indhold}
</main>
${bund(o)}
<script src="${R}assets/js/site.js?v=${V}" defer></script>
</body>
</html>
`;
}

// Sidehoved på undersider: titel og nøgletal til venstre, et skråt beskåret foto til højre (som på forsiden).
const sidehoved = ({ sti, h1, tekst, figur, pos = '50% 40%', chips = [] }) => `
<section class="sidehoved">
  <div class="wrap sidehoved__gitter">
    <div class="sidehoved__tekst">
      <nav class="sti" aria-label="Brødkrumme"><a href="${R}">Forside</a><span aria-hidden="true">/</span><span aria-current="page">${sti}</span></nav>
      <h1>${h1}</h1>
      <p class="indled">${tekst}</p>
      ${chips.length ? `<ul class="chips">${chips.map(([tal, tekst]) => `<li><b>${tal}</b> ${tekst}</li>`).join('')}</ul>` : ''}
    </div>
    <figure class="skraa sidehoved__foto" style="--pos:${pos}">${billede(figur[0], figur[1], { sizes: '(min-width: 901px) 46vw, 100vw', lazy: false })}</figure>
  </div>
</section>`;

/**
 * Skematisk Danmarkskort. `punkter` er [{ kode, navn, antal?, sejre? }]: med antal tegnes en boble, hvis størrelse følger
 * antal starter, med antal sejre i; uden antal en lille prik. Hjemmebanen får en ring.
 */
function danmarkskort(punkter, beskrivelse) {
  const { bredde, hoejde, lon0, lat1, kx, ky, sti } = KORT;
  const max = Math.max(1, ...punkter.map((p) => p.antal ?? 0));
  const vist = punkter.filter((p) => BANE_POS[p.kode]).map((p) => {
    const [lon, lat] = BANE_POS[p.kode];
    const r = p.antal ? +(8 + 6 * Math.sqrt(p.antal / max)).toFixed(1) : 7;
    return { ...p, x: +((lon - lon0) * kx).toFixed(1), y: +((lat1 - lat) * ky).toFixed(1), r, ydre: p.kode === HJEM ? r + (p.antal ? 4 : 6) : r };
  });
  const hjem = vist.find((p) => p.kode === HJEM);

  // Navnet sættes dér, hvor det bedst holder sig inden for kortet og fri af andre baner.
  const navn = (p) => {
    const w = p.navn.length * 6.4, m = p.ydre + 6;
    const steder = [['start', p.x + m, p.y + 3.7], ['middle', p.x, p.y + m + 9], ['end', p.x - m, p.y + 3.7], ['end', Math.min(p.x + p.ydre, bredde - 4), p.y + m + 9], ['middle', p.x, p.y - m - 2]];
    const straf = ([anker, x, y]) => { // 100 for at stikke ud over kortet, 10 for at ramme en anden bane
      const x0 = (anker === 'start' ? x : anker === 'end' ? x - w : x - w / 2) - 3, x1 = x0 + w + 6, y0 = y - 12, y1 = y + 4;
      const inde = (px, py, luft = 0) => px > x0 - luft && px < x1 + luft && py > y0 - luft && py < y1 + luft;
      const udenfor = x0 < 0 || x1 > bredde || y0 < 0 || y1 > hoejde;
      const rammer = vist.some((q) => q !== p && inde(q.x, q.y, q.ydre));
      return (udenfor ? 100 : 0) + (rammer ? 10 : 0);
    };
    // Hjemmebanen helst til venstre. Ved lige straf vinder det første sted på listen.
    const [anker, x, y] = (p === hjem ? [steder[2], ...steder] : steder).map((sted, i) => [straf(sted) + i / 100, sted]).sort((a, b) => a[0] - b[0])[0][1];
    return `<text class="kort__navn" x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" text-anchor="${anker}">${esc(p.navn)}</text>`;
  };

  return `<svg class="kort__svg" viewBox="0 0 ${bredde} ${hoejde}" role="img" aria-label="${esc(beskrivelse)}">
        <path class="kort__land" d="${sti}"/>${vist.map((p, i) => `
        <g class="kort__bane" style="--n:${i}">${p === hjem ? `<circle class="kort__ring" cx="${p.x}" cy="${p.y}" r="${p.ydre}"/>` : ''}<circle class="kort__prik" cx="${p.x}" cy="${p.y}" r="${p.r}"/>${p.antal ? `<text class="kort__tal" x="${p.x}" y="${+(p.y + 3.3).toFixed(1)}" text-anchor="middle">${p.sejre ?? p.antal}</text>` : ''}${navn(p)}</g>`).join('')}
      </svg>`;
}

// ---------- genbrugte blokke ----------

const plKlasse = (p) => (p === '1' ? ' pl--1' : /^[23]$/.test(p) ? ' pl--23' : p === 'd' ? ' pl--tekst' : '');

const resultatRaekke = (r) => `
      <li class="res__r">
        <span class="pl${plKlasse(r.placering)}"><span class="sr">Placering: </span>${plac(r.placering)}</span>
        <span class="res__hest">${esc(r.hest)}</span>
        <span class="res__info"><time datetime="${r.dato}">${kortDato(r.dato)}</time> · ${esc(bane(r.bane))} · ${r.loeb}. løb · ${nf(r.distance)}&nbsp;m</span>
        <span class="res__tid">${tid(r.tid) || '<span aria-hidden="true">–</span><span class="sr">ingen tid</span>'}</span>
        <span class="res__kr">${r.praemie ? kr(r.praemie) : '<span aria-hidden="true">–</span><span class="sr">ingen præmie</span>'}</span>
      </li>`;
const resultatliste = (liste) => `<ol class="res">${liste.map(resultatRaekke).join('')}
    </ol>`;

const kommendeListe = (liste) => `<ul class="kom">${liste.map((k) => `
      <li>
        <time datetime="${k.dato}"><b>${d(k.dato).getUTCDate()}</b>${kortDato(k.dato).replace(/^\d+\.\s*/, '')}</time>
        <span class="kom__hest">${esc(k.hest)}</span>
        <span class="kom__bane">${ugedag(k.dato)} · ${esc(bane(k.bane))} · ${k.loeb}. løb</span>
        ${k.kusk ? `<span class="kom__kusk"><span class="sr">Kusk: </span>${esc(kuskVist(k.kusk))}</span>` : ''}
      </li>`).join('')}
    </ul>`;
const ingenStarter = () => `<p class="tom">Ingen af staldens heste er startmeldt lige nu. Nye startlister kommer på ${ekstern(SITE.travinfo, 'Travinfo')}.</p>`;

const omHest = (h) => `${h.alder}-årig ${esc(h.koen.toLowerCase())}`;
const afstamning = (h) => (h.far ? `e. ${esc(h.far)} – ${esc(h.mor)}` : '');
const sejre = (h) => Number(h.placeringer.split('-')[0]) || 0;

// Profilkort for de mest vindende heste.
const profilkort = (h, i) => `
      <a class="profil" href="https://travinfo.dk/horse_tabs/${h.id}" target="_blank" rel="noopener" data-vis style="--i:${i % 6}">
        <span class="profil__nr" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(h.navn)}</h3>
        <p>${omHest(h)}${afstamning(h) ? `<br>${afstamning(h)}` : ''}</p>
        <p class="profil__kr">${kr(h.praemier)}<small>indkørt</small></p>
        <dl>
          <div><dt>Starter</dt><dd>${h.starter}</dd></div>
          <div><dt>Sejre</dt><dd>${sejre(h)}</dd></div>
          <div><dt>Rekord</dt><dd>${bedsteRekord(h.rekord) || '–'}</dd></div>
        </dl>
        <span class="profil__ud">Travinfo ${ud}${nyFane}</span>
      </a>`;

// Hesterække til den fulde træningsliste.
const hesteraekke = (h, i) => `
      <li class="hest" data-vis style="--i:${i % 6}">
        <div class="hest__navn">
          <h3><a href="https://travinfo.dk/horse_tabs/${h.id}" target="_blank" rel="noopener">${esc(h.navn)}${nyFane}</a></h3>
          <p>${omHest(h)}${afstamning(h) ? ` · ${afstamning(h)}` : ''}</p>
        </div>
        ${h.starter ? `<dl class="hest__tal">
          <div><dt>Starter</dt><dd>${h.starter} <small>${esc(h.placeringer)}</small></dd></div>
          <div><dt>Indkørt</dt><dd>${kr(h.praemier)}</dd></div>
          <div><dt>Rekord</dt><dd>${bedsteRekord(h.rekord) || '–'}</dd></div>
        </dl>` : '<p class="hest__tal hest__tal--tom">Ustartet</p>'}
      </li>`;
const hestegruppe = (titel, heste) => (heste.length ? `
    <div class="gruppe">
      <h2 class="gruppe__titel" data-vis>${titel} <span>${heste.length}</span></h2>
      <ul class="hesteliste">${heste.map(hesteraekke).join('')}
      </ul>
    </div>` : '');

const ydelser = (o) => `
    <ul class="ydelser">
      <li data-vis>
        <span class="ydelser__nr" aria-hidden="true">01</span>
        <h3>Træning af løbsheste</h3>
        <p>Stalden træner og starter løbsheste på baner over hele landet. I ${o.saeson.aar} har staldens heste været til start i ${dkListe(o.banerIAar)}.</p>
      </li>
      <li data-vis style="--i:1">
        <span class="ydelser__nr" aria-hidden="true">02</span>
        <h3>Tilkøring af ungheste</h3>
        <p>Ungheste køres til og bygges op mod deres første starter – med ridetræning som en fast del af programmet.${o.ungheste.length > 1 ? ` Lige nu står ${o.ungheste.length} åringer og 2-årige på træningslisten.` : ''}</p>
      </li>
      <li data-vis style="--i:2">
        <span class="ydelser__nr" aria-hidden="true">03</span>
        <h3>Træner og kusk</h3>
        <p>${SITE.fornavn} kører selv mange af staldens heste – i ${o.kusk.aar} er det blevet til ${o.kusk.starter} starter og ${o.kusk.sejre} sejre som kusk. Michelle rider og kører også for stalden.</p>
      </li>
    </ul>`;

// Billeder fra hverdagen (Team Mønsters Facebook-side og travet.dk). Forsiden viser et udvalg, Stalden det hele.
const FORSIDEFOTOS = [
  ['pov-sti', 'Udsigt mellem hestens ører ned ad en sandvej mellem markerne'],
  ['med-hest', `${SITE.person} med en af staldens heste`],
  ['pov-mark', 'Hestens hoved og manke på vej gennem en mark i solskin'],
];
const GALLERI = [
  ['pov-sti', 'Udsigt mellem hestens ører ned ad en sandvej mellem markerne'],
  ['med-hest', `${SITE.person} med en af staldens heste`],
  ['fold', 'Heste på fold under en stor himmel'],
  ['bane-hest', 'Hest og kusk på træningsbanen en sommerdag'],
  ['pov-mark', 'Hestens hoved og manke på vej gennem en mark i solskin'],
  ['vindercirkel', `${SITE.person} i sulkyen i vindercirklen`],
  ['pov-bane', 'Set fra sulkyen på træningsbanen'],
  ['michelle-monte', `${SITE.michelle.navn} i monté på Tour Eiffel`],
];
const galleri = (fotos = GALLERI, cls = '') => `<ul class="galleri${cls}">${fotos.map(([navn, alt], i) => `
      <li data-vis style="--i:${i % 4}">${billede(navn, alt, { sizes: '(min-width: 1000px) 30vw, 50vw' })}</li>`).join('')}
    </ul>`;

const sejreTekst = (n) => `${n} ${n === 1 ? 'sejr' : 'sejre'}`;

/** Hjemmebanen og – hvis det er en anden – banen med flest sejre i år. */
const baneTekst = (o) => {
  const hjem = o.banetal.find((b) => b.kode === HJEM), top = o.banetal[0];
  if (!hjem) return 'Skive Trav er hjemmebanen.';
  return top !== hjem && top.sejre > hjem.sejre
    ? `Skive Trav er hjemmebanen med ${hjem.antal} starter i ${o.saeson.aar} – men flest sejre kommer i ${top.navn}: ${sejreTekst(top.sejre)} på ${top.antal} starter.`
    : `Skive Trav er hjemmebanen – og her kommer også flest sejre: ${sejreTekst(hjem.sejre)} på ${hjem.antal} starter i ${o.saeson.aar}.`;
};

const banebjaelker = (banetal) => {
  const max = Math.max(1, ...banetal.map((b) => b.sejre));
  return `<ul class="baner">${banetal.map((b) => `
        <li style="--w:${Math.round((b.sejre / max) * 100)}%"><span>${esc(b.navn)}</span><em>${b.antal} starter · ${Math.round((b.sejre / b.antal) * 100)} %</em><b>${sejreTekst(b.sejre)}</b></li>`).join('')}
      </ul>`;
};

const statTabel = (titel, raekker) => `
      <div class="tabelboks" role="region" aria-label="${titel}" tabindex="0">
        <table class="tabel">
          <caption>${titel}</caption>
          <thead><tr><th scope="col">År</th><th scope="col">Starter</th><th scope="col">1.–2.–3.</th><th scope="col">Sejrs&shy;procent</th><th scope="col">Præmie&shy;sum, kr.</th></tr></thead>
          <tbody>${raekker.filter((s) => s.starter > 0).map((s) => `
            <tr><th scope="row">${s.aar}</th><td>${s.starter}</td><td>${s.sejre}–${s.toer}–${s.treer}</td><td>${s.procent}&nbsp;%</td><td>${nf(s.praemier)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>`;

const formkurve = (liste) => `<ol class="form" aria-label="Placeringer i de seneste ${liste.length} starter, nyeste først">${liste.map((r) => `<li class="pl${plKlasse(r.placering)}"><span class="sr">${esc(r.hest)}: </span>${plac(r.placering)}</li>`).join('')}</ol>`;

// Sejre pr. sæson som søjler (ældste til venstre, indeværende sæson rød)
const soejler = (titel, aar) => {
  const max = Math.max(1, ...aar.map((s) => s.sejre));
  return `<figure class="soejler" data-vis>
        <figcaption>${titel}</figcaption>
        <ol aria-label="${titel}: ${aar.map((s) => `${s.aar}: ${s.sejre}`).join(', ')}">${aar.map((s) => `<li style="--h:${Math.max(4, Math.round((s.sejre / max) * 100))}%"><b>${s.sejre}</b><i aria-hidden="true"></i><span>${s.aar}</span></li>`).join('')}</ol>
      </figure>`;
};

/** Lang tekst forkortes ved et ordskifte. */
const kortTekst = (s, max = 240) => (s.length <= max ? s : `${s.slice(0, s.lastIndexOf(' ', max))}…`);

// De seneste Facebook-opslag (hentet af build.mjs) som kort. Vises kun, når der er opslag.
const fbKort = (liste) => `
    <ul class="fbkort" aria-label="Seneste opslag fra Facebook">${liste.map((p, i) => `
      <li data-vis style="--i:${i}">
        <a href="${esc(p.link)}" target="_blank" rel="noopener">
          ${p.billede ? `<img src="${R}assets/fb/${p.billede}" alt="" loading="lazy" decoding="async">` : ''}
          <time datetime="${p.dato}">${langDato(p.dato)}</time>
          ${p.tekst ? `<p>${esc(kortTekst(p.tekst))}</p>` : ''}
          <span class="fbkort__mere">Se opslaget på Facebook ${ud}</span>${nyFane}
        </a>
      </li>`).join('')}
    </ul>`;

// Fast kort til Facebook-siden – ingen indlejring fra Facebook, så ingen cookies og intet banner
const FB_IKON = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M13.4 21v-7.5h2.5l.4-2.9h-2.9V8.8c0-.8.2-1.4 1.4-1.4h1.6V4.8a20 20 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2H7.8v2.9h2.5V21z" fill="currentColor"/></svg>';
const IG_IKON = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17" cy="7" r="1.2" fill="currentColor"/></svg>';
const social = (href, ikon, navn, adresse, foto) => `
      <a class="social" href="${href}" target="_blank" rel="noopener">
        ${billede(foto, '', { sizes: '(min-width: 901px) 30vw, 92vw' })}
        <span class="social__ikon">${ikon}</span>
        <span><b>${navn}</b><small>${adresse}</small></span>
        ${ud}${nyFane}
      </a>`;

const harFoelg = (fb = []) => Boolean(SITE.facebook || SITE.instagram || fb.length);
const foelg = (fb = []) => (harFoelg(fb) ? `
<section class="sek">${foelgIndhold(fb)}
</section>` : '');
const foelgIndhold = (fb = []) => `
  <div class="wrap foelg">
    <div>
      ${etiket('Følg med', ' data-vis')}
      <h2 data-vis style="--i:1">Startdage og <em>sejre.</em></h2>
      <p data-vis style="--i:2">Team Mønster fortæller om staldens starter før løbsdagene og deler billeder og videoer fra hverdagen på ${[SITE.facebook && 'Facebook', SITE.instagram && 'Instagram'].filter(Boolean).join(' og ')}${fb.length ? '. Her er de seneste opslag' : ''}.</p>
    </div>
    <div class="sociale" data-vis style="--i:2">${SITE.facebook ? social(SITE.facebook, FB_IKON, 'Team Mønster på Facebook', SITE.facebook.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '').replace('/', '/<wbr>'), 'pov-mark') : ''}${SITE.instagram ? social(SITE.instagram, IG_IKON, 'Instagram', '@' + SITE.instagram.replace(/\/$/, '').split('/').pop(), 'fold') : ''}
    </div>
  </div>
  ${fb.length ? `<div class="wrap">${fbKort(fb)}</div>` : ''}`;

// Medaljebanen: alle DM-medaljer fra 1999 til i år på en tidsakse, plus Derbyet og EM-guldet.
const medaljebane = (idag) => {
  const fra = 1999, til = Math.max(Number(idag.slice(0, 4)), DM.at(-1)[0]);
  const x = (aar) => (2 + ((aar - fra) * 96) / (til - fra)).toFixed(1);
  const NAVN = { g: 'Guld', s: 'Sølv', b: 'Bronze' };
  const antal = (k) => DM.filter(([, m]) => m === k).length;
  const aarstal = [fra, ...Array.from({ length: Math.floor((til - fra) / 5) }, (_, i) => fra + 5 * (i + 1)).filter((a) => til - a > 2), til];
  return `
    <div class="medaljer" data-vis>
      <div class="medaljer__hoved">
        <h3>DM for professionelle travtrænere, ${fra}–${til}</h3>
        <p class="medaljer__forklaring" aria-hidden="true"><span class="m-g">Guld</span><span class="m-s">Sølv</span><span class="m-b">Bronze</span></p>
      </div>
      <p class="medaljer__swipe" aria-hidden="true">Swipe for at se hele banen →</p>
      <div class="medaljer__rul" tabindex="0" role="region" aria-label="Medaljebanen – kan rulles sidelæns">
        <div class="medaljer__bane" role="img" aria-label="DM-medaljer: ${DM.map(([aar, m]) => `${NAVN[m].toLowerCase()} ${aar}`).join(', ')}. Desuden Dansk Trav Derby 2012 og europamester for kuske 2014.">
          ${aarstal.map((a) => `<span class="medaljer__aar" style="left:${x(a)}%">${a}</span>`).join('')}
          ${DM.map(([aar, m], n) => `<i class="medalje medalje--${m}" style="left:${x(aar)}%;--n:${n}" title="${NAVN[m]} ${aar}"></i>`).join('')}
          ${MAERKER.map(([aar, tekst, k]) => `<span class="medaljer__maerke medaljer__maerke--${k}" style="left:${x(aar)}%">${tekst} ${aar}</span>`).join('')}
        </div>
      </div>
      <dl class="medaljer__tal">
        <div><dt>Guld</dt><dd data-tael="${antal('g')}">${antal('g')}</dd></div>
        <div><dt>Sølv</dt><dd data-tael="${antal('s')}">${antal('s')}</dd></div>
        <div><dt>Bronze</dt><dd data-tael="${antal('b')}">${antal('b')}</dd></div>
        <div><dt>EM for kuske</dt><dd>Guld 2014</dd></div>
      </dl>
    </div>`;
};

// Michelle: datteren, montérytter og kusk (licens 47327). Tallene hentes fra Dansk Hestevæddeløb.
// Fem gange Årets Montérytter, i sadlen som toårig, fuldtid i stalden efter 10. klasse: travet.dk 15.2.2026.
const michelleSektion = (o, cls = '') => `
<section class="sek${cls}">
  <div class="wrap michelle">
    <figure class="michelle__foto" data-vis>${billede('michelle-hest', `${SITE.michelle.navn} i de rød-hvide farver på Tour Eiffel`, { sizes: '(min-width: 901px) 40vw, 92vw' })}</figure>
    <div>
      ${etiket('Montérytter og kusk · Team Mønster', ' data-vis')}
      <h2 data-vis style="--i:1">Michelle <em>Mønster.</em></h2>
      <p class="pokal" data-vis style="--i:2"><b>5×</b><span>Årets Montérytter ved Hestesportens Galla</span></p>
      <p class="indled" data-vis style="--i:3">${SITE.fornavn}s datter sad i sadlen allerede som toårig og gik efter 10. klasse fuldtid ind i familiens stald. I dag rider og kører hun staldens heste i både monté og sulky.</p>${o.michelle ? `
      <dl class="mini-tal" data-vis style="--i:4">
        <div><dt>Sejre i ${o.michelle.aar}</dt><dd data-tael="${o.michelle.sejre}">${o.michelle.sejre}</dd></div>
        <div><dt>Starter</dt><dd data-tael="${o.michelle.starter}">${o.michelle.starter}</dd></div>
        <div><dt>Sejrsprocent</dt><dd>${o.michelle.procent}&nbsp;%</dd></div>
      </dl>` : ''}
      <p class="valg" data-vis style="--i:5">${ekstern(SITE.michelle.travinfo, 'Michelles profil på Travinfo')}</p>
    </div>
  </div>
</section>`;

// ---------- sider ----------

const forside = (o, idag) => `
<section class="hero">
  <div class="wrap hero__gitter">
    <div class="hero__tekst">
      ${etiket('Travtræner og kusk · Skive Trav')}
      <h1><span class="sr">${SITE.person} – </span>Team <span>Mønster</span></h1>
      <p class="hero__indled">${SITE.person} har været selvstændig travtræner i Skive siden 1. maj 1993 – i dag fra familiens gård i ${SITE.sted}. Dansk mester for professionelle travtrænere i 2008 og 2026 og europamester for kuske i 2014.</p>
      <p class="valg">${knap('kontakt/', `Kontakt ${SITE.fornavn}`)} ${knap('heste/', 'Se hestene', 'knap--kant')}</p>${o.kommende[0] ? `
      <p class="naeste"><i aria-hidden="true"></i><span>Næste start</span><b>${esc(o.kommende[0].hest)}</b>${ugedag(o.kommende[0].dato)} ${kortDato(o.kommende[0].dato)} · ${esc(bane(o.kommende[0].bane))}${o.kommende[0].kusk ? ` · ${esc(kuskVist(o.kommende[0].kusk))}` : ''}</p>` : ''}
    </div>
    <figure class="skraa hero__foto">
      ${billede('tribune', 'Team Mønster i de rød-hvide farver foran en fyldt tribune', { sizes: '(min-width: 901px) 48vw, 100vw', lazy: false })}
      <p class="hero__mester"><b>DM-guld</b>2008 og 2026</p>
    </figure>
  </div>
</section>

<section class="tal" aria-label="Stalden i tal">
  <div class="wrap">
    <dl>
      <div><dt>heste i træning</dt><dd data-tael="${o.heste.length}">${o.heste.length}</dd></div>
      <div><dt>sejre som træner i ${o.saeson.aar}</dt><dd data-tael="${o.saeson.sejre}">${o.saeson.sejre}</dd></div>
      <div><dt>sejre som kusk i ${o.kusk.aar}</dt><dd data-tael="${o.kusk.sejre}">${o.kusk.sejre}</dd></div>
      <div><dt>år som selvstændig træner</dt><dd data-tael="${o.aarSelvstaendig}">${o.aarSelvstaendig}</dd></div>
    </dl>
  </div>
</section>

<section class="sek sek--kalk">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Resultater', ' data-vis')}
        <h2 data-vis style="--i:1">Fra <em>banen.</em></h2>
      </div>
      <p data-vis style="--i:2">Staldens næste starter og seneste resultater – hentet fra Dansk Hestevæddeløb hver dag, senest ${o.opdateret}.</p>
    </div>
    <div class="resgitter">
      <div class="panel" data-vis>
        <h3 class="mini">Kommende starter</h3>
        ${o.kommende.length ? kommendeListe(o.kommende.slice(0, 5)) : ingenStarter()}
        <h3 class="mini mini--luft">Formkurve</h3>
        ${formkurve(o.seneste)}
      </div>
      <div class="panel" data-vis style="--i:1">
        <h3 class="mini">Seneste starter</h3>
        ${resultatliste(o.seneste.slice(0, 6))}
        <p class="valg">${link('resultater/', 'Alle resultater og statistik')}</p>
      </div>
    </div>
  </div>
</section>

<section class="sek sek--sort">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Mesterskaberne', ' data-vis')}
        <h2 data-vis style="--i:1">${stort(talord(DM.length))} DM-<em>medaljer.</em></h2>
      </div>
      <p data-vis style="--i:2">Guld i 2008 og igen i 2026 – 18 år senere. Derimellem seks sølv- og to bronzemedaljer, Derby-sejren med Repay Merci og EM-guldet for kuske.</p>
    </div>
    ${medaljebane(idag)}
    <p class="valg" data-vis>${link('om-knud/', 'Karrieren og historien', 'link--lys')}</p>
  </div>
</section>
${michelleSektion(o)}

<section class="sek sek--kalk">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Hestene', ' data-vis')}
        <h2 data-vis style="--i:1">Holdet <em>lige nu.</em></h2>
      </div>
      <p data-vis style="--i:2">${o.heste.length} heste står på træningslisten${o.ungheste.length > 1 ? ` – ${o.heste.length - o.ungheste.length} i løbsalderen og ${o.ungheste.length} ungheste på vej` : ''}. Her er de mest vindende.</p>
    </div>
    <div class="profiler">${[...o.heste].sort((a, b) => sejre(b) - sejre(a) || b.praemier - a.praemier).slice(0, 6).map(profilkort).join('')}
    </div>
    <p class="midt" data-vis>${knap('heste/', `Hele træningslisten (${o.heste.length})`)}</p>
  </div>
</section>

<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Stalden', ' data-vis')}
        <h2 data-vis style="--i:1">Hverdagen i <em>${SITE.sted}.</em></h2>
      </div>
      <p data-vis style="--i:2">Ridetræning er en fast del af hestenes program, og mange timer går på gårdens egen sandbane.</p>
    </div>
    ${galleri(FORSIDEFOTOS, ' galleri--tre')}
    <p class="valg" data-vis>${link('stalden/', 'Mere om stalden')}</p>
  </div>
</section>

<section class="sek sek--kalk">
  <div class="wrap duo">
    <div>
      ${etiket('Banerne', ' data-vis')}
      <h2 data-vis style="--i:1">Hjemme i Skive – <em>ude i hele landet.</em></h2>
      <p class="indled" data-vis style="--i:2">${baneTekst(o)}</p>
      <div data-vis style="--i:3">${banebjaelker(o.sejrsbaner)}</div>
    </div>
    <figure class="kort" data-vis style="--i:2">
      ${danmarkskort(o.sejrsbaner, `Danmarkskort med staldens sejre og starter pr. bane i ${o.saeson.aar}: ${o.sejrsbaner.map((b) => `${b.navn} ${sejreTekst(b.sejre)} på ${b.antal} starter`).join(', ')}.`)}
      <figcaption>Sejre pr. dansk bane i ${o.saeson.aar}. Boblens størrelse viser antal starter, og ringen markerer hjemmebanen.</figcaption>
    </figure>
  </div>
</section>
${foelg(o.fb)}
${kontaktbaand()}`;

// Karrieren i årstal. Kilder: travet.dk 5.9.2026 (DM 2008 og 2026, EM 2014, VM 2015, læreårene), travservice.dk 22.10.2017,
// thof.dk (Derbyet 2012 med Knud som kusk), travet.dk 1.10.2024 (Repay Mercis tal og sejre i 2012).
const KARRIERE = [
  { aar: '1993', titel: 'Egen stald i Skive', tekst: 'Efter læreårene hos Vagn "Futter" Lønborg, Stanley Dancer i USA, Jørn Laursen, Birger Jørgensen og Seppo Kukkonen åbner Knud sin egen stald den 1. maj 1993.' },
  { aar: '2008', titel: 'Dansk mester', tekst: 'Første titel i DM for professionelle travtrænere – med 45 point foran Ken Ecce.', guld: true },
  { aar: '2012', titel: 'Dansk Trav Derby', tekst: 'Egentrænede Repay Merci vinder Derbyet med Knud i sulkyen – og samme år Jydsk 4-årings Grand Prix og Grand Circle 4-års Championat.', fakta: [['113', 'starter'], ['18', 'sejre'], ['3,8 mio.', 'kr. indkørt']] },
  { aar: '2014', titel: 'Europamester for kuske', tekst: 'På Solänget og Umåker i Sverige: 75 point foran Tony Le Beller og Björn Goop. Knud er blot den anden dansker, der vinder EM for professionelle kuske.', guld: true },
  { aar: '2015', titel: 'VM for kuske', tekst: 'EM-titlen giver adgang til VM for kuske, der det år køres i Australien.' },
  { aar: '2026', titel: 'Dansk mester igen', tekst: '18 år efter den første titel: 51 point og tre afdelingssejre – den sidste med Cardolan Byd i finalen i Aalborg.', guld: true },
];

const tidslinje = () => `
<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Karrieren', ' data-vis')}
        <h2 data-vis style="--i:1">Seks år, der <em>tæller.</em></h2>
      </div>
      <p data-vis style="--i:2">Udvalgte højdepunkter fra mere end tre årtier som træner og kusk.</p>
    </div>
    <ol class="milepaele">${KARRIERE.map((p, i) => `
      <li class="milepael${p.guld ? ' milepael--guld' : ''}" data-vis style="--i:${i % 3}">
        <b class="milepael__aar">${p.aar}</b>
        <h3>${p.titel}</h3>
        <p>${p.tekst}</p>${p.fakta ? `
        <dl>${p.fakta.map(([tal, tekst]) => `<div><dt>${tekst}</dt><dd>${tal}</dd></div>`).join('')}</dl>` : ''}
      </li>`).join('')}
    </ol>
  </div>
</section>`;

const omKnud = (o, data, idag) => `
${sidehoved({
  sti: 'Om Knud',
  h1: 'Knud <span>Mønster</span>',
  tekst: `Travtræner og kusk med ${esc(data.traener.licens)}-licens. Født i ${data.traener.foedt}, selvstændig i Skive siden 1. maj 1993 – og dansk mester for professionelle travtrænere i 2008 og 2026.`,
  figur: ['jubel', `${SITE.person} jubler i sulkyen`],
  pos: '55% 30%',
  chips: [[o.aarSelvstaendig, 'år som selvstændig'], ['2 ×', 'DM-guld'], ['EM', 'for kuske 2014']],
})}

<section class="sek">
  <div class="wrap artikel">
    <aside class="fakta" data-vis>
      <figure class="fakta__foto">${billede('portraet', `${SITE.person} i løbsdragten`, { sizes: '(min-width: 901px) 340px, 92vw' })}</figure>
      <dl>
        <div><dt>Født</dt><dd>${data.traener.foedt}</dd></div>
        <div><dt>Licens</dt><dd>${esc(data.traener.licens)} – professionel træner og kusk</dd></div>
        <div><dt>Hjemmebane</dt><dd>${esc(data.traener.hjemmebane)}</dd></div>
        <div><dt>Løbsfarver</dt><dd>Hvid med reklame</dd></div>
        <div><dt>Selvstændig</dt><dd>Siden 1. maj 1993</dd></div>
        <div><dt>Stald</dt><dd>${SITE.navn}, ${SITE.vej}, ${SITE.sted}</dd></div>
        <div><dt>Heste i træning</dt><dd>${o.heste.length}</dd></div>
      </dl>
    </aside>
    <div class="prosa">
      ${etiket('Historien', ' data-vis')}
      <h2 data-vis>Fra Brabrand til <em>${SITE.sted}.</em></h2>
      <p class="indled" data-vis>Travsporten kom tidligt ind i ${SITE.fornavn}s liv. Hans far havde travheste på hobbyplan og kørte amatørløb, og fra hjemmet i Brabrand gik turen ofte til Jydsk Væddeløbsbane.</p>
      <p data-vis>Som ung var ${SITE.fornavn} i skolepraktik hos Bent Madsen og Birger Jørgensen, og efter 10. klasse blev han ansat hos Vagn "Futter" Lønborg. I vinteren 1986/87 arbejdede han i USA hos Stanley Dancer – en af amerikansk travsports største legender – sammen med Henrik Lund.</p>
      <p data-vis>Hjemme igen var han jockey hos Jørn Laursen, Birger Jørgensen og Seppo Kukkonen, før han den 1. maj 1993 åbnede sin egen stald i Skive. I dag trænes hestene fra familiens gård på ${SITE.vej} i ${SITE.sted} – og ${SITE.fornavn} sidder i bestyrelsen for Skive Trav.</p>
      <h2 data-vis>Træneren.</h2>
      <p data-vis>Den største sejr som træner kom i 2012, da egentrænede Repay Merci vandt Dansk Trav Derby med ${SITE.fornavn} i sulkyen. Hesten vandt siden løb i både Norge og Frankrig og tjente mere end 3,8 millioner kroner.</p>
      <p data-vis>Dansk Hoppe Derby har ${SITE.fornavn} vundet med Mathilde Trøjborg, og Juvel Trøjborg tjente over to millioner kroner og vandt blandt andet Mesterskab for Danmark. Lige nu står ${o.heste.length} heste på træningslisten, og over de seneste ${o.femAar.aar} sæsoner har stalden vundet ${o.femAar.sejre} løb.</p>
      <figure class="prosa__foto" data-vis>${billede('dm-vinder', `${SITE.person} i sulkyen efter sejren i DM-finalen 2026`, { sizes: '(min-width: 1000px) 60vw, 92vw' })}<figcaption>DM-finalen i Aalborg 2026: sejr med Cardolan Byd og titlen som dansk mester.</figcaption></figure>
      <h2 data-vis>Kusken.</h2>
      <p data-vis>${SITE.fornavn} kører selv mange af staldens heste – i ${o.kusk.aar} er det blevet til ${o.kusk.starter} starter og ${o.kusk.sejre} sejre i sulkyen. I august 2014 blev han europamester for professionelle travkuske i Sverige, og året efter kørte han VM i Australien. Som kusk har han også vundet Dansk Trav Kriterium med Steen Juul-trænede Takethem.</p>
      <p data-vis>DM for professionelle travtrænere har ${SITE.fornavn} vundet to gange: i 2008 og igen i 2026. Med sølv i 2000, 2006, 2011, 2013, 2019 og 2021 og bronze i 2001 og 2018 har han ${talord(DM.length)} medaljer i det officielle DM siden 1999.</p>
      <p class="valg" data-vis>${ekstern(SITE.travinfo, `Se ${SITE.fornavn}s profil på Travinfo`)}</p>
    </div>
  </div>
</section>

<section class="sek sek--sort">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Mesterskaberne', ' data-vis')}
        <h2 data-vis style="--i:1">${stort(talord(DM.length))} DM-<em>medaljer.</em></h2>
      </div>
      <p data-vis style="--i:2">Alle ${SITE.fornavn}s medaljer i DM for professionelle travtrænere – og to af karrierens andre store dage.</p>
    </div>
    ${medaljebane(idag)}
  </div>
</section>
${tidslinje()}

<section class="sek sek--kalk">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Statistik', ' data-vis')}
        <h2 data-vis style="--i:1">Sæson for <em>sæson.</em></h2>
      </div>
      <p data-vis style="--i:2">Officielle tal fra Dansk Hestevæddeløb, opdateret ${o.opdateret}.</p>
    </div>
    <div class="soejlepar">
      ${soejler('Sejre som træner', o.traenerAar)}
      ${soejler('Sejre som kusk', o.kuskAar)}
    </div>
    <div class="tabeller" data-vis>
      ${statTabel('Som træner', data.traenerStatistik)}
      ${statTabel('Som kusk', data.kuskStatistik)}
    </div>
  </div>
</section>
${kontaktbaand()}`;

const stalden = (o) => `
${sidehoved({
  sti: 'Stalden',
  h1: `Stalden i <span>${SITE.sted}</span>`,
  tekst: `${SITE.navn} træner ${o.heste.length} heste – fra åringer til rutinerede løbsheste – fra familiens gård på ${SITE.vej} i ${SITE.sted} ved ${SITE.by}, med Skive Trav som hjemmebane.`,
  figur: ['gaarden', `${SITE.person} i gården foran den gule staldbygning`],
  pos: '50% 25%',
  chips: [[o.heste.length, 'heste i træning'], [`${o.aldre[0]}–${o.aldre[1]}`, 'år gamle'], [o.banetal.length, `baner i ${o.saeson.aar}`]],
})}

<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Det tilbyder stalden', ' data-vis')}
        <h2 data-vis style="--i:1">Fra første tilkøring <em>til målstregen.</em></h2>
      </div>
      <p data-vis style="--i:2">Ring til ${SITE.fornavn} for en snak om hesten og prisen.</p>
    </div>
    ${ydelser(o)}
  </div>
</section>

<section class="sek sek--kalk">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Hverdagen', ' data-vis')}
        <h2 data-vis style="--i:1">Gården og <em>sandbanen.</em></h2>
      </div>
      <p data-vis style="--i:2">Ridetræning er en fast del af hestenes program hos Team Mønster, og mange timer går på gårdens egen sandbane.</p>
    </div>
    ${galleri()}
  </div>
</section>
${michelleSektion(o)}

<section class="sek sek--kalk">
  <div class="wrap duo">
    <div>
      ${etiket('Hjemmebanen', ' data-vis')}
      <h2 data-vis style="--i:1">Skive <em>Trav.</em></h2>
      <p class="indled" data-vis style="--i:2">${baneTekst(o)}</p>
      <p data-vis style="--i:3">Banen åbnede i 1948 som Nordvestjysk Væddeløbsbane og har ligget på Flyvej i Skive siden 1966. Et lysanlæg fra 2019–20 gør det muligt at køre løb hele vinteren. ${SITE.fornavn} sidder i banens bestyrelse.</p>
      <div data-vis style="--i:4">${banebjaelker(o.sejrsbaner)}</div>
      <p class="valg" data-vis style="--i:5">${ekstern(SITE.hjemmebane, 'skive-trav.dk')}</p>
    </div>
    <figure class="kort" data-vis style="--i:2">
      ${danmarkskort(o.sejrsbaner, `Danmarkskort med staldens sejre og starter pr. bane i ${o.saeson.aar}: ${o.sejrsbaner.map((b) => `${b.navn} ${sejreTekst(b.sejre)} på ${b.antal} starter`).join(', ')}.`)}
      <figcaption>Sejre pr. dansk bane i ${o.saeson.aar}. Boblens størrelse viser antal starter, og ringen markerer hjemmebanen.</figcaption>
    </figure>
  </div>
  <div class="wrap">
    <div class="adresse" data-vis>
      <div>
        ${etiket('Adresse')}
        <address class="adresse__stor">${SITE.navn}<br>${SITE.gade}, ${SITE.sted}<br>${SITE.postnr} ${SITE.by}</address>
      </div>
      <p>${ekstern(SITE.kort, 'Åbn i Google Maps', 'knap')}</p>
    </div>
  </div>
</section>
${kontaktbaand()}`;

const heste = (o) => `
${sidehoved({
  sti: 'Heste',
  h1: 'Heste i <span>træning</span>',
  tekst: 'Træningslisten kommer direkte fra Dansk Hestevæddeløb og følger automatisk med, når heste kommer til eller rejser videre.',
  figur: ['vindercirkel', `${SITE.person} i sulkyen i vindercirklen`],
  pos: '50% 50%',
  chips: [[o.heste.length - o.ungheste.length, 'løbsheste'], [o.ungheste.length, 'ungheste']],
})}

<section class="sek">
  <div class="wrap">
    ${hestegruppe('Løbsheste', o.heste.filter((h) => h.alder >= 3))}
    ${hestegruppe('2-årige', o.heste.filter((h) => h.alder === 2))}
    ${hestegruppe('Åringer', o.heste.filter((h) => h.alder <= 1))}
    <p class="note" data-vis>Starter, placeringer (1.–2.–3.), præmiesum og rekord er livstal. Rekorden er hestens hurtigste kilometertid; a = autostart, k/m/l = kort, mellem og lang distance. Klik på en hest for at se den på Travinfo. Kilde: Dansk Hestevæddeløb, opdateret ${o.opdateret}.</p>
  </div>
</section>
${kontaktbaand()}`;

const resultater = (o, data) => `
${sidehoved({
  sti: 'Resultater',
  h1: '<span>Resultater</span>',
  tekst: `Staldens seneste starter, kommende løb og sæsonens tal. Data kommer fra Dansk Hestevæddeløb og er senest opdateret ${o.opdateret}.`,
  figur: ['i-loeb', `${SITE.person} kører i løb`],
  pos: '50% 50%',
  chips: [[o.saeson.sejre, `sejre i ${o.saeson.aar}`], [`${o.saeson.procent} %`, 'sejrsprocent']],
})}

<section class="sek">
  <div class="wrap">
    ${etiket(`Sæson ${o.saeson.aar} som træner`, ' data-vis')}
    <dl class="kpi" data-vis>
      <div><dt>Starter</dt><dd data-tael="${o.saeson.starter}">${o.saeson.starter}</dd></div>
      <div><dt>Sejre</dt><dd data-tael="${o.saeson.sejre}">${o.saeson.sejre}</dd></div>
      <div><dt>2.-pladser</dt><dd data-tael="${o.saeson.toer}">${o.saeson.toer}</dd></div>
      <div><dt>3.-pladser</dt><dd data-tael="${o.saeson.treer}">${o.saeson.treer}</dd></div>
      <div><dt>Sejrsprocent</dt><dd>${o.saeson.procent}<small>%</small></dd></div>
      <div><dt>Indkørt</dt><dd><span data-tael="${o.saeson.praemier}">${nf(o.saeson.praemier)}</span><small>kr.</small></dd></div>
    </dl>
    <div class="formboks" data-vis style="--i:1">
      <h2 class="mini">Formkurve – de seneste ${o.seneste.length} starter</h2>
      ${formkurve(o.seneste)}
    </div>
  </div>
</section>

<section class="sek sek--kalk">
  <div class="wrap resgitter">
    <div class="panel" data-vis>
      <h2 class="mini">De seneste ${o.seneste.length} starter</h2>
      ${resultatliste(o.seneste)}
      <p class="note">Tider er kilometertider. a = autostart, g = galop undervejs. – = uplaceret, disk. = diskvalificeret.</p>
    </div>
    <div class="panel" data-vis style="--i:1">
      <h2 class="mini">Kommende starter</h2>
      ${o.kommende.length ? kommendeListe(o.kommende) : ingenStarter()}
    </div>
  </div>
</section>

<section class="sek">
  <div class="wrap">
    <div class="sekhoved">
      <div>
        ${etiket('Statistik', ' data-vis')}
        <h2 data-vis style="--i:1">Sæson for <em>sæson.</em></h2>
      </div>
      <p data-vis style="--i:2">Alle resultater og detaljer findes hos Dansk Hestevæddeløb. ${ekstern(SITE.travinfo, 'Åbn Travinfo')}</p>
    </div>
    <div class="tabeller" data-vis>
      ${statTabel(`${SITE.fornavn} som træner`, data.traenerStatistik)}
      ${statTabel(`${SITE.fornavn} som kusk`, data.kuskStatistik)}
      ${data.michelle?.statistik?.length ? statTabel('Michelle som kusk og rytter', data.michelle.statistik) : ''}
    </div>
  </div>
</section>
${kontaktbaand()}`;

const kontakt = () => `
${sidehoved({
  sti: 'Kontakt',
  h1: 'Kontakt <span>Knud</span>',
  tekst: 'Har du en hest, der skal i træning, eller et spørgsmål til stalden? Ring eller send en sms – eller skriv til Team Mønster på Facebook.',
  figur: ['med-hest', `${SITE.person} med en af staldens heste`],
  pos: '60% 40%',
})}

<section class="sek">
  <div class="wrap kontakt">
    <div class="kontakt__felt kontakt__felt--tlf" data-vis>
      <h2 class="mini">Telefon</h2>
      <p class="kontakt__stor"><a href="tel:${tlfLink}">${SITE.telefon}</a></p>
      <p class="valg"><a class="knap knap--hvid" href="tel:${tlfLink}">Ring op ${pil}</a> <a class="link link--lys" href="sms:${tlfLink}">Send en sms ${pil}</a></p>
    </div>
    <div class="kontakt__felt" data-vis style="--i:1">
      <h2 class="mini">Facebook</h2>
      <p class="kontakt__stor kontakt__stor--fb"><a href="${SITE.facebook}" target="_blank" rel="noopener">Team Mønster${nyFane}</a></p>
      <p class="valg">${ekstern(SITE.facebook, 'Skriv til stalden', 'knap')}</p>
    </div>
    <div class="kontakt__felt kontakt__felt--kort" data-vis style="--i:2">
      <div>
        <h2 class="mini">Stalden</h2>
        <address class="kontakt__adr">${SITE.navn}<br>${SITE.gade}, ${SITE.sted}<br>${SITE.postnr} ${SITE.by}</address>
        <p class="valg">${ekstern(SITE.kort, 'Find vej')}</p>
      </div>
      <div class="kort kort--mini">${danmarkskort([{ kode: HJEM, navn: 'Skive' }], 'Danmarkskort, hvor Skive er markeret')}</div>
    </div>
  </div>
</section>
${foelg()}`;

const ikkeFundet = () => `
<section class="sidehoved sidehoved--enkel">
  <div class="wrap">
    ${etiket('Fejl 404')}
    <h1>Siden findes <span>ikke</span></h1>
    <p class="indled">Adressen er forkert, eller siden er flyttet.</p>
    <p class="valg">${knap('', 'Til forsiden')}</p>
  </div>
</section>`;

/** Alle sider som [{ sti, html }]. `idag` er YYYY-MM-DD, `v` et versionsmærke til css/js. */
export function sider(data, { v, idag, kort }) {
  V = v;
  KORT = kort;
  const o = afled(data, idag);
  const side = (sti, def) => {
    R = sti === '404.html' ? new URL(SITE.url + '/').pathname : sti ? '../' : '';
    return { sti: sti.endsWith('.html') ? sti : `${sti}index.html`, url: sti, html: layout({ sti, o, ...def() }) };
  };
  return [
    side('', () => ({
      titel: `${SITE.navn} – travtræner og kusk ${SITE.person}, Skive`,
      beskrivelse: `${SITE.person}: travtræner og kusk i Skive siden 1993, dansk mester 2008 og 2026 og europamester for kuske 2014. ${o.heste.length} heste i træning i ${SITE.sted}.`,
      klasse: 'forside',
      indhold: forside(o, idag),
    })),
    side('om-knud/', () => ({
      titel: `Om ${SITE.person} – travtræner og kusk | ${SITE.navn}`,
      beskrivelse: `${SITE.person}: Derby-vinder 2012 med Repay Merci, europamester for kuske 2014 og dansk mester for professionelle travtrænere 2008 og 2026.`,
      indhold: omKnud(o, data, idag),
    })),
    side('stalden/', () => ({
      titel: `Stalden i ${SITE.sted} – travtræning ved Skive | ${SITE.navn}`,
      beskrivelse: `${SITE.navn} træner ${o.heste.length} heste fra gården på ${SITE.gade} i ${SITE.sted} ved ${SITE.by}: træning af løbsheste og tilkøring af ungheste.`,
      indhold: stalden(o),
    })),
    side('heste/', () => ({
      titel: `Heste i træning | ${SITE.navn}`,
      beskrivelse: `Se de ${o.heste.length} travheste, der lige nu er i træning hos ${SITE.person} – med afstamning, starter, præmiesum og rekord.`,
      indhold: heste(o),
    })),
    side('resultater/', () => ({
      titel: `Resultater og statistik | ${SITE.navn}`,
      beskrivelse: `Seneste resultater, kommende starter og sæsonstatistik for travtræner ${SITE.person}: ${o.saeson.sejre} sejre på ${o.saeson.starter} starter i ${o.saeson.aar}.`,
      indhold: resultater(o, data),
    })),
    side('kontakt/', () => ({
      titel: `Kontakt ${SITE.person} – ${SITE.navn}, Skive`,
      beskrivelse: `Kontakt ${SITE.navn}: telefon ${SITE.telefon} eller Facebook. Stalden ligger på ${SITE.gade}, ${SITE.sted}, ${SITE.postnr} ${SITE.by}.`,
      indhold: kontakt(),
    })),
    side('404.html', () => ({
      titel: `Siden findes ikke | ${SITE.navn}`,
      beskrivelse: `Siden findes ikke. Gå til forsiden for ${SITE.navn} – travtræner ${SITE.person} i ${SITE.sted} ved Skive.`,
      noindex: true,
      indhold: ikkeFundet(),
    })),
  ];
}
