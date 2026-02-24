import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MobileFooter } from "./MobileFooter";

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
        <div className="min-h-screen bg-black text-white" style={{ backgroundColor: "#000000" }}>
            <section className="px-5 pt-24 pb-10">
                {/* Title — floating + chrome */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-2xl font-bold tracking-tight mb-12 text-center text-white"
                >
                    {t("pricing.title")}
                </motion.h1>

                {/* Pricing Card — slide up */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="rounded-xl border border-purple-500/[0.25] bg-purple-500/[0.04] p-5 chrome-word-always animate-float"
                >
                    <h3 className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-medium mb-3">
                        {t("pricing.enterprise")}
                    </h3>

                    <div className="flex items-baseline gap-1 mb-1.5">
                        <span className="text-2xl font-bold text-white">{t("pricing.enterprise.price")}</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-4">{t("pricing.enterprise.desc")}</p>

                    <div className="h-px bg-white/[0.08] mb-4" />

                    <ul className="space-y-2 mb-6">
                        {features.map((feature, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                                className="flex items-start gap-2 text-xs text-gray-300"
                            >
                                <CheckIcon />
                                {feature}
                            </motion.li>
                        ))}
                    </ul>

                    <Link
                        to="/contact"
                        className="block w-full text-center py-3 rounded-xl font-semibold text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    >
                        {t("pricing.cta.contact")}
                    </Link>

                    <p className="text-center text-gray-500 text-xs mt-4">
                        {t("pricing.custom.note")}
                    </p>
                </motion.div>
            </section>

            <MobileFooter />
        </div>
    );
};

export default MobilePricing;
