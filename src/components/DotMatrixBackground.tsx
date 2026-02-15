import { useEffect, useRef } from "react";

export const DotMatrixBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Handle high DPI displays
            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;

            ctx.scale(dpr, dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.clearRect(0, 0, width, height);

            const dotSize = 1.5;
            const spacing = 30;
            const rows = Math.ceil(height / spacing);
            const cols = Math.ceil(width / spacing);

            ctx.fillStyle = "rgba(255, 255, 255, 0.1)";

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    const x = j * spacing;
                    const y = i * spacing;

                    ctx.beginPath();
                    ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        // Initial render
        render();

        // Handle resize
        const handleResize = () => {
            render();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50"
        />
    );
};
