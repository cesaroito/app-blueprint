import { Card, SectionTitle } from '@/components/ui'
import { IMG } from '@/lib/images'
export default function Album(){
  const fotos=[IMG.hero, IMG.borghese, IMG.termini, IMG.gelato]
  return (
    <div className="space-y-4">
      <div className="rounded-2xl p-6 text-brand-foreground" style={{background:'var(--brand-gradient)'}}>
        <h1 className="text-2xl font-bold">Álbum da viagem</h1>
        <p className="opacity-90">Momentos que o James ajudou a orquestrar.</p>
      </div>
      <Card>
        <SectionTitle>Galeria</SectionTitle>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {fotos.map((src,i)=>(<img key={i} src={src} alt={`foto ${i+1}`} loading="lazy" onError={(e)=>{(e.currentTarget as HTMLImageElement).src='/placeholder.svg'}} className="w-full h-40 object-cover rounded-xl" />))}
        </div>
      </Card>
      <Card>
        <SectionTitle>Próxima experiência</SectionTitle>
        <div className="text-sm text-gray-600">Pompeia bate-e-volta — <span className="font-medium">-15% clientes James</span></div>
      </Card>
    </div>
  )
}
