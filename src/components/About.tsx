"use client";

import { useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";
import { AnimatedText, AnimatedLine } from "./AnimatedText";
import { CodeXml, Palette, Database, Wrench } from "lucide-react";

const expertise = [
  {
    category: "Frontend",
    icon: CodeXml,
    skills: ["React", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    category: "Styling",
    icon: Palette,
    skills: ["Tailwind CSS", "ShadCN UI", "SCSS", "Framer Motion"],
  },
  {
    category: "State & Data",
    icon: Database,
    skills: ["Redux", "Zustand", "Apollo GraphQL", "REST APIs"],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: ["Git", "Figma", "VS Code", "Vercel"],
  },
];

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "100K+", label: "Users Reached" },
];

export function AboutNew() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const statsInView = useInView(contentRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="about"
        ref={sectionRef}
        className="relative py-32 md:py-48 overflow-hidden"
      >
        <m.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        </m.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none">
          <span className="text-[15vw] font-bold text-white/2 whitespace-nowrap">
            ABOUT
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-20">
            <AnimatedLine>
              <span className="text-sm uppercase tracking-[0.3em] text-primary">
                Who I Am
              </span>
            </AnimatedLine>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 mb-8">
              <AnimatedText text="About Me" delay={0.2} />
            </h2>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
            {/* Left - Bio */}
            <div>
              <m.p
                className="text-2xl md:text-3xl text-foreground font-light leading-relaxed mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                I'm Stefan Vukoičić, a frontend developer based in Serbia
                crafting digital experiences that users love.
              </m.p>
              <m.p
                className="text-lg text-muted-foreground leading-relaxed mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                I specialize in building performant, accessible web applications
                with modern React ecosystems. From recruiting platforms to
                e-commerce sites, I focus on creating interfaces that are both
                beautiful and functional.
              </m.p>
              <m.p
                className="text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open source, or optimizing everything I touch.
              </m.p>
            </div>

            {/* Right - Stats */}
            <div ref={contentRef} className="flex flex-col justify-center">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <m.div
                    key={stat.label}
                    className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <span className="block text-4xl md:text-5xl font-bold text-primary mb-2">
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </m.div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-8">Expertise</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertise.map((group, groupIndex) => (
                <m.div
                  key={group.category}
                  className="relative overflow-hidden rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + groupIndex * 0.1 }}
                >
                  {/* Watermark icon - behind the card */}
                  <div className="absolute -right-6 -bottom-6 pointer-events-none">
                    <group.icon
                      className="h-32 w-32 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Card with semi-transparent background */}
                  <div className="relative p-6 bg-background/90 border border-white/10 hover:border-primary/50 transition-colors duration-300 h-full rounded-2xl">
                    <h4 className="text-primary font-medium mb-4 text-sm uppercase tracking-wider">
                      {group.category}
                    </h4>
                    <ul className="space-y-2">
                      {group.skills.map((skill) => (
                        <li
                          key={skill}
                          className="text-foreground/80 hover:text-foreground transition-colors cursor-none"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
