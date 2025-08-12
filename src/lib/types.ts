export type Perfil = 'viajante' | 'consultor'
export interface User { id: string; nome: string; perfil: Perfil }
export interface TripWindow { inicio: string; fim: string }
export interface Hotel { nome: string; endereco: string }
export type TripStatus = 'planejada' | 'em_curso' | 'concluida'
export interface Trip { id: string; titulo: string; viajantes: string[]; janela: TripWindow; status: TripStatus; destino: string; hotel?: Hotel; preferencias?: Record<string, boolean> }
export type ItineraryTipo = 'voo' | 'trem' | 'museu' | 'passeio' | 'transfer'
export interface ItineraryItem { id: string; tripId: string; tipo: ItineraryTipo; titulo: string; quando: string; local: string; meta?: Record<string, any> }
export type ChecklistStatus = 'aberto' | 'feito'
export interface ChecklistItem { id: string; tripId: string; titulo: string; due: string; status: ChecklistStatus }
export interface Geo { lat: number; lng: number }
export interface Tip { id: string; cidade: string; tag: string; titulo: string; texto: string; geo?: Geo }
export type EventTipo = 'weather' | 'queue' | 'strike' | 'documento'
export interface DemoEvent { id: string; tipo: EventTipo; tripId: string; data: string; payload: Record<string, any> }
export interface CatalogMuseu { id: string; nome: string; slots: string[] }
export interface CatalogTrem { id: string; operadora: string; origem: string; destino: string; quando: string; tarifa: string }
export interface Catalog { museus: CatalogMuseu[]; trens: CatalogTrem[] }
export type ActionTipo = 'remarcar' | 'reservar' | 'notificar'
export interface ActionProposal { id: string; tipo: ActionTipo; titulo: string; justificativa: string; precisaAprovacao: boolean; payload: Record<string, any>; status?: 'proposta' | 'aprovada' | 'rejeitada'; decidedBy?: string; decidedAt?: string }
