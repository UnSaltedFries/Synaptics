import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";

export function MobileFooter() {
    const { t } = useLanguage();

    const footerLinks = {
        product: [
            { label: t("footer.link.howItWorks"), to: "/about" },
            { label: t("footer.link.pricing"), to: "/pricing" },
            { label: t("footer.link.caseStudies"), to: "/blog" },
            { label: t("footer.link.demo"), to: "/contact" },
        ],
        company: [
            { label: t("footer.link.about"), to: "/about" },
            { label: t("footer.link.contact"), to: "/contact" },
            { label: t("footer.link.changelog"), to: "/changelog" },
            { label: t("footer.link.careers"), href: "#" },
        ],
        legal: [
            { label: t("footer.link.legalNotice"), to: "/legal" },
            { label: t("footer.link.privacy"), to: "/privacy" },
            { label: t("footer.link.cgv"), to: "/cgv" },
            { label: t("footer.link.cookies"), to: "/cookies" },
        ],
    };

    return (
        <footer className="bg-black text-white px-6 py-12" style={{ backgroundColor: "#000000" }}>
            {/* BIG HEADLINE with Shimmer */}
            <div className="mb-10">
                <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-tight mb-6 animate-shimmer">
                    {t("footer.cta.main") || "Arrêtez de perdre du temps sur les tâches manuelles."}
                </h2>
                <a
                    href="mailto:hello@synaptics.fr"
                    className="text-lg text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                >
                    hello@synaptics.fr
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
            </div>

            {/* ── Link Columns (Stacked on mobile) ────────── */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-12">
                {/* Product */}
                <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-4">
                        {t("footer.col.product").toUpperCase()}
                    </p>
                    <div className="flex flex-col gap-3">
                        {footerLinks.product.map((link) => (
                            <Link key={link.label} to={link.to} className="text-[13px] text-[#D0D0D8] hover:text-white transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Company */}
                <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-4">
                        {t("footer.col.company").toUpperCase()}
                    </p>
                    <div className="flex flex-col gap-3">
                        {footerLinks.company.map((link) =>
                            link.to ? (
                                <Link key={link.label} to={link.to} className="text-[13px] text-[#D0D0D8] hover:text-white transition-colors">
                                    {link.label}
                                </Link>
                            ) : (
                                <a key={link.label} href={link.href} className="text-[13px] text-[#D0D0D8] hover:text-white transition-colors">
                                    {link.label}
                                </a>
                            )
                        )}
                    </div>
                </div>

                {/* Legal */}
                <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-4">
                        {t("footer.col.legal").toUpperCase()}
                    </p>
                    <div className="flex flex-col gap-3">
                        {footerLinks.legal.map((link) => (
                            <Link key={link.label} to={link.to} className="text-[13px] text-[#D0D0D8] hover:text-white transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Follow Us */}
                <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-4">
                        {t("footer.col.social").toUpperCase()}
                    </p>
                    <div className="flex gap-3">
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white transition-all hover:border-white">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="https://x.com/SynapticsIA" target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white transition-all hover:border-white">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="https://www.instagram.com/synapticsia/" target="_blank" rel="noopener noreferrer"
                            className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white transition-all hover:border-white">
                            <Instagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Separator ──────────────────────── */}
            <div className="h-px bg-white/10 mb-8" />

            {/* ── Bottom Bar ─────────────────────── */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-[0.2em]">SYNAPTICS</span>
                    <span className="text-[10px] text-gray-500">·</span>
                    <span className="text-[10px] text-gray-500 italic">Paris, France</span>
                </div>
                <div className="text-[10px] text-gray-500 leading-relaxed">
                    <p>© {new Date().getFullYear()} Synaptics. {t("footer.copyright")}</p>
                    <p className="italic">{t("footer.credit")}</p>
                </div>
            </div>
        </footer>
    );
}
