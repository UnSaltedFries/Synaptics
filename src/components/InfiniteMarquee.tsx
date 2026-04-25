import { useRef, useEffect, useState } from "react";

interface InfiniteMarqueeProps {
    speed?: number;
}

const MARQUEE_ITEMS = [
    "AI AGENTS",
    "VOICE",
    "EMAIL TRIAGE",
    "DOCUMENTS",
    "INVOICING",
    "AUTOMATION",
    "LLMs",
    "WORKFLOWS",
    "24/7",
];

const MarqueeRow = ({ reverse = false, speed = 30, isVisible = true }: { reverse?: boolean; speed?: number; isVisible: boolean }) => {
    const content = MARQUEE_ITEMS.map((item, i) => (
        <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot">•</span>
        </span>
    ));

    return (
        <div
            className="marquee-track"
            style={{
                animationDirection: reverse ? "reverse" : "normal",
                animationDuration: `${speed}s`,
                // Optimisation : On met en pause l'animation si elle n'est pas visible
                animationPlayState: isVisible ? "running" : "paused",
                willChange: "transform", // Forcer le GPU
            }}
        >
            {content}
            {content}
            {content}
        </div>
    );
};

const InfiniteMarquee = ({ speed = 30 }: InfiniteMarqueeProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;

        // Optimisation : Intersection Observer pour arrêter l'animation hors-champ
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="marquee-container"
            style={{ contentVisibility: "auto" }} // Aide au rendu du navigateur
        >
            <MarqueeRow speed={speed} isVisible={isVisible} />
            <MarqueeRow reverse speed={speed * 1.3} isVisible={isVisible} />
        </div>
    );
};

export default InfiniteMarquee;
