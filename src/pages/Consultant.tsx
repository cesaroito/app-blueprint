'use client'
import { useJamesStore } from '@/lib/store'
import { Card, Button } from '@/components/ui'

export default function Consultant() {
  const { actions, approveAction, rejectAction, users } = useJamesStore()
  const me = users.find(u => u.perfil === 'consultor')!
  const pending = actions.filter(a => a.status === 'proposta')
  const decided = actions.filter(a => a.status !== 'proposta')

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Fila do Consultor</h1>

      <Card>
        <h2 className="font-semibold mb-2">Propostas pendentes</h2>
        {pending.length === 0 && (
          <div className="text-sm text-gray-500">Nenhuma proposta.</div>
        )}
        {pending.map(a => (
          <div key={a.id} className="py-3 border-b last:border-none flex items-center justify-between">
            <div>
              <div className="font-medium">{a.titulo}</div>
              <div className="text-sm text-gray-600">{a.justificativa}</div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => approveAction(a.id, me.id)} className="bg-success text-white">Aprovar</Button>
              <Button onClick={() => rejectAction(a.id, me.id)} className="bg-danger text-white">Rejeitar</Button>
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <h2 className="font-semibold mb-2">Decisões</h2>
        {decided.length === 0 && (
          <div className="text-sm text-gray-500">Sem decisões ainda.</div>
        )}
        {decided.map(a => (
          <div key={a.id} className="py-2 text-sm">
            <span className="font-medium">{a.titulo}</span> — {a.status} em {a.decidedAt}
          </div>
        ))}
      </Card>
    </div>
  )
}
