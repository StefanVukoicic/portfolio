"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "motion/react";
import { AnimatedText, AnimatedLine } from "./AnimatedText";

const experiences = [
  {
    role: "Frontend Developer",
    company: "Canndyland",
    period: "Jul 2024 - Nov 2024",
    description:
      "Led a complete visual and functional redesign of the e-commerce platform, delivering a modern, responsive experience across desktop and mobile. Improved site performance and user engagement through optimized component architecture and smooth animations.",
    highlights: [
      "Rebuilt the entire frontend from the ground up",
      "Implemented responsive design serving thousands of daily users",
      "Integrated state management and payment flows",
    ],
  },
  {
    role: "Freelance Frontend Developer",
    company: "Self-employed",
    period: "Nov 2022 - Present",
    description:
      "Partnering with startups and agencies to deliver high-quality web applications. Specializing in React ecosystems, performance optimization, and pixel-perfect implementations of complex designs.",
    highlights: [
      "Delivered 15+ projects for clients across US and Europe",
      "Built custom component libraries and design systems",
      "Consistently met tight deadlines while maintaining code quality",
    ],
  },
  {
    role: "Junior Frontend Developer",
    company: "Alterset",
    period: "Sep 2020 - Nov 2022",
    description:
      "Core contributor to Preferenca.si, a Slovenian recruiting platform. Owned the development of key user-facing features and internal tooling, growing from junior to a trusted team member handling complex features independently.",
    highlights: [
      "Built the consumer and business landing pages from scratch",
      "Developed the complete user onboarding flow",
      "Created reusable component library used across the platform",
      "Contributed significantly to the admin panel development",
    ],
  },
];

function ExperienceCard({
  experience,
  index,
  isInView,
}: {
  experience: (typeof experiences)[0];
  index: number;
  isInView: boolean;
}) {
  return (
    <m.div
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-primary via-primary/50 to-transparent" />

      <div className="absolute -left-1 top-3.5 w-2.25 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]" />

      <div className="group">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-3">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">
            {experience.role}
          </h3>
          <span className="hidden md:block text-muted-foreground">•</span>
          <span className="text-primary font-medium">{experience.company}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {experience.period}
        </p>

        <p className="text-muted-foreground mb-4 leading-relaxed">
          {experience.description}
        </p>

        <ul className="space-y-2">
          {experience.highlights.map((highlight, i) => (
            <m.li
              key={i}
              className="flex items-start gap-3 text-sm text-foreground/80"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.3,
                delay: 0.4 + index * 0.15 + i * 0.05,
              }}
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              {highlight}
            </m.li>
          ))}
        </ul>
      </div>
    </m.div>
  );
}

export function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="experience"
        ref={sectionRef}
        className="relative py-32 md:py-48 overflow-hidden"
      >
        <div className="absolute top-1/2 -right-64 w-125 h-125 bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="mb-16">
            <AnimatedLine>
              <span className="text-sm uppercase tracking-[0.3em] text-primary">
                Career
              </span>
            </AnimatedLine>
            <h2 className="text-5xl md:text-7xl font-bold mt-4">
              <AnimatedText text="Experience" delay={0.2} />
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.company}
                experience={experience}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
