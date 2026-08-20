'use client';

import { useEffect, useRef, useCallback } from 'react';

interface PathCanvasProps {
  className?: string;
  showIntersection?: boolean;
  intersectionProgress?: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface PathPoint {
  x: number;
  y: number;
}

export default function PathCanvas({
  className = '',
  showIntersection = false,
  intersectionProgress = 0,
}: PathCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const timeRef = useRef(0);

  const generateStars = useCallback((w: number, h: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.005 + 0.002,
      });
    }
    return stars;
  }, []);

  const generateSmoothPath = useCallback(
    (startX: number, startY: number, endX: number, endY: number, w: number, h: number, seed: number): PathPoint[] => {
      const points: PathPoint[] = [];
      const steps = 60;
      const cpx1 = startX + (endX - startX) * 0.3 + Math.sin(seed) * w * 0.15;
      const cpy1 = startY + (endY - startY) * 0.1 + Math.cos(seed) * h * 0.2;
      const cpx2 = startX + (endX - startX) * 0.7 + Math.cos(seed * 2) * w * 0.1;
      const cpy2 = startY + (endY - startY) * 0.9 + Math.sin(seed * 3) * h * 0.15;

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const t2 = t * t;
        const t3 = t2 * t;
        const mt = 1 - t;
        const mt2 = mt * mt;
        const mt3 = mt2 * mt;
        const x =
          mt3 * startX +
          3 * mt2 * t * cpx1 +
          3 * mt * t2 * cpx2 +
          t3 * endX;
        const y =
          mt3 * startY +
          3 * mt2 * t * cpy1 +
          3 * mt * t2 * cpy2 +
          t3 * endY;
        points.push({ x, y });
      }
      return points;
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      starsRef.current = generateStars(rect.width, rect.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const paths1 = generateSmoothPath(
      0, canvas.getBoundingClientRect().height * 0.8,
      canvas.getBoundingClientRect().width,
      canvas.getBoundingClientRect().height * 0.2,
      canvas.getBoundingClientRect().width,
      canvas.getBoundingClientRect().height,
      1.5
    );
    const paths2 = generateSmoothPath(
      canvas.getBoundingClientRect().width * 0.1,
      0,
      canvas.getBoundingClientRect().width * 0.9,
      canvas.getBoundingClientRect().height,
      canvas.getBoundingClientRect().width,
      canvas.getBoundingClientRect().height,
      3.7
    );
    const paths3 = generateSmoothPath(
      canvas.getBoundingClientRect().width,
      canvas.getBoundingClientRect().height * 0.6,
      0,
      canvas.getBoundingClientRect().height * 0.4,
      canvas.getBoundingClientRect().width,
      canvas.getBoundingClientRect().height,
      5.2
    );

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      timeRef.current += 0.003;
      const t = timeRef.current;

      // Draw stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(t * star.speed * 200 + star.x) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 237, 230, ${star.opacity * twinkle})`;
        ctx.fill();
      });

      // Draw paths with moving dots
      const drawPath = (
        path: PathPoint[],
        color: string,
        glowColor: string,
        phase: number
      ) => {
        // Path line
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.lineDashOffset = -t * 30 * (phase * 0.5 + 0.5);
        ctx.stroke();
        ctx.setLineDash([]);

        // Moving dot along path
        const dotIdx =
          Math.floor(((t * 15 * (phase * 0.3 + 0.7)) % 1) * (path.length - 1));
        const dot = path[Math.min(dotIdx, path.length - 1)];

        // Glow
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, 20
        );
        gradient.addColorStop(0, glowColor);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(dot.x - 20, dot.y - 20, 40, 40);

        // Dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = glowColor;
        ctx.fill();
      };

      drawPath(paths1, 'rgba(212, 165, 116, 0.25)', 'rgba(212, 165, 116, 0.6)', 1);
      drawPath(paths2, 'rgba(184, 169, 201, 0.25)', 'rgba(184, 169, 201, 0.6)', 2);
      drawPath(paths3, 'rgba(124, 185, 168, 0.25)', 'rgba(124, 185, 168, 0.6)', 3);

      // Intersection point
      if (showIntersection && intersectionProgress > 0) {
        const cx = rect.width * 0.5;
        const cy = rect.height * 0.5;
        const p = Math.min(intersectionProgress, 1);

        // Expanding rings
        for (let i = 0; i < 3; i++) {
          const ringProgress = (p + i * 0.15) % 1;
          const ringRadius = ringProgress * 60;
          const ringOpacity = (1 - ringProgress) * 0.5;
          ctx.beginPath();
          ctx.arc(cx, cy, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 165, 116, ${ringOpacity})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Core glow
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30 * p);
        coreGrad.addColorStop(0, `rgba(232, 200, 160, ${0.8 * p})`);
        coreGrad.addColorStop(0.5, `rgba(212, 165, 116, ${0.3 * p})`);
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.fillRect(cx - 30, cy - 30, 60, 60);

        // Center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 4 * p, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 237, 230, ${p})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [generateStars, generateSmoothPath, showIntersection, intersectionProgress]);

  return (
    <canvas
      ref={canvasRef}
      className={`${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
