"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "motion/react";
import { CodeXml, Wrench } from "lucide-react";
import { SkillCard } from "./SkillCard";

const languagesAndFrameworks = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Apollo",
  "Zustand / Redux",
  "Tailwind CSS",
];

const toolsAndWorkflow = [
  "ShadCN/ui",
  "Vercel",
  "Git / GitHub",
  "Jira",
  "VS Code",
  "Figma",
];

export function About() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const cardsInView = useInView(cardsRef, {
    once: true,
    amount: 0.5,
  });

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about"
        ref={sectionRef}
        className="relative w-full py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-primary/10 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <m.h2
            className="text-3xl font-semibold tracking-tight sm:text-[42px] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            About Me
          </m.h2>

          <m.p
            className="text-2xl text-muted-foreground mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            I'm Stefan Vukoičić, a frontend developer based in Serbia with 4+
            years of experience. Performance, accessibility, reusability, and
            clean code matter to me. I enjoy creating polished user interfaces
            that are intuitive.
          </m.p>

          <div ref={cardsRef} className="grid gap-14 md:grid-cols-2">
            <SkillCard
              title="Languages & Frameworks"
              icon={<CodeXml className="h-6 w-6 text-primary" />}
              items={languagesAndFrameworks}
              isInView={cardsInView}
              delay={0}
            />
            <SkillCard
              title="Tools & Workflow"
              icon={<Wrench className="h-6 w-6 text-primary" />}
              items={toolsAndWorkflow}
              isInView={cardsInView}
              delay={0.1}
            />
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
