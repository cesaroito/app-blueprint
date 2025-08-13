import PageHeader from '@/components/PageHeader'
import { Card, Button } from '@/components/ui'

export default function Index(){
  return (
    <div className="space-y-8">
      <PageHeader
        title="James Travel Care – CVC"
        subtitle="Concierge proativo, tecnologia discreta. Viaje leve."
        cta={<div className="flex gap-2">
          <a href="/present"><Button>Modo apresentação</Button></a>
          <a href="/demo"><Button variant="secondary">Console</Button></a>
          <a href="/chat"><Button variant="ghost">Chat</Button></a>
        </div>}
      />
      <div className="grid md:grid-cols-3 gap-4">
        <Card><div className="h-24 grid-bg rounded-2xl mb-3" /><h3 className="font-semibold mb-1">Viajante</h3><p className="text-sm text-gray-600 mb-3">Timeline, ações, dicas.</p><a href="/traveler"><Button variant="ghost">Abrir</Button></a></Card>
        <Card><div className="h-24 grid-bg rounded-2xl mb-3" /><h3 className="font-semibold mb-1">Consultor</h3><p className="text-sm text-gray-600 mb-3">Aprovação humana.</p><a href="/consultant"><Button variant="ghost">Abrir</Button></a></Card>
        <Card><div className="h-24 grid-bg rounded-2xl mb-3" /><h3 className="font-semibold mb-1">Métricas</h3><p className="text-sm text-gray-600 mb-3">Adoção (simulado).</p><a href="/metrics"><Button variant="ghost">Abrir</Button></a></Card>
      </div>
    </div>
  )
}
