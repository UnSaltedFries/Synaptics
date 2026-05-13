import { useLanguage } from "@/contexts/LanguageContext";
import { FAQSection } from "@/components/sections/FAQSection";
import { Layout } from "@/components/layout/Layout";
import BlurText from "@/components/visuals/BlurText";
import ScrollReveal from "@/components/visuals/ScrollReveal";
import { motion } from "framer-motion";
import InfiniteMarquee from "@/components/visuals/InfiniteMarquee";
import { ValuePillars } from "@/components/about/ValuePillars";
import { CinematicVision } from "@/components/about/CinematicVision";
import ChromeWord from "@/components/visuals/ChromeWord";
import { Globe } from "@/components/visuals/Globe";

const technologies = [
    { name: "OpenAI / Anthropic" },
    { name: "n8n / Make / Zapier" },
    { name: "Twilio / Vapi" },
    { name: "Google Cloud / AWS" },
];

const achievements = [
// ... (achievements logic)
    { event: "AI Voice Summit", location: "San Francisco", year: "2025" },
    { event: "TechCrunch Disrupt", location: "London", year: "2024" },
    { event: "VivaTech", location: "Paris", year: "2024" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
};

const MobileAbout = () => {
    const { t } = useLanguage();

    const services = [
        { name: t("about.service.receptionist"), description: t("about.service.receptionist.desc") },
        { name: t("about.service.booking"), description: t("about.service.booking.desc") },
        { name: t("about.service.leads"), description: t("about.service.leads.desc") },
        { name: t("about.service.crm"), description: t("about.service.crm.desc") },
    ];

    return (
        <Layout>
                <div className="bg-white text-black">
                    {/* Hero */}
                    <section className="px-5 pt-28 pb-10 relative">
                        {/* Background Globe */}
                        <div className="absolute top-16 -right-10 mix-blend-multiply pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 0.3, scale: 1 }}
                                transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Globe size={400} />
                            </motion.div>
                        </div>

                        <motion.h1 
                            className="relative z-10 text-2xl font-bold leading-[1.3] tracking-tight mb-6 text-black"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {t("about.hero.line1")}{" "}
                            <ChromeWord>{t("about.hero.highlight1")}</ChromeWord>
                            <br />
                            {t("about.hero.line2")}{" "}
                            <ChromeWord>{t("about.hero.highlight2")}</ChromeWord>.
                        </motion.h1>
                        <ScrollReveal delay={0.3}>
                            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                                {t("about.hero.sub1")}
                                <br />
                                {t("about.hero.sub2")}
                            </p>
                        </ScrollReveal>
                    </section>

                    <motion.div 
                        className="py-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                    >
                        <InfiniteMarquee speed={20} />
                    </motion.div>

                    {/* Services */}
                    <section className="px-5 pt-[60px] pb-8">
                        <BlurText
                            text={t("about.services")}
                            className="text-[9px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-6"
                            animateBy="letters"
                            delay={40}
                        />
                        <div className="flex flex-col gap-5">
                            {services.map((item, i) => (
                                <ScrollReveal key={i} delay={0.1 + (i * 0.1)}>
                                    <div className="border-l border-black/10 pl-4 py-1">
                                        <p className="text-xs font-bold text-black uppercase tracking-wide mb-1">{item.name}</p>
                                        <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </section>

                    {/* Bio */}
                    <section className="px-5 py-12">
                        <BlurText
                            text={t("about.bio1")}
                            className="text-2xl font-bold text-black leading-tight tracking-tight mb-8"
                            animateBy="words"
                            delay={80}
                        />
                        <ScrollReveal delay={0.2}>
                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                {t("about.bio2.pre")} <span className="text-black">{t("about.bio2.highlight")}</span> {t("about.bio2.post")}
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.3}>
                            <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                {t("about.bio3.pre")} <span className="text-black">{t("about.bio3.highlight")}</span> {t("about.bio3.post")}
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={0.4}>
                            <p className="text-lg font-semibold text-black leading-relaxed">
                                {t("about.bio4.pre")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-black">{t("about.bio4.highlight")}</span> {t("about.bio4.post")}
                            </p>
                        </ScrollReveal>
                    </section>

                    {/* Tech & Events */}
                    <section className="px-5 py-8 border-t border-black/5 mx-5 mt-4">
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
                            className="mb-8"
                        >
                            <h3 className="text-[9px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">{t("about.techStack")}</h3>
                            <div className="flex flex-col gap-2">
                                {technologies.map((item, i) => <p key={i} className="text-xs font-medium text-gray-700">{item.name}</p>)}
                            </div>
                        </motion.div>
                        <motion.div
                            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15} variants={fadeUp}
                        >
                            <h3 className="text-[9px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">{t("about.events")}</h3>
                            <div className="flex flex-col gap-2">
                                {achievements.map((item, i) => <p key={i} className="text-xs font-medium text-gray-700">{item.event} <span className="text-gray-500">({item.location})</span></p>)}
                            </div>
                        </motion.div>
                    </section>
                    
                    {/* Wave Transition — exactly like Desktop */}
                    <div className="relative w-full h-[150px] overflow-hidden leading-[0] bg-white">
                        <div className="absolute top-0 left-0 w-full h-full will-change-transform">
                            <svg className="block w-[200%] h-full animate-wave-slower" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 300" preserveAspectRatio="none">
                                <path d="M0,150 C400,50 800,250 1200,150 C1600,50 2000,250 2400,150 L2400,300 L0,300 Z" fill="#e5e7eb"></path>
                            </svg>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full will-change-transform">
                            <svg className="block w-[200%] h-full animate-wave-slow" style={{ animationDuration: '20s' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 300" preserveAspectRatio="none">
                                <path d="M0,180 C300,80 900,280 1200,180 C1500,80 2100,280 2400,180 L2400,300 L0,300 Z" fill="#9ca3af"></path>
                            </svg>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full z-10 will-change-transform">
                            <svg className="block w-[200%] h-full animate-wave-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 300" preserveAspectRatio="none">
                                <path d="M0,220 C400,120 800,320 1200,220 C1600,120 2000,320 2400,220 L2400,300 L0,300 Z" fill="#000000"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <ValuePillars />
                <div className="mt-10">
                    <CinematicVision />
                </div>

                {/* FAQ */}
                <div style={{ backgroundColor: "#000000" }} className="pt-4 pb-12">
                    <FAQSection />
                </div>
        </Layout>
    );
};

export default MobileAbout;
