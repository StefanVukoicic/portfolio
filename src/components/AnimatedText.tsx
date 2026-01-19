"use client";

import { m, Variants } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.03,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <m.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ perspective: 1000 }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <m.span
              key={charIndex}
              variants={child}
              className="inline-block"
              style={{ transformOrigin: "bottom" }}
            >
              {char}
            </m.span>
          ))}
        </span>
      ))}
    </m.span>
  );
}

interface AnimatedLineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function AnimatedLine({
  children,
  className = "",
  delay = 0,
  once = true,
}: AnimatedLineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <m.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
      >
        {children}
      </m.div>
    </div>
  );
}
