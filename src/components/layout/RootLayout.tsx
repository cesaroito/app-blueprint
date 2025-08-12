import { Link, Outlet, useLocation } from "react-router-dom";
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
    };
    document.title = map[location.pathname] || "Demo App";
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:bg-background">
        <nav className="container mx-auto flex items-center justify-between py-4" aria-label="Main Navigation">
          <Link to="/" className="font-semibold text-brand-secondary">Demo App</Link>
          <ul className="flex items-center gap-4">
            <li><Link className="hover:underline text-brand-foreground" to="/traveler">Traveler</Link></li>
            <li><Link className="hover:underline text-brand-foreground" to="/consultant">Consultant</Link></li>
            <li><Link className="hover:underline text-brand-foreground" to="/demo">Demo</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
