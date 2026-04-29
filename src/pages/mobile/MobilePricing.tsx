import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import LightRays from "@/components/LightRays";
import BlurText from "@/components/BlurText";
import ScrollReveal from "@/components/ScrollReveal";
import { PricingConfigurator } from "@/components/PricingConfigurator";

const CheckIcon = () => (
    <svg className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const MobilePricing = () => {
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
            <div className="min-h-screen bg-black text-white relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
                {/* Background Rays */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <LightRays
                        raysColor="#a855f7"
                        raysSpeed={0.2}
                        raysOrigin="top-center"
                        clickable={false}
                    />
                </div>

                <div className="relative z-10 px-5 pt-24 pb-20">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <BlurText
                            text={t("pricing.title")}
                            className="text-4xl font-bold text-white tracking-tight leading-tight mb-4"
                            delay={100}
                            animateBy="words"
                            direction="bottom"
                        />
                        <ScrollReveal delay={0.3}>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                {t("pricing.subtitle")}
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="space-y-20">
                        {/* Section 01: Front Office Card */}
                        <div className="space-y-6">
                            <BlurText
                                text="01. AI FRONT-OFFICE"
                                className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase text-center w-full"
                                animateBy="letters"
                                delay={40}
                            />
                            
                            <ScrollReveal delay={0.2}>
                                <motion.div
                                    className="relative rounded-[2rem] border border-white/[0.1] bg-white/[0.03] backdrop-blur-md p-6 overflow-hidden"
                                >
                                    {/* Accent line */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                                    
                                    <h3 className="text-[10px] uppercase tracking-[0.2em] text-purple-400 font-bold mb-6">
                                        {t("pricing.enterprise")}
                                    </h3>

                                    <div className="flex items-baseline gap-1 mb-3">
                                        <span className="text-4xl font-bold text-white tracking-tighter">
                                            {t("pricing.enterprise.price")}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                        {t("pricing.enterprise.desc")}
                                    </p>

                                    <div className="h-px bg-white/[0.08] mb-8" />

                                    <ul className="space-y-4 mb-10">
                                        {features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-xs text-gray-300">
                                                <CheckIcon />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to="/contact"
                                        className="block w-full text-center py-4 rounded-xl font-bold text-sm transition-all bg-white text-black active:scale-[0.98]"
                                    >
                                        {t("pricing.cta.contact")}
                                    </Link>

                                    <p className="text-center text-gray-500 text-[10px] mt-6 italic">
                                        {t("pricing.custom.note")}
                                    </p>
                                </motion.div>
                            </ScrollReveal>
                        </div>

                        {/* Section 02: Configurator */}
                        <div className="space-y-6">
                            <BlurText
                                text="02. WORKFLOW BACK-OFFICE"
                                className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase text-center w-full"
                                animateBy="letters"
                                delay={40}
                            />
                            
                            <ScrollReveal delay={0.4}>
                                <div className="relative rounded-[2rem] border border-white/[0.1] bg-white/[0.03] backdrop-blur-md p-2">
                                    <PricingConfigurator />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MobilePricing;
