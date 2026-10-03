// ==========================================================================
// Swiss German (Züridütsch) language toggle
// ==========================================================================

const chTranslations = {
  "about-bio":
    'Ich han en MSc i Informatik vo de <a href="https://ethz.ch/en.html">ETH Züri</a>, mit Schwerpunkt Machine Intelligence und Minor i Data Management, und en BA i Mathematik und en BSc i Informatik vo de <a href="https://www.washington.edu">University of Washington</a>.',
  "about-research":
    'Mini Forschigsintresse sind i KI-Sicherheit und Privatsphäri. Mis nöischte <a href="https://arxiv.org/abs/2602.16800" target="_blank" rel="noopener">mitverfasste Paper</a> isch vo de <a href="https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2026/05/the-more-you-post-the-easier-you-are-to-unmask.html" target="_blank" rel="noopener">ETH Züri</a> uufghoben worde und isch i de <a href="https://www.nytimes.com/2026/03/17/opinion/ai-economy-trump-future.html" target="_blank" rel="noopener">New York Times</a>, em <a href="https://www.theguardian.com/technology/2026/mar/08/ai-hackers-social-media-accounts-study" target="_blank" rel="noopener">Guardian</a>, <a href="https://www.bloomberg.com/opinion/articles/2026-03-12/anthropic-isn-t-exaggerating-about-an-ai-panopticon" target="_blank" rel="noopener">Bloomberg</a>, und anderne vorcho.',
  "pub-heading": "Publikatione",
  "projects-heading": "Projäkt",
  "projects-intro": "Chliini Tools und Näbeprojekt woni zum Spass bau.",
  "contact-heading": "Kontakt",
  "contact-standing":
    'Ich echo d\'<a href="https://www.kalzumeus.com/standing-invitation/" target="_blank" rel="noopener">Standing Invitation</a>:',
  "contact-email":
    "Mini E-Mail folgt em Standard-ETH-Format: erschte Buechstabe vom Vorname + Nachname at ethz.ch.",
  "deanon-featured": "Bekannt us:",
  "deanon-discussed": "Diskutiert uf:",
  "project-cursedchess-desc":
    "Es chaotischs Schach-Variant mit Spielmodi wo alli 45 Sekunde wächsled: Portäl, Nebel vom Chrieg, Battle Royale, Minefäld, Schwerchraft, und meh.",
  "project-ios-desc":
    "Live Prozess-Monitor für es per USB aagschlossnigs iPhone oder iPad. Wie de macOS Activity Monitor, aber für iOS.",
  "project-latex-desc":
    "Übersetzt LaTeX-gsetzti PDFs uf Änglisch und behaltet debii d'mathematischi Notation.",
  "project-monitor-desc":
    "Interaktivs Scatter-Plot zum Vergliiche vo Monitor-Spezifikatione wie PPI, Bildschirmflächi und Priis.",
  "project-slidestovideo-desc":
    "Macht us emene Foliesatz es vertontes Video mit AI Voice Cloning. PDF ufelade, Skript schriibe, Stimm-Sample lifere, und chum es Präsentationsvideo überchoo.",
  "project-sshgui-desc":
    "Finder-Stil GUI für SSH-Server. Spalte-Browser, integrierts Terminal, Drag-and-Drop Dateiübertragig.",
  "project-swissgerman-desc":
    "En praktische Guide zu Züridütsch für Änglischsprächigi, gschriebe us minä Notize als Master-Student z'Züri.",
  "project-watchbar-desc":
    "macOS-Menübalke-App zum Verwalte vo dinere YouTube-Watch-Later-Playlist.",
};

// ==========================================================================
// Swiss mode
// ==========================================================================

const SWISS_RED = "#da291c";
const SWISS_FAVICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
      '<rect width="32" height="32" fill="#da291c"/>' +
      '<rect x="13" y="6" width="6" height="20" fill="#fff"/>' +
      '<rect x="6" y="13" width="20" height="6" fill="#fff"/></svg>',
  );

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let swissClockFrame = null;
let stopAlpsParallax = null;

