# James Demo (Vite + React + Tailwind)

Pequena demo local, sem chamadas externas, com dados estáticos em `data/` e estado global via Zustand (persistido em `localStorage`).

## Como rodar

```bash
npm i && npm run dev
```

Abra o navegador no endereço indicado (por padrão http://localhost:8080).

## Estrutura
- Dados locais: `data/*.json`
- Store/persistência: `src/lib/store.ts` (Zustand + `name: 'james_demo_state_v1'`)
- Regras puras: `src/lib/rules.ts`
- Páginas:
  - Viajante: `/traveler`
  - Consultor: `/consultant`
  - Console de Demo: `/demo`
- Layout com header e navegação: aplicado a todas as rotas

## Fluxo da demo
1) Vá para `/demo` e use a “Linha do tempo”:
   - Clique em `N-90` → `N-60` → `N-30` (apenas para simular a evolução).
2) Ainda em `/demo`, na seção “Cenários”:
   - Dispare “Chuva leve 30m”.
3) Abra `/consultant`:
   - Aprove a proposta recém gerada.
4) Volte para `/demo`:
   - Dispare “Fila alta Vaticano” e depois “Greve parcial (trem)”.
5) Vá para `/consultant` e aprove ambas.
6) Volte ao `/traveler`:
   - Veja o slogan, as ações aplicadas (“Confirmado” quando aprovadas), o itinerário e o checklist.
7) Em `/demo`, use “Reset Demo” para restaurar o estado inicial (equivalente a `store.reset`).

## Observações
- Botões principais usam as cores de marca (`brand.primary` e `brand.secondary`).
- Não há chamadas de rede externas; todos os dados vêm de imports estáticos.
- As páginas `/traveler`, `/consultant` e `/demo` carregam sem erros.

