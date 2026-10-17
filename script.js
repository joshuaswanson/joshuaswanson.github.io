// ==========================================================================
// Language switching: Züritüütsch and standard German, each a toggle back to
// English. The quote is left in English in every language; it is a quotation.
// ==========================================================================

const translations = {
  ch: {
    "about-position":
      'Ich schaffe am <a href="https://is.mpg.de/">Max-Planck-Institut für Intelligente Systeme</a> i de <a href="https://s-abdelnabi.github.io/group.html">COMPASS</a>-Gruppe under de Betreuig vo <a href="https://s-abdelnabi.github.io/">Sahar Abdelnabi</a>.',
    "about-education":
      'Vorhär han ich en MSc i Informatik vo de <a href="https://ethz.ch/en.html">ETH Züri</a> gmacht, mit Schwerpunkt Machine Intelligence und Minor i Data Management. Mis Bachelorstudium han ich a de <a href="https://www.washington.edu">University of Washington</a> gmacht, mit emene BA i Mathematik und emene BSc i Informatik.',
    "about-research":
      'Mini Forschigsintresse sind i KI-Sicherheit und Privatsphäri. Mis nöischte <a href="https://arxiv.org/abs/2602.16800" target="_blank" rel="noopener">mitverfasste Paper</a> isch vo de <a href="https://inf.ethz.ch/de/news-und-veranstaltungen/spotlights/infk-news-channel/2026/05/the-more-you-post-the-easier-you-are-to-unmask.html" target="_blank" rel="noopener">ETH Züri</a> uufghoben worde und isch i de <a href="https://www.nytimes.com/2026/03/17/opinion/ai-economy-trump-future.html" target="_blank" rel="noopener">New York Times</a>, em <a href="https://www.theguardian.com/technology/2026/mar/08/ai-hackers-social-media-accounts-study" target="_blank" rel="noopener">Guardian</a>, <a href="https://www.bloomberg.com/opinion/articles/2026-03-12/anthropic-isn-t-exaggerating-about-an-ai-panopticon" target="_blank" rel="noopener">Bloomberg</a>, und anderne vorcho.',
    "pub-heading": "Publikatione",
    "projects-heading": "Projäkt",
    "projects-intro":
      "Chliini Tools, Spiel und Näbeprojekt woni zum Spass bau.",
    "contact-heading": "Kontakt",
    "contact-standing":
      'Ich echo d\'<a href="https://www.kalzumeus.com/standing-invitation/" target="_blank" rel="noopener">Standing Invitation</a>:',
    "contact-email":
      "Mini E-Mail hät s folgende Format: Vorname Punkt Nachname at tuebingen Punkt mpg Punkt Ländercode.",
    "deanon-featured": "Bekannt us:",
    "deanon-discussed": "Diskutiert uf:",
    "project-cursedchess-desc":
      "Was, wenn d erscht abtrünnigi KI en Schachbot wär?",
    "project-ios-desc":
      "Live Prozess-Monitor für es per USB aagschlossnigs iPhone oder iPad. Wie de macOS Activity Monitor, aber für iOS.",
    "project-latex-desc":
      "Übersetz nöd-änglischi LaTeX-gsetzti PDFs uf Änglisch und behaltet debii d'mathematischi Notation.",
    "project-monitor-desc":
      "Interaktivs Scatter-Plot zum Vergliiche vo Monitor-Spezifikatione wie PPI, Bildschirmflächi und Priis.",
    "project-slidestovideo-desc":
      "Macht us emene Foliesatz es vertontes Video mit AI Voice Cloning. PDF ufelade, Skript schriibe, Stimm-Sample lifere, und chum es Präsentationsvideo überchoo.",
    "project-sshgui-desc":
      "Finder-Stil GUI für SSH-Server. Spalte-Browser, integrierts Terminal, Drag-and-Drop Dateiübertragig.",
    "project-swissgerman-desc":
      "En praktische Guide zu Züritüütsch für Änglischsprächigi, gschriebe us minä Notize als Master-Student z'Züri.",
    "project-zurichhousing-desc":
      "Durchsuech di grosse Schwiizer Wohnigs-Plattforme, filter und kartier d'Resultat, und generier massewiis massgschnideti Bewerbige.",
    "project-watchbar-desc":
      "macOS-Menübalke-App zum Verwalte vo dinere YouTube-Watch-Later-Playlist.",
  },

  de: {
    "about-position":
      'Ich arbeite am <a href="https://is.mpg.de/">Max-Planck-Institut für Intelligente Systeme</a> in der <a href="https://s-abdelnabi.github.io/group.html">COMPASS</a>-Gruppe unter der Betreuung von <a href="https://s-abdelnabi.github.io/">Sahar Abdelnabi</a>.',
    "about-education":
      'Zuvor habe ich einen MSc in Informatik an der <a href="https://ethz.ch/en.html">ETH Zürich</a> erworben, mit Schwerpunkt Machine Intelligence und Nebenfach Data Management. Mein Bachelorstudium habe ich an der <a href="https://www.washington.edu">University of Washington</a> absolviert, mit einem BA in Mathematik und einem BSc in Informatik.',
    "about-research":
      'Meine Forschungsinteressen liegen in KI-Sicherheit und Privatsphäre. Mein neuestes <a href="https://arxiv.org/abs/2602.16800" target="_blank" rel="noopener">mitverfasstes Paper</a> wurde von der <a href="https://inf.ethz.ch/de/news-und-veranstaltungen/spotlights/infk-news-channel/2026/05/the-more-you-post-the-easier-you-are-to-unmask.html" target="_blank" rel="noopener">ETH Zürich</a> hervorgehoben und erschien in der <a href="https://www.nytimes.com/2026/03/17/opinion/ai-economy-trump-future.html" target="_blank" rel="noopener">New York Times</a>, im <a href="https://www.theguardian.com/technology/2026/mar/08/ai-hackers-social-media-accounts-study" target="_blank" rel="noopener">Guardian</a>, bei <a href="https://www.bloomberg.com/opinion/articles/2026-03-12/anthropic-isn-t-exaggerating-about-an-ai-panopticon" target="_blank" rel="noopener">Bloomberg</a> und weiteren Medien.',
    "pub-heading": "Publikationen",
    "deanon-featured": "Bekannt aus:",
    "deanon-discussed": "Diskutiert auf:",
    "projects-heading": "Projekte",
    "projects-intro":
      "Kleine Tools, Spiele und Nebenprojekte, die ich zum Spass baue.",
    "project-cursedchess-desc":
      "Was, wenn die erste abtrünnige KI ein Schachbot wäre?",
    "project-ios-desc":
      "Live-Prozessmonitor für ein per USB angeschlossenes iPhone oder iPad. Wie der macOS Activity Monitor, aber für iOS.",
    "project-latex-desc":
      "Übersetze nicht-englische, in LaTeX gesetzte PDFs ins Englische und behalte dabei die mathematische Notation bei.",
    "project-monitor-desc":
      "Interaktives Streudiagramm zum Vergleichen von Monitorspezifikationen wie PPI, Bildschirmfläche und Preis.",
    "project-slidestovideo-desc":
      "Macht aus einem Foliensatz ein vertontes Video mit AI Voice Cloning. PDF hochladen, Skript schreiben, Stimmprobe liefern, Präsentationsvideo erhalten.",
    "project-sshgui-desc":
      "Desktop-GUI im Finder-Stil für SSH-Server. Spaltenbrowser, integriertes Terminal, Drag-and-Drop-Dateiübertragung.",
    "project-swissgerman-desc":
      "Ein praktischer Leitfaden zu Zürichdeutsch für Englischsprachige, geschrieben aus meinen eigenen Notizen als Masterstudent in Zürich.",
    "project-watchbar-desc":
      "macOS-Menüleisten-App zum Verwalten deiner YouTube-Watch-Later-Playlist.",
    "project-zurichhousing-desc":
      "Durchsuche die grossen Schweizer Wohnungsplattformen, filtere und kartiere die Ergebnisse und generiere massenhaft massgeschneiderte Bewerbungen.",
    "contact-heading": "Kontakt",
    "contact-standing":
      'Ich schliesse mich der <a href="https://www.kalzumeus.com/standing-invitation/" target="_blank" rel="noopener">Standing Invitation</a> an:',
    "contact-email":
      "Meine E-Mail hat das folgende Format: Vorname Punkt Nachname at tuebingen Punkt mpg Punkt Ländercode.",
  },
};

