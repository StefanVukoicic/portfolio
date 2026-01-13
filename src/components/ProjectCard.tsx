"use client";

import { m } from "motion/react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  isInView: boolean;
  delay?: number;
  reverse?: boolean;
}

export function ProjectCard({
  title,
  description,
  tech,
  image,
  link,
  isInView,
  delay = 0,
  reverse = false,
}: ProjectCardProps) {
  return (
    <m.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={`group relative grid gap-8 md:gap-12 items-center ${
        reverse ? "md:grid-cols-[1fr_1.2fr]" : "md:grid-cols-[1.2fr_1fr]"
      }`}
    >
      <div className={`relative ${reverse ? "md:order-2" : ""}`}>
        <div className="absolute inset-0 translate-y-4 bg-primary/30 rounded-xl blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

        <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-card">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div className={`relative ${reverse ? "md:order-1 md:text-right" : ""}`}>
        <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
          {title}
          <ExternalLink
            className={`inline-block ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              reverse ? "md:ml-0 md:mr-2 md:order-first" : ""
            }`}
          />
        </h3>

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        <div
          className={`flex flex-wrap gap-2 ${reverse ? "md:justify-end" : ""}`}
        >
          {tech.map((item) => (
            <span
              key={item}
              className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </m.a>
  );
}
