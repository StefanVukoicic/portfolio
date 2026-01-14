"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

interface MouseContextType {
  position: MousePosition;
  isHovering: boolean;
  hoverElement: string | null;
  setHoverElement: (element: string | null) => void;
}

const MouseContext = createContext<MouseContextType>({
  position: { x: 0, y: 0, normalizedX: 0, normalizedY: 0 },
  isHovering: false,
  hoverElement: null,
  setHoverElement: () => {},
});

export function MouseProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });
  const [hoverElement, setHoverElement] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;

      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX,
        normalizedY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <MouseContext.Provider
      value={{
        position,
        isHovering: hoverElement !== null,
        hoverElement,
        setHoverElement,
      }}
    >
      {children}
    </MouseContext.Provider>
  );
}

export const useMouse = () => useContext(MouseContext);
