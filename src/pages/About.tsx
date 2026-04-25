import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { FAQSection } from "@/components/FAQSection";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import { Globe } from "@/components/Globe";
import { useRef, useEffect, useMemo, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ValuePillars } from "@/components/about/ValuePillars";
import { CinematicVision } from "@/components/about/CinematicVision";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: "OpenAI / Anthropic" },
  { name: "n8n / Make / Zapier" },
  { name: "Twilio / Vapi" },
  { name: "Google Cloud / AWS" },
];

const achievements = [
  { event: "AI Voice Summit", location: "San Francisco", year: "2025" },
  { event: "TechCrunch Disrupt", location: "London", year: "2024" },
  { event: "VivaTech", location: "Paris", year: "2024" },
];

// Optimisation : Memoization du composant de style
const ChromeWord = memo(({ children }: { children: string }) => (
  <span className="chrome-word">{children}</span>
));

ChromeWord.displayName = "ChromeWord";

const About = () => {
  const { t } = useLanguage();
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Optimisation 1 : Mémoïser les découpages de mots pour soulager React
  const bio1Words = useMemo(() => t("about.bio1").split(" "), [t]);
  const bio2Words = useMemo(() => `${t("about.bio2.pre")} ${t("about.bio2.highlight")} ${t("about.bio2.post")}`.split(" "), [t]);
  const bio3Words = useMemo(() => `${t("about.bio3.pre")} ${t("about.bio3.highlight")} ${t("about.bio3.post")}`.split(" "), [t]);
  const bio4Words = useMemo(() => `${t("about.bio4.pre")} ${t("about.bio4.highlight")} ${t("about.bio4.post")}`.split(" "), [t]);

  useEffect(() => {
    const container = textContainerRef.current;
    if (!container) return;

    // Optimisation 2 : Utilisation de gsap.context() pour un nettoyage propre et isolé
    const ctx = gsap.context(() => {
        const words = container.querySelectorAll(".reveal-word");
        const blocks = container.querySelectorAll(".reveal-text-block");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 95%",
            end: "bottom 70%",
            scrub: 1, 
          }
        });

        tl.to(words, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          stagger: 0.02,
          duration: 0.4,
          ease: "power2.out",
          force3D: true,
        });

        blocks.forEach((block) => {
          gsap.fromTo(
            block,
            { rotate: 5, y: 30, opacity: 0.5 },
            {
              rotate: 0,
              y: 0,
              opacity: 1,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: block,
                start: "top 98%",
                end: "top 40%",
                scrub: true,
              }
            }
          );
        });
    }, textContainerRef);

    return () => ctx.revert(); // Nettoyage automatique de TOUS les ScrollTriggers de ce composant
  }, [t]);

  const services = useMemo(() => [
    { name: t("about.service.receptionist"), description: t("about.service.receptionist.desc") },
    { name: t("about.service.booking"), description: t("about.service.booking.desc") },
    { name: t("about.service.leads"), description: t("about.service.leads.desc") },
    { name: t("about.service.crm"), description: t("about.service.crm.desc") },
  ], [t]);

  return <Layout variant="light">
    <div className="bg-black min-h-screen">
      <div className="bg-white">
        <section className="pt-24 pb-24 md:pt-32 md:pb-32 bg-white relative overflow-hidden">
          <div className="absolute top-20 md:top-32 left-1/2 md:left-[75%] -translate-x-1/2 w-full max-w-4xl opacity-40 mix-blend-multiply pointer-events-none">
            <Globe />
          </div>
          <div className="container max-w-5xl relative z-10 md:-translate-x-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-black leading-[1.05] tracking-[-0.03em]">
              {t("about.hero.line1")}
              <ChromeWord>{t("about.hero.highlight1")}</ChromeWord>
              <br />
              {t("about.hero.line2")}
              <ChromeWord>{t("about.hero.highlight2")}</ChromeWord>.
            </h1>
            <p className="mt-8 md:mt-12 text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed tracking-[-0.01em]">
              {t("about.hero.sub1")}
              <br />
              {t("about.hero.sub2")}
              <br />
              <ChromeWord>{t("about.hero.highlight3")}</ChromeWord>{t("about.hero.sub3")}
            </p>
          </div>
        </section>

        <InfiniteMarquee speed={25} />

        <section className="pb-24 md:pb-32 bg-white">
          <div className="container">
            <div className="w-full h-px bg-gray-200 mb-16" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
              <div className="lg:col-span-4 space-y-14 sticky top-32 h-fit">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-6">{t("about.services")}</h3>
                  <div className="space-y-5">
                    {services.map((item, index) => <div key={index}>
                      <p className="text-sm font-medium text-black uppercase tracking-wide">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>)}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-6">{t("about.techStack")}</h3>
                  <div className="space-y-2">
                    {technologies.map((item, index) => <p key={index} className="text-sm text-gray-600">{item.name}</p>)}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-6">{t("about.events")}</h3>
                  <div className="space-y-2">
                    {achievements.map((item, index) => <p key={index} className="text-sm text-gray-600">
                      {item.event} ({item.location})
                    </p>)}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div ref={textContainerRef} className="max-w-none py-20">
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-black leading-[1.05] tracking-[-0.03em] mb-24 reveal-text-block origin-top-left">
                    {bio1Words.map((word, i) => (
                      <span key={i} className="reveal-word inline-block mr-[0.2em] opacity-0 translate-y-4 blur-[4px]">
                        {word}
                      </span>
                    ))}
                  </h2>

                  <p className="text-xl md:text-2xl font-medium text-gray-600 leading-relaxed mb-12 reveal-text-block origin-top-left">
                    {bio2Words.map((word, i) => (
                      <span key={i} className="reveal-word inline-block mr-[0.2em] opacity-0 translate-y-2 blur-[4px]">
                        {word}
                      </span>
                    ))}
                  </p>

                  <p className="text-xl md:text-2xl font-medium text-gray-600 leading-relaxed mb-12 reveal-text-block origin-top-left">
                    {bio3Words.map((word, i) => (
                      <span key={i} className="reveal-word inline-block mr-[0.2em] opacity-0 translate-y-2 blur-[4px]">
                        {word}
                      </span>
                    ))}
                  </p>

                  <p className="text-2xl md:text-3xl font-semibold text-black leading-relaxed mb-24 reveal-text-block origin-top-left">
                    {bio4Words.map((word, i) => (
                      <span key={i} className="reveal-word inline-block mr-[0.2em] opacity-0 translate-y-2 blur-[4px]">
                        {word}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden leading-[0] bg-white">
        <div className="absolute top-0 left-0 w-full h-full will-change-transform">
          <svg className="block w-[200%] h-full animate-wave-slower" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 300" preserveAspectRatio="none">
            <path d="M0,150 C400,50 800,250 1200,150 C1600,50 2000,250 2400,150 L2400,300 L0,300 Z" fill="#e5e7eb"></path>
          </svg>
        </div>

        <div className="absolute top-0 left-0 w-full h-full will-change-transform">
          <svg className="block w-[200%] h-full animate-wave-slow" style={{ animationDuration: '20s' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 300" preserveAspectRatio="none">
            <path d="M0,180 C300,80 900,280 1200,180 C1500,80 2100,280 2400,180 L2400,300 L0,300 Z" fill="#9ca3af"></path>
          </svg>
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-10 will-change-transform">
          <svg className="block w-[200%] h-full animate-wave-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 300" preserveAspectRatio="none">
            <path d="M0,220 C400,120 800,320 1200,220 C1600,120 2000,320 2400,220 L2400,300 L0,300 Z" fill="#000000"></path>
          </svg>
        </div>
      </div>

      <ValuePillars />
      <CinematicVision />
      <FAQSection />
    </div>
  </Layout>;
};
export default About;