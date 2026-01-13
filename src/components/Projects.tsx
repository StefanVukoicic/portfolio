"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "motion/react";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "Canndyland",
    description:
      "Complete rework of a California-based cannabis dispensary and store. Features a modern, sleek design with smooth animations and an intuitive shopping experience.",
    tech: [
      "React",
      "React Router",
      "Framer Motion",
      "shadcn/ui",
      "Tailwind CSS",
      "Zustand",
    ],
    image: "/canndyland.webp",
    link: "https://canndyland.com/",
  },
  {
    title: "Preferenca",
    description:
      "A Slovenian recruiting platform that intelligently matches employers with potential employees. Built with a focus on user experience and efficient job matching algorithms.",
    tech: ["React", "Redux Saga", "TypeScript", "Material UI", "SCSS"],
    image: "/preferenca.webp",
    link: "https://preferenca.si/",
  },
  {
    title: "Standard801",
    description:
      "A professional website for a trucking and long haul freight company. Includes a contact form with email integration powered by serverless edge functions.",
    tech: [
      "React",
      "Vite",
      "Framer Motion",
      "shadcn/ui",
      "Tailwind CSS",
      "Resend API",
    ],
    image: "/standard801.webp",
    link: "https://standard801.com/",
  },
];

export function Projects() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="projects"
        ref={sectionRef}
        className="relative w-full py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-primary/10 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <m.h2
            className="text-3xl font-semibold tracking-tight sm:text-[42px] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Projects
          </m.h2>

          <m.p
            className="text-xl text-muted-foreground mb-16 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            A selection of projects I've worked on, from recruiting platforms to
            e-commerce and company websites.
          </m.p>

          <div className="space-y-20 md:space-y-32">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
