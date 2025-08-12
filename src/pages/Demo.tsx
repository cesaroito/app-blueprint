'use client'
import { useJamesStore } from '@/lib/store'
import { Card, Button } from '@/components/ui'

const buttons = [
  { id: 'ev_weather_light_drizzle', label: 'Chuva leve 30m' },
  { id: 'ev_vatican_queue_high', label: 'Fila alta Vaticano' },
  { id: 'ev_train_partial_strike', label: 'Greve parcial (trem)' }
]
const phases = ['N-90', 'N-60', 'N-30', 'DIA1', 'DIA3', 'POS'] as const

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export default function Demo() {
  const { fireEventById, moveToPhase, phase, reset } = useJamesStore()

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
      <h1 className="text-2xl font-semibold">Console de Demonstração</h1>

      <Card>
        <h2 className="font-semibold mb-2">Cenários</h2>
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

      <Card>
        <h2 className="font-semibold mb-2">Linha do tempo</h2>
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
          <Button onClick={handleAutoPlay} variant="secondary">Auto-play Roma (3min)</Button>
          <Button onClick={reset} className="ml-auto bg-white border">Reset Demo</Button>
        </div>
      </Card>
    </div>
  )
}
