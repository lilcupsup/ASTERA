import { getLanguage, getLocale, setLanguage, type Language } from "./locale";
import { russian } from "./translations";

const dictionary = new Map(Object.entries(russian));
for (const [en, ru] of Object.entries(russian)) {
  if (en.toUpperCase() !== en)
    dictionary.set(en.toUpperCase(), ru.toUpperCase());
}
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const phrases = new RegExp(
  `(?<![\\p{L}\\p{N}])(?:${Array.from(dictionary.keys())
    .sort((a, b) => b.length - a.length)
    .map(escape)
    .join("|")})(?![\\p{L}\\p{N}])`,
  "gu",
);

// The authored English copy is the canonical source. Keep individual text nodes
// and attributes so changing language never replaces controls, focus or WebGL.
type Source = { original: string; rendered: string };
const textSources = new WeakMap<Text, Source>();
const attributeSources = new WeakMap<Element, Map<string, Source>>();
const excluded = "script,style,svg,select,textarea,[data-no-localize]";
const attributes = ["aria-label", "alt", "title", "placeholder"];

export function translate(source: string, language: Language = getLanguage()) {
  if (language === "en") return source;
  const key = source.trim().replace(/\s+/g, " ");
  const exact = dictionary.get(key);
  let translated =
    exact !== undefined
      ? source.replace(source.trim(), exact)
      : source.replace(phrases, (match) => dictionary.get(match)!);
  translated = translated.replace(/\$[\d,]+/g, (value) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(value.replace(/[$,]/g, ""))),
  );
  translated = translated.replace(/\b\d{4}-\d{2}-\d{2}\b/g, (value) =>
    new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(`${value}T12:00:00`)),
  );
  translated = translated.replace(/\btotal\b/g, "всего");
  return translated;
}

function localize(root: Node) {
  if (!(
    root instanceof Element ||
    root instanceof Text ||
    root instanceof Document
  ))
    return;
  const localizeText = (node: Text) => {
    if (
      !node.parentElement ||
      node.parentElement.closest(excluded) ||
      !node.data.trim()
    )
      return;
    const current = node.data;
    const previous = textSources.get(node);
    const original =
      previous?.rendered === current ? previous.original : current;
    const rendered = translate(original);
    textSources.set(node, { original, rendered });
    if (current !== rendered) node.data = rendered;
  };
  if (root instanceof Text) {
    localizeText(root);
    return;
  }
  if (root instanceof Element && root.closest(excluded)) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) localizeText(node as Text);
  const elements = Array.from(
    root.querySelectorAll(attributes.map((a) => `[${a}]`).join(",")),
  );
  if (root instanceof Element) elements.unshift(root);
  for (const element of elements) {
    if (element.closest(excluded)) continue;
    const sources = attributeSources.get(element) ?? new Map<string, Source>();
    for (const attribute of attributes) {
      const current = element.getAttribute(attribute);
      if (!current) continue;
      const previous = sources.get(attribute);
      const original =
        previous?.rendered === current ? previous.original : current;
      const rendered = translate(original);
      sources.set(attribute, { original, rendered });
      if (current !== rendered) element.setAttribute(attribute, rendered);
    }
    attributeSources.set(element, sources);
  }
}

export function initLocalization() {
  const control = document.querySelector<HTMLElement>(".language-switch")!;
  const buttons =
    control.querySelectorAll<HTMLButtonElement>("[data-language]");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const transitions = new Set<Animation>();
  const observer = new MutationObserver((records) => {
    observer.disconnect();
    const roots = new Set<Node>();
    for (const record of records) {
      if (record.type === "childList")
        record.addedNodes.forEach((node) => roots.add(node));
      else roots.add(record.target);
    }
    roots.forEach(localize);
    observe();
  });
  const observe = () =>
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: attributes,
    });
  const update = () => {
    document.documentElement.lang = getLanguage();
    document.title = translate("ASTERA — Beyond Ordinary Horizons");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        translate(
          "ASTERA — Beyond Ordinary Horizons. A fictional vision of interplanetary travel and exceptional hospitality.",
        ),
      );
    control.setAttribute(
      "aria-label",
      getLanguage() === "ru" ? "Язык сайта" : "Site language",
    );
    buttons.forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.language === getLanguage()),
      ),
    );
  };
  const switchTo = (language: Language) => {
    if (language === getLanguage()) return;
    transitions.forEach((animation) => animation.cancel());
    observer.disconnect();
    setLanguage(language);
    update();
    document.dispatchEvent(
      new CustomEvent("astera:languagechange", {
        detail: { language, locale: getLocale() },
      }),
    );
    localize(document.body);
    observe();
    if (!motion.matches) {
      document
        .querySelectorAll<HTMLElement>(
          ".hero-copy,.resort-preview,.section-heading,.center-heading,.philosophy-heading,.app-copy,.prive-copy,.final-copy,.fleet-info,.destination-card,.crew-card,.interior-caption,.booking-field,.booking-bottom,#dialog-content,footer",
        )
        .forEach((element) => {
          const r = element.getBoundingClientRect();
          if (r.bottom <= 0 || r.top >= innerHeight || !r.width) return;
          const animation = element.animate(
            [
              { opacity: 0.45, translate: "0 6px", filter: "blur(1px)" },
              { opacity: 1, translate: "0 0", filter: "blur(0)" },
            ],
            { duration: 460, easing: "cubic-bezier(.16,1,.3,1)" },
          );
          transitions.add(animation);
          animation.onfinish = animation.oncancel = () =>
            transitions.delete(animation);
        });
    }
    document.querySelector(".language-status")!.textContent =
      language === "ru" ? "Выбран русский язык" : "English selected";
  };
  buttons.forEach((button) =>
    button.addEventListener("click", () =>
      switchTo(button.dataset.language as Language),
    ),
  );
  motion.addEventListener("change", () => {
    if (motion.matches) transitions.forEach((animation) => animation.cancel());
  });
  update();
  // Locale-aware controls refresh their dates before the first translated frame.
  document.dispatchEvent(new CustomEvent("astera:languagechange"));
  localize(document.body);
  observe();
  window.addEventListener(
    "pagehide",
    () => {
      observer.disconnect();
      transitions.forEach((animation) => animation.cancel());
    },
    { once: true },
  );
}
