'use client'
import React, { useEffect } from 'react'
import { useJamesStore } from '@/lib/store'
import { Card, Button, Pill } from '@/components/ui'
import { copy } from '@/lib/copy'
import { Tour } from '@/components/Tour'
import { tourStepsTraveler } from '@/lib/tour'
import { IMG, imageForTip } from '@/lib/images'

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
      <div className="rounded-2xl p-6 mb-4 text-brand-foreground" style={{background:'var(--brand-gradient)'}}>
        <img src={IMG.hero} alt="Roma" className="w-full h-48 object-cover rounded-xl mb-3 opacity-95" />
        <div className="text-sm opacity-90">Concierge proativo, tecnologia discreta.</div>
      </div>
      <div className="rounded-2xl p-6 mb-4 text-brand-foreground" style={{background:'var(--brand-gradient)'}}>
        <h1 className="text-2xl font-semibold">{copy.slogan}</h1>
        <div className="text-sm opacity-90 mt-1">Assistente proativo, tecnologia discreta.</div>
        <div className="mt-2"><Pill>{trip?.titulo} — {phase}</Pill></div>
      </div>

      {openActions.map(a => (
        <Card key={a.id}>
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

      <Card>
        <h3 className="font-semibold mb-2">Dicas perto de você</h3>
        <ul className="grid sm:grid-cols-2 gap-3">
          {tips.slice(0,2).map(t => (
            <li key={t.id} className="p-2 rounded-xl bg-brand-muted">
              {(() => {
                const src = imageForTip(t.tag, t.titulo)
                return src ? <img src={src} alt={t.titulo} className="h-24 w-full object-cover rounded-lg mb-2" /> : null
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
