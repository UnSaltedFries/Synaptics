import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopAbout from "./DesktopAbout";
import MobileAbout from "./MobileAbout";

const About = () => {
    const isMobile = useIsMobile();
    return isMobile ? <MobileAbout /> : <DesktopAbout />;
};

export default About;
