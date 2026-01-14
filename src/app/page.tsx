import { Hero } from "@/components/Hero";
import { AboutNew } from "@/components/About";
import { ProjectsHorizontal } from "@/components/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutNew />
      <ProjectsHorizontal />

      <section
        id="contact"
        className="min-h-screen px-6 py-24 flex items-center justify-center"
      >
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-sm uppercase tracking-[0.3em] text-primary mb-4 block">
            Get in Touch
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Let's work
            <br />
            together
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Have a project in mind? I'd love to hear about it.
          </p>
          <a
            href="mailto:stefan@example.com"
            className="inline-flex items-center gap-2 text-2xl md:text-3xl font-medium text-primary hover:underline underline-offset-8"
          >
            stefan@example.com
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  );
}
