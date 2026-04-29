import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useLayoutEffect, Suspense, lazy, useRef } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNavbar } from "@/pages/mobile/MobileNavbar";
import { Chatbot } from "@/components/chat/Chatbot";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

// Desktop Pages
const Index = lazy(() => import("./pages/desktop/Index"));
const About = lazy(() => import("./pages/desktop/About"));
const Contact = lazy(() => import("./pages/desktop/Contact"));
const Pricing = lazy(() => import("./pages/desktop/Pricing"));
const Blog = lazy(() => import("./pages/desktop/Blog"));

// Mobile Pages
const MobileIndex = lazy(() => import("./pages/mobile/MobileIndex"));
const MobileAbout = lazy(() => import("./pages/mobile/MobileAbout"));
const MobileContact = lazy(() => import("./pages/mobile/MobileContact"));
const MobilePricing = lazy(() => import("./pages/mobile/MobilePricing"));
const MobileBlog = lazy(() => import("./pages/mobile/MobileBlog"));

// Legal & Misc Pages
const Changelog = lazy(() => import("./pages/desktop/Changelog"));
const PrivacyPolicy = lazy(() => import("./pages/desktop/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/desktop/TermsOfService"));
const TermsOfSale = lazy(() => import("./pages/desktop/TermsOfSale"));
const LegalNotice = lazy(() => import("./pages/desktop/LegalNotice"));
const CookiePolicy = lazy(() => import("./pages/desktop/CookiePolicy"));
const GDPR = lazy(() => import("./pages/desktop/GDPR"));
const Checkout = lazy(() => import("./pages/Checkout"));

import { useIsMobile } from "@/hooks/useIsMobile";

function SEOManager() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Synaptics — AI Agency Paris",
      "/about": "About — Synaptics",
      "/contact": "Contact — Synaptics",
      "/pricing": "Pricing — Synaptics",
      "/blog": "Case Studies — Synaptics",
      "/checkout": "Checkout — Synaptics",
    };
    document.title = titles[pathname] || "Synaptics";
  }, [pathname, lang]);

  return null;
}

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  const { lang } = useLanguage();
  const lenisRef = useRef<Lenis | null>(null);
  const isMobile = useIsMobile();
  
  // GLOBAL LENIS SETUP
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Instant Scroll Reset and Lenis Sync
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);
  
  const lightVariantRoutes = ['/about', '/privacy', '/terms', '/cgv', '/legal', '/cookies', '/gdpr', '/changelog'];
  const navVariant = lightVariantRoutes.includes(location.pathname) ? 'light' : 'dark';

  return (
    <div className="min-h-screen bg-black">
      <SEOManager />
      {/* <CustomCursor /> */}
      
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <Navbar variant={navVariant} />
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>

      <Chatbot />

      <Suspense fallback={<div className="bg-black min-h-screen" />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <Routes>
              <Route path="/" element={isMobile ? <MobileIndex /> : <Index />} />
              <Route path="/about" element={isMobile ? <MobileAbout /> : <About />} />
              <Route path="/contact" element={isMobile ? <MobileContact /> : <Contact />} />
              <Route path="/pricing" element={isMobile ? <MobilePricing /> : <Pricing />} />
              <Route path="/blog" element={isMobile ? <MobileBlog /> : <Blog />} />
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
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;