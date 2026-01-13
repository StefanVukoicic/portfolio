"use client";

import { m } from "motion/react";
import { ReactNode, cloneElement, isValidElement, ReactElement } from "react";

interface SkillCardProps {
  title: string;
  icon: ReactNode;
  items: string[];
  isInView: boolean;
  delay?: number;
}

export function SkillCard({
  title,
  icon,
  items,
  isInView,
  delay = 0,
}: SkillCardProps) {
  const watermarkIcon =
    isValidElement(icon) &&
    cloneElement(
      icon as ReactElement<{ className?: string; strokeWidth?: number }>,
      {
        className: "h-full w-full text-primary/[0.06]",
        strokeWidth: 1,
      }
    );

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className="group relative"
    >
      <div className="absolute -inset-px rounded-xl bg-linear-to-b from-primary/85 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative h-full rounded-xl bg-linear-to-b from-secondary to-background glow-primary-dimmer p-8 overflow-hidden">
        <div className="absolute -right-8 -bottom-8 h-64 w-64 pointer-events-none">
          {watermarkIcon}
        </div>

        <div className="absolute inset-x-0 top-0 h-32 rounded-t-xl backdrop-blur-2xl bg-linear-to-b from-purple-800/15 to-transparent pointer-events-none" />

        <div className="relative flex items-center gap-4 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/15">
            {icon}
          </div>
          <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
        </div>

        <ul className="relative space-y-4">
          {items.map((item, index) => (
            <m.li
              key={item}
              className="flex items-center gap-3 text-lg text-muted-foreground"
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: delay + 0.1 + index * 0.05,
              }}
            >
              <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
              {item}
            </m.li>
          ))}
        </ul>
      </div>
    </m.div>
  );
}
