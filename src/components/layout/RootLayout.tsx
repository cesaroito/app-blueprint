import { NavLink, Outlet } from 'react-router-dom'

export default function RootLayout(){
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full" style={{background:'var(--brand-primary)'}} />
            <span className="font-semibold">James Travel Care – CVC</span>
          </div>
          <nav className="hidden md:flex gap-2 text-sm">
            <NavLink to="/traveler" className={({isActive})=>`px-3 py-1 rounded-2xl ${isActive?'bg-brand-secondary text-white':'hover:underline'}`}>Traveler</NavLink>
            <NavLink to="/consultant" className={({isActive})=>`px-3 py-1 rounded-2xl ${isActive?'bg-brand-secondary text-white':'hover:underline'}`}>Consultant</NavLink>
            <NavLink to="/demo" className={({isActive})=>`px-3 py-1 rounded-2xl ${isActive?'bg-brand-secondary text-white':'hover:underline'}`}>Demo</NavLink>
          </nav>
        </div>
        <div className="h-1" style={{background:'var(--brand-secondary)'}} />
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet/>
      </main>

      {/* bottom tabs mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 border-t backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-around text-sm">
          <a href="/" className="px-3 py-1 rounded-2xl bg-brand-secondary/10">Home</a>
          <a href="/traveler" className="px-3 py-1 rounded-2xl">Traveler</a>
          <a href="/chat" className="px-3 py-1 rounded-2xl">Chat</a>
          <a href="/demo" className="px-3 py-1 rounded-2xl">Demo</a>
        </div>
      </nav>
    </div>
  )
}