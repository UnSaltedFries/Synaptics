import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopContact from "./DesktopContact";
import MobileContact from "./MobileContact";

const Contact = () => {
    const isMobile = useIsMobile();
    return isMobile ? <MobileContact /> : <DesktopContact />;
};

export default Contact;
