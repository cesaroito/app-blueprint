'use client'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-card text-card-foreground border shadow p-4 mb-3">
      {children}
    </div>
  )
}

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = '', ...rest } = props
  return (
    <button
      {...rest}
      className={`px-4 py-2 rounded-2xl font-medium ${className}`}
    />
  )
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-brand-muted">
      {children}
    </span>
  )
}
