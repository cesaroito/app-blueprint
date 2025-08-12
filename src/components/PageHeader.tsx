import { ReactNode } from 'react'

export default function PageHeader({ title, subtitle, cta }: { title: string; subtitle?: string; cta?: ReactNode }) {
  return (
    <header className="mesh-bg rounded-xxl p-8 text-brand-foreground shadow-elev">
      <h1 className="h-display mb-2">{title}</h1>
      {subtitle ? <p className="opacity-90 mb-4">{subtitle}</p> : null}
      {cta ? <div className="flex flex-wrap gap-2">{cta}</div> : null}
    </header>
  )
}
