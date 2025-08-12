'use client'
import { useJamesStore } from '@/lib/store'
import { Card, Button, SectionTitle } from '@/components/ui'
import { Tour } from '@/components/Tour'
import { tourStepsConsultant } from '@/lib/tour'
import { toast } from 'sonner'

export default function Consultant() {
  const { actions, approveAction, rejectAction, users } = useJamesStore()
  const me = users.find(u => u.perfil === 'consultor')!
  const pending = actions.filter(a => a.status === 'proposta')
  const decided = actions.filter(a => a.status !== 'proposta')

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Fila do Consultor</h1>
        <p className="text-sm text-gray-600">Orquestração com aprovação humana.</p>
      </div>

      <Card>
        <SectionTitle>Propostas pendentes</SectionTitle>
        {pending.length === 0 && (
          <div className="text-sm text-gray-500">Nenhuma proposta.</div>
        )}
        {pending.map(a => (
          <div key={a.id} className="py-3 border-b last:border-none flex items-center justify-between hover:bg-brand-muted rounded-lg px-3 transition-colors">
            <div>
              <div className="font-medium">{a.titulo}</div>
              <div className="text-sm text-gray-600">{a.justificativa}</div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => { approveAction(a.id, me.id); toast.success('Ação aprovada'); }}>Aprovar</Button>
              <Button variant="secondary" onClick={() => { rejectAction(a.id, me.id); toast.error('Ação rejeitada'); }} className="bg-danger text-white">Rejeitar</Button>
            </div>
          </div>
        ))}
      </Card>

      <Card>
        <SectionTitle>Decisões</SectionTitle>
        {decided.length === 0 && (
          <div className="text-sm text-gray-500">Sem decisões ainda.</div>
        )}
        {decided.map(a => (
          <div key={a.id} className="py-2 text-sm">
            <span className="font-medium">{a.titulo}</span> — {a.status} em {new Date(a.decidedAt!).toLocaleString()}
          </div>
        ))}
      </Card>

      <Tour steps={tourStepsConsultant} />
    </div>
  )
}
