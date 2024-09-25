/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: "production" | "development"
  readonly REACT_APP_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
