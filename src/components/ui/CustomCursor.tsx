import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const isHovering = useRef(false);
    const isInitialized = useRef(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const inner = innerRef.current;
        if (!cursor || !inner) return;

        // Cacher le curseur système
        const style = document.createElement("style");
        style.innerHTML = `* { cursor: none !important; }`;
        document.head.appendChild(style);

        // Center cursor on pointer via percent translation (GSAP composes with x/y)
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.06, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.06, ease: "power3.out" });

        const onMouseMove = (e: MouseEvent) => {
            if (!isInitialized.current) {
                gsap.set(cursor, { x: e.clientX, y: e.clientY });
                isInitialized.current = true;
                setIsVisible(true);
            }

            xTo(e.clientX);
            yTo(e.clientY);

            // DÉLÉGATION D'ÉVÈNEMENTS : Détection intelligente du survol
            // C'est beaucoup plus léger que de mettre des listeners sur chaque bouton
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"], input, textarea, .interactive');
            
            if (isInteractive && !isHovering.current) {
                isHovering.current = true;
                gsap.to(inner, { scale: 1.3, duration: 0.25, ease: "power2.out", overwrite: true });
            } else if (!isInteractive && isHovering.current) {
                isHovering.current = false;
                gsap.to(inner, { scale: 1, duration: 0.25, ease: "power2.out", overwrite: true });
            }
        };

        const onMouseDown = () => {
            gsap.to(inner, { scale: 0.85, duration: 0.15, ease: "power2.out", overwrite: true });
        };

        const onMouseUp = () => {
            gsap.to(inner, { scale: isHovering.current ? 1.3 : 1, duration: 0.2, ease: "power2.out", overwrite: true });
        };

        const onMouseEnterWindow = () => setIsVisible(true);
        const onMouseLeaveWindow = () => setIsVisible(false);

        // Listeners globaux
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        document.addEventListener("mouseleave", onMouseLeaveWindow);
        document.addEventListener("mouseenter", onMouseEnterWindow);
        
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            document.removeEventListener("mouseleave", onMouseLeaveWindow);
            document.removeEventListener("mouseenter", onMouseEnterWindow);
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className={`fixed top-0 left-0 pointer-events-none z-[9999999] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{
                willChange: "transform"
            }}
        >
            <div 
                ref={innerRef}
                style={{ 
                    transformOrigin: "50% 50%", 
                    willChange: "transform"
                }}
            >
                <img 
                    src="/images/custom-cursor.png" 
                    alt="Cursor" 
                    className="w-5 h-5 object-contain"
                />
            </div>
        </div>
    );
};
