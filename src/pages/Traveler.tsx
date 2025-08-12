'use client'
import { useEffect } from 'react'
import { useJamesStore } from '@/lib/store'
import { Card, Button, Pill } from '@/components/ui'
import { copy } from '@/lib/copy'
import { Tour } from '@/components/Tour'
import { tourStepsTraveler } from '@/lib/tour'

export default function Traveler() {
  const { trips, itinerary, checklists, actions, phase } = useJamesStore()
  const trip = trips[0]
  const openActions = actions.filter(a => a.status !== 'rejeitada')

  useEffect(() => {
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Área do viajante: ações, itinerário e checklist')
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">
        {trip?.titulo} <Pill>{phase}</Pill>
      </h1>

      <Card>
        <h2 className="font-semibold mb-2">{copy.slogan}</h2>
        <p className="text-sm text-gray-600">Assistente proativo, tecnologia discreta.</p>
      </Card>

      {openActions.map(a => (
        <Card key={a.id}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-medium">{a.titulo}</div>
              <div className="text-sm text-gray-600">{a.justificativa}</div>
              <div className="text-xs text-gray-500 mt-1">
                Status: {a.status === 'aprovada' ? 'Aprovada pelo consultor' : 'Aguardando aprovação'}
              </div>
            </div>
            <Button disabled className="bg-brand-primary text-brand-foreground">
              {a.status === 'aprovada' ? 'Confirmado' : 'Pendente'}
            </Button>
          </div>
        </Card>
      ))}

      <Card>
        <h3 className="font-semibold mb-2">Itinerário</h3>
        <ul className="text-sm">
          {itinerary.map(i => (
            <li key={i.id} className="py-1 border-b last:border-none">
              <span className="font-medium">{i.titulo}</span>
              <span className="text-gray-600"> — {new Date(i.quando).toLocaleString()}</span>
              <div className="text-xs text-gray-500">{i.local}</div>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h3 className="font-semibold mb-2">Checklist</h3>
        <ul className="text-sm">
          {checklists.map(c => (
            <li key={c.id} className="py-1 border-b last:border-none flex items-center justify-between">
              <span>{c.titulo}</span>
              <Pill>{c.status}</Pill>
            </li>
          ))}
        </ul>
      </Card>

      <Tour steps={tourStepsTraveler} />
    </div>
  )
}
