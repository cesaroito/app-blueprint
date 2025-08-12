import React from 'react';
import PageHeader from '@/components/PageHeader'
import Callout from '@/components/Callout'
import { motion, AnimatePresence } from 'framer-motion'
import { imageForItinerary } from '@/lib/images';
import { useJamesStore } from "@/lib/store";
import { Card, Button, Pill, SectionTitle } from "@/components/ui";


const steps = [
  { name: "Pré-embarque N-90", run: (s: any) => s.moveToPhase("N-90") },
  { name: "N-60", run: (s: any) => s.moveToPhase("N-60") },
  { name: "N-30", run: (s: any) => s.moveToPhase("N-30") },
  {
    name: "Dia 1: Chuva",
    run: (s: any) => {
      s.moveToPhase("DIA1");
      s.fireEventById("ev_weather_light_drizzle");
    },
  },
  { name: "Fila Vaticano", run: (s: any) => s.fireEventById("ev_vatican_queue_high") },
  {
    name: "Dia 3: Greve Trem",
    run: (s: any) => {
      s.moveToPhase("DIA3");
      s.fireEventById("ev_train_partial_strike");
    },
  },
] as const;

const notes = [
  'N-90: checklists críticos (vacina, seguro) criados automaticamente.',
  'N-60: reserva especial sugerida com base em preferências.',
  'N-30: mala e documentos — status verde.',
  'Dia 1 com chuva: troca para Borghese + ingresso sem fila.',
  'Fila Vaticana: remarcação inteligente com fast track.',
  'Dia 3: greve do trem → Italo 10h10 + transfer.'
]

const Present: React.FC = () => {
  const s = useJamesStore();
  const { trips, itinerary, actions, phase } = s;
  const trip = trips?.[0];
  const [idx, setIdx] = React.useState(0);
  const step = steps[idx];

  React.useEffect(() => {
    // SEO title for this stage page
    document.title = "Apresentação do Roteiro | James Travel Care";
  }, []);

  React.useEffect(() => {
    step?.run(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <div className="min-h-screen bg-brand-muted text-brand-foreground">
      <div className="container mx-auto mb-6">
        <PageHeader title="Apresentação guiada" subtitle="Mostre o valor em 6 passos. Use Próximo para avançar." cta={<Pill>{phase}</Pill>} />
      </div>

      <main className="container mx-auto pb-10">
        <Card>
          <SectionTitle>Roteiro</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {steps.map((st, i) => (
              <Button key={st.name} onClick={() => setIdx(i)} variant={i === idx ? "secondary" : "ghost"}>
                {i + 1}. {st.name}
              </Button>
            ))}
            <Button onClick={() => setIdx(Math.min(idx + 1, steps.length - 1))} className="ml-auto">
              Próximo
            </Button>
          </div>
          <div className="text-sm text-gray-700 p-3 rounded-xl bg-brand-muted">{notes[idx]}</div>
        </Card>

        <Card>
          <SectionTitle>Ações do James</SectionTitle>
          {actions.length === 0 ? (
            <div className="text-sm text-gray-600">Sem ações no momento.</div>
          ) : (
            <>
              <ul className="text-sm">
                <AnimatePresence>
                  {actions.map((a: any) => (
                    <motion.li
                      key={a.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="py-2 border-b last:border-none flex items-center justify-between"
                      layout
                    >
                      <div>
                        <div className="font-medium">{a.titulo}</div>
                        <div className="text-gray-600">{a.justificativa}</div>
                      </div>
                      <Pill>{a.status ?? "proposta"}</Pill>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-3">
                <Callout>Mostre aqui como a ação aparece primeiro como proposta e só é aplicada após aprovação.</Callout>
              </div>
            </>
          )}
        </Card>

        <Card>
          <SectionTitle>Itinerário (resumo)</SectionTitle>
          <ul className="text-sm grid md:grid-cols-2 gap-2">
            <AnimatePresence>
              {itinerary.slice(0, 4).map((i: any, idx: number) => (
                <motion.li
                  key={i.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="p-2 rounded-lg bg-brand-muted"
                  layout
                >
                  {(() => {
                    const src = imageForItinerary(i.titulo)
                    return src ? <img src={src} alt={i.titulo} className="h-24 w-full object-cover rounded-lg mb-2" /> : null
                  })()}
                  <div className="font-medium">{i.titulo}</div>
                  <div className="text-xs text-gray-600">
                    {new Date(i.quando).toLocaleString()} — {i.local}
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default Present;
