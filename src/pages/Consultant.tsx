import { useEffect } from "react";

const Consultant = () => {
  useEffect(() => {
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Consultant page – tools and dashboards');
  }, []);

  return (
    <article>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Consultant</h1>
        <p className="text-muted-foreground">Tools and dashboards for consultants</p>
      </header>
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <p className="text-sm">This is the consultant section. Build your content here.</p>
      </section>
    </article>
  );
};

export default Consultant;
