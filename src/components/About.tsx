"use client";

import { useRef, useEffect, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
  useInView,
} from "motion/react";
import { AnimatedText, AnimatedLine } from "./AnimatedText";
import { CodeXml, Palette, DatabaseZap, Wrench } from "lucide-react";

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
    icon: DatabaseZap,
    skills: ["Redux", "Zustand", "Apollo GraphQL", "REST APIs"],
  },
  {
    category: "Tools",
    icon: Wrench,
    skills: ["Git", "Figma", "Jira", "Vercel"],
  },
];

const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 50, suffix: "K+", label: "Users Reached" },
];

function CountUp({
  value,
  suffix,
  isInView,
  delay = 0,
  easeOut = false,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
  delay?: number;
  easeOut?: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const delayTimeout = setTimeout(() => {
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);

        if (easeOut) {
          progress = 1 - Math.pow(1 - progress, 3);
        }

        const currentValue = Math.floor(progress * value);
        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [isInView, value, delay, easeOut]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function AboutNew() {
  const sectionRef = useRef(null);
  const mobileStatsRef = useRef(null);
  const desktopStatsRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const mobileStatsInView = useInView(mobileStatsRef, {
    once: true,
    amount: 0.3,
  });
  const desktopStatsInView = useInView(desktopStatsRef, {
    once: true,
    amount: 0.5,
  });

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

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none hidden md:block">
          <span className="text-[15vw] font-bold text-white/[0.02] whitespace-nowrap">
            ABOUT
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
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

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-16 lg:mb-24">
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

            <m.div
              className="hidden lg:block"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {expertise.map((group, groupIndex) => (
                  <m.div
                    key={group.category}
                    className="relative overflow-hidden rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.7 + groupIndex * 0.1,
                    }}
                  >
                    <div className="absolute -right-4 -bottom-4 pointer-events-none">
                      <group.icon
                        className="h-24 w-24 text-primary"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="relative p-5 bg-background/90 border border-white/10 hover:border-primary/50 transition-colors duration-300 h-full rounded-2xl">
                      <h4 className="text-primary font-medium mb-3 text-sm uppercase tracking-wider">
                        {group.category}
                      </h4>
                      <ul className="space-y-1.5">
                        {group.skills.map((skill) => (
                          <li
                            key={skill}
                            className="text-sm text-foreground/80 hover:text-foreground transition-colors cursor-none"
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

          <div ref={mobileStatsRef} className="lg:hidden mb-16">
            <div className="space-y-8">
              {stats.map((stat, index) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={mobileStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                >
                  <span className="block text-5xl sm:text-6xl font-bold text-primary">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      isInView={mobileStatsInView}
                      delay={index * 500}
                      easeOut={index === 2}
                    />
                  </span>
                  <span className="text-base sm:text-lg text-muted-foreground">
                    {stat.label}
                  </span>
                </m.div>
              ))}
            </div>
          </div>

          <m.div
            className="lg:hidden mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-8">Expertise</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {expertise.map((group, groupIndex) => (
                <m.div
                  key={group.category}
                  className="relative overflow-hidden rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + groupIndex * 0.1 }}
                >
                  <div className="absolute -right-6 -bottom-6 pointer-events-none">
                    <group.icon
                      className="h-32 w-32 text-primary"
                      strokeWidth={1.5}
                    />
                  </div>

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

          <m.div
            ref={desktopStatsRef}
            className="hidden lg:block"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex justify-between items-end gap-8">
              {stats.map((stat, index) => (
                <m.div
                  key={stat.label}
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={desktopStatsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                >
                  <span className="block text-6xl xl:text-7xl font-bold text-primary">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      isInView={desktopStatsInView}
                      delay={index * 500}
                      easeOut={index === 2}
                    />
                  </span>
                  <span className="text-lg xl:text-xl text-muted-foreground">
                    {stat.label}
                  </span>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}
