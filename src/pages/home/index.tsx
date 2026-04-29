import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopIndex from "./DesktopIndex";
import MobileIndex from "./MobileIndex";

const Index = () => {
    const isMobile = useIsMobile();
    return isMobile ? <MobileIndex /> : <DesktopIndex />;
};

export default Index;
