import { ReactNode, useEffect, useRef } from "react";
import { Footer } from "./Footer";
import { MobileFooter } from "@/pages/mobile/MobileFooter";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  variant?: "light" | "dark";
}

export function Layout({ children, hideFooter = false, variant = "light" }: LayoutProps) {
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (variant === "light" && overlayRef.current) {
      const el = overlayRef.current;
      // Ensure overlay is opaque (black) first
      el.style.transition = "none";
      el.style.opacity = "1";

      // Force a reflow so the browser paints the black overlay
      el.getBoundingClientRect();

      // Now enable the transition and fade to transparent
      el.style.transition = "opacity 0.8s ease";
      el.style.opacity = "0";
    }
  }, [location.pathname, variant]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-1">
        {children}
      </main>
      {!hideFooter && (isMobile ? <MobileFooter /> : <Footer />)}
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