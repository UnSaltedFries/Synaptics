import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

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

  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" /> },
    { label: "X", href: "https://x.com/SynapticsIA", icon: <Twitter className="w-5 h-5" /> },
    { label: "Instagram", href: "https://www.instagram.com/synapticsia/", icon: <Instagram className="w-5 h-5" /> },
  ];

  return (
    <footer 
      ref={ref}
      className="bg-black text-white w-full overflow-hidden" 
      style={{ backgroundColor: "#000000" }}
    >
      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* BIG HEADLINE with Shimmer */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mb-12 md:mb-20"
        >
          <h2 className="text-[40px] md:text-[80px] font-extrabold leading-[1.1] tracking-tight mb-8 animate-shimmer max-w-4xl">
            {t("footer.cta.main") || "Arrêtez de perdre du temps sur les tâches manuelles."}
          </h2>
          
          <div className="flex flex-col items-start gap-4">
            <a
              href="mailto:hello@synaptics.fr"
              className="text-xl md:text-2xl text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
            >
              hello@synaptics.fr
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>

        {/* 4 COLUMNS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-20">
          {/* PRODUIT */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6">
              {t("footer.col.product").toUpperCase()}
            </p>
            <ul className="flex flex-col gap-4">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[15px] text-[#D0D0D8] hover:text-white transition-colors relative group inline-block">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ENTREPRISE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6">
               {t("footer.col.company").toUpperCase()}
            </p>
            <ul className="flex flex-col gap-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className="text-[15px] text-[#D0D0D8] hover:text-white transition-colors relative group inline-block">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ) : (
                    <a href={link.href} className="text-[15px] text-[#D0D0D8] hover:text-white transition-colors relative group inline-block">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* LÉGAL */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6">
              {t("footer.col.legal").toUpperCase()}
            </p>
            <ul className="flex flex-col gap-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[15px] text-[#D0D0D8] hover:text-white transition-colors relative group inline-block">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SUIVEZ-NOUS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6">
              {t("footer.col.social").toUpperCase()}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-500 hover:border-white hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] bg-white/5"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* BOTTOM BAR */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={isInView ? { opacity: 1 } : {}}
           transition={{ duration: 1, delay: 0.6 }}
           className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-[0.2em]">SYNAPTICS</span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500 italic">Paris, France</span>
          </div>
          <div className="text-sm text-gray-500 flex flex-wrap gap-2">
            <span>© {new Date().getFullYear()} Synaptics.</span>
            <span>{t("footer.copyright")}</span>
            <span className="italic">{t("footer.credit")}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}