const ALPS_SVG =
  '<svg class="alps-range" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#071a33"/><stop offset="0.09" stop-color="#113258"/><stop offset="0.18" stop-color="#27588a"/><stop offset="0.26" stop-color="#5584ac"/><stop offset="0.33" stop-color="#9fb0bd"/><stop offset="0.39" stop-color="#d9ac92"/><stop offset="0.45" stop-color="#f2bd90"/><stop offset="0.52" stop-color="#ffd1a0"/><stop offset="0.62" stop-color="#ffe2bb"/><stop offset="0.75" stop-color="#ffeed6"/></linearGradient><radialGradient id="sunglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff6e2" stop-opacity="0.95"/><stop offset="0.3" stop-color="#ffd79c" stop-opacity="0.5"/><stop offset="1" stop-color="#ffcf8e" stop-opacity="0"/></radialGradient><linearGradient id="alpenglow" x1="0.15" y1="0" x2="0.85" y2="1"><stop offset="0" stop-color="#ffe0b8"/><stop offset="0.3" stop-color="#ffcfa4"/><stop offset="0.7" stop-color="#f3ddd8"/><stop offset="1" stop-color="#e4edf6"/></linearGradient><linearGradient id="snowwarm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe8d2"/><stop offset="1" stop-color="#ead9e2"/></linearGradient><linearGradient id="snowfar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdf0e2"/><stop offset="1" stop-color="#e6eef6"/></linearGradient><linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd9ad" stop-opacity="0"/><stop offset="0.5" stop-color="#ffd8b0" stop-opacity="0.5"/><stop offset="1" stop-color="#ffe6cb" stop-opacity="1"/></linearGradient><linearGradient id="lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffdcb4"/><stop offset="0.1" stop-color="#b9a7ae"/><stop offset="0.42" stop-color="#3f5c80"/><stop offset="1" stop-color="#132a45"/></linearGradient><linearGradient id="deepfade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7f93ac" stop-opacity="0"/><stop offset="0.5" stop-color="#36567a" stop-opacity="0.68"/><stop offset="1" stop-color="#132a45" stop-opacity="0.96"/></linearGradient><clipPath id="lakeclip"><rect x="0" y="672" width="1440" height="228"/></clipPath><clipPath id="snow-l2"><path d="M0,0 L1440,0 L1440,318.1 L1440,318.1 L1407.2,318.1 L1352.3,306.9 L1308.0,324.0 L1260.4,317.0 L1224.7,300.5 L1159.8,320.5 L1116.0,302.2 L1071.6,288.3 L1042.3,277.7 L1005.8,286.1 L947.2,293.5 L875.4,279.9 L836.6,260.0 L780.1,260.8 L724.7,260.8 L659.9,260.0 L612.6,260.0 L575.5,275.6 L546.7,288.0 L520.0,286.8 L465.7,300.5 L395.3,294.4 L367.4,275.1 L304.2,267.4 L264.2,283.7 L201.7,300.0 L152.2,294.8 L99.2,307.4 L51.7,307.1 L0.0,290.1 Z"/></clipPath><clipPath id="snow-l3"><path d="M0,0 L1440,0 L1440,204.0 L1440,204.0 L1395.1,204.0 L1325.4,182.6 L1256.1,199.6 L1221.4,186.2 L1157.8,200.2 L1124.7,177.3 L1058.8,195.1 L1010.6,190.9 L963.7,165.2 L910.1,165.2 L857.3,165.2 L827.9,169.1 L786.8,180.5 L748.9,165.2 L677.4,165.2 L621.9,185.0 L577.7,165.2 L511.0,180.6 L448.1,191.6 L409.6,165.2 L364.3,165.2 L308.7,165.2 L249.0,171.8 L202.4,189.1 L168.3,185.8 L139.5,169.1 L102.2,191.5 L41.3,212.9 L0.0,186.9 Z"/></clipPath><clipPath id="snow-l4"><path d="M0,0 L1440,0 L1440,464.2 L1440,464.2 L1413.9,464.2 L1345.8,469.0 L1287.4,459.6 L1220.0,452.0 L1168.9,444.4 L1096.9,444.4 L1037.3,444.4 L982.0,444.4 L911.7,450.8 L843.9,444.4 L816.3,454.4 L763.4,465.9 L707.1,459.8 L640.2,444.4 L608.1,446.7 L565.1,444.4 L536.4,446.1 L498.0,447.8 L462.6,463.3 L423.7,450.0 L358.5,446.3 L322.0,444.4 L262.9,444.4 L223.4,447.5 L159.5,444.4 L101.1,444.4 L30.8,452.7 L0.0,467.5 Z"/></clipPath></defs><rect width="1440" height="900" fill="url(#sky)"/><circle cx="196" cy="268" r="240" fill="url(#sunglow)"/><circle cx="196" cy="268" r="22" fill="#fff8ea" opacity="0.95"/><g class="alps-layer" data-depth="0.05"><path d="M0,672 L0,404 L0,404 L118,366 L206,402 L318,344 L402,392 L512,350 L628,398 L742,342 L858,392 L968,352 L1094,398 L1212,348 L1330,394 L1440,360 L1440,672 Z" fill="#d9c2bd"/></g><rect x="0" y="0" width="1440" height="672" fill="url(#haze)" opacity="0.34"/><g class="alps-layer" data-depth="0.1"><path d="M0,672 L0,372 L0,372 L96,318 L188,364 L286,262 L362,312 L452,244 L548,308 L646,236 L742,296 L846,230 L948,300 L1056,248 L1162,312 L1272,254 L1368,308 L1440,276 L1440,672 Z" fill="#b3a6ba"/><path d="M0,672 L0,372 L0,372 L96,318 L188,364 L286,262 L362,312 L452,244 L548,308 L646,236 L742,296 L846,230 L948,300 L1056,248 L1162,312 L1272,254 L1368,308 L1440,276 L1440,672 Z" fill="url(#snowwarm)" clip-path="url(#snow-l2)"/></g><rect x="0" y="0" width="1440" height="672" fill="url(#haze)" opacity="0.26"/><g class="alps-layer" data-depth="0.17"><path d="M0,672 L0,474 L0,474 L92,432 L184,470 L284,400 L376,444 L470,396 L562,436 L652,390 L742,430 L826,352 L904,296 L982,232 L1052,162 L1122,78 L1186,176 L1246,248 L1312,206 L1378,266 L1440,232 L1440,672 Z" fill="#7d90b0"/><path d="M0,672 L0,474 L0,474 L92,432 L184,470 L284,400 L376,444 L470,396 L562,436 L652,390 L742,430 L826,352 L904,296 L982,232 L1052,162 L1122,78 L1186,176 L1246,248 L1312,206 L1378,266 L1440,232 L1440,672 Z" fill="url(#alpenglow)" clip-path="url(#snow-l3)"/></g><rect x="0" y="0" width="1440" height="672" fill="url(#haze)" opacity="0.16"/><g class="alps-layer" data-depth="0.26"><path d="M0,672 L0,520 L0,520 L126,482 L248,524 L366,448 L482,500 L602,436 L726,492 L844,428 L962,486 L1084,440 L1206,496 L1322,452 L1440,504 L1440,672 Z" fill="#4d6487"/><path d="M0,672 L0,520 L0,520 L126,482 L248,524 L366,448 L482,500 L602,436 L726,492 L844,428 L962,486 L1084,440 L1206,496 L1322,452 L1440,504 L1440,672 Z" fill="url(#snowfar)" clip-path="url(#snow-l4)"/></g><rect x="0" y="0" width="1440" height="672" fill="url(#haze)" opacity="0.08"/><g class="alps-layer" data-depth="0.36"><path d="M0,672 L0,586 L0,586 L158,562 L312,596 L470,558 L628,592 L786,556 L944,590 L1100,560 L1258,594 L1440,566 L1440,672 Z" fill="#2a3e5d"/></g><rect x="0" y="672" width="1440" height="228" fill="url(#lake)"/><g clip-path="url(#lakeclip)" opacity="0.62"><g transform="translate(0,1344) scale(1,-1)"><path d="M0,672 L0,404 L0,404 L118,366 L206,402 L318,344 L402,392 L512,350 L628,398 L742,342 L858,392 L968,352 L1094,398 L1212,348 L1330,394 L1440,360 L1440,672 Z" fill="#d9c2bd"/><path d="M0,672 L0,372 L0,372 L96,318 L188,364 L286,262 L362,312 L452,244 L548,308 L646,236 L742,296 L846,230 L948,300 L1056,248 L1162,312 L1272,254 L1368,308 L1440,276 L1440,672 Z" fill="#b3a6ba"/><path d="M0,672 L0,372 L0,372 L96,318 L188,364 L286,262 L362,312 L452,244 L548,308 L646,236 L742,296 L846,230 L948,300 L1056,248 L1162,312 L1272,254 L1368,308 L1440,276 L1440,672 Z" fill="url(#snowwarm)" clip-path="url(#snow-l2)"/><path d="M0,672 L0,474 L0,474 L92,432 L184,470 L284,400 L376,444 L470,396 L562,436 L652,390 L742,430 L826,352 L904,296 L982,232 L1052,162 L1122,78 L1186,176 L1246,248 L1312,206 L1378,266 L1440,232 L1440,672 Z" fill="#7d90b0"/><path d="M0,672 L0,474 L0,474 L92,432 L184,470 L284,400 L376,444 L470,396 L562,436 L652,390 L742,430 L826,352 L904,296 L982,232 L1052,162 L1122,78 L1186,176 L1246,248 L1312,206 L1378,266 L1440,232 L1440,672 Z" fill="url(#alpenglow)" clip-path="url(#snow-l3)"/><path d="M0,672 L0,520 L0,520 L126,482 L248,524 L366,448 L482,500 L602,436 L726,492 L844,428 L962,486 L1084,440 L1206,496 L1322,452 L1440,504 L1440,672 Z" fill="#4d6487"/><path d="M0,672 L0,520 L0,520 L126,482 L248,524 L366,448 L482,500 L602,436 L726,492 L844,428 L962,486 L1084,440 L1206,496 L1322,452 L1440,504 L1440,672 Z" fill="url(#snowfar)" clip-path="url(#snow-l4)"/><path d="M0,672 L0,586 L0,586 L158,562 L312,596 L470,558 L628,592 L786,556 L944,590 L1100,560 L1258,594 L1440,566 L1440,672 Z" fill="#2a3e5d"/></g></g><rect x="0" y="672" width="1440" height="228" fill="url(#deepfade)"/><rect class="alps-shimmer" x="-80" y="690" width="1600" height="1.6" rx="0.8" fill="#ffe7c8" opacity="0.2" style="animation-duration:15s"/><rect class="alps-shimmer" x="-80" y="716" width="1600" height="2" rx="1.0" fill="#ffe7c8" opacity="0.14" style="animation-duration:21s"/><rect class="alps-shimmer" x="-80" y="752" width="1600" height="1.6" rx="0.8" fill="#ffe7c8" opacity="0.12" style="animation-duration:13s"/><rect class="alps-shimmer" x="-80" y="800" width="1600" height="2" rx="1.0" fill="#ffe7c8" opacity="0.09" style="animation-duration:25s"/><rect class="alps-shimmer" x="-80" y="856" width="1600" height="1.6" rx="0.8" fill="#ffe7c8" opacity="0.07" style="animation-duration:18s"/></svg>';

