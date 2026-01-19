"use client";

import { useRef, useState, ReactNode } from "react";
import { m } from "motion/react";
import { useMouse } from "@/context/MouseContext";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { setHoverElement } = useMouse();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setHoverElement(null);
  };

  const handleMouseEnter = () => {
    setHoverElement("button");
  };

  const handleClick = () => {
    if (href?.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
    onClick?.();
  };

  const isInternalLink = href?.startsWith("#");
  const isExternalLink = href && !isInternalLink;

  const Component = isExternalLink ? m.a : m.div;
  const props = isExternalLink
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Component
      ref={buttonRef as any}
      {...props}
      data-cursor="button"
      className={`inline-block cursor-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15 }}
    >
      {children}
    </Component>
  );
}
