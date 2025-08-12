import React from 'react'
import { useJamesStore } from '@/lib/store'
import { Button, Pill } from '@/components/ui'

export default function Stage(){
  const { chat, askJames, fireEventById, moveToPhase, phase } = useJamesStore()

  React.useEffect(()=>{ document.documentElement.style.overflow='hidden'; return ()=>{document.documentElement.style.overflow=''} },[])
  const key = (e: KeyboardEvent) => {
    if (e.key==='1') moveToPhase('N-90')
    if (e.key==='2') moveToPhase('DIA1')
    if (e.key==='3') { moveToPhase('DIA3'); fireEventById('ev_train_partial_strike') }
    if (e.key==='ArrowRight') askJames('Qual o plano para hoje?')
  }
  React.useEffect(()=>{ window.addEventListener('keydown', key as any); return ()=>window.removeEventListener('keydown', key as any) },[])

  return (
    <div className="fixed inset-0 bg-black">
      <div className="absolute inset-0" style={{background:'var(--brand-gradient)', opacity:.25}}/>
      <div className="relative h-full mx-auto max-w-5xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-white text-2xl font-bold drop-shadow">James • Palco</h1>
          <Pill>{phase}</Pill>
          <div className="ml-auto flex gap-2">
            <Button className="bg-white/90" onClick={()=>askJames('Qual o plano para hoje?')}>Plano</Button>
            <Button className="bg-white/90" onClick={()=>fireEventById('ev_weather_light_drizzle')}>Chuva</Button>
            <Button className="bg-white/90" onClick={()=>fireEventById('ev_vatican_queue_high')}>Fila</Button>
            <Button className="bg-white/90" onClick={()=>{ moveToPhase('DIA3'); fireEventById('ev_train_partial_strike') }}>Greve</Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto rounded-2xl bg-white/95 p-4 space-y-2">
          {chat.map(m=>(
            <div key={m.id} className={`text-lg flex ${m.role==='user'?'justify-end':''}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${m.role==='user'?'bg-brand-secondary text-white':'bg-white border'} shadow`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-white/80">Atalhos: 1=N-90 • 2=Dia1 • 3=Dia3+Greve • → = Perguntar Plano</div>
      </div>
    </div>
  )
}
