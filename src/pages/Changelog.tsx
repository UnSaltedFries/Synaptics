import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal } from "@/components/ScrollReveal";
import Lenis from "lenis";

const versions = ["1.0.5", "1.0.4", "1.0.3", "1.0.2", "1.0.1"];

export default function Changelog() {
    const { t } = useLanguage();

    // Activation du Smooth Scroll Lenis (Inertial Scroll)
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            lerp: 0.1,
            infinite: false,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <Layout variant="dark">
            <div className="min-h-screen bg-black text-white font-sans">
                {/* Hero Section */}
                <section className="pt-32 pb-24 px-6 relative overflow-hidden">
                    <div className="container mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
                                Synaptics OS
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                                {t("changelog.title")}
                            </h1>
                            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                                {t("changelog.subtitle")}
                            </p>
                        </motion.div>
                    </div>

                    {/* Gradient Transition Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

                    {/* Decorative glow Top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/10 blur-[120px] pointer-events-none" />
                </section>

                {/* Timeline */}
                <main className="container mx-auto px-6 pb-32 max-w-4xl relative z-20">
                    <div className="relative">
                        {/* Vertical line with glow */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-blue-500/20 -translate-x-1/2 hidden md:block" />

                        <div className="space-y-24 relative">
                            {versions.map((v, idx) => (
                                <ScrollReveal key={v} delay={0.1}>
                                    <div className={`relative flex flex-col items-start ${
                                        idx % 2 === 0 ? "md:items-end" : "md:items-start"
                                    }`}>
                                        {/* Version Dot */}
                                        <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-black -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(59,130,246,0.5)] hidden md:block" />
                                        
                                        <div className={`w-full md:w-[45%] ${
                                            idx % 2 === 0 ? "md:text-right" : "md:text-left"
                                        }`}>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className={`flex flex-col w-full ${idx % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        {idx === 0 && (
                                                            <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider">
                                                                {t("changelog.latest")}
                                                            </span>
                                                        )}
                                                        <span className="text-blue-500 font-mono text-sm font-bold tracking-widest">{v}</span>
                                                    </div>
                                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                                                        {t(`v${v}.title`)}
                                                    </h2>
                                                    <p className="text-gray-500 text-sm font-medium italic">
                                                        {t(`v${v}.date`)}
                                                    </p>
                                                </div>
                                            </div>

                                            <motion.div 
                                                animate={{
                                                    y: [0, -8, 0],
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: idx * 0.5 // Décalage pour un effet organique non-synchronisé
                                                }}
                                                className={`p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm shadow-2xl transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.1] ${
                                                    idx % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                                                }`}
                                            >
                                                <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
                                                    {t(`v${v}.desc`)}
                                                </p>
                                                
                                                <ul className={`space-y-4 ${
                                                    idx % 2 === 0 ? "md:items-end text-right" : "md:items-start text-left"
                                                }`}>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(f => {
                                                        const feat = t(`v${v}.feat${f}`);
                                                        if (feat === `v${v}.feat${f}` || !feat) return null; 
                                                        return (
                                                            <li key={f} className={`flex items-start gap-3 group text-sm text-gray-300 font-medium ${
                                                                idx % 2 === 0 ? "md:flex-row-reverse" : "flex-row"
                                                            }`}>
                                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-500 transition-colors shadow-[0_0_8px_rgba(59,130,246,0.5)] shrink-0" />
                                                                <span className="leading-tight opacity-80 group-hover:opacity-100 transition-opacity">{feat}</span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </motion.div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
}
