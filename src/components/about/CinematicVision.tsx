import { useEffect, useRef, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CinematicVision = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    
    const text = t("about.vision.text");
    const words = useMemo(() => text.split(" "), [text]);

    useEffect(() => {
        const letters = textRef.current?.querySelectorAll(".letter");
        if (!letters || letters.length === 0) return;

        const ctx = gsap.context(() => {
            // État initial forcé (placé dans le context pour plus de fiabilité)
            gsap.set(letters, { 
                y: "120%",
                opacity: 0,
                scale: 0.8,
                filter: "blur(15px)",
                force3D: true
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=1000%", 
                    scrub: 2, 
                    pin: innerRef.current,
                    pinSpacing: true,
                    anticipatePin: 1,
                }
            });

            // 1. DÉBUT : Zone de calme (25%)
            tl.to({}, { duration: 0.25 });

            // 2. MILIEU : Révélation (30%)
            tl.fromTo(letters, 
                { 
                    y: "120%",
                    opacity: 0,
                    scale: 0.8,
                    filter: "blur(15px)"
                },
                { 
                    y: "0%", 
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    stagger: 0.05,
                    ease: "power2.out",
                    duration: 0.30,
                    force3D: true
                }
            );

            // 3. MAINTIEN : Immersion totale (25%)
            tl.to({}, { duration: 0.25 });

            // 4. SORTIE : Décollage (10%)
            tl.to(letters, {
                y: "-100px",
                opacity: 0,
                scale: 1.1,
                filter: "blur(20px)",
                stagger: 0.02,
                ease: "power2.in",
                duration: 0.10,
                force3D: true
            });

            // 5. FIN : Silence radio (10%)
            tl.to({}, { duration: 0.10 });
        });

        return () => ctx.revert();
    }, [text]);

    return (
        <section ref={containerRef} className="bg-black relative z-10 w-full">
            <div 
                ref={innerRef}
                className="h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-20"
            >
                <div className="absolute inset-0 bg-black pointer-events-none" />
                
                <div 
                    className="w-full max-w-5xl relative z-20"
                    style={{
                        maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
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
