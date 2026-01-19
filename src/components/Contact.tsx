"use client";

import { useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useInView } from "motion/react";
import { AnimatedText, AnimatedLine } from "./AnimatedText";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Send,
  Loader2,
  CheckCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const contactLinks = [
  {
    label: "Email",
    value: "devstefanv@gmail.com",
    href: "mailto:devstefanv@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "Stefan Vukoicic",
    href: "https://www.linkedin.com/in/dev-stefanv/",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "Stefan Vukoicic",
    href: "https://github.com/StefanVukoicic",
    icon: Github,
  },
];

const subjectOptions = [
  { value: "job", label: "Job Offer" },
  { value: "project", label: "Project Inquiry" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
];

export function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    budgetRange: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        budgetRange: "",
        message: "",
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showBudgetField = formData.subject !== "";
  const budgetLabel =
    formData.subject === "job" ? "Salary Range" : "Budget Range";

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="contact"
        ref={sectionRef}
        className="relative py-32 md:py-48 overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-primary/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
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
              Have a project in mind? I'd love to hear about it.
            </m.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <m.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="rounded-3xl bg-white/3 border border-white/10 p-6 md:p-8"
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary hover:underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-2"
                    >
                      Company{" "}
                      <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={handleSubjectChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjectOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {showBudgetField && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <label
                        htmlFor="budgetRange"
                        className="block text-sm font-medium mb-2"
                      >
                        {budgetLabel}{" "}
                        <span className="text-muted-foreground">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="text"
                        id="budgetRange"
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                        placeholder={
                          formData.subject === "job"
                            ? "e.g. $30k - $100k"
                            : "e.g. $2.5k - $8k"
                        }
                      />
                    </m.div>
                  )}

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.subject}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </m.div>

            {/* Contact Links */}
            <m.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-2xl font-semibold mb-6">
                Or reach out directly
              </h3>
              <div className="flex flex-col gap-4">
                {contactLinks.map((link, index) => (
                  <m.a
                    key={link.label}
                    href={link.href}
                    target={link.label !== "Email" ? "_blank" : undefined}
                    rel={
                      link.label !== "Email" ? "noopener noreferrer" : undefined
                    }
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-center w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-sm text-muted-foreground">
                        {link.label}
                      </span>
                      <span className="block text-foreground font-medium truncate">
                        {link.value}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 shrink-0 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </m.a>
                ))}
              </div>
            </m.div>
          </div>

          {/* Footer */}
          <m.p
            className="mt-24 text-sm text-muted-foreground text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            © {new Date().getFullYear()} Stefan Vukoičić. All rights reserved.
          </m.p>
        </div>
      </section>
    </LazyMotion>
  );
}
