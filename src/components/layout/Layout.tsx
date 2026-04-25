import { ReactNode, useEffect, useRef, useState } from "react";
import { Footer } from "./Footer";
import { MobileFooter } from "@/pages/mobile/MobileFooter";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useLocation } from "react-router-dom";
import { useScroll, useTransform } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
  variant?: "light" | "dark";
}

export function Layout({ 
  children, 
  hideFooter = false, 
  variant = "light",
}: LayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [footerHeight, setFooterHeight] = useState(0);
  
  // On crée une référence pour la fin du contenu principal
  const containerRef = useRef<HTMLDivElement>(null);
  
  // On suit le scroll par rapport à la fin du conteneur de la page
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end 1.5", "end 0.1"]
  });

  // La progression de la révélation est maintenant calée sur la sortie du contenu principal
  // On transforme le scrollYProgress (0 à 1) en progression de révélation
  const revealProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // ResizeObserver pour mesurer le footer
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

  return (
    <div className="min-h-screen relative bg-black selection:bg-purple-500/30 overflow-x-hidden">
      {/* Main Content Layer */}
      <main 
        ref={containerRef}
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
    </div>
  );
}