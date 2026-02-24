import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const LIGHT_ROUTES = ["/about", "/privacy", "/terms", "/gdpr"];

export function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { lang, setLang, t } = useLanguage();
    const location = useLocation();

    const isLightPage = LIGHT_ROUTES.includes(location.pathname);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { label: t("nav.home"), to: "/" },
        { label: t("nav.about"), to: "/about" },
        { label: t("nav.pricing"), to: "/pricing" },
        { label: t("nav.blog"), to: "/blog" },
        { label: t("nav.contacts"), to: "/contact" },
    ];

    // Colors adapt based on light/dark page
    const barColor = isLightPage && !isOpen
        ? (scrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/[0.06]" : "bg-transparent")
        : (scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent");

    const textColor = isLightPage && !isOpen ? "text-black" : "text-white";
    const hamburgerColor = isLightPage && !isOpen ? "bg-black" : "bg-white";

    return (
        <>
            {/* Fixed Header Bar */}
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] px-5 py-4 flex items-center justify-between transition-all duration-300",
                    barColor
                )}
            >
                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => {
                        if (location.pathname === "/") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[99] flex flex-col justify-center items-center"
                        style={{ backgroundColor: "#000000" }}
                    >
                        <nav className="flex flex-col items-center gap-6">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.to}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: i * 0.06, duration: 0.3 }}
                                >
                                    <Link
                                        to={link.to}
                                        className={cn(
                                            "text-2xl font-medium tracking-tight transition-colors duration-200",
                                            location.pathname === link.to ? "text-white" : "text-gray-500"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Language Toggle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.3 }}
                            className="mt-12"
                        >
                            <button
                                onClick={() => setLang(lang === "en" ? "fr" : "en")}
                                className="relative flex items-center rounded-full overflow-hidden bg-white/[0.07] border border-white/[0.12] text-xs uppercase tracking-widest font-semibold"
                            >
                                <span className={cn("relative z-10 px-4 py-2 transition-colors duration-300", lang === "en" ? "text-white" : "text-gray-500")}>
                                    EN
                                </span>
                                <span className={cn("relative z-10 px-4 py-2 transition-colors duration-300", lang === "fr" ? "text-white" : "text-gray-500")}>
                                    FR
                                </span>
                                <div
                                    className="absolute top-[2px] bottom-[2px] w-[calc(50%-2px)] rounded-full bg-white/[0.15] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                    style={{ left: lang === "en" ? "2px" : "calc(50%)" }}
                                />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
