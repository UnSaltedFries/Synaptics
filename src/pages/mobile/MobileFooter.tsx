import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useTransform, useSpring, MotionValue } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";

interface MobileFooterProps {
    progress?: MotionValue<number>;
}

export function MobileFooter({ progress }: MobileFooterProps) {
    const { t } = useLanguage();

    const smoothProgress = useSpring(progress || 0, { stiffness: 80, damping: 25 });

    // Subtler 3D for mobile but still visible
    const rotateX = useTransform(smoothProgress, [0, 1], [60, 0]);
    const opacity = useTransform(smoothProgress, [0, 0.4, 1], [0, 0.5, 1]);
    const y = useTransform(smoothProgress, [0, 1], [40, 0]);

    const socialLinks = [
        { label: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> },
        { label: "X", href: "https://x.com/SynapticsIA", icon: <Twitter className="w-5 h-5" /> },
        { label: "Instagram", href: "https://www.instagram.com/synapticsia/", icon: <Instagram className="w-5 h-5" /> },
    ];

    return (
        <footer 
            className="bg-black text-white px-6 pt-16 pb-12 preserve-3d overflow-hidden" 
            style={{ backgroundColor: "#000000" }}
        >
            <motion.div 
                style={{ rotateX, opacity, y, transformStyle: "preserve-3d" }}
                className="mb-10 origin-bottom perspective-1000"
            >
                <h2 className="text-[28px] font-bold leading-[1.1] tracking-tight mb-6 font-sans text-white">
                    {t("footer.cta")}
                </h2>
                <a
                    href="mailto:hello@synaptics.fr"
                    className="text-lg text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group font-sans"
                >
                    hello@synaptics.fr
                    <span>→</span>
                </a>
            </motion.div>

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
