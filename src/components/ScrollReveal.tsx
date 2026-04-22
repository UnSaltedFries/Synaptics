import { useRef } from "react";
import { useInView, motion } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const ScrollReveal = ({ children, className = "", delay = 0 }: ScrollRevealProps) => {
    const ref = useRef(null);
    // Trigger entrance animation only once
    const hasRevealed = useInView(ref, { once: true, margin: "-20px" });
    // Toggle visibility for performance whenever it's far from viewport
    const isPresent = useInView(ref, { once: false, margin: "600px 0px 600px 0px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={hasRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ 
                visibility: isPresent ? "visible" : "hidden",
                pointerEvents: isPresent ? "auto" : "none"
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
