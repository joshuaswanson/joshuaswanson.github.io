// ==========================================================================
// Language switching: Züridütsch and standard German, each a toggle back to
// English. The quote is left in English in every language; it is a quotation.
// ==========================================================================

const translations = {
  ch: {
    "about-bio":
      'Ich han en MSc i Informatik vo de <a href="https://ethz.ch/en.html">ETH Züri</a>, mit Schwerpunkt Machine Intelligence und Minor i Data Management, und en BA i Mathematik und en BSc i Informatik vo de <a href="https://www.washington.edu">University of Washington</a>.',
    "about-research":
      'Mini Forschigsintresse sind i KI-Sicherheit und Privatsphäri. Mis nöischte <a href="https://arxiv.org/abs/2602.16800" target="_blank" rel="noopener">mitverfasste Paper</a> isch vo de <a href="https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2026/05/the-more-you-post-the-easier-you-are-to-unmask.html" target="_blank" rel="noopener">ETH Züri</a> uufghoben worde und isch i de <a href="https://www.nytimes.com/2026/03/17/opinion/ai-economy-trump-future.html" target="_blank" rel="noopener">New York Times</a>, em <a href="https://www.theguardian.com/technology/2026/mar/08/ai-hackers-social-media-accounts-study" target="_blank" rel="noopener">Guardian</a>, <a href="https://www.bloomberg.com/opinion/articles/2026-03-12/anthropic-isn-t-exaggerating-about-an-ai-panopticon" target="_blank" rel="noopener">Bloomberg</a>, und anderne vorcho.',
    "pub-heading": "Publikatione",
    "projects-heading": "Projäkt",
    "projects-intro":
      "Chliini Tools, Spiel und Näbeprojekt woni zum Spass bau.",
    "contact-heading": "Kontakt",
    "contact-standing":
      'Ich echo d\'<a href="https://www.kalzumeus.com/standing-invitation/" target="_blank" rel="noopener">Standing Invitation</a>:',
    "contact-email":
      "Mini E-Mail folgt em Standard-ETH-Format: erschte Buechstabe vom Vorname + Nachname at ethz.ch.",
    "deanon-featured": "Bekannt us:",
    "deanon-discussed": "Diskutiert uf:",
    "project-cursedchess-desc": "Magsch Schach? Dänn wirsch das hasse!",
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
      "En praktische Guide zu Züridütsch für Änglischsprächigi, gschriebe us minä Notize als Master-Student z'Züri.",
    "project-zurichhousing-desc":
      "Durchsuech di grosse Schwiizer Wohnigs-Plattforme, filter und kartier d'Resultat, und generier massewiis massgschnideti Bewerbige.",
    "project-watchbar-desc":
      "macOS-Menübalke-App zum Verwalte vo dinere YouTube-Watch-Later-Playlist.",
  },

  de: {
    "about-bio":
      'Ich habe einen MSc in Informatik von der <a href="https://ethz.ch/en.html">ETH Zürich</a> mit Schwerpunkt Machine Intelligence und Nebenfach Data Management sowie einen BA in Mathematik und einen BSc in Informatik von der <a href="https://www.washington.edu">University of Washington</a>.',
    "about-research":
      'Meine Forschungsinteressen liegen in KI-Sicherheit und Privatsphäre. Mein neuestes <a href="https://arxiv.org/abs/2602.16800" target="_blank" rel="noopener">mitverfasstes Paper</a> wurde von der <a href="https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2026/05/the-more-you-post-the-easier-you-are-to-unmask.html" target="_blank" rel="noopener">ETH Zürich</a> hervorgehoben und erschien in der <a href="https://www.nytimes.com/2026/03/17/opinion/ai-economy-trump-future.html" target="_blank" rel="noopener">New York Times</a>, im <a href="https://www.theguardian.com/technology/2026/mar/08/ai-hackers-social-media-accounts-study" target="_blank" rel="noopener">Guardian</a>, bei <a href="https://www.bloomberg.com/opinion/articles/2026-03-12/anthropic-isn-t-exaggerating-about-an-ai-panopticon" target="_blank" rel="noopener">Bloomberg</a> und weiteren Medien.',
    "pub-heading": "Publikationen",
    "deanon-featured": "Bekannt aus:",
    "deanon-discussed": "Diskutiert auf:",
    "projects-heading": "Projekte",
    "projects-intro":
      "Kleine Tools, Spiele und Nebenprojekte, die ich zum Spass baue.",
    "project-cursedchess-desc": "Magst du Schach? Dann wirst du das hassen!",
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
      "Ein praktischer Leitfaden zu Züritüütsch für Englischsprachige, geschrieben aus meinen eigenen Notizen als Masterstudent in Zürich.",
    "project-watchbar-desc":
      "macOS-Menüleisten-App zum Verwalten deiner YouTube-Watch-Later-Playlist.",
    "project-zurichhousing-desc":
      "Durchsuche die grossen Schweizer Wohnungsplattformen, filtere und kartiere die Ergebnisse und generiere massenhaft massgeschneiderte Bewerbungen.",
    "contact-heading": "Kontakt",
    "contact-standing":
      'Ich schliesse mich der <a href="https://www.kalzumeus.com/standing-invitation/" target="_blank" rel="noopener">Standing Invitation</a> an:',
    "contact-email":
      "Meine E-Mail folgt dem Standard-ETH-Format: erster Buchstabe des Vornamens + Nachname at ethz.ch.",
  },
};

const HTML_LANG = { ch: "gsw", de: "de", en: "en" };

const originals = {};
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
// The project logos animate on a timer, only while the logo is on screen
// ==========================================================================

// Only one logo animates at a time, so they never fire together
let busyUntil = 0;

function playOccasionally(logo, runFor, offset) {
  const FIRST = [1800, 4000];
  const THEN = [11000, 22000];
  const GAP = 900;

  let timer = null;
  let onScreen = false;
  let seen = false;

  function schedule() {
    clearTimeout(timer);
    if (!onScreen) return;
    const [lo, hi] = seen ? THEN : FIRST;
    const wait = lo + Math.random() * (hi - lo) + (seen ? 0 : offset);
    timer = setTimeout(play, wait);
  }

  function play() {
    const now = Date.now();
    if (now < busyUntil) {
      timer = setTimeout(play, busyUntil - now);
      return;
    }
    busyUntil = now + runFor + GAP;
    seen = true;
    logo.classList.add("is-playing");
    setTimeout(() => logo.classList.remove("is-playing"), runFor);
    schedule();
  }

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
    [".wm-iam", 1700],
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
