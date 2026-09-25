const withYear = new Intl.DateTimeFormat('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })
const withoutYear = new Intl.DateTimeFormat('uz-UZ', { day: 'numeric', month: 'long' })

// ISO sanani o'qiladigan ko'rinishga keltiradi: "1-avgust, 2026" yoki "1-avgust"
export function formatDate(iso: string, options: { year?: boolean } = {}) {
  const formatter = options.year === false ? withoutYear : withYear
  return formatter.format(new Date(iso))
}
