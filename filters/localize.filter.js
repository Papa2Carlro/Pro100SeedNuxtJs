import Ru from '@/locales/ru-RU/index'
import En from '@/locales/en-EN/index'

const locales = {ru: Ru, en: En}

console.log(locales)
export default function localize (key, locale) {
  // return `[locale: ${locale}, key: ${key}]`
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}
