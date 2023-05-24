import { createI18n } from "vue-i18n"
import en from "@/locales/en.json"
import fr from "@/locales/fr.json"

export default createI18n({
  locale: "",
  fallbackLocale: "en",
  messages: {
    en,
    fr,
  }
})