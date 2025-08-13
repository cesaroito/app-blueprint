'use client'
import React, { useEffect } from 'react'
import PageHeader from '@/components/PageHeader'
import ActionBanner from '@/components/ActionBanner'
import { useJamesStore } from '@/lib/store'
import { Card, Button, Pill } from '@/components/ui'
import { copy } from '@/lib/copy'
import { Tour } from '@/components/Tour'
import { tourStepsTraveler } from '@/lib/tour'
import { imageForTip } from '@/lib/images'
import { motion, AnimatePresence } from 'framer-motion'

export default function Traveler() {
  const { trips, itinerary, checklists, actions, phase, tips } = useJamesStore()
  const trip = trips[0]
  const openActions = actions.filter(a => a.status !== 'rejeitada')
  const done = checklists.filter(c=>c.status==='feito').length
  const total = checklists.length

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

      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-4">
          {/* Ações */}
          <Card>
            <h3 className="h-2 mb-2">Ações do James</h3>
            <div className="space-y-3">
              <AnimatePresence>
                {openActions.map(a => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    layout
                  >
                    <ActionBanner 
                      titulo={a.titulo}
                      justificativa={a.justificativa}
                      status={a.status}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>

          {/* Itinerário */}
          <Card>
            <h3 className="h-2 mb-2">Itinerário</h3>
            <ul className="text-sm">
              <AnimatePresence>
                {itinerary.map(i => (
                  <motion.li
                    key={i.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="py-1 border-b last:border-none"
                    layout
                  >
                    <span className="font-medium">{i.titulo}</span>
                    <span className="text-gray-600"> — {new Date(i.quando).toLocaleString()}</span>
                    <div className="text-xs text-gray-500">{i.local}</div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </Card>
        </div>

        <div className="md:col-span-5 space-y-4">
          {/* Resumo da viagem */}
          <Card>
            <h3 className="h-2 mb-2">Resumo da viagem</h3>
            <div className="text-sm">
              <div className="font-medium">{trip?.titulo}</div>
              <div className="text-gray-600">{trip?.destino}</div>
            </div>
          </Card>

          {/* Checklist progress */}
          <Card>
            <h3 className="h-2 mb-2">Checklist</h3>
            <div className="bg-brand-muted h-2 rounded-full overflow-hidden">
              <div className="h-full bg-brand-secondary" style={{width:`${Math.round((done/total)*100)}%`}}/>
            </div>
            <div className="text-xs text-gray-600 mt-1">{done}/{total} concluídos</div>
            <ul className="text-sm mt-3">
              {checklists.map(c => (
                <li key={c.id} className="py-1 border-b last:border-none flex items-center justify-between">
                  <span>{c.titulo}</span>
                  <Pill>{c.status}</Pill>
                </li>
              ))}
            </ul>
          </Card>

          {/* Dicas */}
          <Card>
            <h3 className="h-2 mb-2">Dicas perto de você</h3>
            <ul className="space-y-3">
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
        </div>
      </div>

      <Tour steps={tourStepsTraveler} />
    </div>
  )
}
