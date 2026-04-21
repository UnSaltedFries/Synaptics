import { ReactNode, useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { MobileFooter } from "@/pages/mobile/MobileFooter";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocation } from "react-router-dom";
import { useScroll } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  variant?: "light" | "dark";
}

export function Layout({ children, hideFooter = false, variant = "light" }: LayoutProps) {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [footerHeight, setFooterHeight] = useState(0);

  // High-precision scroll tracking for the footer reveal
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start end", "end end"]
  });

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
    <div className="min-h-screen relative bg-black">
      {/* Main Content Layer */}
      <main 
        className="relative z-10 bg-black min-h-screen shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        style={{ marginBottom: hideFooter ? 0 : "var(--footer-height)" }}
        {children}
        {/* Trigger for footer animations - same height as footer for perfect mapping */}
        {!hideFooter && <div ref={triggerRef} style={{ height: "var(--footer-height)" }} className="w-full absolute bottom-0 pointer-events-none" />}
      </main>

      {/* Reveal Footer Layer */}
      {!hideFooter && (
        <div className="fixed bottom-0 left-0 right-0 z-0 h-[var(--footer-height)]">
          {isMobile 
             ? <MobileFooter progress={scrollYProgress} /> 
             : <Footer progress={scrollYProgress} />
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
            zIndex: 9999,
          }}
        />
      )}
    </div>
  );
}