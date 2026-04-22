import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

export const CinematicVision = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { margin: "200px 0px 200px 0px" });
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const text = t("about.vision.text");
    const letters = text.split("");

    return (
        <section ref={containerRef} className="h-[300vh] bg-black relative z-[100] text-white">
            <div 
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-10"
                style={{ display: isInView ? "flex" : "none" }}
            >
                <div className="absolute inset-0 bg-black" />
                
                <div className="w-full max-w-7xl relative z-10">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center tracking-tight leading-[1.1] flex flex-wrap justify-center text-white">
                        {letters.map((char, i) => {
                            // SLOWER REVEAL: spread over 70% of the section
                            const start = 0.0 + (i / letters.length) * 0.7;
                            const end = start + 0.15;
                            
                            return (
                                <Letter 
                                    key={i} 
                                    progress={scrollYProgress} 
                                    range={[start, end]}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </Letter>
                            );
                        })}
                    </h2>
                </div>
            </div>
        </section>
    );
};

const Letter = ({ children, progress, range }: { children: string; progress: any; range: [number, number] }) => {
    // Sharp reveal with 150% depth (total black at start)
    const y = useTransform(progress, range, ["150%", "0%"], { clamp: true });
    
    return (
        <span className="relative inline-block overflow-hidden py-4 z-10" style={{ isolation: "isolate" }}>
            <motion.span 
                style={{ 
                    y, 
                    opacity: 1, 
                    color: "#FFFFFF",
                    WebkitFontSmoothing: "antialiased", 
                    MozOsxFontSmoothing: "grayscale",
                    willChange: "transform",
                    transform: "translateZ(0)"
                }} 
                className="inline-block font-black text-white relative z-50 brightness-110"
            >
                {children}
            </motion.span>
        </span>
    );
};
