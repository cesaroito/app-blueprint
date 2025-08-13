'use client'
import { ReactNode } from 'react'
export function Card({children,className=''}:{children:ReactNode;className?:string}){
  return <div className={`rounded-2xl bg-white/95 backdrop-blur shadow-elev p-5 ${className}`}>{children}</div>
}
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?:'primary'|'secondary'|'ghost'}
export function Button({variant='primary',className='',...rest}:BtnProps){
  const base='px-4 py-2 rounded-2xl font-medium transition'
  const styles={
    primary:'bg-brand-primary text-brand-foreground hover:brightness-95',
    secondary:'bg-brand-secondary text-white hover:brightness-110',
    ghost:'bg-white border hover:bg-brand-muted'
  }[variant]
  return <button {...rest} className={`${base} ${styles} ${className}`} />
}
export function Pill({children}:{children:ReactNode}){ return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-brand-muted">{children}</span> }
export function SectionTitle({children}:{children:ReactNode}){ return <h2 className="text-lg font-semibold mb-2">{children}</h2> }
