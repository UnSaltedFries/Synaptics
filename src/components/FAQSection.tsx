import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";

export function FAQSection() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: t("faq.q1"), a: t("faq.a1") },
        { q: t("faq.q2"), a: t("faq.a2") },
        { q: t("faq.q3"), a: t("faq.a3") },
        { q: t("faq.q4"), a: t("faq.a4") },
        { q: t("faq.q5"), a: t("faq.a5") },
        { q: t("faq.q6"), a: t("faq.a6") },
    ];

    return (
        <section className="py-12 sm:py-24 md:py-32 bg-black relative overflow-hidden">
            <ScrollReveal>
                <div className="container relative px-5 md:px-0">
                    <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] text-center mb-8 sm:mb-16 md:mb-20">
                        {t("faq.title")}
                    </h2>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`rounded-2xl border transition-colors duration-300 ${isOpen
                                    ? "border-white/[0.15] bg-white/[0.04]"
                                    : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between p-4 sm:p-6 md:p-8 text-left cursor-pointer group"
                                >
                                    <span className={`font-medium text-sm sm:text-base md:text-lg pr-6 sm:pr-8 leading-snug transition-colors duration-300 ${isOpen ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                                        {faq.q}
                                    </span>
                                    <motion.span 
                                        animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? "#fff" : "#9ca3af" }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        className="text-2xl flex-shrink-0"
                                    >
                                        +
                                    </motion.span>
                                </button>
                                
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ 
                                                type: "spring", 
                                                stiffness: 120, 
                                                damping: 20,
                                                opacity: { duration: 0.3 }
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <p className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8 text-gray-400 text-sm sm:text-base leading-relaxed max-w-[90%]">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </ScrollReveal>
        </section>
    );
}
