interface Dot {
  x: number;
  y: number;
  color: string;
  baseOpacity: number;
  distanceFromOrigin: number;
  randomOffset: number;
  flickerPhase: number;
  flickerSpeed: number;
}

interface BulgeConfig {
  type: "ripple" | "wave";
  duration: number;
  intensity: number;
  repeat: boolean;
  delay: number;
}

interface InitMessage {
  type: "init";
  canvas: OffscreenCanvas;
  width: number;
  height: number;
  config: {
    speed: number;
    colors: string[];
    size: number;
    spacing: number;
    revealFrom: "center" | "top" | "bottom" | "left" | "right";
    trigger: "hover" | "instant" | "mount" | "click" | "manual";
    flicker: boolean;
    bulge?: BulgeConfig;
    fps: number;
  };
}

interface ResizeMessage {
  type: "resize";
  width: number;
  height: number;
}

interface VisibilityMessage {
  type: "visibility";
  isVisible: boolean;
}

interface StopMessage {
  type: "stop";
}

type WorkerMessage =
  | InitMessage
  | ResizeMessage
  | VisibilityMessage
  | StopMessage;

let canvas: OffscreenCanvas | null = null;
let ctx: OffscreenCanvasRenderingContext2D | null = null;
let animationId: number | null = null;
let isRunning = false;
let isVisible = true;

let dots: Dot[] = [];
let canvasWidth = 0;
let canvasHeight = 0;
let startTime = Date.now();
let bulgeStartTime = Date.now();
let lastFrameTime = 0;

let config: {
  speed: number;
  colors: string[];
  size: number;
  spacing: number;
  revealFrom: "center" | "top" | "bottom" | "left" | "right";
  trigger: "hover" | "instant" | "mount" | "click" | "manual";
  flicker: boolean;
  bulge: BulgeConfig | undefined;
  fps: number;
} = {
  speed: 1,
  colors: ["#8b5cf6"],
  size: 3,
  spacing: 3,
  revealFrom: "center",
  trigger: "instant",
  flicker: false,
  bulge: undefined,
  fps: 60,
};

let centerX = 0;
let centerY = 0;
let maxRadius = 0;
let maxDistance = 0;

function createDots() {
  const { size, spacing, revealFrom, colors } = config;
  const totalSize = size + spacing;
  const maxDisplacement = (config.bulge?.intensity ?? 10) * 2;
  const paddedWidth = canvasWidth + maxDisplacement * 2;
  const paddedHeight = canvasHeight + maxDisplacement * 2;
  const cols = Math.ceil(paddedWidth / totalSize);
  const rows = Math.ceil(paddedHeight / totalSize);

  dots = [];
  maxDistance = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * totalSize + size / 2 - maxDisplacement;
      const y = row * totalSize + size / 2 - maxDisplacement;

      let distanceFromOrigin = 0;

      if (revealFrom === "center") {
        const dx = x - centerX;
        const dy = y - centerY;
        distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);
      } else if (revealFrom === "top") {
        distanceFromOrigin = y;
      } else if (revealFrom === "bottom") {
        distanceFromOrigin = canvasHeight - y;
      } else if (revealFrom === "left") {
        distanceFromOrigin = x;
      } else if (revealFrom === "right") {
        distanceFromOrigin = canvasWidth - x;
      }

      if (distanceFromOrigin > maxDistance) {
        maxDistance = distanceFromOrigin;
      }

      dots.push({
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseOpacity: 0.3 + Math.random() * 0.7,
        distanceFromOrigin,
        randomOffset: Math.random() * 0.3,
        flickerPhase: Math.random() * Math.PI * 2,
        flickerSpeed: 0.8 + Math.random() * 0.4,
      });
    }
  }
}

function updateGeometry(width: number, height: number) {
  canvasWidth = width;
  canvasHeight = height;
  centerX = width / 2;
  centerY = height / 2;
  maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);

  if (canvas) {
    canvas.width = width * 2;
    canvas.height = height * 2;
    if (ctx) {
      ctx.scale(2, 2);
    }
  }

  createDots();
}

