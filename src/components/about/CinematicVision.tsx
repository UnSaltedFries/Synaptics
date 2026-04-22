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
    const words = text.split(" ");

    return (
        <section ref={containerRef} className="h-[300vh] bg-black relative z-[100] text-white">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-10 md:px-20">
                <div className="absolute inset-0 bg-black" />
                
                <div className="w-full max-w-6xl relative z-10">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight leading-[1.4] flex flex-wrap justify-center items-center gap-x-[0.4em] gap-y-4 text-white">
                        {words.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-flex">
                                {word.split("").map((char, charIndex) => {
                                    // Calculate global index for reveal timing
                                    const charGlobalIndex = text.split(" ").slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0) + charIndex;
                                    const start = (charGlobalIndex / text.length) * 0.6;
                                    const end = start + 0.12;
                                    
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
    // Smoother reveal with blur and scale
    const opacity = useTransform(progress, range, [0, 1]);
    const y = useTransform(progress, range, ["30%", "0%"]);
    const scale = useTransform(progress, range, [0.9, 1]);
    const filter = useTransform(progress, range, ["blur(8px)", "blur(0px)"]);
    
    return (
        <span className="relative inline-block py-1" style={{ isolation: "isolate" }}>
            <motion.span 
                style={{ 
                    opacity,
                    y, 
                    scale,
                    filter,
                    WebkitFontSmoothing: "antialiased", 
                    willChange: "transform, opacity, filter",
                }} 
                className="inline-block font-black text-white relative z-50 brightness-110"
            >
                {children}
            </motion.span>
        </span>
    );
};
