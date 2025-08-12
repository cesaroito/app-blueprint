import React from 'react'
import { useJamesStore } from '@/lib/store'
import { Card, Button, SectionTitle } from '@/components/ui'
import { quickReplies } from '@/lib/chat'

export default function Chat(){
  const { chat, askJames, phase } = useJamesStore()
  const [text,setText] = React.useState('')
  const replies = quickReplies(phase)

  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-6 text-brand-foreground" style={{background:'var(--brand-gradient)'}}>
        <h1 className="text-2xl font-bold">Chat do James</h1>
        <p className="opacity-90">Pergunte e eu cuido nos bastidores.</p>
      </div>

      <Card>
        <SectionTitle>Conversa</SectionTitle>
        <div className="space-y-2 max-h-[50vh] overflow-auto pr-2">
          {chat.map(m=>((
            <div key={m.id} className={`text-sm flex ${m.role==='user'?'justify-end':''}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.role==='user'?'bg-brand-secondary text-white':'bg-white border'}`}>
                <div dangerouslySetInnerHTML={{__html: m.text.replace(/\*\*(.*?)\*\*/g,'<b>$1</b>')}} />
              </div>
            </div>
          )))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {replies.map(r=>(<Button key={r} variant="ghost" onClick={()=>askJames(r)}>{r}</Button>))}
        </div>
        <form className="mt-3 flex gap-2" onSubmit={e=>{e.preventDefault(); if(text.trim()) { askJames(text); setText('') }}}>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Digite aqui… (/chuva, /fila, /greve)"
                 className="flex-1 px-3 py-2 rounded-2xl border bg-white" />
          <Button type="submit">Enviar</Button>
        </form>
      </Card>
    </div>
  )
}
