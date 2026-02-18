import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/HeroSection";

import { FloatingCTA } from "@/components/FloatingCTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HowItWorks } from "@/components/HowItWorks";
import { StatsSection } from "@/components/StatsSection";

import { AudioDemo } from "@/components/AudioDemo";
import { Testimonials } from "@/components/Testimonials";
import { IntegrationsGrid } from "@/components/IntegrationsGrid";
import { ROICalculator } from "@/components/ROICalculator";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

import { WaveBackground } from "@/components/WaveBackground";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <Layout variant="dark">
      <div className="bg-black min-h-screen relative overflow-hidden">
        <WaveBackground />

        <div className="relative z-10">
          <HeroSection />


          {/* Sections moved from Blog */}
          <div className="space-y-0 mt-32 md:mt-64">
            <ScrollReveal className="relative z-30"><HowItWorks /></ScrollReveal>
            <ScrollReveal className="relative z-20"><StatsSection /></ScrollReveal>

            <ScrollReveal><AudioDemo /></ScrollReveal>
            {/* <ScrollReveal><Testimonials /></ScrollReveal> */}
            <ScrollReveal><IntegrationsGrid /></ScrollReveal>
            <ScrollReveal><ROICalculator /></ScrollReveal>
          </div>



          <FloatingCTA />
        </div>
      </div>
    </Layout>
  );
};

export default Index;