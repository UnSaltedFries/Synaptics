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