import { DemoEvent, ItineraryItem, Catalog, ActionProposal } from './types'

export function ruleWeatherAdjust(ev: DemoEvent, itinerary: ItineraryItem[], catalog: Catalog): ActionProposal[] {
  if (ev.tipo !== 'weather') return []
  const indoor = catalog.museus[0]
  return [{
    id: `act_${ev.id}_weather`,
    tipo: 'reservar',
    titulo: `Reservar ${indoor.nome} (slot ${indoor.slots[0]})`,
    justificativa: `Clima: ${ev.payload?.intensidade} por ${ev.payload?.duracaoMin}min`,
    precisaAprovacao: true,
    payload: { museuId: indoor.id, slot: indoor.slots[0] },
    status: 'proposta'
  }]
}

export function ruleQueueMitigation(ev: DemoEvent): ActionProposal[] {
  if (ev.tipo !== 'queue' || (ev.payload?.indiceFila ?? 0) <= 80) return []
  return [{
    id: `act_${ev.id}_queue`,
    tipo: 'remarcar',
    titulo: 'Vaticano (fast track) amanhã 08:00',
    justificativa: `Fila alta índice ${ev.payload?.indiceFila}`,
    precisaAprovacao: true,
    payload: { quando: 'amanha_08h00', fastTrack: true },
    status: 'proposta'
  }]
}

export function ruleTrainStrike(ev: DemoEvent, catalog: Catalog): ActionProposal[] {
  if (ev.tipo !== 'strike') return []
  const trem = catalog.trens[0]
  return [{
    id: `act_${ev.id}_strike`,
    tipo: 'remarcar',
    titulo: `Remarcar trem para ${trem.quando} (${trem.operadora})`,
    justificativa: `Greve parcial ${ev.payload?.afetados?.join(', ')}`,
    precisaAprovacao: true,
    payload: { tremId: trem.id },
    status: 'proposta'
  }]
}
