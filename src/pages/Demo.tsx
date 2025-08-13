'use client'
import { useJamesStore } from '@/lib/store'
import { Card, Button, Pill } from '@/components/ui'

const buttons = [
  { id: 'ev_weather_light_drizzle', label: 'Chuva leve 30m' },
  { id: 'ev_vatican_queue_high', label: 'Fila alta Vaticano' },
  { id: 'ev_train_partial_strike', label: 'Greve parcial (trem)' }
]
const phases = ['N-90', 'N-60', 'N-30', 'DIA1', 'DIA3', 'POS'] as const

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export default function Demo() {
  const { fireEventById, moveToPhase, phase, reset, autoApprove } = useJamesStore()

  const handleAutoPlay = async () => {
    moveToPhase('N-90'); await delay(400)
    moveToPhase('N-60'); await delay(400)
    moveToPhase('N-30'); await delay(400)
    moveToPhase('DIA1'); fireEventById('ev_weather_light_drizzle'); await delay(600)
    fireEventById('ev_vatican_queue_high'); await delay(600)
    moveToPhase('DIA3'); fireEventById('ev_train_partial_strike')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Console de Demonstração</h1>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" checked={autoApprove} onChange={e=>useJamesStore.setState({autoApprove:e.target.checked})}/>
          Aprovação automática
        </label>
      </div>

      <section className="section">
        <Card>
          <h3 className="h-2">Cenários</h3>
          <div className="flex flex-wrap gap-2">
            {buttons.map(b => (
              <Button
                key={b.id}
                onClick={() => fireEventById(b.id)}
                className="bg-brand-primary text-brand-foreground"
              >
                {b.label}
              </Button>
            ))}
          </div>
        </Card>
      </section>

      <section className="section">
        <Card>
          <h3 className="h-2">Linha do tempo</h3>
          <div className="flex items-center gap-2">
            {phases.map(p => (
              <Button
                key={p}
                onClick={() => moveToPhase(p)}
                className={`${p === phase ? 'bg-brand-secondary text-white' : 'bg-white border'}`}
              >
                {p}
              </Button>
            ))}
            <div className="flex items-center gap-2">
              <Button onClick={handleAutoPlay} variant="secondary">Auto-play Roma</Button>
              <Pill>~3 min</Pill>
            </div>
            <Button onClick={reset} className="ml-auto bg-white border">Reset Demo</Button>
          </div>
          
          <div className="text-sm text-gray-600 mt-3">
            <a href="/consultant" className="text-brand-primary hover:underline">Abrir Consultor</a> • <a href="/present" className="text-brand-primary hover:underline">Abrir Apresentação</a>
          </div>
        </Card>
      </section>
    </div>
  )
}