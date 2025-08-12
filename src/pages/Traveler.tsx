import { useEffect } from "react";

const Traveler = () => {
  useEffect(() => {
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Traveler page – explore trips and itineraries');
  }, []);

  return (
    <article>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Traveler</h1>
        <p className="text-muted-foreground">Explore trips and itineraries</p>
      </header>
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm">This is the traveler section. Build your content here.</p>
      </section>
    </article>
  );
};

export default Traveler;