function buildAlps() {
  const scape = document.createElement("div");
  scape.className = "alps-scape";
  scape.setAttribute("aria-hidden", "true");
  scape.innerHTML =
    ALPS_SVG +
    '<div class="alps-mist alps-mist-1"></div>' +
    '<div class="alps-mist alps-mist-2"></div>' +
    '<div class="alps-mist alps-mist-3"></div>';
  return scape;
}

function buildSwissWeather() {
  const layer = document.createElement("div");
  layer.className = "swiss-weather";
  layer.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 90; i++) {
    const depth = Math.random();
    const flake = document.createElement("i");
    flake.className = "swiss-snow";
    const size = 2 + depth * 5;
    flake.style.left = `${Math.random() * 100}%`;
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.opacity = `${0.35 + depth * 0.5}`;
    flake.style.animationDuration = `${16 - depth * 8}s`;
    flake.style.animationDelay = `${-Math.random() * 18}s`;
    layer.appendChild(flake);
  }

  for (let i = 0; i < 7; i++) {
    const size = 11 + Math.random() * 9;
    const flag = document.createElement("i");
    flag.className = "swiss-flake";
    flag.style.left = `${Math.random() * 100}%`;
    flag.style.width = `${size}px`;
    flag.style.height = `${size}px`;
    flag.style.animationDuration = `${13 + Math.random() * 8}s`;
    flag.style.animationDelay = `${-Math.random() * 20}s`;
    layer.appendChild(flag);
  }
  return layer;
}

