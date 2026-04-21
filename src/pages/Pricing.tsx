import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import LightRays from "@/components/LightRays";
import BlurText from "@/components/BlurText";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { PricingConfigurator } from "@/components/PricingConfigurator";

const CheckIcon = () => (
    <svg className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const Pricing = () => {
    const { t } = useLanguage();

    const features = [
        t("pricing.enterprise.f1"),
        t("pricing.enterprise.f2"),
        t("pricing.enterprise.f3"),
        t("pricing.enterprise.f4"),
        t("pricing.enterprise.f5"),
        t("pricing.enterprise.f6"),
    ];

    return (
        <Layout variant="dark">
            <section className="min-h-screen bg-black text-white pt-20 pb-32 relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <LightRays
                        raysColor="#a855f7" // Purple-500
                        raysSpeed={0.2}
                        raysOrigin="top-center"
                        clickable={false}
                    />
                </div>
                
                <div className="container py-12 md:py-16 relative z-10">
                    <div className="text-center mb-16 md:mb-24">
                        <div className="mb-6">
                            <BlurText
                                text={t("pricing.title")}
                                className="text-5xl md:text-6xl lg:text-8xl font-bold text-white tracking-[-0.04em] leading-[0.85]"
                                delay={150}
                                animateBy="words"
                                direction="bottom"
                            />
                        </div>
                        <motion.p 
                            initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                            className="text-gray-400 max-w-2xl mx-auto text-lg"
                        >
                            {t("pricing.subtitle")}
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start">
                        {/* LEFT: The Kustom Agent Card */}
                        <ScrollReveal delay={0.4} className="w-full">
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase">
                                    01. AI FRONT-OFFICE
                                </h3>
                                <motion.div
                                    className="relative rounded-[2.5rem] border border-white/[0.1] bg-white/[0.03] backdrop-blur-md p-8 md:p-12 w-full overflow-hidden"
                                >
                                    {/* Accent line */}
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                                    
                                    <h3 className="text-sm uppercase tracking-[0.2em] text-purple-400 font-bold mb-8">
                                        {t("pricing.enterprise")}
                                    </h3>

                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-6xl md:text-7xl font-bold text-white tracking-tighter">{t("pricing.enterprise.price")}</span>
                                    </div>
                                    <p className="text-gray-400 text-lg mb-10 leading-relaxed">{t("pricing.enterprise.desc")}</p>

                                    <div className="h-px bg-white/[0.08] mb-10" />

                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-12">
                                        {features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-4 text-sm text-gray-300">
                                                <div className="mt-1"><CheckIcon /></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to="/contact"
                                        className="block w-full text-center py-5 rounded-2xl font-bold text-base tracking-wide transition-all duration-300 bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                                    >
                                        {t("pricing.cta.contact")}
                                    </Link>

                                    <p className="text-center text-gray-500 text-xs mt-6 tracking-wide italic">
                                        {t("pricing.custom.note")}
                                    </p>
                                </motion.div>
                            </div>
                        </ScrollReveal>

                        {/* RIGHT: The Configurator */}
                        <ScrollReveal delay={0.6} className="w-full">
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase">
                                    02. WORKFLOW BACK-OFFICE
                                </h3>
                                <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-white/[0.08] to-transparent">
                                    <div className="rounded-[2.4rem] bg-black/40 backdrop-blur-sm p-4 md:p-8">
                                        <PricingConfigurator />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Pricing;
