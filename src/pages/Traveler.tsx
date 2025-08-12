'use client'
import React, { useEffect } from 'react'
import PageHeader from '@/components/PageHeader'
import { useJamesStore } from '@/lib/store'
import { Card, Button, Pill } from '@/components/ui'
import { copy } from '@/lib/copy'
import { Tour } from '@/components/Tour'
import { tourStepsTraveler } from '@/lib/tour'
import { imageForTip } from '@/lib/images'

export default function Traveler() {
  const { trips, itinerary, checklists, actions, phase, tips } = useJamesStore()
  const trip = trips[0]
  const openActions = actions.filter(a => a.status !== 'rejeitada')

  useEffect(() => {
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', 'Área do viajante: ações, itinerário e checklist')
  }, [])

  return (
      <div className="space-y-4">
      <PageHeader
        title="Viaje leve. O James cuida."
        subtitle="Assistente proativo, tecnologia discreta."
        cta={<Pill>Fase: {phase}</Pill>}
      />

      <Card className="bg-white/90 backdrop-blur">
        <h3 className="h-2 mb-2">Ações do James</h3>
        <ul className="space-y-2">
          {openActions.map(a => (
            <li key={a.id} className="p-3 rounded-xl border">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium">{a.titulo}</div>
                  <div className="text-sm text-gray-600">{a.justificativa}</div>
                  <div className="text-xs text-gray-500 mt-1">{copy.labels.explainWhy}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Status: {a.status === 'aprovada' ? 'Aprovada pelo consultor' : 'Aguardando aprovação'}
                  </div>
                </div>
                <Button disabled variant={a.status === 'aprovada' ? 'secondary' : 'primary'}>
                  {a.status === 'aprovada' ? 'Confirmado' : 'Pendente'}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="bg-white/90 backdrop-blur">
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

      <Card className="bg-white/90 backdrop-blur">
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

      <Card className="bg-white/90 backdrop-blur">
        <h3 className="font-semibold mb-2">Dicas perto de você</h3>
        <ul className="grid sm:grid-cols-2 gap-3">
          {tips.slice(0,2).map(t => (
            <li key={t.id} className="p-2 rounded-xl bg-brand-muted">
              {(() => {
                const src = imageForTip(t.tag, t.titulo)
                return src ? <img src={src} alt={t.titulo} loading="lazy" className="h-24 w-full object-cover rounded-lg mb-2" /> : null
              })()}
              <div className="font-medium">{t.titulo}</div>
              <div className="text-xs text-gray-600">{t.texto}</div>
            </li>
          ))}
        </ul>
      </Card>

      <Tour steps={tourStepsTraveler} />
    </div>
  )
}
