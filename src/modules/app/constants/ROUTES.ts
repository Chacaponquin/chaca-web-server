export const ROUTES = {
  AUTH: {
    ROOT: "auth",
    GOOGLE: "google",
    GOOGLE_REDIRECT: "google/redirect",
    GITHUB: "github",
    GITHUB_REDIRECT: "github/redirect",
    USER_BY_TOKEN: "userToken",
    SIGN_UP: "signUp",
    SIGN_IN: "signIn",
  },
  API: {
    ROOT: "api",
    SCHEMA: "schema",
    SCHEMA_ARRAY: "schema/array",
    MODULE_OPTION: "/:schema/:option",
  },
  USER_MESSAGE: {
    ROOT: "user-message",
    CREATE_MESSAGE: "new-message",
  },
  WEB_API: {
    ROOT: "web-api",
    DOWNLOAD_FILE: "download-file/:file",
    SCHEMAS: "schemas",
    FILE_CONFIG: "file-config",
    FAQ: "faq",
    NO_USER_LIMITS: "no-user-limits",
  },
} as const;
