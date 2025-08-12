import { useEffect } from "react";

const Demo = () => {
  useEffect(() => {
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Interactive demo showcasing components');
  }, []);

  return (
    <article>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Interactive Demo</h1>
        <p className="text-muted-foreground">Showcasing components and patterns</p>
      </header>
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm">This is the demo area. Add interactive examples here.</p>
      </section>
    </article>
  );
};

export default Demo;
