import { createContentLoader } from 'vitepress'

export interface ReportEntry {
  url: string
  source: 'github' | 'arxiv'
  period: 'daily' | 'weekly' | 'monthly'
  /** Raw filename without extension, e.g. "2026-05-03", "2026-W18", "2026-05" */
  slug: string
  /** Display label in archive list — derived from slug. */
  label: string
  /** ISO-ish sortable string. For weekly we map to the Monday of that ISO week. */
  date: string
  year: number
}

function isoWeekToDate(year: number, week: number): Date {
  // ISO week 1 = the week with the first Thursday.
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7))
  const dow = simple.getUTCDay() || 7
  const monday = new Date(simple)
  if (dow <= 4) {
    monday.setUTCDate(simple.getUTCDate() - dow + 1)
  } else {
    monday.setUTCDate(simple.getUTCDate() + 8 - dow)
  }
  return monday
}

function parseEntry(rawUrl: string): ReportEntry | null {
  // rawUrl looks like "/reports/github/daily/2026/2026-05-03"
  const match = rawUrl.match(
    /^\/reports\/(github|arxiv)\/(daily|weekly|monthly)\/(\d{4})\/([^/]+)$/,
  )
  if (!match) return null
  const [, source, period, , slug] = match as unknown as [
    string,
    'github' | 'arxiv',
    'daily' | 'weekly' | 'monthly',
    string,
    string,
  ]

  let date: string
  let label: string
  let year: number

  if (period === 'daily') {
    const m = slug.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (!m) return null
    year = Number(m[1])
    date = `${m[1]}-${m[2]}-${m[3]}T00:00:00Z`
    label = slug
  } else if (period === 'weekly') {
    const m = slug.match(/^(\d{4})-W(\d{2})$/)
    if (!m) return null
    year = Number(m[1])
    const monday = isoWeekToDate(year, Number(m[2]))
    date = monday.toISOString()
    label = `${m[1]} 第 ${m[2]} 周`
  } else {
    const m = slug.match(/^(\d{4})-(\d{2})$/)
    if (!m) return null
    year = Number(m[1])
    date = `${m[1]}-${m[2]}-01T00:00:00Z`
    label = `${m[1]}-${m[2]}`
  }

  return { url: rawUrl, source, period, slug, label, date, year }
}

export default createContentLoader('reports/*/*/*/*.md', {
  transform(rawData): ReportEntry[] {
    return rawData
      .map((page) => parseEntry(page.url))
      .filter((entry): entry is ReportEntry => entry !== null)
      .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  },
})

declare const data: ReportEntry[]
export { data }