const HTML_LANG = { ch: "gsw", de: "de", en: "en" };

const originals = {};
const englishHrefs = new Map();
let currentLang = localStorage.getItem("lang") || "en";

function applyLanguage(lang) {
  const dict = translations[lang] || {};

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!(key in originals)) {
      originals[key] = el.innerHTML;
    }
    el.innerHTML = dict[key] || originals[key];
  });

  document.querySelectorAll("[data-href-de]").forEach((link) => {
    if (!englishHrefs.has(link)) {
      englishHrefs.set(link, link.getAttribute("href"));
    }
    const href = lang === "en" ? englishHrefs.get(link) : link.dataset.hrefDe;
    link.setAttribute("href", href);
  });

  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = HTML_LANG[lang] || "en";

  document.querySelectorAll(".lang-toggle").forEach((btn) => {
    const on = btn.dataset.lang === lang;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

document.querySelectorAll(".lang-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLanguage(currentLang === btn.dataset.lang ? "en" : btn.dataset.lang);
  });
});

// Always run on load: English is a language too, and this lights its flag
applyLanguage(currentLang);

// ==========================================================================
// Theme: follow the system, or override it with light or dark
// ==========================================================================

const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
let themeChoice = localStorage.getItem("theme") || "system";

function applyTheme(choice) {
  themeChoice = choice;
  localStorage.setItem("theme", choice);

  const dark = choice === "dark" || (choice === "system" && systemDark.matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";

  document.querySelectorAll(".theme-toggle").forEach((btn) => {
    const on = btn.dataset.theme === choice;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

document.querySelectorAll(".theme-toggle").forEach((btn) => {
  btn.addEventListener("click", () => applyTheme(btn.dataset.theme));
});

systemDark.addEventListener("change", () => applyTheme(themeChoice));

applyTheme(themeChoice);

// ==========================================================================
// The project logos animate on a timer while the logo is on screen, and on
// hover of the card they belong to
// ==========================================================================

// Only one logo animates at a time, so they never fire together
let busyUntil = 0;

function playOccasionally(logo, runFor, offset) {
  const FIRST = [1800, 4000];
  const THEN = [11000, 22000];
  const GAP = 900;

  let timer = null;
  let stop = null;
  let onScreen = false;
  let seen = false;

  function schedule() {
    clearTimeout(timer);
    if (!onScreen) return;
    const [lo, hi] = seen ? THEN : FIRST;
    const wait = lo + Math.random() * (hi - lo) + (seen ? 0 : offset);
    timer = setTimeout(play, wait);
  }

  function run() {
    clearTimeout(stop);
    busyUntil = Date.now() + runFor + GAP;
    seen = true;
    logo.classList.remove("is-playing");
    // Reading layout flushes the removal, so a run already under way restarts
    logo.getBoundingClientRect();
    logo.classList.add("is-playing");
    stop = setTimeout(() => logo.classList.remove("is-playing"), runFor);
    schedule();
  }

  function play() {
    const now = Date.now();
    if (now < busyUntil) {
      timer = setTimeout(play, busyUntil - now);
      return;
    }
    run();
  }

  const card = logo.closest(".project-card") || logo;
  card.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "mouse") return;
    if (!logo.classList.contains("is-playing")) run();
  });

  new IntersectionObserver(
    (entries) => {
      onScreen = entries[0].isIntersecting;
      if (onScreen) {
        schedule();
      } else {
        clearTimeout(timer);
      }
    },
    { threshold: 0.6 },
  ).observe(logo);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  [
    [".wm-zht", 800],
    [".wm-mct", 1000],
    [".wm-cursed", 2300],
    [".wm-iam", 3000],
    [".wm-ssh", 1600],
  ].forEach(([selector, runFor], i) => {
    document
      .querySelectorAll(selector)
      .forEach((el) => playOccasionally(el, runFor, i * 900));
  });
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
