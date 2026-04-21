import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";

interface FooterProps {
  animate?: boolean;
}

export function Footer({ animate = false }: FooterProps) {
  const { t } = useLanguage();

  // Split text into characters for sequential animation
  const headlineText = t("footer.cta");
  const characters = Array.from(headlineText);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.5, // Added a 0.5s pause to ensure visibility
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

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
      className="bg-black text-white w-full overflow-hidden" 
      style={{ backgroundColor: "#000000" }}
    >
      <div className="container mx-auto px-6 pt-48 pb-16 md:pb-24">
        
        {/* CHARACTER-BY-CHARACTER ANIMATED HEADLINE */}
        <motion.h2 
          className="text-[32px] md:text-[68px] font-bold leading-[1.05] tracking-tight font-sans text-white mb-16 md:mb-24"
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {characters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={charVariants}
              className="inline-block"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>

        {/* DETAILS BELOW (emails) */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.8, duration: 1 }} // Increased delay to follow the text reveal
            className="flex flex-col items-start gap-4"
          >
            <a
              href="mailto:hello@synaptics.fr"
              className="text-xl md:text-2xl text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group font-sans"
            >
              hello@synaptics.fr
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>

        {/* 4 COLUMNS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-20">
          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6 font-sans">
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

          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6 font-sans">
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

          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6 font-sans">
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

          <div>
            <p className="text-[12px] uppercase tracking-[0.15em] font-bold text-[#8A8AA0] mb-6 font-sans">
              {t("footer.col.social")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-500 hover:border-white bg-white/5"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-[0.2em] font-sans">SYNAPTICS</span>
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