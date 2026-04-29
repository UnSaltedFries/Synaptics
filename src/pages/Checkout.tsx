import React from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopCheckout from "./desktop/DesktopCheckout";
import MobileCheckout from "./mobile/MobileCheckout";

const Checkout = () => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <MobileCheckout />;
    }

    return <DesktopCheckout />;
};

export default Checkout;
