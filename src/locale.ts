export type Language = "ru" | "en";
let language: Language = "en";
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("astera-language");
    language =
      saved === "ru" || saved === "en"
        ? saved
        : navigator.language.startsWith("ru")
          ? "ru"
          : "en";
  } catch {
    language = navigator.language.startsWith("ru") ? "ru" : "en";
  }
}
export const getLanguage = () => language;
export const getLocale = () => (language === "ru" ? "ru-RU" : "en-GB");
export function setLanguage(value: Language) {
  language = value;
  try {
    localStorage.setItem("astera-language", value);
  } catch {
    /* In-memory selection still works with blocked storage. */
  }
}
