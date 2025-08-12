import { Card, Button } from '@/components/ui'
export default function Index(){
  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-8 text-brand-foreground" style={{background:'var(--brand-gradient)'}}>
        <h1 className="text-3xl font-bold drop-shadow">James Travel Care – CVC</h1>
        <p className="opacity-90 mt-1">Concierge proativo, tecnologia discreta. Viaje leve.</p>
        <div className="mt-4 flex gap-2">
          <a href="/present"><Button>Modo apresentação</Button></a>
          <a href="/demo"><Button variant="secondary">Console de Cenários</Button></a>
        </div>
        <a href="/chat"><Button variant="ghost">Chat do James</Button></a>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Card><h3 className="font-semibold mb-1">Viajante</h3><p className="text-sm text-gray-600 mb-3">Timeline, ações e dicas.</p><a href="/traveler"><Button variant="ghost">Abrir</Button></a></Card>
        <Card><h3 className="font-semibold mb-1">Consultor</h3><p className="text-sm text-gray-600 mb-3">Aprovação humana.</p><a href="/consultant"><Button variant="ghost">Abrir</Button></a></Card>
        <Card><h3 className="font-semibold mb-1">Demo</h3><p className="text-sm text-gray-600 mb-3">Eventos e fases.</p><a href="/demo"><Button variant="ghost">Abrir</Button></a></Card>
        <Card><h3 className="font-semibold mb-1">Chat</h3><p className="text-sm text-gray-600 mb-3">Converse com o James.</p><a href="/chat"><Button variant="ghost">Abrir</Button></a></Card>
        <Card><h3 className="font-semibold mb-1">Palco</h3><p className="text-sm text-gray-600 mb-3">Tela limpa para apresentação.</p><a href="/stage"><Button variant="ghost">Abrir</Button></a></Card>
      </div>
    </div>
  )
}
