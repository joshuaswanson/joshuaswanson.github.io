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
let alpsScene = null;

const DAY_PALETTE = {
  fog: "#c9d6e3",
  fogDensity: 0.00075,
  meadow: "#43632f",
  meadowSun: "#7a9448",
  rockLow: "#4a4036",
  rockHigh: "#6b6256",
  snow: "#ffffff",
  snowShade: "#b3c6de",
  sun: "#ffe6c4",
  sunIntensity: 2.6,
  skyLight: "#aecbe8",
  groundLight: "#5d5c5a",
  ambient: 0.75,
};

const NIGHT_PALETTE = {
  fog: "#16243c",
  fogDensity: 0.0009,
  meadow: "#1d2d1c",
  meadowSun: "#2f4529",
  rockLow: "#1a1a21",
  rockHigh: "#2c2b33",
  snow: "#cbd9ec",
  snowShade: "#5d7495",
  sun: "#a8c4e8",
  sunIntensity: 1.15,
  skyLight: "#2a4466",
  groundLight: "#10131c",
  ambient: 0.45,
};

// Zurich decides whether you get the afternoon or the aurora.
function isNightInZurich() {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Zurich",
      hour: "numeric",
      hour12: false,
    }).format(new Date()),
  );
  return hour < 6 || hour >= 20;
}

function buildAlps(night) {
  const scape = document.createElement("div");
  scape.className = "alps-scape" + (night ? " is-night" : "");
  scape.setAttribute("aria-hidden", "true");

  const stars = document.createElement("div");
  stars.className = "alps-stars";
  for (let i = 0; i < 110; i++) {
    const star = document.createElement("i");
    star.className = "alps-star";
    const size = 1 + Math.random() * 1.8;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 52}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDuration = `${2 + Math.random() * 5}s`;
    star.style.animationDelay = `${-Math.random() * 6}s`;
    stars.appendChild(star);
  }
  scape.appendChild(stars);
  scape.insertAdjacentHTML(
    "beforeend",
    '<div class="alps-aurora alps-aurora-1"></div>' +
      '<div class="alps-aurora alps-aurora-2"></div>',
  );
  return scape;
}

function buildSwissWeather() {
  const layer = document.createElement("div");
  layer.className = "swiss-weather";
  layer.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 80; i++) {
    const depth = Math.random();
    const flake = document.createElement("i");
    flake.className = "swiss-snow";
    const size = 1.5 + depth * 4;
    flake.style.left = `${Math.random() * 100}%`;
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.opacity = `${0.25 + depth * 0.45}`;
    flake.style.animationDuration = `${18 - depth * 9}s`;
    flake.style.animationDelay = `${-Math.random() * 20}s`;
    layer.appendChild(flake);
  }
  return layer;
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
  document.body.classList.toggle("is-en", on && currentLang !== "ch");

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
  if (alpsScene) {
    alpsScene.dispose();
    alpsScene = null;
  }
  document
    .querySelectorAll(".alps-scape, .swiss-weather, .swiss-clock")
    .forEach((el) => el.remove());

  if (!on) return;

  const night = isNightInZurich();
  const scape = buildAlps(night);
  document.body.prepend(scape);

  import("./alps.js")
    .then(({ createAlps }) => {
      if (!document.body.contains(scape)) return;
      alpsScene = createAlps(scape, night ? NIGHT_PALETTE : DAY_PALETTE);
    })
    .catch(() => {
      /* no WebGL: the sky gradient alone still carries the theme */
    });

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
