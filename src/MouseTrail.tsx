import React, { useRef, useEffect } from 'react';

const COLORS = ['#00d8ff', '#0099cc'];
const DOTS = 12;
const TRAIL_LENGTH = 18;

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

const MouseTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<{ x: number; y: number; color: string }[]>([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;

    // Initialize trail
    if (trail.current.length === 0) {
      for (let i = 0; i < DOTS * TRAIL_LENGTH; i++) {
        trail.current.push({
          x: mouse.current.x,
          y: mouse.current.y,
          color: COLORS[i % COLORS.length],
        });
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Move each dot towards the previous one
      for (let i = 0; i < trail.current.length; i++) {
        if (i === 0) {
          trail.current[i].x = lerp(trail.current[i].x, mouse.current.x, 0.25);
          trail.current[i].y = lerp(trail.current[i].y, mouse.current.y, 0.25);
        } else {
          trail.current[i].x = lerp(trail.current[i].x, trail.current[i - 1].x, 0.25);
          trail.current[i].y = lerp(trail.current[i].y, trail.current[i - 1].y, 0.25);
        }
        ctx.beginPath();
        ctx.arc(trail.current[i].x, trail.current[i].y, 7 - (i % TRAIL_LENGTH) * 0.3, 0, 2 * Math.PI);
        ctx.fillStyle = trail.current[i].color + 'cc';
        ctx.shadowColor = trail.current[i].color;
        ctx.shadowBlur = 12 - (i % TRAIL_LENGTH);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      animationId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
};

export default MouseTrail; 