// Distant ranges drift less than near ones as the page scrolls.
function startAlpsParallax(scape) {
  const layers = [...scape.querySelectorAll(".alps-layer")].map((el) => [
    el,
    parseFloat(el.dataset.depth),
  ]);
  let queued = false;

  const draw = () => {
    queued = false;
    const y = window.scrollY;
    layers.forEach(([el, depth]) => {
      el.setAttribute("transform", `translate(0 ${y * depth * 0.08})`);
    });
  };

  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(draw);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  draw();
  return () => window.removeEventListener("scroll", onScroll);
}

function buildSwissClock() {
  let marks = "";
  for (let i = 0; i < 60; i++) {
    const isHour = i % 5 === 0;
    const w = isHour ? 5 : 1.8;
    marks +=
      `<rect x="${50 - w / 2}" y="7" width="${w}" height="${isHour ? 13 : 6}"` +
      ` fill="#111" transform="rotate(${i * 6} 50 50)"/>`;
  }

  const el = document.createElement("div");
  el.className = "swiss-clock";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML =
    '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="50" cy="50" r="49" fill="#fff" stroke="#111" stroke-width="2"/>' +
    marks +
    '<rect class="hand-h" x="46" y="24" width="8" height="30" fill="#111"/>' +
    '<rect class="hand-m" x="47" y="10" width="6" height="44" fill="#111"/>' +
    '<g class="hand-s">' +
    `<rect x="48.9" y="19" width="2.2" height="36" fill="${SWISS_RED}"/>` +
    `<circle cx="50" cy="22" r="6" fill="${SWISS_RED}"/></g>` +
    '<circle cx="50" cy="50" r="3.2" fill="#111"/>' +
    "</svg>";
  return el;
}

