"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "motion/react";
import { AnimatedText, AnimatedLine } from "./AnimatedText";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    value: "devstefanv@gmail.com",
    href: "mailto:devstefanv@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dev-stefanv",
    href: "https://www.linkedin.com/in/dev-stefanv/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/StefanVukoicic",
    href: "https://github.com/StefanVukoicic",
    icon: Github,
  },
];

export function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="contact"
        ref={sectionRef}
        className="relative py-32 md:py-48 overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="mb-16">
            <AnimatedLine>
              <span className="text-sm uppercase tracking-[0.3em] text-primary">
                Get in Touch
              </span>
            </AnimatedLine>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mt-4 mb-6">
              <AnimatedText text="Let's Work" delay={0.2} />
              <br />
              <AnimatedText text="Together" delay={0.4} />
            </h2>
            <m.p
              className="text-xl text-muted-foreground max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Have a project in mind? I'd love to hear about it. Let's create
              something amazing together.
            </m.p>
          </div>

          <div className="flex flex-col gap-4 max-w-md mx-auto">
            {contactLinks.map((link, index) => (
              <m.a
                key={link.label}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <link.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <span className="block text-sm text-muted-foreground">
                    {link.label}
                  </span>
                  <span className="block text-foreground font-medium">
                    {link.value}
                  </span>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </m.a>
            ))}
          </div>

          <m.p
            className="mt-24 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
          >
            © {new Date().getFullYear()} Stefan Vukoičić. All rights reserved.
          </m.p>
        </div>
      </section>
    </LazyMotion>
  );
}
