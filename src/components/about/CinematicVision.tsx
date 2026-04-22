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
        <section ref={containerRef} className="h-[300vh] bg-black relative z-10 text-white">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-20">
                <div className="absolute inset-0 bg-black pointer-events-none" />
                
                {/* Perfect center with explicit Navbar clearance */}
                <div className="w-full max-w-5xl relative z-10 translate-y-[80px]">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center tracking-tight leading-[1.1] flex flex-wrap justify-center text-white">
                        {words.map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-flex mx-[0.15em] my-1">
                                {word.split("").map((char, charIndex) => {
                                    const charGlobalIndex = text.split(" ").slice(0, wordIndex).join(" ").length + wordIndex + charIndex;
                                    // Faster reveal (0.5 instead of 0.7)
                                    const start = (charGlobalIndex / text.length) * 0.5;
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
    // Sharp reveal from below (Original Style)
    const y = useTransform(progress, range, ["150%", "0%"], { clamp: true });
    
    return (
        <span className="relative inline-block overflow-hidden py-2 z-10" style={{ isolation: "isolate" }}>
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
