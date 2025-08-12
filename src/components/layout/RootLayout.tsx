import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from "react";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("min-h-screen", "bg-brand-muted", "text-brand-foreground");
    return () => {
      document.body.classList.remove("min-h-screen", "bg-brand-muted", "text-brand-foreground");
    };
  }, []);

  useEffect(() => {
    // Simple per-route SEO title
    const map: Record<string, string> = {
      "/": "Home | Demo App",
      "/traveler": "Traveler | Demo App",
      "/consultant": "Consultant | Demo App",
      "/demo": "Interactive Demo | Demo App",
      "/album": "Album | Demo App",
      "/metrics": "Metrics | Demo App",
      "/chat": "Chat | Demo App",
    };
    document.title = map[location.pathname] || "Demo App";
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40" style={{ background: 'var(--brand-gradient)' }}>
        <nav className="container mx-auto flex items-center justify-between py-4 text-brand-foreground" aria-label="Main Navigation">
          <NavLink to="/" className="flex items-center gap-3 group">
            <span className="inline-block h-8 w-8 rounded-full" style={{ background: 'var(--brand-primary)' }} aria-hidden="true" />
            <span className="font-semibold tracking-tight">James Travel Care – CVC</span>
          </NavLink>
          <ul className="flex items-center gap-2">
            <li><NavLink to="/traveler" className={({isActive})=>`px-3 py-1 rounded-2xl ${isActive?'bg-white text-brand-foreground':'hover:underline'}`}>Traveler</NavLink></li>
            <li><NavLink to="/consultant" className={({isActive})=>`px-3 py-1 rounded-2xl ${isActive?'bg-white text-brand-foreground':'hover:underline'}`}>Consultant</NavLink></li>
            <li><NavLink to="/demo" className={({isActive})=>`px-3 py-1 rounded-2xl ${isActive?'bg-white text-brand-foreground':'hover:underline'}`}>Demo</NavLink></li>
          </ul>
        </nav>
        <div className="h-1 bg-brand-secondary" />
      </header>

      <main className="container mx-auto py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
