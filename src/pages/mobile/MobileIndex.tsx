import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { MobileFooter } from "./MobileFooter";
import { motion } from "framer-motion";

/* ─── Animated Counter ──────────────────────────────────────────── */
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const startTime = performance.now();
                    const animate = (currentTime: number) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(end * eased));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return (
        <div ref={ref} className="text-2xl font-bold tabular-nums">
            {count}{suffix}
        </div>
    );
}

/* ─── Mobile Index Page ─────────────────────────────────────────── */
const MobileIndex = () => {
    const { t, lang } = useLanguage();
    const [voice, setVoice] = useState<"man" | "woman">("woman");
    const [playingCard, setPlayingCard] = useState<"before" | "after" | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Audio path logic (same as desktop)
    const getAudioPath = (cardType: "before" | "after") => {
        const isFR = lang === "fr";
        const isMan = voice === "man";
        const langDir = isFR ? "FR" : "EN";
        const genderDir = isFR ? (isMan ? "homme" : "femme") : (isMan ? "man" : "woman");

        if (cardType === "before") {
            const genderSuffix = isMan ? "M" : "F";
            return `/voice/${langDir}/${genderDir}/Voix_${langDir}_${genderSuffix}.mp3`;
        } else {
            if (isFR) {
                const genderName = isMan ? "homme" : "femme";
                return `/voice/FR/${genderDir}/Voix_français_bien ${genderName}.wav`;
            } else {
                const genderName = isMan ? "man" : "woman";
                return `/voice/EN/${genderDir}/Voix_anglais_good ${genderName}.wav`;
            }
        }
    };

    const togglePlay = (cardType: "before" | "after") => {
        if (!audioRef.current) return;
        if (playingCard === cardType) {
            audioRef.current.pause();
            setPlayingCard(null);
        } else {
            audioRef.current.pause();
            audioRef.current.src = getAudioPath(cardType);
            audioRef.current.load();
            audioRef.current.play();
            setPlayingCard(cardType);
        }
    };

    const handleEnded = () => setPlayingCard(null);

    useEffect(() => {
        if (audioRef.current && playingCard) {
            audioRef.current.pause();
            audioRef.current.src = getAudioPath(playingCard);
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [lang, voice]);

    // ROI Calculator state
    const [calls, setCalls] = useState(500);
    const [missed, setMissed] = useState(30);
    const [dealValue, setDealValue] = useState(200);
    const missedCalls = Math.round(calls * (missed / 100));
    const monthlyLoss = missedCalls * dealValue;
    const yearlyLoss = monthlyLoss * 12;
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

    // Integrations
    const integrations = [
        { name: "Google Calendar", logo: "/images/logos/google-calendar.svg" },
        { name: "HubSpot", logo: "/images/logos/hubspot.svg" },
        { name: "Salesforce", logo: "/images/logos/salesforce.svg" },
        { name: "Doctolib", logo: "/images/logos/doctolib.svg" },
        { name: "Make", logo: "/images/logos/make.svg" },
        { name: "Zapier", logo: "/images/logos/zapier.svg" },
        { name: "Zenchef", logo: "/images/logos/zenchef.svg" },
        { name: "Quickbooks", logo: "/images/logos/quickbooks.svg" },
        { name: "Formitable", logo: "/images/logos/formitable.svg" },
    ];

    // HowItWorks steps
    const steps = [
        { number: "01", colorClass: "text-blue-400", bgClass: "bg-blue-500/10 border-blue-500/20" },
        { number: "02", colorClass: "text-purple-400", bgClass: "bg-purple-500/10 border-purple-500/20" },
        { number: "03", colorClass: "text-blue-400", bgClass: "bg-blue-500/10 border-blue-500/20" },
    ];

    return (
        <div className="min-h-screen bg-black text-white" style={{ backgroundColor: "#000000" }}>

            {/* ─── HERO ─────────────────────────────────────────────────── */}
            <section className="flex flex-col px-5 pt-20 pb-6 h-[100dvh]" style={{ backgroundColor: "#000000" }}>
                {/* "Best on PC" — pinned to top */}
                <p className="text-[10px] italic text-center mb-4 tracking-wide pt-2 chrome-word-always">
                    {t("mobile.bestOnPc")}
                </p>

                {/* ── Text group: centered vertically ── */}
                <div className="flex flex-col justify-center flex-1">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                        className="text-[3.5rem] sm:text-[4.5rem] font-bold text-white tracking-tighter leading-[0.95] mb-8 animate-float"
                    >
                        {t("hero.title.line1")}
                        <br />
                        {t("hero.title.line2")}
                    </motion.h1>

                    {/* Description — chrome shine effect */}
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
                        className="text-base sm:text-lg leading-relaxed chrome-word-always"
                    >
                        {t("hero.desc")}
                    </motion.p>

                    {/* Spacer */}
                    <div className="h-10" />

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
                    >
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-base w-full"
                        >
                            {t("hero.cta.button")} →
                        </Link>
                    </motion.div>
                </div>

                {/* ── Bottom: Trust Indicators pinned to bottom of screen ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="grid grid-cols-2 gap-3 pt-4 text-[9px] uppercase tracking-wider text-gray-500 font-medium place-items-center"
                >
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-white">4.9</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                        <span>{t("trustBadge.gdpr")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{t("trustBadge.response")}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        <span>{t("trustBadge.clients")}</span>
                    </div>
                </motion.div>
            </section>

            {/* ─── HOW IT WORKS ─────────────────────────────────────────── */}
            <section className="px-5 py-12" style={{ backgroundColor: "#000000" }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold mb-2 tracking-tight"
                >{t("howItWorks.title")}</motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-gray-400 text-sm mb-8 leading-relaxed"
                >{t("howItWorks.subtitle")}</motion.p>

                <div className="flex flex-col gap-4">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, scale: 0.97 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                            className={cn(
                                "relative overflow-hidden rounded-2xl p-5 border backdrop-blur-sm",
                                step.bgClass
                            )}
                        >
                            {/* Glass shine */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
                            {/* Large faded number */}
                            <span className="absolute top-3 right-4 text-5xl font-bold text-white/[0.04] tracking-tighter pointer-events-none">
                                {step.number}
                            </span>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.08]", step.bgClass)}>
                                        <span className={cn("text-xs font-bold", step.colorClass)}>{step.number}</span>
                                    </div>
                                    <h3 className="text-base font-semibold text-white">{t(`howItWorks.step${i + 1}.title`)}</h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed pl-11">{t(`howItWorks.step${i + 1}.desc`)}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── STATS ────────────────────────────────────────────────── */}
            <section className="px-5 py-10" style={{ backgroundColor: "#000000" }}>
                <h2 className="text-center text-[9px] uppercase tracking-[0.2em] text-gray-500 font-medium mb-6">
                    {t("stats.title")}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { value: 98, suffix: "%", label: t("stats.callsAnswered") },
                        { value: 0.8, suffix: "s", label: t("stats.responseTime"), isDecimal: true },
                        { value: 35, suffix: "%", prefix: "+", label: t("stats.moreBookings") },
                        { value: 99.9, suffix: "%", label: t("stats.uptime"), isDecimal: true },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-white mb-1 flex items-center justify-center gap-0.5">
                                {stat.prefix && <span className="text-2xl font-bold text-emerald-400">{stat.prefix}</span>}
                                {stat.isDecimal ? (
                                    <div className="text-2xl font-bold tabular-nums bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                                        {stat.value}{stat.suffix}
                                    </div>
                                ) : (
                                    <div className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                    </div>
                                )}
                            </div>
                            <p className="text-[8px] uppercase tracking-[0.12em] text-gray-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── AUDIO DEMO ───────────────────────────────────────────── */}
            <section className="px-5 py-10" style={{ backgroundColor: "#000000" }}>
                <h2 className="text-xl font-bold mb-1.5 tracking-tight">{t("audio.title")}</h2>
                <p className="text-gray-400 text-xs mb-5 leading-relaxed">{t("audio.subtitle")}</p>

                {/* Before Card */}
                <div className="rounded-xl border border-red-500/[0.15] bg-red-500/[0.03] p-4 mb-3">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold">{t("audio.before")}</h3>
                    </div>
                    <p className="text-gray-400 text-[11px] mb-3">{t("audio.beforeDesc")}</p>

                    <button
                        onClick={() => togglePlay("before")}
                        className={cn(
                            "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                            playingCard === "before" ? "bg-red-600 text-white" : "bg-red-500/10 text-red-400 border border-red-500/20"
                        )}
                    >
                        {playingCard === "before" ? (
                            <><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> Pause</>
                        ) : (
                            <><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg> Play</>
                        )}
                    </button>
                </div>

                {/* After Card */}
                <div className="rounded-xl border border-purple-500/[0.15] bg-purple-500/[0.03] p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-sm font-semibold">{t("audio.after")}</h3>
                    </div>
                    <p className="text-gray-400 text-[11px] mb-3">{t("audio.afterDesc")}</p>

                    <button
                        onClick={() => togglePlay("after")}
                        className={cn(
                            "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all",
                            playingCard === "after" ? "bg-purple-600 text-white" : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        )}
                    >
                        {playingCard === "after" ? (
                            <><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg> Pause</>
                        ) : (
                            <><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg> Play</>
                        )}
                    </button>
                </div>

                {/* Voice Toggle */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setVoice(voice === "man" ? "woman" : "man")}
                        className="relative grid grid-cols-2 items-center rounded-full overflow-hidden bg-white/[0.07] border border-white/[0.12] text-[10px] uppercase tracking-widest font-semibold p-1 w-[200px]"
                    >
                        <span className={cn("relative z-10 px-4 py-2 transition-colors duration-300 text-center", voice === "man" ? "text-white" : "text-gray-500")}>
                            {t("audio.voice.man")}
                        </span>
                        <span className={cn("relative z-10 px-4 py-2 transition-colors duration-300 text-center", voice === "woman" ? "text-white" : "text-gray-500")}>
                            {t("audio.voice.woman")}
                        </span>
                        <div
                            className="absolute top-[4px] bottom-[4px] w-[calc(50%-4px)] rounded-full bg-white/[0.15] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                            style={{ left: voice === "man" ? "4px" : "calc(50%)" }}
                        />
                    </button>
                </div>

                <audio ref={audioRef} onEnded={handleEnded} className="hidden" />
            </section>

            {/* ─── INTEGRATIONS ─────────────────────────────────────────── */}
            <section className="px-5 py-10" style={{ backgroundColor: "#000000" }}>
                <h2 className="text-xl font-bold mb-1.5 tracking-tight text-center">{t("integrations.title")}</h2>
                <p className="text-gray-400 text-xs mb-5 text-center">{t("integrations.subtitle")}</p>

                <div className="grid grid-cols-3 gap-2">
                    {integrations.map((integration, i) => (
                        <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 flex flex-col items-center gap-1.5">
                            <img src={integration.logo} alt={integration.name} className="w-5 h-5" />
                            <span className="text-[8px] text-gray-400 font-medium text-center leading-tight">{integration.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── ROI CALCULATOR ───────────────────────────────────────── */}
            <section className="px-5 py-10" style={{ backgroundColor: "#000000" }}>
                <h2 className="text-xl font-bold mb-1.5 tracking-tight">{t("roi.title")}</h2>
                <p className="text-gray-400 text-xs mb-5 leading-relaxed">{t("roi.subtitle")}</p>

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                    {/* Calls */}
                    <div className="mb-4">
                        <label className="block text-[9px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-2">{t("roi.callsPerMonth")}</label>
                        <input
                            type="number" min={0} max={10000} value={calls}
                            onChange={(e) => setCalls(Number(e.target.value))}
                            className="w-full bg-transparent border-b border-white/[0.1] py-1.5 text-xl font-bold text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <input type="range" min={0} max={10000} step={50} value={calls} onChange={(e) => setCalls(Number(e.target.value))}
                            className="w-full h-1 mt-2 bg-white/[0.1] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                        />
                    </div>

                    {/* Missed */}
                    <div className="mb-4">
                        <label className="block text-[9px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-2">{t("roi.missedPercent")}</label>
                        <div className="relative">
                            <input
                                type="number" min={0} max={100} value={missed}
                                onChange={(e) => setMissed(Number(e.target.value))}
                                className="w-full bg-transparent border-b border-white/[0.1] py-1.5 text-xl font-bold text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                        </div>
                        <input type="range" min={0} max={100} step={5} value={missed} onChange={(e) => setMissed(Number(e.target.value))}
                            className="w-full h-1 mt-2 bg-white/[0.1] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                        />
                    </div>

                    {/* Deal Value */}
                    <div className="mb-5">
                        <label className="block text-[9px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-2">{t("roi.avgDealValue")}</label>
                        <div className="relative">
                            <input
                                type="number" min={0} max={10000} value={dealValue}
                                onChange={(e) => setDealValue(Number(e.target.value))}
                                className="w-full bg-transparent border-b border-white/[0.1] py-1.5 text-xl font-bold text-white focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
                        </div>
                        <input type="range" min={0} max={10000} step={10} value={dealValue} onChange={(e) => setDealValue(Number(e.target.value))}
                            className="w-full h-1 mt-2 bg-white/[0.1] rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                        />
                    </div>

                    {/* Separator */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mb-4" />

                    {/* Results */}
                    <div className="flex flex-col gap-2 mb-4">
                        <div className="text-center py-3 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                            <p className="text-[8px] uppercase tracking-[0.15em] text-gray-500 font-medium mb-0.5">{t("roi.result.missed")}</p>
                            <p className="text-lg font-bold text-red-400">{missedCalls}</p>
                        </div>
                        <div className="text-center py-3 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                            <p className="text-[8px] uppercase tracking-[0.15em] text-gray-500 font-medium mb-0.5">{t("roi.result.revenue")}</p>
                            <p className="text-lg font-bold text-red-400">{formatCurrency(monthlyLoss)}</p>
                        </div>
                        <div className="text-center py-3 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                            <p className="text-[8px] uppercase tracking-[0.15em] text-gray-500 font-medium mb-0.5">{t("roi.result.year")}</p>
                            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">{formatCurrency(yearlyLoss)}</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <Link
                        to="/contact"
                        className="block w-full text-center py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm"
                    >
                        {t("roi.cta")} →
                    </Link>
                </div>
            </section>

            {/* ─── FOOTER ───────────────────────────────────────────────── */}
            <MobileFooter />
        </div>
    );
};

export default MobileIndex;
