import { Hero } from "@/components/Hero";
import { AboutNew } from "@/components/About";
import { ProjectsHorizontal } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutNew />
      <ProjectsHorizontal />
      <Experience />
      <Contact />
    </main>
  );
}
