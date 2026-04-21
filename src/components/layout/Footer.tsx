import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Twitter, Instagram } from "lucide-react";

export function Footer() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll progress of the footer reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Create smooth 3D rotation and scale
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const rotateX = useTransform(springScroll, [0, 1], [70, 0]);
  const opacity = useTransform(springScroll, [0, 0.5, 1], [0, 0.5, 1]);
  const scale = useTransform(springScroll, [0, 1], [0.8, 1]);
  const y = useTransform(springScroll, [0, 1], [50, 0]);

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
      ref={containerRef}
      className="bg-black text-white w-full overflow-hidden perspective-2000" 
      style={{ backgroundColor: "#000000" }}
    >
      <div className="container mx-auto px-6 py-16 md:py-24">
        {/* BIG HEADLINE with 3D Scroll Rotation and Syne font */}
        <motion.div
           style={{ 
             rotateX,
             opacity,
             scale,
             y,
             transformStyle: "preserve-3d"
           }}
           className="mb-12 md:mb-20 origin-bottom"
        >
          <h2 className="text-[42px] md:text-[90px] font-extrabold leading-[0.9] tracking-tight mb-8 animate-shimmer max-w-5xl font-syne uppercase">
            {t("footer.cta")}
          </h2>
          
          <motion.div 
            style={{ opacity }}
            className="flex flex-col items-start gap-4"
          >
            <a
              href="mailto:hello@synaptics.fr"
              className="text-xl md:text-2xl text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group font-syne"
            >
              hello@synaptics.fr
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </motion.div>

        {/* 4 COLUMNS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-20">
          {/* PRODUIT */}
          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6 font-syne">
              {t("footer.col.product")}
            </p>
            <ul className="flex flex-col gap-4">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[15px] text-[#D0D0D8] hover:text-white transition-colors relative group inline-block font-sans">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ENTREPRISE */}
          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6 font-syne">
               {t("footer.col.company")}
            </p>
            <ul className="flex flex-col gap-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link to={link.to} className="text-[15px] text-[#D0D0D8] hover:text-white transition-colors relative group inline-block font-sans">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ) : (
                    <a href={link.href} className="text-[15px] text-[#D0D0D8] hover:text-white transition-colors relative group inline-block font-sans">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* LÉGAL */}
          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6 font-syne">
              {t("footer.col.legal")}
            </p>
            <ul className="flex flex-col gap-4">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[15px] text-[#D0D0D8] hover:text-white transition-colors relative group inline-block font-sans">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SUIVEZ-NOUS */}
          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6 font-syne">
              {t("footer.col.social")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-500 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-white/5"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div 
           className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-[0.2em] font-syne">SYNAPTICS</span>
            <span className="text-sm shadow-sm text-gray-500">·</span>
            <span className="text-sm text-gray-500 italic font-sans">Paris, France</span>
          </div>
          <div className="text-sm text-gray-500 flex flex-wrap gap-2 font-sans">
            <span>© {new Date().getFullYear()} Synaptics.</span>
            <span>{t("footer.copyright")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}