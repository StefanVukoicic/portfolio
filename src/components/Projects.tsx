"use client";

import { useRef, useEffect, useState } from "react";
import { m, useInView } from "motion/react";
import { useMouse } from "@/context/MouseContext";
import Image from "next/image";
import { AnimatedLine } from "./AnimatedText";

const projects = [
  {
    title: "Canndyland",
    description:
      "Complete rework of a California-based cannabis dispensary. Features a modern design with smooth animations and an intuitive shopping experience.",
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
    color: "#22c55e",
  },
  {
    title: "Preferenca",
    description:
      "A Slovenian recruiting platform that intelligently matches employers with potential employees. Built with a focus on user experience.",
    tech: ["React", "Redux Saga", "TypeScript", "Material UI", "SCSS"],
    image: "/preferenca.webp",
    link: "https://preferenca.si/",
    color: "#3b82f6",
  },
  {
    title: "Standard801",
    description:
      "A professional website for a trucking company. Includes a contact form with email integration powered by serverless edge functions.",
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
    color: "#f59e0b",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const { setHoverElement } = useMouse();

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw] h-[70vh] min-h-125 cursor-none"
      onMouseEnter={() => setHoverElement("project")}
      onMouseLeave={() => setHoverElement(null)}
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-card border border-white/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-black/30" />

        <span
          className="absolute top-6 right-6 md:top-8 md:right-8 text-8xl md:text-9xl lg:text-[10rem] font-bold opacity-10 leading-none"
          style={{ color: project.color }}
        >
          0{index + 1}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-12">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            {project.title}
          </h3>

          <p className="text-base md:text-lg text-white/80 mb-5 max-w-xl leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs md:text-sm rounded-full bg-white/10 text-white/90 border border-white/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 100px ${project.color}30`,
          }}
        />
      </div>
    </a>
  );
}

export function ProjectsHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate how far we've scrolled through the section
      const scrollableDistance = sectionHeight - viewportHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const translateX = scrollProgress * -66;

  return (
    <section ref={sectionRef} id="projects" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background pointer-events-none" />

        <div
          ref={titleRef}
          className="relative z-10 px-6 md:px-12 pt-12 md:pt-16 shrink-0"
        >
          <AnimatedLine>
            <span className="text-sm uppercase tracking-[0.3em] text-primary">
              Selected Work
            </span>
          </AnimatedLine>
          <m.h2
            className="text-4xl md:text-6xl font-bold mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Projects
          </m.h2>
        </div>

        <div className="flex-1 flex items-center overflow-hidden">
          <div
            className="flex gap-8 pl-6 md:pl-12"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}

            {/* CTA */}
            <div className="shrink-0 w-[60vw] flex items-center justify-center">
              <a
                href="#contact"
                className="text-3xl md:text-5xl font-bold text-primary hover:underline underline-offset-8 cursor-none"
              >
                Let's talk →
              </a>
            </div>
          </div>
        </div>

        <div className="relative z-10 px-6 md:px-12 pb-8 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Scroll
            </span>
            <div className="flex-1 h-px bg-white/20 overflow-hidden">
              <div
                className="h-full bg-primary origin-left"
                style={{ transform: `scaleX(${scrollProgress})` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {projects.length} projects
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
