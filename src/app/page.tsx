import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />

      <section id="contact" className="min-h-screen px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Contact</h2>
          <p className="mt-4 text-muted-foreground">Coming soon...</p>
        </div>
      </section>
    </main>
  );
}
