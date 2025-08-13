import PageHeader from '@/components/PageHeader'
import { Card, Button, Pill, SectionTitle } from '@/components/ui'
import { useJamesStore } from '@/lib/store'
import { imageForItinerary, imageForTip } from '@/lib/images'

export default function Traveler(){
  const { trips, itinerary, checklists, actions, phase, tips } = useJamesStore()
  const trip = trips[0]
  const done = checklists.filter(c=>c.status==='feito').length
  const total = checklists.length

  return (
    <div className="space-y-6">
      <PageHeader title="Viaje leve. O James cuida." subtitle="Assistente proativo, tecnologia discreta." cta={<Pill>Fase: {phase}</Pill>} />
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-4">
          <Card>
            <SectionTitle>Ações do James</SectionTitle>
            {actions.length===0? <div className="text-sm text-gray-600">Sem ações no momento.</div> :
              <div className="space-y-3">
                {actions.map(a=>(
                  <div key={a.id} className={`rounded-2xl p-4 border ${a.status==='aprovada'?'border-success/30 bg-success/5':'border-warning/30 bg-warning/5'}`}>
                    <div className="font-medium">{a.titulo}</div>
                    <div className="text-sm opacity-80">{a.justificativa}</div>
                    <div className="mt-1"><Pill>{a.status==='aprovada'?'Aprovado pelo consultor':'Aguardando aprovação'}</Pill></div>
                  </div>
                ))}
              </div>}
          </Card>

          <Card>
            <SectionTitle>Itinerário</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-3">
              {itinerary.map(i=>(
                <div key={i.id} className="rounded-2xl bg-white/90 backdrop-blur border overflow-hidden">
                  {(() => { const src = imageForItinerary(i.titulo); return src ? <img src={src} alt="" className="h-24 w-full object-cover" /> : null })()}
                  <div className="p-3">
                    <div className="font-medium">{i.titulo}</div>
                    <div className="text-xs text-gray-600">{new Date(i.quando).toLocaleString()} — {i.local}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="md:col-span-5 space-y-4">
          <Card>
            <SectionTitle>Resumo da viagem</SectionTitle>
            <div className="text-sm text-gray-600">{trip.destino}</div>
            <div className="mt-3 bg-brand-muted h-2 rounded-full overflow-hidden">
              <div className="h-full bg-brand-secondary" style={{width:`${Math.round((done/total)*100)||0}%`}}/>
            </div>
            <div className="text-xs text-gray-600 mt-1">{done}/{total} do checklist concluídos</div>
          </Card>

          <Card>
            <SectionTitle>Checklist</SectionTitle>
            <ul className="text-sm">
              {checklists.map(c=>(
                <li key={c.id} className="py-2 border-b last:border-none flex items-center justify-between">
                  <span>{c.titulo}</span><Pill>{c.status}</Pill>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionTitle>Dicas perto de você</SectionTitle>
            <ul className="grid gap-3">
              {tips.slice(0,2).map(t=>(
                <li key={t.id} className="rounded-xl bg-brand-muted overflow-hidden">
                  {(() => { const src = imageForTip(t.tag, t.titulo); return src ? <img src={src} alt={t.titulo} className="h-24 w-full object-cover" /> : null })()}
                  <div className="p-2">
                    <div className="font-medium">{t.titulo}</div>
                    <div className="text-xs text-gray-600">{t.texto}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}