function animate() {
  if (!isRunning || !ctx) {
    return;
  }

  if (!isVisible) {
    animationId = requestAnimationFrame(animate);
    return;
  }

  const currentTime = performance.now();
  const frameInterval = 1000 / config.fps;

  if (currentTime - lastFrameTime < frameInterval) {
    animationId = requestAnimationFrame(animate);
    return;
  }
  lastFrameTime = currentTime;

  const { size, flicker, bulge, trigger } = config;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const time = (Date.now() - startTime) / 1000;

  let waveProgress = 0;
  let showBulge = false;
  let bulgeFadeOut = 1;

  if (bulge) {
    const bulgeElapsed = (Date.now() - bulgeStartTime) / 1000;
    const delaySeconds = bulge.delay / 1000;
    const totalCycleDuration = bulge.duration + delaySeconds;
    const adjustedTime = bulgeElapsed - delaySeconds;
    const fadeStartPercent = 0.6;

    if (adjustedTime >= 0) {
      showBulge = true;
      if (bulge.repeat) {
        const cycleTime = adjustedTime % totalCycleDuration;
        waveProgress =
          cycleTime < bulge.duration ? cycleTime / bulge.duration : 0;
        showBulge = cycleTime < bulge.duration;
      } else {
        if (adjustedTime <= bulge.duration) {
          waveProgress = adjustedTime / bulge.duration;
          if (waveProgress >= fadeStartPercent) {
            const fadeProgress =
              (waveProgress - fadeStartPercent) / (1 - fadeStartPercent);
            bulgeFadeOut = 1 - fadeProgress;
          }
        } else {
          waveProgress = 0;
          showBulge = false;
        }
      }
    }
  }

  const waveRadius = waveProgress * maxRadius * 1.5;

  if (trigger === "instant") {
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      let opacity = dot.baseOpacity;

      if (flicker) {
        const flickerValue = Math.sin(
          time * dot.flickerSpeed * 3 + dot.flickerPhase
        );
        const flickerMultiplier = 0.6 + flickerValue * 0.4;
        opacity *= flickerMultiplier;
      }

      let offsetX = 0;
      let offsetY = 0;
      let sizeMultiplier = 1;
      let bulgeOpacity = 1;

      if (bulge && showBulge) {
        if (bulge.type === "ripple") {
          const dx = dot.x - centerX;
          const dy = dot.y - centerY;
          const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
          const distanceToWave = Math.abs(distanceFromCenter - waveRadius);
          const waveWidth = maxRadius * 0.15;
          const distanceNorm = distanceToWave / waveWidth;
          const waveFactor = Math.exp(-distanceNorm * distanceNorm * 4);

          const angle = Math.atan2(dy, dx);
          const displacementAmount =
            waveFactor * bulge.intensity * bulgeFadeOut;
          offsetX = Math.cos(angle) * displacementAmount;
          offsetY = Math.sin(angle) * displacementAmount;

          sizeMultiplier = 1 + waveFactor * 0.8 * bulgeFadeOut;
          const waveOpacity = 0.3 + waveFactor * 0.7;
          bulgeOpacity = 1 + (waveOpacity - 1) * bulgeFadeOut;
        } else if (bulge.type === "wave") {
          const diagonalLength = Math.sqrt(
            canvasWidth * canvasWidth + canvasHeight * canvasHeight
          );
          const wavePosOnDiagonal =
            waveProgress * diagonalLength * 1.4 - diagonalLength * 0.2;

          const normalizedX = dot.x / canvasWidth;
          const normalizedY = 1 - dot.y / canvasHeight;
          const dotDiagonalPos =
            ((normalizedX + normalizedY) / 2) * diagonalLength;

          const distanceToWaveFront = dotDiagonalPos - wavePosOnDiagonal;
          const waveWidth = diagonalLength * 0.25;
          const distanceNorm = distanceToWaveFront / waveWidth;

          const waveFactor = Math.exp(-distanceNorm * distanceNorm * 2.5);

          const perpendicularOffset = normalizedY - normalizedX;
          const rotationPhase = waveProgress * Math.PI * 3;
          const primaryFreq = 3;
          const sCurvePrimary = Math.sin(
            perpendicularOffset * Math.PI * primaryFreq + rotationPhase
          );

          const secondaryFreq = 7;
          const sCurveSecondary =
            Math.sin(
              perpendicularOffset * Math.PI * secondaryFreq -
                rotationPhase * 1.5
            ) * 0.4;

          const sCurveFactor = sCurvePrimary + sCurveSecondary;
          const curveStrength = 1 - Math.abs(distanceNorm) * 0.5;
          const modulatedCurve = sCurveFactor * curveStrength;

          const baseDisplacement = waveFactor * bulge.intensity * bulgeFadeOut;
          const diagonalAngle = Math.PI / 4;
          const perpAngle = diagonalAngle + Math.PI / 2;

          offsetX =
            Math.cos(diagonalAngle) * baseDisplacement +
            Math.cos(perpAngle) * modulatedCurve * baseDisplacement * 0.8;
          offsetY =
            -Math.sin(diagonalAngle) * baseDisplacement -
            Math.sin(perpAngle) * modulatedCurve * baseDisplacement * 0.8;

          sizeMultiplier = 1 + waveFactor * 0.5 * bulgeFadeOut;
          const waveOpacity = 0.4 + waveFactor * 0.6;
          bulgeOpacity = 1 + (waveOpacity - 1) * bulgeFadeOut;
        }
      }

      ctx.fillStyle = dot.color;
      ctx.globalAlpha = opacity * bulgeOpacity;
      const adjustedSize = size * sizeMultiplier;
      const sizeOffset = (adjustedSize - size) / 2;
      ctx.fillRect(
        dot.x + offsetX - sizeOffset,
        dot.y + offsetY - sizeOffset,
        adjustedSize,
        adjustedSize
      );
    }
  }

  ctx.globalAlpha = 1;
  animationId = requestAnimationFrame(animate);
}

function start() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now();
  bulgeStartTime = Date.now();
  lastFrameTime = 0;
  animate();
}

function stop() {
  isRunning = false;
  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const message = e.data;

  switch (message.type) {
    case "init":
      canvas = message.canvas;
      ctx = canvas.getContext("2d");
      config = { ...config, ...message.config };

      if (config.bulge) {
        config.bulge = {
          type: config.bulge.type ?? "ripple",
          duration: config.bulge.duration ?? 3,
          intensity: config.bulge.intensity ?? 10,
          repeat: config.bulge.repeat ?? true,
          delay: config.bulge.delay ?? 0,
        };
      }

      updateGeometry(message.width, message.height);
      start();
      break;

    case "resize":
      if (ctx) {
        ctx.resetTransform();
      }
      updateGeometry(message.width, message.height);
      break;

    case "visibility":
      isVisible = message.isVisible;
      break;

    case "stop":
      stop();
      break;
  }
};

self.postMessage({ type: "ready" });
