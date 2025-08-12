'use client'
import React from 'react'

export function Tour({ steps }: { steps: { id: string; title: string; text: string }[] }) {
  const [i, setI] = React.useState(0)
  const step = steps[i]
  if (!step) return null
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-4 max-w-md w-full shadow-lg">
        <div className="text-sm text-brand-secondary font-semibold">{step.title}</div>
        <div className="text-sm mt-1">{step.text}</div>
        <div className="mt-3 flex gap-2 justify-end">
          <button onClick={() => setI(i + 1)} className="px-3 py-2 rounded-2xl bg-brand-secondary text-white">Próximo</button>
          <button onClick={() => setI(steps.length)} className="px-3 py-2 rounded-2xl bg-white border">Pular</button>
        </div>
      </div>
    </div>
  )
}
