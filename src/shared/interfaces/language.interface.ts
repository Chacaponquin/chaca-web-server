export type AppLanguages = "es" | "en";

export type LanguageOptions = {
  [key in AppLanguages]: string;
};
