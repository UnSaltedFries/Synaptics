import { useLanguage } from "@/contexts/LanguageContext";
import { FAQSection } from "@/components/FAQSection";
import { MobileFooter } from "./MobileFooter";
import { motion } from "framer-motion";

const technologies = [
    { name: "OpenAI / Anthropic" },
    { name: "n8n / Make / Zapier" },
    { name: "Twilio / Vapi" },
    { name: "Google Cloud / AWS" },
];

const achievements = [
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
        <div className="min-h-screen" style={{ backgroundColor: "#ffffff" }}>
            {/* Hero */}
            <section className="px-5 pt-24 pb-10 bg-white">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-2xl font-medium text-black leading-tight tracking-tight mb-4"
                >
                    {t("about.hero.line1")}
                    <span className="chrome-word-always">{t("about.hero.highlight1")}</span>
                    <br />
                    {t("about.hero.line2")}
                    <span className="chrome-word-always">{t("about.hero.highlight2")}</span>.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="text-sm text-gray-400 leading-relaxed"
                >
                    {t("about.hero.sub1")}
                    <br />
                    {t("about.hero.sub2")}
                </motion.p>
            </section>

            {/* Services */}
            <section className="px-5 py-8 bg-white">
                <motion.h3
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0}
                    variants={fadeUp}
                    className="text-[9px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-4"
                >
                    {t("about.services")}
                </motion.h3>
                <div className="flex flex-col gap-3">
                    {services.map((item, i) => (
                        <motion.div
                            key={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={i * 0.1}
                            variants={fadeUp}
                        >
                            <p className="text-xs font-medium text-black uppercase tracking-wide">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Bio */}
            <section className="px-5 py-8 bg-white">
                <motion.h2
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0}
                    variants={fadeUp}
                    className="text-xl font-bold text-black leading-tight tracking-tight mb-5"
                >
                    {t("about.bio1")}
                </motion.h2>
                <motion.p
                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1} variants={fadeUp}
                    className="text-sm text-gray-600 leading-relaxed mb-4"
                >
                    {t("about.bio2.pre")} {t("about.bio2.highlight")} {t("about.bio2.post")}
                </motion.p>
                <motion.p
                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2} variants={fadeUp}
                    className="text-sm text-gray-600 leading-relaxed mb-4"
                >
                    {t("about.bio3.pre")} {t("about.bio3.highlight")} {t("about.bio3.post")}
                </motion.p>
                <motion.p
                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3} variants={fadeUp}
                    className="text-base font-semibold text-black leading-relaxed"
                >
                    {t("about.bio4.pre")} {t("about.bio4.highlight")} {t("about.bio4.post")}
                </motion.p>
            </section>

            {/* Tech & Events */}
            <section className="px-5 py-8 bg-white">
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
                    className="mb-6"
                >
                    <h3 className="text-[9px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-3">{t("about.techStack")}</h3>
                    <div className="flex flex-col gap-1">
                        {technologies.map((item, i) => <p key={i} className="text-xs text-gray-600">{item.name}</p>)}
                    </div>
                </motion.div>
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.15} variants={fadeUp}
                >
                    <h3 className="text-[9px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-3">{t("about.events")}</h3>
                    <div className="flex flex-col gap-1">
                        {achievements.map((item, i) => <p key={i} className="text-xs text-gray-600">{item.event} ({item.location})</p>)}
                    </div>
                </motion.div>
            </section>

            {/* Wave Transition — 3 layered animated waves */}
            <div className="relative w-full h-[100px] overflow-hidden leading-[0] bg-white">
                {/* Wave 1 — slowest, background */}
                <div className="absolute top-0 left-0 w-full h-full z-[1] opacity-30">
                    <svg className="block w-[200%] h-full animate-wave-slower" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 300" preserveAspectRatio="none">
                        <path d="M0,200 C400,100 800,300 1200,200 C1600,100 2000,300 2400,200 L2400,300 L0,300 Z" fill="#000000" />
                    </svg>
                </div>
                {/* Wave 2 — medium speed */}
                <div className="absolute top-0 left-0 w-full h-full z-[2] opacity-50">
                    <svg className="block w-[200%] h-full animate-wave-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 300" preserveAspectRatio="none">
                        <path d="M0,230 C300,130 700,310 1200,230 C1700,150 2100,310 2400,230 L2400,300 L0,300 Z" fill="#000000" />
                    </svg>
                </div>
                {/* Wave 3 — fastest, foreground */}
                <div className="absolute top-0 left-0 w-full h-full z-[3]">
                    <svg className="block w-[200%] h-full animate-wave-faster" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 300" preserveAspectRatio="none">
                        <path d="M0,250 C400,180 800,290 1200,250 C1600,210 2000,290 2400,250 L2400,300 L0,300 Z" fill="#000000" />
                    </svg>
                </div>
            </div>

            {/* FAQ */}
            <div style={{ backgroundColor: "#000000" }}>
                <FAQSection />
            </div>

            <MobileFooter />
        </div>
    );
};

export default MobileAbout;
