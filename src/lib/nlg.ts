export type Intent = 'planToday'|'indoorSwap'|'weather'|'train'|'gelato'|'thanks'|'unknown'

export function determineIntent(text: string): Intent {
  const t = text.toLowerCase()
  if (t.includes('plano') || t.includes('hoje') || t.includes('agenda')) return 'planToday'
  if (t.includes('indoor') || t.includes('chuva') || t.includes('trocar passeio')) return 'indoorSwap'
  if (t.includes('previsão') || t.includes('tempo') || t.includes('clima')) return 'weather'
  if (t.includes('trem') || t.includes('greve') || t.includes('remarcar')) return 'train'
  if (t.includes('gelato') || t.includes('sorvete')) return 'gelato'
  if (t.includes('obrigado') || t.includes('valeu')) return 'thanks'
  return 'unknown'
}

type Ctx = {
  phase: string
  nextTitle?: string
  nextTime?: string
  hasPendingAction: boolean
  city?: string
}

export function nlgReply(intent: Intent, ctx: Ctx): string {
  switch (intent) {
    case 'planToday':
      return ctx.nextTitle
        ? `Para hoje sugiro manter **${ctx.nextTitle}** às ${ctx.nextTime}. Posso ajustar se preferir algo mais tranquilo.`
        : 'Para hoje está tudo leve. Posso sugerir um museu indoor se quiser.'
    case 'indoorSwap':
      return `Posso trocar seu passeio outdoor por **Galleria Borghese** e garantir ingresso sem fila. Quer que eu prepare isso?`
    case 'weather':
      return `Acabo de verificar o clima de ${ctx.city ?? 'Roma'}: há possibilidade de garoa. Recomendo um plano indoor e capa leve.`
    case 'train':
      return `Se houver greve, remarcamos para o próximo **Italo** disponível mantendo a tarifa e organizo o transfer. Posso deixar pronto?`
    case 'gelato':
      return `Perto de você, **Otaleg!** é imperdível — peça o pistache. Quer rotas até lá?`
    case 'thanks':
      return `Conte comigo. O objetivo é você **viajar leve** — já deixei alertas ativos.`
    default:
      return ctx.hasPendingAction
        ? 'Temos uma ação pendente aguardando aprovação do consultor. Posso acompanhar por aqui.'
        : 'Estou monitorando tudo nos bastidores. Se quiser, pergunte pelo plano de hoje ou peça uma dica perto de você.'
  }
}
