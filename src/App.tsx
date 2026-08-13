import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useLayoutEffect, Suspense, lazy, useRef } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNavbar } from "@/components/layout/MobileNavbar";
import { Chatbot } from "@/components/chat/Chatbot";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Index = lazy(() => import("./pages/home/index"));
const About = lazy(() => import("./pages/about/index"));
const Contact = lazy(() => import("./pages/contact/index"));
const Pricing = lazy(() => import("./pages/pricing/index"));
const Blog = lazy(() => import("./pages/blog/index"));
const Changelog = lazy(() => import("./pages/changelog/index"));
const PrivacyPolicy = lazy(() => import("./pages/legal/DesktopPrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/legal/DesktopTermsOfService"));
const TermsOfSale = lazy(() => import("./pages/legal/DesktopTermsOfSale"));
const LegalNotice = lazy(() => import("./pages/legal/DesktopLegalNotice"));
const CookiePolicy = lazy(() => import("./pages/legal/DesktopCookiePolicy"));
const GDPR = lazy(() => import("./pages/legal/DesktopGDPR"));
const Checkout = lazy(() => import("./pages/checkout/index"));

import { useIsMobile } from "@/hooks/useIsMobile";

function SEOManager() {
  const { pathname } = useLocation();
  const { lang, t } = useLanguage();

  useEffect(() => {
    // 1. Dynamic Titles
    const titles: Record<string, string> = {
      "/": lang === 'fr' ? "Synaptics — Agence IA Paris | Agents IA 24/7" : "Synaptics — AI Agency Paris | 24/7 AI Agents",
      "/about": lang === 'fr' ? "À propos — Synaptics | Experts en Automatisation IA" : "About — Synaptics | AI Automation Experts",
      "/contact": lang === 'fr' ? "Contact — Synaptics | Réservez votre Démo IA" : "Contact — Synaptics | Book your AI Demo",
      "/pricing": lang === 'fr' ? "Tarifs — Synaptics | Solutions IA sur mesure" : "Pricing — Synaptics | Custom AI Solutions",
      "/blog": lang === 'fr' ? "Études de Cas — Synaptics | Résultats de l'IA en entreprise" : "Case Studies — Synaptics | AI Results in Business",
      "/changelog": "Dev Blog — Synaptics",
      "/checkout": "Checkout — Synaptics",
    };
    document.title = titles[pathname] || "Synaptics";

    // 2. Dynamic Meta Description
    const descriptions: Record<string, string> = {
      "/": t("seo.description.home"),
      "/about": t("seo.description.about"),
      "/contact": t("seo.description.contact"),
      "/pricing": t("seo.description.pricing"),
      "/blog": t("seo.description.blog"),
    };
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", descriptions[pathname] || t("seo.description.home"));
    }

    // 3. Dynamic Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://synaptics.fr${pathname}`);

    // 4. Dynamic OG Tags
    const updateMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    updateMeta("og:title", document.title);
    updateMeta("og:description", descriptions[pathname] || t("seo.description.home"));
    updateMeta("og:url", `https://synaptics.fr${pathname}`);
    
    // 5. Update HTML lang attribute
    document.documentElement.lang = lang;

  }, [pathname, lang, t]);

  return null;
}

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  const { lang } = useLanguage();
  const lenisRef = useRef<Lenis | null>(null);
  const isMobile = useIsMobile();
  
  // GLOBAL LENIS SETUP — synchronized with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker for the RAF loop (recommended Lenis + GSAP pattern)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  // Cleanup ScrollTriggers + Reset scroll on route change
  useLayoutEffect(() => {
    // Kill all ScrollTriggers from the previous page
    ScrollTrigger.getAll().forEach(st => st.kill());

    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }

    // Refresh ScrollTrigger after new page renders
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);
  
  const lightVariantRoutes = ['/about', '/privacy', '/terms', '/cgv', '/legal', '/cookies', '/gdpr', '/changelog'];
  const navVariant = lightVariantRoutes.includes(location.pathname) ? 'light' : 'dark';

  return (
    <div className="min-h-screen bg-black">
      <SEOManager />
      
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navbar variant={navVariant} />
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>

      {/* <Chatbot /> */}

      <Suspense fallback={<div className="bg-black min-h-screen" />}>
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/changelog" element={<Changelog />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cgv" element={<TermsOfSale />} />
              <Route path="/legal" element={<LegalNotice />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/gdpr" element={<GDPR />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
      </Suspense>
    </div>
  );
}

function SchemaManager() {
  const { pathname } = useLocation();
  const { lang, t } = useLanguage();

  useEffect(() => {
    const schemas: any[] = [];

    // 1. Organization Schema (Global)
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Synaptics",
      "url": "https://synaptics.fr",
      "logo": "https://synaptics.fr/favicon.ico",
      "sameAs": [
        "https://x.com/SynapticsIA",
        "https://www.instagram.com/synapticsia/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33-6-72-62-70-40",
        "contactType": "customer service",
        "email": "hello@synaptics.fr",
        "availableLanguage": ["French", "English"]
      }
    });

    // 2. FAQ Schema (Pages with FAQ)
    const faqPages = ["/", "/about", "/blog"];
    if (faqPages.includes(pathname)) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": t("faq.q1"),
            "acceptedAnswer": { "@type": "Answer", "text": t("faq.a1") }
          },
          {
            "@type": "Question",
            "name": t("faq.q2"),
            "acceptedAnswer": { "@type": "Answer", "text": t("faq.a2") }
          },
          {
            "@type": "Question",
            "name": t("faq.q3"),
            "acceptedAnswer": { "@type": "Answer", "text": t("faq.a3") }
          }
        ]
      });
    }

    // Inject JSON-LD
    const existing = document.querySelectorAll('script[type="application/ld+json"]');
    existing.forEach(s => s.remove());

    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  }, [pathname, lang, t]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SchemaManager />
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;