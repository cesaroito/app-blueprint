export function quickReplies(phase: string) {
  if (phase === 'DIA1') return ['Qual o plano para hoje?', 'Trocar passeio para indoor', 'Me indique um gelato']
  if (phase === 'DIA3') return ['Como fica o trem?', 'Remarcar trem', 'Plano de hoje']
  return ['Checklist do pré-embarque', 'Qual o plano para hoje?', 'Dicas perto de mim']
}

// Slash-commands da demo → eventos
export function parseSlash(msg: string): {eventId?: string} {
  const t = msg.trim().toLowerCase()
  if (t.startsWith('/chuva')) return { eventId: 'ev_weather_light_drizzle' }
  if (t.startsWith('/fila'))  return { eventId: 'ev_vatican_queue_high' }
  if (t.startsWith('/greve')) return { eventId: 'ev_train_partial_strike' }
  return {}
}
