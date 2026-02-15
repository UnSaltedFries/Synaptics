import { useLanguage } from "@/contexts/LanguageContext";
import BlurText from "./BlurText";
import { DotMatrixBackground } from "./DotMatrixBackground";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { t } = useLanguage();

  const titleOffset = useTransform(scrollY, [0, 1000], [0, 100]);
  const descOffset = useTransform(scrollY, [0, 1000], [0, 50]);

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col justify-center bg-black text-white relative overflow-hidden pt-20">

      <div className="container relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Column: Title - VERY LARGE */}
          <motion.div
            style={{ y: titleOffset }}
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h1 className="text-8xl md:text-9xl lg:text-[11rem] font-bold text-white tracking-tighter leading-[0.8]">
              <BlurText
                text={t("hero.title.line1")}
                delay={50}
                animateBy="letters"
                direction="top"
                className="inline-block"
              />
              <br />
              <BlurText
                text={t("hero.title.line2")}
                delay={50}
                animateBy="letters"
                direction="top"
                className="inline-block"
              />
            </h1>
          </motion.div>

          {/* Right Column: Description + CTA */}
          <motion.div style={{ y: descOffset }} className="flex flex-col gap-10 max-w-lg lg:ml-auto">
            <div className="text-xl md:text-3xl font-light leading-relaxed text-gray-300">
              <BlurText
                text={t("hero.desc")}
                delay={10}
                duration={300}
                animateBy="letters"
                direction="top"
                className="inline-block"
                childClassName="animate-shine-text"
              />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-fit relative group"
            >
              {/* Luminous Glow/Shadow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-40 group-hover:opacity-100 transition duration-500" />

              <Link
                to="/contact"
                className="relative inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 w-full md:w-auto"
              >
                <span>{t("hero.cta.button") || "Réserver une démo"}</span>
                <span>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust Indicators at Bottom - Centered and Tighter Spacing */}
      <div className="container relative z-10 pb-8 mt-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-6 md:pt-12 text-xs md:text-sm text-gray-400 font-medium tracking-wide uppercase max-w-4xl mx-auto">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white ml-1">4.9 Google</span>
          </div>

          {/* GDPR */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span>{t("trustBadge.gdpr") || "GDPR Compliant"}</span>
          </div>

          {/* Response Time */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{t("trustBadge.response") || "< 1s response"}</span>
          </div>

          {/* Clients */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <span>{t("trustBadge.clients") || "50+ active clients"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}