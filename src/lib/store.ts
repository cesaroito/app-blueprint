'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Trip, ItineraryItem, ChecklistItem, Tip, DemoEvent, Catalog, ActionProposal } from './types'
import usersJson from '../../data/users.json'
import tripsJson from '../../data/trips.json'
import itineraryJson from '../../data/itinerary.json'
import checklistsJson from '../../data/checklists.json'
import tipsJson from '../../data/tips.json'
import eventsJson from '../../data/events.json'
import catalogJson from '../../data/catalog.json'
import { ruleWeatherAdjust, ruleQueueMitigation, ruleTrainStrike } from './rules'

export type Phase = 'N-90' | 'N-60' | 'N-30' | 'DIA1' | 'DIA3' | 'POS'
interface JamesState {
  now: string; phase: Phase;
  users: User[]; trips: Trip[]; itinerary: ItineraryItem[]; checklists: ChecklistItem[]; tips: Tip[]; events: DemoEvent[]; catalog: Catalog;
  actions: ActionProposal[]; logs: { id: string; text: string; at: string }[];
  fireEventById: (id: string) => void; approveAction: (id: string, consultantId: string) => void; rejectAction: (id: string, consultantId: string) => void;
  moveToPhase: (p: Phase) => void; reset: () => void
}

const initialNow = new Date().toISOString()
const baseData = { users: usersJson as User[], trips: tripsJson as Trip[], itinerary: itineraryJson as ItineraryItem[], checklists: checklistsJson as ChecklistItem[], tips: tipsJson as Tip[], events: eventsJson as DemoEvent[], catalog: catalogJson as Catalog }

export const useJamesStore = create<JamesState>()(
  persist(
    (set, get) => ({
      now: initialNow, phase: 'N-90', ...baseData, actions: [], logs: [],
      fireEventById: (id) => {
        const s = get(); const ev = s.events.find(e => e.id === id); if (!ev) return
        const proposals = [
          ...ruleWeatherAdjust(ev, s.itinerary, s.catalog),
          ...ruleQueueMitigation(ev),
          ...ruleTrainStrike(ev, s.catalog)
        ]
        set({
          actions: [...s.actions, ...proposals],
          logs: [...s.logs, { id: `log_${id}`, text: `Evento ${id} aplicado`, at: new Date().toISOString() }]
        })
      },
      approveAction: (id, consultantId) => {
        const s = get(); const upd = s.actions.map(a => a.id === id ? { ...a, status: 'aprovada' as const, decidedBy: consultantId, decidedAt: new Date().toISOString() } : a)
        set({ actions: upd, logs: [...s.logs, { id: `log_${id}_ok`, text: `Ação ${id} aprovada`, at: new Date().toISOString() }] })
      },
      rejectAction: (id, consultantId) => {
        const s = get(); const upd = s.actions.map(a => a.id === id ? { ...a, status: 'rejeitada' as const, decidedBy: consultantId, decidedAt: new Date().toISOString() } : a)
        set({ actions: upd, logs: [...s.logs, { id: `log_${id}_no`, text: `Ação ${id} rejeitada`, at: new Date().toISOString() }] })
      },
      moveToPhase: (p) => {
        const map: Record<Phase, string> = {
          'N-90': '2025-07-12T12:00:00-03:00',
          'N-60': '2025-08-11T12:00:00-03:00',
          'N-30': '2025-09-10T12:00:00-03:00',
          'DIA1': '2025-10-11T09:00:00+02:00',
          'DIA3': '2025-10-13T08:00:00+02:00',
          'POS': '2025-10-18T10:00:00-03:00'
        }
        set({ phase: p, now: map[p] })
      },
      reset: () => set({ ...baseData, actions: [], logs: [], phase: 'N-90', now: initialNow })
    }),
    { name: 'james_demo_state_v1' }
  )
)
