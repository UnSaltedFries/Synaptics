import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const CinematicVision = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const text = t("about.vision.text");
    const words = text.split(" ");

    return (
        <section ref={containerRef} className="h-[300vh] bg-black relative z-10">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-20">
                <div className="absolute inset-0 bg-black pointer-events-none" />
                
                <div className="w-full max-w-5xl relative z-20">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight leading-[1.1] flex flex-wrap justify-center text-white">
                        {words.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-flex mx-[0.15em] my-1">
                                {word.split("").map((char, charIndex) => {
                                    const charGlobalIndex = text.split(" ").slice(0, wordIndex).join(" ").length + wordIndex + charIndex;
                                    const start = (charGlobalIndex / text.length) * 0.7;
                                    const end = start + 0.15;
                                    
                                    return (
                                        <Letter 
                                            key={charIndex} 
                                            progress={scrollYProgress} 
                                            range={[start, end]}
                                        >
                                            {char}
                                        </Letter>
                                    );
                                })}
                            </span>
                        ))}
                    </h2>
                </div>
            </div>
        </section>
    );
};

const Letter = ({ children, progress, range }: { children: string; progress: any; range: [number, number] }) => {
    const y = useTransform(progress, range, ["150%", "0%"], { clamp: true });
    
    return (
        <span className="relative inline-block overflow-hidden py-4 z-10" style={{ isolation: "isolate" }}>
            <motion.span 
                style={{ 
                    y, 
                    WebkitFontSmoothing: "antialiased", 
                    MozOsxFontSmoothing: "grayscale",
                    willChange: "transform",
                }} 
                className="inline-block font-black text-white relative z-50 brightness-110"
            >
                {children}
            </motion.span>
        </span>
    );
};
