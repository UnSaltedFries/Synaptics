import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopChangelog from "./DesktopChangelog";

const Changelog = () => {
    const isMobile = useIsMobile();
    // Use desktop version as fallback if no mobile version exists
    return <DesktopChangelog />;
};

export default Changelog;
