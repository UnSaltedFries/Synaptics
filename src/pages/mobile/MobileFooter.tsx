import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, MotionValue, useTransform, useMotionValue } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";

interface MobileFooterProps {
    progress?: MotionValue<number>;
}

interface CharProps {
    char: string;
    index: number;
    total: number;
    progress: MotionValue<number>;
}

function AnimatedChar({ char, index, total, progress }: CharProps) {
    const endThreshold = 1.0;
    const revealDuration = 0.3; 
    const start = (index / total) * (endThreshold - revealDuration);
    const end = start + revealDuration;

    const opacity = useTransform(progress, [start, end], [0, 1], { clamp: true });
    const y = useTransform(progress, [start, end], [10, 0], { clamp: true });

    return (
        <motion.span
            style={{ 
                opacity, 
                y, 
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : "normal" 
            }}
        >
            {char}
        </motion.span>
    );
}

export function MobileFooter({ progress }: MobileFooterProps) {
    const { t } = useLanguage();

    const headlineText = t("footer.cta");
    const characters = Array.from(headlineText);

    const staticProgress = useMotionValue(1);
    const activeProgress = progress || staticProgress;

    const socialLinks = [
        { label: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> },
        { label: "X", href: "https://x.com/SynapticsIA", icon: <Twitter className="w-5 h-5" /> },
        { label: "Instagram", href: "https://www.instagram.com/synapticsia/", icon: <Instagram className="w-5 h-5" /> },
    ];

    return (
        <footer 
            className="text-white px-6 pt-24 pb-12 overflow-hidden" 
            style={{ backgroundColor: "#080808" }}
        >
            <h2 className="text-[28px] font-bold leading-[1.1] tracking-tight font-sans text-white mb-8">
                {characters.map((char, index) => (
                    <AnimatedChar 
                        key={`${index}-${char}`}
                        char={char}
                        index={index}
                        total={characters.length}
                        progress={activeProgress}
                    />
                ))}
            </h2>

            <div className="mb-8">
               <a
                    href="mailto:hello@synaptics.fr"
                    className="text-lg text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group font-sans"
                >
                    hello@synaptics.fr
                    <span>→</span>
                </a>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-4 font-sans">{t("footer.col.product")}</h4>
                    <ul className="space-y-3">
                        <li><Link to="/about" className="text-sm text-gray-300 font-sans">{t("footer.link.howItWorks")}</Link></li>
                        <li><Link to="/pricing" className="text-sm text-gray-300 font-sans">{t("footer.link.pricing")}</Link></li>
                        <li><Link to="/blog" className="text-sm text-gray-300 font-sans">{t("footer.link.caseStudies")}</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mb-4 font-sans">{t("footer.col.company")}</h4>
                    <ul className="space-y-3">
                        <li><Link to="/about" className="text-sm text-gray-300 font-sans">{t("footer.link.about")}</Link></li>
                        <li><Link to="/contact" className="text-sm text-gray-300 font-sans">{t("footer.link.contact")}</Link></li>
                        <li><Link to="/changelog" className="text-sm text-gray-300 font-sans">{t("footer.link.changelog")}</Link></li>
                    </ul>
                </div>
            </div>

            <div className="flex gap-4 mb-12">
                {socialLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5"
                    >
                        {link.icon}
                    </a>
                ))}
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-4 text-xs text-gray-500 font-sans">
                <div className="flex justify-between items-center">
                    <span className="font-bold tracking-[0.2em] text-white font-sans uppercase">SYNAPTICS</span>
                    <span>Paris, FR</span>
                </div>
                <p>© {new Date().getFullYear()} Synaptics. {t("footer.copyright")}</p>
            </div>
        </footer>
    );
}
