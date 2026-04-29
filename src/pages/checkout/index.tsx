import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopCheckout from "./DesktopCheckout";
import MobileCheckout from "./MobileCheckout";

const Checkout = () => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <MobileCheckout />;
    }

    return <DesktopCheckout />;
};

export default Checkout;
