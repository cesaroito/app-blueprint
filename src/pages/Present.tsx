import React from "react";
import { useJamesStore } from "@/lib/store";
import { Card, Button, Pill, SectionTitle } from "@/components/ui";
import { IMG, imageForItinerary } from "@/lib/images";

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
      <div
        className="rounded-none md:rounded-2xl p-8 mb-6 text-brand-foreground"
        style={{ background: "var(--brand-gradient)" }}
      >
        <div className="container mx-auto">
          <img src={IMG.hero} alt="Roma" className="w-full h-56 object-cover rounded-xl mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow">Viaje leve. O James cuida.</h1>
          <div className="mt-2 opacity-90">Concierge proativo, tecnologia discreta.</div>
          {trip && (
            <div className="mt-3">
              <Pill>
                {trip.titulo} — {phase}
              </Pill>
            </div>
          )}
        </div>
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
        </Card>

        <Card>
          <SectionTitle>Ações do James</SectionTitle>
          {actions.length === 0 ? (
            <div className="text-sm text-gray-600">Sem ações no momento.</div>
          ) : (
            <ul className="text-sm">
              {actions.map((a: any) => (
                <li key={a.id} className="py-2 border-b last:border-none flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.titulo}</div>
                    <div className="text-gray-600">{a.justificativa}</div>
                  </div>
                  <Pill>{a.status ?? "proposta"}</Pill>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <SectionTitle>Itinerário (resumo)</SectionTitle>
          <ul className="text-sm grid md:grid-cols-2 gap-2">
            {itinerary.slice(0, 4).map((i: any) => (
              <li key={i.id} className="p-2 rounded-lg bg-brand-muted">
                {(() => {
                  const src = imageForItinerary(i.titulo)
                  return src ? <img src={src} alt={i.titulo} className="h-24 w-full object-cover rounded-lg mb-2" /> : null
                })()}
                <div className="font-medium">{i.titulo}</div>
                <div className="text-xs text-gray-600">
                  {new Date(i.quando).toLocaleString()} — {i.local}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default Present;
