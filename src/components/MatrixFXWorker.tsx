"use client";

import React, { useEffect, useRef } from "react";

interface BulgeConfig {
  type?: "ripple" | "wave";
  duration?: number;
  intensity?: number;
  repeat?: boolean;
  delay?: number;
}

interface MatrixFXWorkerProps {
  speed?: number;
  colors?: string[];
  size?: number;
  spacing?: number;
  revealFrom?: "center" | "top" | "bottom" | "left" | "right";
  trigger?: "hover" | "instant" | "mount" | "click" | "manual";
  flicker?: boolean;
  bulge?: BulgeConfig;
  fps?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const MatrixFXWorker = React.forwardRef<HTMLDivElement, MatrixFXWorkerProps>(
  (
    {
      speed = 1,
      colors = ["#8b5cf6"],
      size = 3,
      spacing = 3,
      revealFrom = "center",
      trigger = "instant",
      flicker = false,
      bulge,
      fps = 60,
      className,
      style,
      children,
    },
    forwardedRef
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const workerRef = useRef<Worker | null>(null);
    const isTransferredRef = useRef(false);

    useEffect(() => {
      if (forwardedRef) {
        if (typeof forwardedRef === "function") {
          forwardedRef(containerRef.current);
        } else {
          forwardedRef.current = containerRef.current;
        }
      }
    }, [forwardedRef]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (workerRef.current) {
              workerRef.current.postMessage({
                type: "visibility",
                isVisible: entry.isIntersecting,
              });
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (!canvas || !container || isTransferredRef.current) return;

      if (typeof OffscreenCanvas === "undefined") {
        console.warn(
          "OffscreenCanvas not supported, falling back to main thread"
        );
        return;
      }

      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      let offscreen: OffscreenCanvas;
      try {
        offscreen = canvas.transferControlToOffscreen();
        isTransferredRef.current = true;
      } catch (e) {
        console.warn("Failed to transfer canvas to offscreen:", e);
        return;
      }

      const worker = new Worker(
        new URL("../workers/matrixWorker.ts", import.meta.url)
      );
      workerRef.current = worker;

      worker.onerror = (e) => {
        console.error("Worker error:", e);
      };

      worker.onmessage = (e) => {
        console.log("Message from worker:", e.data);
        if (e.data.type === "ready") {
          console.log("Worker ready, sending init...");
          worker.postMessage(
            {
              type: "init",
              canvas: offscreen,
              width,
              height,
              config: {
                speed,
                colors,
                size,
                spacing,
                revealFrom,
                trigger,
                flicker,
                bulge: bulge
                  ? {
                      type: bulge.type ?? "ripple",
                      duration: bulge.duration ?? 3,
                      intensity: bulge.intensity ?? 10,
                      repeat: bulge.repeat ?? true,
                      delay: bulge.delay ?? 0,
                    }
                  : undefined,
                fps,
              },
            },
            [offscreen]
          );
        }
      };

      const handleResize = () => {
        const newRect = container.getBoundingClientRect();
        canvas.style.width = `${newRect.width}px`;
        canvas.style.height = `${newRect.height}px`;

        worker.postMessage({
          type: "resize",
          width: newRect.width,
          height: newRect.height,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        worker.postMessage({ type: "stop" });
        worker.terminate();
        workerRef.current = null;
      };
    }, []);

    useEffect(() => {
      if (!workerRef.current || !isTransferredRef.current) return;

      // For now I need to restart the worker to change conf
      // I should add "updateConfig" message type
    }, [
      speed,
      colors,
      size,
      spacing,
      revealFrom,
      trigger,
      flicker,
      bulge,
      fps,
    ]);

    return (
      <div
        ref={containerRef}
        className={className}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          ...style,
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
        {children}
      </div>
    );
  }
);

MatrixFXWorker.displayName = "MatrixFXWorker";

export { MatrixFXWorker };
export type { BulgeConfig, MatrixFXWorkerProps };
