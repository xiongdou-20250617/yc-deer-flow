"use client"; // Add this directive at the top

import React, { useEffect, useRef } from 'react';
import styles from './galaxy.module.css';

interface Particle {
    angle: number;
    radius: number;
    z: number;
    speed: number;
    x: number;
    y: number;
    size: number;
    color: string;
}

export const Galaxy = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const centerRef = useRef({ x: 0, y: 0 });
    const num = 2000;

    const createGalaxyParticle = (): Particle => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 1;
        return {
            angle,
            radius,
            z: Math.random() * 1000 + 200,
            speed: 0.1 + Math.random() * 0.3,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            size: Math.random() * 0.6 + 0.1,
            color: `hsl(${Math.floor(Math.random() * 360)}, 100%, ${50 + Math.random() * 20}%)`
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            centerRef.current = {
                x: canvas.width / 2,
                y: canvas.height / 2
            };
        };

        resizeCanvas();
        particlesRef.current = Array.from({ length: num }, createGalaxyParticle);

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 10, 0.15)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(p => {
                p.z -= p.speed;
                if (p.z <= 1) Object.assign(p, createGalaxyParticle());

                const scale = 500 / p.z;
                const x = p.x * scale * canvas.width + centerRef.current.x;
                const y = p.y * scale * canvas.height + centerRef.current.y;
                const size = p.size * scale * 0.3;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);
        window.addEventListener('resize', resizeCanvas);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <div className={styles.galaxyContainer}>
          <canvas ref={canvasRef} className={styles.canvas} />
        </div>
      );
};

