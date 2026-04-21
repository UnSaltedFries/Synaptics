import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/useIsMobile";

import { lazy } from "react";

// Desktop pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const GDPR = lazy(() => import("./pages/GDPR"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const TermsOfSale = lazy(() => import("./pages/TermsOfSale"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Changelog = lazy(() => import("./pages/Changelog"));
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Chatbot } from "@/components/chat/Chatbot";

// Mobile pages
const MobileIndex = lazy(() => import("./pages/mobile/MobileIndex"));
const MobileAbout = lazy(() => import("./pages/mobile/MobileAbout"));
const MobileContact = lazy(() => import("./pages/mobile/MobileContact"));
const MobilePricing = lazy(() => import("./pages/mobile/MobilePricing"));
const MobileBlog = lazy(() => import("./pages/mobile/MobileBlog"));
import { MobileNavbar } from "./pages/mobile/MobileNavbar";
import { Analytics } from "@vercel/analytics/react";

import { useEffect, Suspense } from "react";
import Lenis from "lenis";

function SmoothScrollManager() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // Linear interpolation gives buttery physical inertia
      smoothWheel: true,
      wheelMultiplier: 1, // Standard wheel speed, rely on lerp for delay
      touchMultiplier: 2,
    });

    // Expose lenis globally so the router can reset it
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);
  return null;
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Si on a une ancre (#), on ne force pas le scroll à 0 (géré par Index.tsx)
    if (hash) return;
    
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
}

// Light pages get white bg, everything else stays black
const LIGHT_ROUTES = ["/about", "/privacy", "/terms", "/gdpr"];

function BackgroundManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const isLight = LIGHT_ROUTES.includes(pathname);
    const color = isLight ? "#ffffff" : "#000000";
    document.body.style.backgroundColor = color;
    document.documentElement.style.backgroundColor = color;
  }, [pathname]);
  return null;
}

const queryClient = new QueryClient();

/* ─── Responsive App Shell ───────────────────────────────────── */
function AppRoutes() {
  const isMobile = useIsMobile();
  const { pathname } = useLocation();
  const navVariant = LIGHT_ROUTES.includes(pathname) ? "light" : "dark";

  return (
    <>
      <ScrollToTop />
      <BackgroundManager />

      {/* Navbar: mobile or desktop */}
      {isMobile ? <MobileNavbar /> : <Navbar variant={navVariant} />}

      <Suspense fallback={null}>
        <Routes>
          {/* Main pages — conditionally rendered */}
          <Route path="/" element={isMobile ? <MobileIndex /> : <Index />} />
          <Route path="/about" element={isMobile ? <MobileAbout /> : <About />} />
          <Route path="/contact" element={isMobile ? <MobileContact /> : <Contact />} />
          <Route path="/pricing" element={isMobile ? <MobilePricing /> : <Pricing />} />
          <Route path="/blog" element={isMobile ? <MobileBlog /> : <Blog />} />

          {/* Legal pages — same on all devices */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/legal" element={<LegalNotice />} />
          <Route path="/cgv" element={<TermsOfSale />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      
      <CookieBanner />
      <Chatbot />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SmoothScrollManager />
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;