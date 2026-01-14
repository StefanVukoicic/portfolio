"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [hoverElement, setHoverElement] = useState<string | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.closest(
          'a[href*="canndyland"], a[href*="preferenca"], a[href*="standard801"]'
        )
      ) {
        setHoverElement("project");
        return;
      }

      if (
        target.closest("button") ||
        target.closest('a[href^="#"]') ||
        target.closest(".magnetic-button")
      ) {
        setHoverElement("button");
        return;
      }

      if (target.closest("a")) {
        setHoverElement("link");
        return;
      }

      setHoverElement(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!mounted) return null;

  const isProject = hoverElement === "project";
  const isButton = hoverElement === "button";
  const isLink = hoverElement === "link";
  const isHovering = hoverElement !== null;

  const dotSize = isProject ? 80 : isButton ? 50 : isLink ? 40 : 12;
  const ringSize = isProject ? 0 : isButton ? 70 : isLink ? 60 : 40;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          backgroundColor: isProject ? "white" : "white",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.2s ease, height 0.2s ease, margin 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isProject && (
          <span
            style={{
              color: "black",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            View
          </span>
        )}
      </div>

      <div
        ref={ringRef}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          border: "2px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          transition:
            "width 0.3s ease, height 0.3s ease, margin 0.3s ease, opacity 0.2s ease",
          opacity: isProject ? 0 : 1,
        }}
      />
    </>
  );
}
