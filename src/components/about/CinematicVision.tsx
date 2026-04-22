import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import BlurText from "@/components/BlurText";

export const CinematicVision = () => {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const text = t("about.vision.text");

    return (
        <section 
            ref={containerRef} 
            className="min-h-screen bg-black relative z-10 flex flex-col items-center justify-center px-6 md:px-20 py-32"
        >
            <div className="absolute inset-0 bg-black pointer-events-none" />
            
            <div className="w-full max-w-5xl relative z-10">
                <BlurText
                    text={text}
                    className="text-4xl md:text-6xl lg:text-8xl font-bold text-center tracking-tight leading-[1.1] text-white"
                    delay={100}
                    animateBy="words"
                    direction="bottom"
                    threshold={0.2}
                />
            </div>
        </section>
    );
};
