import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

export function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { lang, setLang, t } = useLanguage();
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            (window as any).lenis?.stop();
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            (window as any).lenis?.start();
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            (window as any).lenis?.start();
        };
    }, [isOpen]);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 30);
    });

    const links = [
        { label: t("nav.home"), to: "/" },
        { label: t("nav.about"), to: "/about" },
        { label: t("nav.pricing"), to: "/pricing" },
        { label: t("nav.blog"), to: "/blog" },
        { label: t("nav.contacts"), to: "/contact" },
    ];

    // Always dark glassy like Desktop
    const barColor = "bg-black/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]";
    const textColor = "text-white";
    const hamburgerColor = "bg-white";

    return (
        <>
            {/* Fixed Header Bar */}
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-[10001] px-5 py-4 flex items-center justify-between transition-all duration-300",
                    barColor
                )}
            >
                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => {
                        setIsOpen(false);
                        if (location.pathname === "/") {
                            (window as any).lenis?.scrollTo(0);
                        } else {
                            window.scrollTo(0, 0);
                            (window as any).lenis?.scrollTo(0, { immediate: true });
                        }
                    }}
                    className={cn("flex items-center gap-2", textColor)}
                >
                    <img src="/favicon.ico" alt="Synaptics" className="w-5 h-5 rounded-sm" />
                    <span className="text-xs uppercase tracking-[0.12em] font-medium">Synaptics</span>
                </Link>

                {/* Hamburger / Close button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative z-[110] w-10 h-10 flex items-center justify-center"
                    aria-label="Menu"
                >
                    <div className="flex flex-col gap-[5px]">
                        <span
                            className={cn(
                                "block w-6 h-[2px] transition-all duration-300 origin-center",
                                isOpen ? "bg-white rotate-45 translate-y-[7px]" : hamburgerColor
                            )}
                        />
                        <span
                            className={cn(
                                "block w-6 h-[2px] transition-all duration-300",
                                isOpen ? "bg-white opacity-0" : hamburgerColor
                            )}
                        />
                        <span
                            className={cn(
                                "block w-6 h-[2px] transition-all duration-300 origin-center",
                                isOpen ? "bg-white -rotate-45 -translate-y-[7px]" : hamburgerColor
                            )}
                        />
                    </div>
                </button>
            </header>

            {/* Full-Screen Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="mobile-menu"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-0 z-[10005] bg-black flex flex-col justify-center items-center"
                    >
                        {/* Close button inside menu */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                            aria-label="Close menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <nav className="flex flex-col items-center gap-8">
                            <AnimatePresence>
                                <motion.div 
                                    key={lang}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col items-center gap-8"
                                >
                                    {links.map((link) => (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            onClick={() => {
                                                setIsOpen(false);
                                                if (location.pathname === link.to) {
                                                    (window as any).lenis?.scrollTo(0);
                                                }
                                            }}
                                            className={cn(
                                                "text-3xl font-bold tracking-tight transition-colors duration-200",
                                                location.pathname === link.to ? "text-white" : "text-white/40"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    {/* Language Toggle Inside Cross-fade */}
                                    <div className="mt-8">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLang(lang === "en" ? "fr" : "en");
                                            }}
                                            className="relative flex items-center rounded-full overflow-hidden bg-white/[0.07] border border-white/[0.12] text-xs uppercase tracking-widest font-semibold"
                                        >
                                            <span className={cn("relative z-10 px-4 py-2 transition-colors duration-300", lang === "en" ? "text-white" : "text-gray-500")}>
                                                EN
                                            </span>
                                            <span className={cn("relative z-10 px-4 py-2 transition-colors duration-300", lang === "fr" ? "text-white" : "text-gray-500")}>
                                                FR
                                            </span>
                                            <div
                                                className="absolute top-[2px] bottom-[2px] w-[calc(50%-2px)] rounded-full bg-white/[0.15] transition-all duration-400"
                                                style={{ left: lang === "en" ? "2px" : "calc(50%)" }}
                                            />
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
