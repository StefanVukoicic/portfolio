"use client";

import { useState, useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "motion/react";
import { MatrixFXWorker } from "@/components/MatrixFXWorker";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [showMatrix, setShowMatrix] = useState(false);
  const matrixRef = useRef(null);
  const isInView = useInView(matrixRef, {
    margin: "100px",
    amount: "some",
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowMatrix(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="relative min-h-screen w-full overflow-hidden">
        <div ref={matrixRef} className="absolute inset-0 z-0 bg-[#1a0a2e]">
          {showMatrix && isInView && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              <MatrixFXWorker
                colors={["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6"]}
                size={4}
                trigger="instant"
                bulge={{
                  type: "wave",
                  duration: 3,
                  intensity: 17,
                  repeat: true,
                }}
                fps={24}
              />
            </m.div>
          )}
        </div>

        <div className="absolute inset-0 z-10 bg-linear-to-b from-background/30 via-background/60 to-background" />

        <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <m.h1
            className="max-w-5xl text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Frontend Developer building{" "}
            <span className="text-primary">fast, accessible</span> web
            interfaces
          </m.h1>

          <m.p
            className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            4+ years experience shipping frontend features used by thousands of
            users
          </m.p>

          <div className="mt-10 flex w-full max-w-xs flex-col gap-4 sm:max-w-none sm:w-auto sm:flex-row">
            <m.div
              className="w-full sm:w-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => scrollToSection("contact")}
              >
                Contact Me
              </Button>
            </m.div>
            <m.div
              className="w-full sm:w-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.65 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => scrollToSection("projects")}
              >
                View Projects
              </Button>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
