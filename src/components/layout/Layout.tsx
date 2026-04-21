import { ReactNode, useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { MobileFooter } from "@/pages/mobile/MobileFooter";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocation } from "react-router-dom";
import { useScroll, useTransform, useMotionValue } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  variant?: "light" | "dark";
}

export function Layout({ children, hideFooter = false, variant = "light" }: LayoutProps) {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [footerHeight, setFooterHeight] = useState(0);
  
  // Track global window scroll progress
  const { scrollYProgress } = useScroll();
  
  // FIXED: Wider range [0.8, 1] to ensure the animation starts well before the end
  // and has plenty of scroll "distance" to play out elegantly.
  const revealProgress = useTransform(
    scrollYProgress,
    [0.8, 1], 
    [0, 1]
  );

  // ResizeObserver to measure footer height dynamically
  useEffect(() => {
    if (hideFooter) {
      document.documentElement.style.setProperty("--footer-height", "0px");
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        setFooterHeight(height);
        document.documentElement.style.setProperty("--footer-height", `${height}px`);
      }
    });

    const footerEl = document.querySelector('footer');
    if (footerEl) {
      observer.observe(footerEl);
    }

    return () => observer.disconnect();
  }, [hideFooter, isMobile, location.pathname]);

  useEffect(() => {
    if (variant === "light" && overlayRef.current) {
      const el = overlayRef.current;
      el.style.transition = "none";
      el.style.opacity = "1";
      el.getBoundingClientRect();
      el.style.transition = "opacity 0.8s ease";
      el.style.opacity = "0";
    }
  }, [location.pathname, variant]);

  return (
    <div className="min-h-screen relative bg-black selection:bg-purple-500/30">
      {/* Main Content Layer */}
      <main 
        className="relative z-10 bg-black min-h-screen shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{ marginBottom: hideFooter ? 0 : "var(--footer-height)" }}
      >
        {children}
      </main>

      {/* Reveal Footer Layer */}
      {!hideFooter && (
        <div className="fixed bottom-0 left-0 right-0 z-0 h-[var(--footer-height)]">
          {isMobile 
            ? <MobileFooter progress={revealProgress} /> 
            : <Footer progress={revealProgress} />
          }
        </div>
      )}

      {/* Black overlay for smooth dark→light transition */}
      {variant === "light" && (
        <div
          ref={overlayRef}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#000",
            opacity: 1,
            pointerEvents: "none",
            zIndex: 9991,
          }}
        />
      )}
    </div>
  );
}