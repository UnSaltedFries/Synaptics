import { useEffect, useRef, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CinematicVision = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    
    const text = t("about.vision.text") || "";
    const words = useMemo(() => text.split(" "), [text]);

    useEffect(() => {
        const container = containerRef.current;
        const letters = textRef.current?.querySelectorAll(".letter");
        if (!container || !letters || letters.length === 0) return;

        const raf = requestAnimationFrame(() => {
            const ctx = gsap.context(() => {
                // État initial : invisible
                gsap.set(letters, {
                    y: 80,
                    opacity: 0,
                    scale: 0.8,
                    filter: "blur(12px)",
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: "+=250%",
                        scrub: 0.5,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Phase 1 : Apparition des lettres (0% → 50%)
                tl.to(letters, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    stagger: 0.04,
                    ease: "power3.out",
                    duration: 0.5,
                    force3D: true,
                });

                // Phase 2 : Pause — le texte reste visible (50% → 70%)
                tl.to({}, { duration: 0.2 });

                // Phase 3 : Disparition du texte (70% → 100%)
                tl.to(letters, {
                    y: -60,
                    opacity: 0,
                    scale: 1.1,
                    filter: "blur(8px)",
                    stagger: 0.02,
                    ease: "power2.in",
                    duration: 0.3,
                    force3D: true,
                });

            }, container);

            (container as any).__gsapCtx = ctx;
        });

        return () => {
            cancelAnimationFrame(raf);
            const ctx = (containerRef.current as any)?.__gsapCtx;
            if (ctx) ctx.revert();
        };
    }, [text]);

    return (
        <section ref={containerRef} className="bg-black relative z-10 w-full h-screen">
            <div 
                className="h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-20"
            >
                <div className="absolute inset-0 bg-black pointer-events-none" />
                
                <div 
                    className="w-full max-w-5xl relative z-20"
                    style={{
                        maskImage: "linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)",
                        contain: "layout style"
                    }}
                >
                    <h2 ref={textRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight leading-[1.1] flex flex-wrap justify-center text-white">
                        {words.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-flex mx-[0.15em] my-1">
                                {word.split("").map((char, charIndex) => (
                                    <span 
                                        key={charIndex} 
                                        className="relative inline-block py-10 px-6 -my-10 -mx-6" 
                                        style={{ isolation: "isolate" }}
                                    >
                                        <span 
                                            className="letter inline-block font-black text-white relative z-50 brightness-110 will-change-transform antialiased"
                                            style={{ 
                                                WebkitFontSmoothing: "antialiased",
                                                backfaceVisibility: "hidden",
                                                transform: "translateZ(0)"
                                            }}
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h2>
                </div>
            </div>
        </section>
    );
};
