import React from "react"
import "@/index.css"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import HttpApi from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import App from "@/App"
import { SnackbarProvider } from "notistack"
import { store } from "@core/store"

const container = document.getElementById("root")!
const root = createRoot(container)
const baseAppApiURL = new URL(
  import.meta.env.REACT_APP_API,
  window.location.origin,
).toString()
i18next
  // подключаем детектор языков
  .use(LanguageDetector)
  // подключаем модуль инициализации
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    // стандартный язык
    fallbackLng: "ru",
    // отладочная информация в консоли
    debug: true,
    // конфигурация бэкенда
    backend: {
      // путь к вашему серверу, где хранятся файлы перевода
      loadPath: (lngs: string) => {
        // Доступ к первой локали из массива lngs и использование только первой части (до дефиса)
        const simplifiedLng = lngs[0].split("-")[0]
        const basePath = baseAppApiURL.endsWith("/")
          ? baseAppApiURL
          : `${baseAppApiURL}/`
        return `${basePath}i18n/${simplifiedLng}/translation.json`
      },
    },
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie"],
      lookupCookie: "i18next",
      cookieMinutes: 10,
      lookupQuerystring: "ln",
      // convertDetectedLanguage: "Iso15897",
    },
    interpolation: {
      escapeValue: false, // не используем экранирование для XSS
    },
  })
  .then(() =>
    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </Provider>
      </React.StrictMode>,
    ),
  )
