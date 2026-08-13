import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";

import { FloatingCTA } from "@/components/shared/FloatingCTA";
import { ScrollReveal } from "@/components/visuals/ScrollReveal";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { StatsSection } from "@/components/sections/StatsSection";

import { AudioDemo } from "@/components/media/AudioDemo";
import { Testimonials } from "@/components/sections/Testimonials";
import { IntegrationsGrid } from "@/components/sections/IntegrationsGrid";
import { ROICalculator } from "@/components/pricing/ROICalculator";
import { WorkflowEcosystem } from "@/components/sections/WorkflowEcosystem";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";



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
      <div className="relative">

        <div className="relative z-10">
          <HeroSection />


          {/* Sections */}
          <div className="space-y-0 mt-32 md:mt-64">
            {/* ── 01. IA FRONT-OFFICE & AGENT VOCAL ── */}
            <ScrollReveal className="relative z-30"><HowItWorks /></ScrollReveal>
            <ScrollReveal className="relative z-20"><StatsSection /></ScrollReveal>
            <ScrollReveal><AudioDemo /></ScrollReveal>
            <ScrollReveal><ROICalculator /></ScrollReveal>

            {/* ── 02. IA BACK-OFFICE & WORKFLOWS ── */}
            <ScrollReveal><WorkflowEcosystem /></ScrollReveal>
            {/* <ScrollReveal><Testimonials /></ScrollReveal> */}
            <ScrollReveal><IntegrationsGrid /></ScrollReveal>
          </div>



          <FloatingCTA />
        </div>
      </div>
    </Layout>
  );
};

export default Index;