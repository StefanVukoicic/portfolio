"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "motion/react";

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
  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about"
        ref={sectionRef}
        className="relative w-full py-24 md:py-32 overflow-hidden"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-primary/10 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl px-6">
          {/* Section title */}
          <m.h2
            className="text-3xl font-semibold tracking-tight sm:text-[42px] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            About Me
          </m.h2>

          {/* Intro text */}
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

          {/* Cards grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Languages & Frameworks Card */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="group relative"
            >
              {/* Gradient border wrapper */}
              <div className="absolute -inset-px rounded-xl bg-linear-to-b from-primary/85 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative h-full rounded-xl bg-card p-6">
                {/* Card header with icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Languages & Frameworks
                  </h3>
                </div>

                {/* Skills list */}
                <ul className="space-y-3">
                  {languagesAndFrameworks.map((item, index) => (
                    <m.li
                      key={item}
                      className="flex items-center gap-3 text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                      }
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.3 + index * 0.05,
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </m.li>
                  ))}
                </ul>
              </div>
            </m.div>

            {/* Tools & Workflow Card */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              className="group relative"
            >
              {/* Gradient border wrapper */}
              <div className="absolute -inset-px rounded-xl bg-linear-to-b from-primary/85 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative h-full rounded-xl bg-card p-6">
                {/* Card header with icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Tools & Workflow
                  </h3>
                </div>

                {/* Tools list */}
                <ul className="space-y-3">
                  {toolsAndWorkflow.map((item, index) => (
                    <m.li
                      key={item}
                      className="flex items-center gap-3 text-muted-foreground"
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                      }
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        delay: 0.4 + index * 0.05,
                      }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </m.li>
                  ))}
                </ul>
              </div>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
