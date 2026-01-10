import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />

      <section id="projects" className="min-h-screen px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="mt-4 text-muted-foreground">Coming soon...</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Contact</h2>
          <p className="mt-4 text-muted-foreground">Coming soon...</p>
        </div>
      </section>
    </main>
  );
}
