import { Card, SectionTitle, Pill } from '@/components/ui'
import { useJamesStore } from '@/lib/store'
export default function Metrics(){
  const { actions } = useJamesStore()
  const total=actions.length
  const aprovadas=actions.filter(a=>a.status==='aprovada').length
  const taxa = total? Math.round((aprovadas/total)*100) : 0
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-6 text-brand-foreground" style={{background:'var(--brand-gradient)'}}>
        <h1 className="text-2xl font-bold">Métricas</h1>
        <div className="mt-1 opacity-90">Adoção de ações proativas</div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card><SectionTitle>Sugestões totais</SectionTitle><div className="text-3xl font-bold">{total}</div></Card>
        <Card><SectionTitle>Aprovadas</SectionTitle><div className="text-3xl font-bold">{aprovadas}</div></Card>
        <Card><SectionTitle>Taxa de adoção</SectionTitle><div className="text-3xl font-bold">{taxa}%</div></Card>
      </div>
      <Pill>Simulado (sem fontes externas)</Pill>
    </div>
  )
}
