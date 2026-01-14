"use client";

import { useEffect, useState, useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useScroll,
  useTransform,
} from "motion/react";
import { useMouse } from "@/context/MouseContext";
import { MagneticButton } from "./MagneticButton";
import { AnimatedText, AnimatedLine } from "./AnimatedText";
import { MatrixFXWorker } from "./MatrixFXWorker";

export function Hero() {
  const [showMatrix, setShowMatrix] = useState(false);
  const { position } = useMouse();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const timer = setTimeout(() => setShowMatrix(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        ref={containerRef}
        id="hero"
        className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        {showMatrix && (
          <m.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <MatrixFXWorker
              speed={0.5}
              colors={["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6"]}
              size={4}
              spacing={2}
              trigger="instant"
              bulge={{
                type: "wave",
                duration: 4,
                intensity: 15,
                repeat: true,
              }}
              fps={28}
            />
            <m.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
              }}
            />
          </m.div>
        )}

        <div className="absolute inset-0 z-1 bg-linear-to-b from-background via-transparent to-background pointer-events-none" />
        <div className="absolute inset-0 z-1 bg-linear-to-r from-background via-transparent to-background opacity-50 pointer-events-none" />

        <m.div
          className="relative z-10 mx-auto max-w-7xl px-6 text-center"
          style={{ y }}
        >
          <AnimatedLine delay={0.2}>
            <span className="inline-block text-sm uppercase tracking-[0.3em] text-primary mb-8">
              Frontend Developer
            </span>
          </AnimatedLine>

          <h1 className="mb-8">
            <AnimatedText
              text="Stefan"
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
              delay={0.4}
              staggerChildren={0.05}
            />
            <AnimatedText
              text="Vukoičić"
              className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-primary"
              delay={0.6}
              staggerChildren={0.05}
            />
          </h1>

          <AnimatedLine delay={1}>
            <p className="mx-auto max-w-2xl text-xl md:text-2xl text-muted-foreground mb-12">
              Building interfaces used by{" "}
              <span className="text-foreground font-medium">
                thousands of users
              </span>
            </p>
          </AnimatedLine>

          <m.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <MagneticButton href="#projects" strength={0.2}>
              <span className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </span>
            </MagneticButton>

            <MagneticButton href="#contact" strength={0.2}>
              <span className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/20 px-6 py-3 text-base font-medium text-foreground transition-all duration-300 hover:border-white/40 hover:bg-white/5">
                <span className="relative z-10">Get in Touch</span>
              </span>
            </MagneticButton>
          </m.div>
        </m.div>

        <m.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <m.div
            className="flex flex-col items-center gap-2 text-muted-foreground"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </m.div>
        </m.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[2] pointer-events-none" />
      </m.section>
    </LazyMotion>
  );
}
