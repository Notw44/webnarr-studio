import React, { useEffect, useRef } from 'react';

export default function MetallicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates to add a responsive "gleam" effect
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Function to draw realistic 3D metallic diamond treads
    const drawTread = (pCtx: CanvasRenderingContext2D, x: number, y: number, angle: number) => {
      pCtx.save();
      pCtx.translate(x, y);
      pCtx.rotate(angle);
      
      const w = 18; // length of the steel tread
      const h = 5.2; // thickness of the tread
      
      // 1. 3D Shadow underneath the tread
      pCtx.fillStyle = 'rgba(0, 0, 0, 0.75)';
      pCtx.beginPath();
      pCtx.ellipse(1.5, 2.2, w / 2, h / 2, 0, 0, Math.PI * 2);
      pCtx.fill();
      
      // 2. Metallic gradient for tread body
      const grad = pCtx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
      grad.addColorStop(0, '#8e9aaf'); // light silver highlight edge
      grad.addColorStop(0.3, '#cbd5e1'); // shiny light silver core
      grad.addColorStop(0.6, '#475569'); // industrial steel body
      grad.addColorStop(1, '#1e293b'); // dark shadow edge
      
      pCtx.fillStyle = grad;
      pCtx.beginPath();
      pCtx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
      pCtx.fill();
      
      // 3. Fine bright silver highlight on the top edge
      pCtx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      pCtx.lineWidth = 0.85;
      pCtx.beginPath();
      pCtx.ellipse(-0.5, -0.5, (w / 2) * 0.9, (h / 2) * 0.8, 0, Math.PI, Math.PI * 2);
      pCtx.stroke();
      
      pCtx.restore();
    };

    // Generate static diamond-plate metal canvas to tile as an overlay
    const noiseCanvas = document.createElement('canvas');
    const noiseCtx = noiseCanvas.getContext('2d');
    const noiseWidth = 256;
    const noiseHeight = 256;
    noiseCanvas.width = noiseWidth;
    noiseCanvas.height = noiseHeight;

    if (noiseCtx) {
      // Base dark industrial slate background
      noiseCtx.fillStyle = '#0a0d15';
      noiseCtx.fillRect(0, 0, noiseWidth, noiseHeight);

      // Create extremely fine brushed horizontal micro-lines for steel finish
      noiseCtx.fillStyle = 'rgba(255, 255, 255, 0.035)';
      for (let i = 0; i < 1500; i++) {
        const x = Math.random() * noiseWidth;
        const y = Math.random() * noiseHeight;
        const w = 25 + Math.random() * 90;
        const h = 0.5 + Math.random() * 0.5;
        noiseCtx.fillRect(x, y, w, h);
      }

      noiseCtx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      for (let i = 0; i < 1200; i++) {
        const x = Math.random() * noiseWidth;
        const y = Math.random() * noiseHeight;
        const w = 15 + Math.random() * 70;
        const h = 0.5 + Math.random() * 0.5;
        noiseCtx.fillRect(x, y, w, h);
      }

      // Draw seamless alternating grid of 3D diamond plates
      const gridS = 32; // density of the diamond grid
      for (let px = 0; px <= noiseWidth; px += gridS) {
        for (let py = 0; py <= noiseHeight; py += gridS) {
          const isEvenX = Math.round(px / gridS) % 2 === 0;
          const isEvenY = Math.round(py / gridS) % 2 === 0;
          
          if (isEvenX === isEvenY) {
            // Draw 45 deg tread
            drawTread(noiseCtx, px, py, Math.PI / 4);
          } else {
            // Draw -45 deg tread
            drawTread(noiseCtx, px, py, -Math.PI / 4);
          }
        }
      }

      // Add extremely fine sand grain noise for metallic surface texture
      const imgData = noiseCtx.getImageData(0, 0, noiseWidth, noiseHeight);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 5;
        data[i] = Math.min(255, Math.max(0, data[i] + noise));
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
      }
      noiseCtx.putImageData(imgData, 0, 0);
    }

    // Animation states
    let time = 0;

    const render = () => {
      time += 0.0012; // slow drift speed

      // Smooth interpolation for mouse position (physics ease-out)
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Draw background base color
      ctx.fillStyle = '#0a0d14'; // Dark cold metal titanium-gray
      ctx.fillRect(0, 0, width, height);

      // Draw a series of diagonal metallic sheen bands that slowly sweep and respond to the mouse
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      
      // Calculate dynamic positions for the sheen highlights using sine waves
      const wave1 = Math.sin(time * 1.5) * 0.15 + 0.3;
      const wave2 = Math.cos(time * 1.2) * 0.15 + 0.55;
      const wave3 = Math.sin(time * 0.8) * 0.1 + 0.8;

      // Metallic gradient stops (titanium/chrome/platinum tones)
      gradient.addColorStop(0, '#0a0d14'); // dark metal slate
      gradient.addColorStop(Math.max(0, wave1 - 0.15), '#0c0f17');
      gradient.addColorStop(wave1, '#1b2234'); // silver steel glow
      gradient.addColorStop(Math.min(1, wave1 + 0.15), '#0c0f17');
      
      gradient.addColorStop(Math.max(0, wave2 - 0.12), '#080a0f');
      gradient.addColorStop(wave2, '#222b40'); // bright platinum sheen
      gradient.addColorStop(Math.min(1, wave2 + 0.12), '#080a0f');
      
      gradient.addColorStop(Math.max(0, wave3 - 0.1), '#0c0f17');
      gradient.addColorStop(wave3, '#1d2537'); // warm nickel glow
      gradient.addColorStop(1, '#06080c');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Create interactive light gleam responding to client's mouse
      const mouseGleam = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        Math.max(width, height) * 0.45
      );
      mouseGleam.addColorStop(0, 'rgba(226, 232, 240, 0.08)'); // subtle light reflective silver
      mouseGleam.addColorStop(0.2, 'rgba(148, 163, 184, 0.03)'); // slate blue metal sheen
      mouseGleam.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = mouseGleam;
      ctx.fillRect(0, 0, width, height);

      // Tile the static brushed metallic texture over the canvas with "overlay" blending
      ctx.save();
      ctx.globalAlpha = 0.24; // realistic high-contrast overlay so diamond-plate pattern stands out beautifully
      ctx.globalCompositeOperation = 'overlay';
      
      const patternWidth = noiseCanvas.width;
      const patternHeight = noiseCanvas.height;
      for (let x = 0; x < width; x += patternWidth) {
        for (let y = 0; y < height; y += patternHeight) {
          ctx.drawImage(noiseCanvas, x, y);
        }
      }
      ctx.restore();

      // Add a subtle horizontal horizon sweep
      const horizonY = (Math.sin(time * 0.5) * 0.5 + 0.5) * height;
      const horizonGleam = ctx.createLinearGradient(0, horizonY - 120, 0, horizonY + 120);
      horizonGleam.addColorStop(0, 'rgba(255, 255, 255, 0)');
      horizonGleam.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
      horizonGleam.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = horizonGleam;
      ctx.fillRect(0, horizonY - 120, width, 240);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
