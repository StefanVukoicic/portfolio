"use client";

import { MatrixFx } from "@once-ui-system/core";
import { Button } from "@/components/ui/button";
import { OnceUIProvider } from "@/components/OnceUIProvider";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <OnceUIProvider>
          <MatrixFx
            speed={0.6}
            colors={["#8b5cf6", "#7c3aed", "#6d28d9", "#5b21b6"]}
            size={4}
            trigger="instant"
            bulge={{
              type: "wave",
              duration: 4,
              intensity: 15,
              repeat: true,
            }}
            style={{ width: "100%", height: "100%" }}
          />
        </OnceUIProvider>
      </div>

      <div className="absolute inset-0 z-10 bg-linear-to-b from-background/30 via-background/60 to-background" />

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Frontend Developer building{" "}
          <span className="text-primary">fast, accessible</span> web interfaces
        </h1>

        <p className="mt-12 text-lg text-muted-foreground sm:text-2xl">
          4+ years experience shipping frontend features used by thousands of
          users
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" onClick={() => scrollToSection("contact")}>
            Contact Me
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("projects")}
          >
            View Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