// The real railway clock sweeps a revolution in 58.5s, then waits at twelve
// for the minute to tick over.
function tickSwissClock(clock) {
  const now = new Date();
  const second = (now.getSeconds() + now.getMilliseconds() / 1000) / 60;
  const minute = now.getMinutes();
  const hour = (now.getHours() % 12) + minute / 60;

  const turn = (el, deg) =>
    el.setAttribute("transform", `rotate(${deg} 50 50)`);
  turn(clock.querySelector(".hand-h"), hour * 30);
  turn(clock.querySelector(".hand-m"), minute * 6);
  turn(clock.querySelector(".hand-s"), Math.min(second * (60 / 58.5), 1) * 360);
}

function applySwissTheme(on) {
  document.body.classList.toggle("swiss", on);

  const favicon = document.querySelector('link[rel="icon"]');
  if (on && !favicon.dataset.original) {
    favicon.dataset.original = favicon.getAttribute("href");
  }
  favicon.setAttribute(
    "href",
    on ? SWISS_FAVICON : favicon.dataset.original || "favicon.svg",
  );

  cancelAnimationFrame(swissClockFrame);
  swissClockFrame = null;
  if (stopAlpsParallax) {
    stopAlpsParallax();
    stopAlpsParallax = null;
  }
  document
    .querySelectorAll(".alps-scape, .swiss-weather, .swiss-clock")
    .forEach((el) => el.remove());

  if (!on) return;

  const scape = buildAlps();
  document.body.appendChild(scape);
  stopAlpsParallax = startAlpsParallax(scape);

  if (!reduceMotion.matches) {
    document.body.appendChild(buildSwissWeather());
  }

  const clock = buildSwissClock();
  document.body.appendChild(clock);

  const run = () => {
    tickSwissClock(clock);
    swissClockFrame = requestAnimationFrame(run);
  };
  run();
}

const originals = {};
let currentLang = localStorage.getItem("lang") || "en";

function applyLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (lang === "ch") {
      if (!(key in originals)) {
        originals[key] = el.innerHTML;
      }
      if (chTranslations[key]) {
        el.innerHTML = chTranslations[key];
      }
    } else {
      if (key in originals) {
        el.innerHTML = originals[key];
      }
    }
  });

  currentLang = lang;
  localStorage.setItem("lang", lang);

  const toggle = document.getElementById("lang-toggle");
  toggle.classList.toggle("active", lang === "ch");
  toggle.setAttribute(
    "aria-label",
    lang === "ch" ? "Switch to English" : "Switch to Swiss German",
  );

  applySwissTheme(lang === "ch");
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  applyLanguage(currentLang === "ch" ? "en" : "ch");
});

// Apply saved language on load
if (currentLang === "ch") {
  applyLanguage("ch");
}

// "and X more" toggle for media links
document.querySelectorAll(".media-show-more").forEach((toggle) => {
  const moreLinks = toggle.previousElementSibling;
  const count = moreLinks.querySelectorAll("a").length;
  toggle.textContent = `and ${count} more`;
  toggle.addEventListener("click", () => {
    moreLinks.hidden = !moreLinks.hidden;
    toggle.textContent = moreLinks.hidden ? `and ${count} more` : "show less";
  });
});
