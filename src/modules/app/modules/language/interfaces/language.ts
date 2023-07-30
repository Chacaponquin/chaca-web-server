export type AppLanguages = "es" | "en";

export type LanguageOptions = {
  [key in AppLanguages]: string;
};

export const DEFAULT_LANGUAGE_OPTIONS: LanguageOptions = {
  en: "",
  es: "",
};
