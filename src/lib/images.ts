export const IMG = {
  hero: '/images/hero-casal.png',
  borghese: '/images/borghese.png',
  termini: '/images/termini.png',
  gelato: '/images/gelato.png',
} as const

export function imageForItinerary(title: string): string | undefined {
  const t = title.toLowerCase()
  if (t.includes('borghese')) return IMG.borghese
  if (t.includes('roma → florença') || t.includes('trem')) return IMG.termini
  return undefined
}

export function imageForTip(tag: string, title: string): string | undefined {
  const tg = (tag || '').toLowerCase()
  const ttl = (title || '').toLowerCase()
  if (tg.includes('gelato') || ttl.includes('gelato') || ttl.includes('otaleg')) return IMG.gelato
  if (ttl.includes('borghese')) return IMG.borghese
  return IMG.hero
}
