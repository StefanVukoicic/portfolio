"use client";

import { useRef, useEffect, useState } from "react";
import { m, useInView } from "motion/react";
import { useMouse } from "@/context/MouseContext";
import Image from "next/image";
import { AnimatedLine } from "./AnimatedText";

const projects = [
  {
    title: "Canndyland",
    description: "Cannabis dispensary e-commerce platform",
    tech: ["React", "Framer Motion", "Tailwind CSS", "Zustand"],
    image: "/canndyland.webp",
    link: "https://canndyland.com/",
    color: "#22c55e",
  },
  {
    title: "Preferenca",
    description: "Slovenian recruiting platform",
    tech: ["React", "Redux Saga", "TypeScript", "Material UI"],
    image: "/preferenca.webp",
    link: "https://preferenca.si/",
    color: "#3b82f6",
  },
  {
    title: "Standard801",
    description: "Trucking company website",
    tech: ["React", "Vite", "Framer Motion", "Resend API"],
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
      className="group relative shrink-0 w-[85vw] md:w-[70vw] lg:w-[60vw] h-[65vh] cursor-none"
      onMouseEnter={() => setHoverElement("project")}
      onMouseLeave={() => setHoverElement(null)}
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-card border border-white/10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-black/20" />

        <span
          className="absolute top-8 right-8 text-[10rem] md:text-[14rem] font-bold opacity-10 leading-none"
          style={{ color: project.color }}
        >
          0{index + 1}
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {project.title}
          </h3>
          <p className="text-lg md:text-xl lg:text-2xl text-white/70 mb-6 max-w-2xl">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm md:text-base rounded-full bg-white/10 text-white/90 border border-white/20 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 120px ${project.color}40`,
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
