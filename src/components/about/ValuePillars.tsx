import { useRef, useEffect, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ValuePillars = () => {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // Optimisation 1 : Mémoïser la liste des piliers
    const pillars = useMemo(() => [
        {
            id: "01",
            title: t("about.pillars.p1.title"),
            desc: t("about.pillars.p1.desc"),
            stat: t("about.pillars.p1.stat"),
            label: t("about.pillars.p1.label"),
        },
        {
            id: "02",
            title: t("about.pillars.p2.title"),
            desc: t("about.pillars.p2.desc"),
            stat: t("about.pillars.p2.stat"),
            label: t("about.pillars.p2.label"),
        },
        {
            id: "03",
            title: t("about.pillars.p3.title"),
            desc: t("about.pillars.p3.desc"),
            stat: t("about.pillars.p3.stat"),
            label: t("about.pillars.p3.label"),
        },
    ], [t]);

    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;
        if (!section || !trigger) return;

        // Optimisation 2 : GSAP Context pour isolation et nettoyage
        const ctx = gsap.context(() => {
            const totalWidth = section.scrollWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trigger,
                    pin: true,
                    scrub: 1,
                    start: "top top",
                    end: () => "+=450%", 
                    invalidateOnRefresh: true, // Recalcule si la fenêtre change de taille
                },
            });

            tl.fromTo(section, 
                { x: "100vw" }, 
                { 
                    x: `-${totalWidth + 500}px`, 
                    ease: "none",
                    force3D: true // Accélération matérielle
                }
            );
        }, triggerRef);

        return () => ctx.revert();
    }, [pillars]); // Dépendance sur pillars pour recalculer si la langue change

    return (
        <div ref={triggerRef} className="bg-black overflow-hidden relative">
            <div 
                ref={sectionRef} 
                className="flex h-screen items-center gap-10 pr-[10vw]" 
                style={{ 
                    willChange: "transform",
                }}
            >
                {pillars.map((pillar) => (
                    <div 
                        key={pillar.id} 
                        className="w-[85vw] md:w-[70vw] lg:w-[65vw] h-full flex items-center justify-center flex-shrink-0 px-4"
                    >
                        <div 
                            className="w-full h-[70vh] rounded-[3.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm relative overflow-hidden p-8 md:p-16 flex flex-col justify-center"
                            style={{ 
                                // Optimisation 4 : Isoler le rendu de la carte (Backface visibility hidden pour GPU)
                                backfaceVisibility: "hidden",
                                transform: "translateZ(0)"
                            }}
                        >
                            <div className="absolute top-[10%] right-[5%] text-[15vw] font-bold text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter">
                                {pillar.id}
                            </div>
                            
                            <div className="max-w-4xl relative z-10 space-y-8 md:space-y-12">
                                <div className="space-y-4 md:space-y-6">
                                    <span className="text-blue-500 font-mono text-sm tracking-[0.3em] font-bold uppercase block">
                                        {pillar.id} / Foundation
                                    </span>
                                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[0.95]">
                                        {pillar.title}
                                    </h3>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
                                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-md">
                                        {pillar.desc}
                                    </p>
                                    
                                    <div className="flex flex-col border-l border-white/10 pl-8">
                                        <span className="text-4xl md:text-7xl font-bold text-white mb-2 tracking-tighter">
                                            {pillar.stat}
                                        </span>
                                        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">
                                            {pillar.label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-12 left-12 right-12 h-px bg-white/5 overflow-hidden">
                                <div className="h-full w-1/3 bg-blue-500/20" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
