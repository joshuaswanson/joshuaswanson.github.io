// ==========================================================================
// Swiss German (Züridütsch) language toggle
// ==========================================================================

const chTranslations = {
  "masthead-role": "Forschig i KI-Sicherheit und Privatsphäri",
  "masthead-affiliation": "MSc Informatik, ETH Züri",
  "about-bio":
    'Ich han en MSc i Informatik vo de <a href="https://ethz.ch/en.html">ETH Züri</a>, mit Schwerpunkt Machine Intelligence und Minor i Data Management, und en BA i Mathematik und en BSc i Informatik vo de <a href="https://www.washington.edu">University of Washington</a>.',
  "about-research":
    'Mini Forschigsintresse sind i KI-Sicherheit und Privatsphäri. Mis nöischte <a href="https://arxiv.org/abs/2602.16800" target="_blank" rel="noopener">mitverfasste Paper</a> isch vo de <a href="https://inf.ethz.ch/news-and-events/spotlights/infk-news-channel/2026/05/the-more-you-post-the-easier-you-are-to-unmask.html" target="_blank" rel="noopener">ETH Züri</a> uufghoben worde und isch i de <a href="https://www.nytimes.com/2026/03/17/opinion/ai-economy-trump-future.html" target="_blank" rel="noopener">New York Times</a>, em <a href="https://www.theguardian.com/technology/2026/mar/08/ai-hackers-social-media-accounts-study" target="_blank" rel="noopener">Guardian</a>, <a href="https://www.bloomberg.com/opinion/articles/2026-03-12/anthropic-isn-t-exaggerating-about-an-ai-panopticon" target="_blank" rel="noopener">Bloomberg</a>, und anderne vorcho.',
  "pub-heading": "Publikatione",
  "pub-intro": "S'komplette Wärk.",
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
