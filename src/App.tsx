import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useLayoutEffect, Suspense, lazy, useRef } from "react";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Chatbot } from "@/components/chat/Chatbot";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

// Pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const Changelog = lazy(() => import("./pages/Changelog"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const TermsOfSale = lazy(() => import("./pages/TermsOfSale"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const GDPR = lazy(() => import("./pages/GDPR"));

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
    };
    document.title = titles[pathname] || "Synaptics";
  }, [pathname, lang]);

  return null;
}

const queryClient = new QueryClient();

function AppRoutes() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  
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
      <CustomCursor />
      <Navbar variant={navVariant} />
      <Chatbot />

      <Suspense fallback={<div className="bg-black min-h-screen" />}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-black"
          >
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
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