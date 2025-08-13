import { ReactNode } from 'react'
export default function PageHeader({title,subtitle,cta}:{title:string;subtitle?:string;cta?:ReactNode}){
  return (
    <div className="rounded-2xl p-8 mesh-bg shadow-elev">
      <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      {subtitle && <p className="opacity-80 mt-1">{subtitle}</p>}
      {cta && <div className="mt-4">{cta}</div>}
    </div>
  )
}
