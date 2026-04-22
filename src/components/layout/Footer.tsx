import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, MotionValue, useTransform, useMotionValue } from "framer-motion";
import { Linkedin, Twitter, Instagram } from "lucide-react";

interface FooterProps {
  progress?: MotionValue<number>;
}

interface CharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function AnimatedChar({ char, index, total, progress }: CharProps) {
  const endThreshold = 0.9; 
  const revealDuration = 0.5; 
  
  // Start much earlier (starts at 0.1 progress)
  const start = 0.1 + (index / total) * (endThreshold - 0.1 - revealDuration);
  const end = start + revealDuration;

  const opacity = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const y = useTransform(progress, [start, end], [20, 0], { clamp: true });

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

export function Footer({ progress }: FooterProps) {
  const { t } = useLanguage();

  const headlineText = t("footer.cta");
  const characters = Array.from(headlineText);

  const staticProgress = useMotionValue(1);
  const activeProgress = progress || staticProgress;

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
      className="text-white w-full overflow-hidden" 
      style={{ backgroundColor: "#161616" }}
    >
      <div className="container mx-auto px-6 pt-48 pb-16 md:pb-24">
        
        {/* ONLY THE HEADLINE ANIMATES */}
        <h2 className="text-[32px] md:text-[68px] font-bold leading-[1.05] tracking-tight font-sans text-white mb-16 md:mb-24">
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

        {/* REST OF FOOTER IS STATIC FOR "FIXED" EFFECT */}
        <div className="mb-16">
          <div className="flex flex-col items-start gap-4">
            <a
              href="mailto:hello@synaptics.fr"
              className="text-xl md:text-2xl text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group font-sans"
            >
              hello@synaptics.fr
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </div>

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