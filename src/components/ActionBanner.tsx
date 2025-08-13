import { Pill } from '@/components/ui'
import { CloudDrizzle, Train, Timer } from 'lucide-react'

export default function ActionBanner({titulo,justificativa,status}:{titulo:string;justificativa:string;status?:string}){
  const Icon = titulo.toLowerCase().includes('trem') ? Train : (titulo.toLowerCase().includes('borghese') ? Timer : CloudDrizzle)
  const tone = status==='aprovada' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
  return (
    <div className={`rounded-2xl p-4 border ${tone} flex items-start gap-3`}>
      <div className="mt-0.5"><Icon size={20}/></div>
      <div className="flex-1">
        <div className="font-medium">{titulo}</div>
        <div className="text-sm opacity-80">{justificativa}</div>
        <div className="mt-1"><Pill>{status==='aprovada'?'Aprovado pelo consultor':'Aguardando aprovação'}</Pill></div>
      </div>
    </div>
  )
}