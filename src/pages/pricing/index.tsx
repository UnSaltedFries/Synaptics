import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopPricing from "./DesktopPricing";
import MobilePricing from "./MobilePricing";

const Pricing = () => {
    const isMobile = useIsMobile();
    return isMobile ? <MobilePricing /> : <DesktopPricing />;
};

export default Pricing;
