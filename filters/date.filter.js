export default function dateFilter (value, locale = 'en') {
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }

  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}
