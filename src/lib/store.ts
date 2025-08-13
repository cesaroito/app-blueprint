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
import { determineIntent, nlgReply } from './nlg'
import { parseSlash } from './chat'

export type Phase = 'N-90' | 'N-60' | 'N-30' | 'DIA1' | 'DIA3' | 'POS'
export type ChatMessage = { id: string; role: 'user'|'assistant'; text: string; ts: string }
interface JamesState {
  now: string; phase: Phase; autoApprove: boolean;
  users: User[]; trips: Trip[]; itinerary: ItineraryItem[]; checklists: ChecklistItem[]; tips: Tip[]; events: DemoEvent[]; catalog: Catalog;
  actions: ActionProposal[]; logs: { id: string; text: string; at: string }[]; chat: ChatMessage[];
  fireEventById: (id: string) => void; approveAction: (id: string, consultantId: string) => void; rejectAction: (id: string, consultantId: string) => void;
  askJames: (text: string) => void; addMessage: (m: ChatMessage) => void;
  moveToPhase: (p: Phase) => void; reset: () => void
}

const initialNow = new Date().toISOString()
const baseData = { users: usersJson as User[], trips: tripsJson as Trip[], itinerary: itineraryJson as ItineraryItem[], checklists: checklistsJson as ChecklistItem[], tips: tipsJson as Tip[], events: eventsJson as DemoEvent[], catalog: catalogJson as Catalog }

export const useJamesStore = create<JamesState>()(
  persist(
    (set, get) => ({
      now: initialNow, phase: 'N-90', autoApprove: false, ...baseData, actions: [], logs: [], chat: [{ id:'a_welcome', role:'assistant', text:'Olá! Estou aqui para garantir uma viagem leve. Pergunte pelo **plano de hoje** ou use /chuva, /fila, /greve.', ts: new Date().toISOString() }],
      addMessage: (m) => set({ chat: [...get().chat, m] }),
      askJames: (text) => {
        const s = get()
        // Slash commands disparam eventos
        const { eventId } = parseSlash(text)
        if (eventId) s.fireEventById(eventId)

        const userMsg: ChatMessage = { id: `u_${Date.now()}`, role: 'user', text, ts: new Date().toISOString() }
        const typing: ChatMessage = { id: `t_${Date.now()}`, role: 'assistant', text: 'Digitando…', ts: new Date().toISOString() }
        set({ chat: [...s.chat, userMsg, typing] })

        // Contexto mínimo p/ NLG
        const next = s.itinerary.find(i => i.quando >= s.now)
        const ctx = {
          phase: s.phase,
          nextTitle: next?.titulo,
          nextTime: next ? new Date(next.quando).toLocaleTimeString() : undefined,
          hasPendingAction: s.actions.some(a => a.status === 'proposta'),
          city: 'Roma'
        }
        const intent = determineIntent(text)
        const reply = nlgReply(intent, ctx)

        setTimeout(() => {
          const after = get().chat.filter(m => m.id !== typing.id)
          const bot: ChatMessage = { id: `a_${Date.now()}`, role: 'assistant', text: reply, ts: new Date().toISOString() }
          set({ chat: [...after, bot] })
        }, 500)
      },
      fireEventById: (id) => {
        const s = get(); const ev = s.events.find(e => e.id === id); if (!ev) return
        let proposals = [
          ...ruleWeatherAdjust(ev, s.itinerary, s.catalog),
          ...ruleQueueMitigation(ev),
          ...ruleTrainStrike(ev, s.catalog)
        ]
        
        // Auto-approve if enabled
        if (s.autoApprove) {
          proposals = proposals.map(p => ({
            ...p,
            status: 'aprovada' as const,
            decidedBy: 'auto-system',
            decidedAt: new Date().toISOString()
          }))
        }
        
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
      reset: () => set({ ...baseData, actions: [], logs: [], phase: 'N-90', now: initialNow, autoApprove: false })
    }),
    { name: 'james_demo_state_v1' }
  )
)
