export default function Callout({children}:{children:React.ReactNode}){
  return (
    <div className="border-2 border-brand-secondary/60 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 shadow-elev">
      <div className="text-brand-secondary text-xs font-semibold uppercase tracking-wide">Destaque</div>
      <div className="text-sm">{children}</div>
    </div>
  )
}
