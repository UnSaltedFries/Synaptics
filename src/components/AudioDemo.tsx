import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function AudioDemo() {
    const { t, lang } = useLanguage();
    const [voice, setVoice] = useState<"man" | "woman">("woman");
    const [playingCard, setPlayingCard] = useState<"before" | "after" | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Map selection to file path
    const getAudioPath = (cardType: "before" | "after") => {
        const isFR = lang === "fr";
        const isMan = voice === "man";

        // Language folder name
        const langDir = isFR ? "FR" : "EN";
        // Gender folder name (mismatch in filesystem names)
        const genderDir = isFR
            ? (isMan ? "homme" : "femme")
            : (isMan ? "man" : "woman");

        if (cardType === "before") {
            // Manual Process
            const genderSuffix = isMan ? "M" : "F";
            return `/voice/${langDir}/${genderDir}/Voix_${langDir}_${genderSuffix}.mp3`;
        } else {
            // AI Agent ("en bien")
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
            // Toggle pause if same card
            audioRef.current.pause();
            setPlayingCard(null);
        } else {
            // Play new card (browser handles stopping current if src changes)
            audioRef.current.pause();
            audioRef.current.src = getAudioPath(cardType);
            audioRef.current.load();
            audioRef.current.play();
            setPlayingCard(cardType);
        }
    };

    // Reset state when audio ends
    const handleEnded = () => {
        setPlayingCard(null);
    };

    // Update audio source when language or voice changes while playing
    useEffect(() => {
        if (audioRef.current && playingCard) {
            audioRef.current.pause();
            audioRef.current.src = getAudioPath(playingCard);
            audioRef.current.load();
            audioRef.current.play();
        }
    }, [lang, voice]);

    return (
        <section className="py-24 md:py-32 bg-black relative overflow-hidden" style={{ backgroundColor: "#000000" }}>
            <div className="container relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] mb-4">
                        {t("audio.title")}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        {t("audio.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Before Card */}
                    <div className="rounded-3xl border border-red-500/[0.15] bg-red-500/[0.03] backdrop-blur-sm p-8 group hover:border-red-500/[0.25] transition-all duration-500">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/[0.1] flex items-center justify-center">
                                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">{t("audio.before")}</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">{t("audio.beforeDesc")}</p>

                        {/* Simple Reactive Waveform */}
                        <div className="flex items-center gap-[2px] h-12 mb-8">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex-1 rounded-full transition-all duration-300",
                                        playingCard === "before" ? "bg-red-400" : "bg-red-400/30"
                                    )}
                                    style={{
                                        height: playingCard === "before"
                                            ? `${Math.random() * 60 + 20}%`
                                            : `${(Math.sin(i * 0.5) * 15) + 30}%`,
                                        transitionDelay: `${i * 10}ms`
                                    }}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => togglePlay("before")}
                                className={cn(
                                    "relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 group overflow-hidden",
                                    playingCard === "before"
                                        ? "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] scale-105"
                                        : "bg-gradient-to-br from-red-500/20 to-red-500/5 text-red-500 border border-red-500/30 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] hover:border-red-500/50"
                                )}
                            >
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                {playingCard === "before" ? (
                                    <svg className="w-5 h-5 fill-current relative z-10" viewBox="0 0 24 24">
                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 fill-current ml-0.5 relative z-10" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>

                            <div className="flex flex-col gap-1">
                                <span className="text-white font-bold text-base tracking-tight italic">
                                    {playingCard === "before" ? "En lecture..." : "Play Demo"}
                                </span>
                                <div className="flex items-center gap-2 text-red-400/80 text-[10px] uppercase tracking-[0.2em] font-black">
                                    <span className={cn(
                                        "h-2 w-2 rounded-full bg-red-500 transition-all duration-300",
                                        playingCard === "before" ? "animate-ping" : "opacity-30"
                                    )} />
                                    {playingCard === "before" ? "Audio Agent" : "Manual Process"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* After Card */}
                    <div className="rounded-3xl border border-purple-500/[0.15] bg-purple-500/[0.03] backdrop-blur-sm p-8 group hover:border-purple-500/[0.25] transition-all duration-500">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-purple-500/[0.1] flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-white">{t("audio.after")}</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">{t("audio.afterDesc")}</p>

                        {/* Simple Reactive Waveform */}
                        <div className="flex items-center gap-[2px] h-12 mb-8">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex-1 rounded-full transition-all duration-300",
                                        playingCard === "after" ? "bg-purple-400" : "bg-purple-400/30"
                                    )}
                                    style={{
                                        height: playingCard === "after"
                                            ? `${Math.random() * 60 + 20}%`
                                            : `${(Math.sin(i * 0.5) * 15) + 30}%`,
                                        transitionDelay: `${i * 10}ms`
                                    }}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => togglePlay("after")}
                                className={cn(
                                    "relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 group overflow-hidden",
                                    playingCard === "after"
                                        ? "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.25)] scale-105"
                                        : "bg-gradient-to-br from-purple-500/20 to-purple-500/5 text-purple-500 border border-purple-500/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-purple-500/50"
                                )}
                            >
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                {playingCard === "after" ? (
                                    <svg className="w-5 h-5 fill-current relative z-10" viewBox="0 0 24 24">
                                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 fill-current ml-0.5 relative z-10" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>

                            <div className="flex flex-col gap-1">
                                <span className="text-white font-bold text-base tracking-tight italic">
                                    {playingCard === "after" ? "En lecture..." : "Play Demo"}
                                </span>
                                <div className="flex items-center gap-2 text-purple-400/80 text-[10px] uppercase tracking-[0.2em] font-black">
                                    <span className={cn(
                                        "h-2 w-2 rounded-full bg-purple-500 transition-all duration-300",
                                        playingCard === "after" ? "animate-ping" : "opacity-30"
                                    )} />
                                    {playingCard === "after" ? "Audio Agent" : "New Experience"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Voice Toggle */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setVoice(voice === "man" ? "woman" : "man")}
                        className="relative grid grid-cols-2 items-center rounded-full overflow-hidden bg-white/[0.07] border border-white/[0.12] text-xs uppercase tracking-widest font-semibold p-1 cursor-pointer w-[240px]"
                    >
                        <span
                            className={cn(
                                "relative z-10 px-6 py-2 transition-colors duration-300 text-center",
                                voice === "man" ? "text-white" : "text-gray-500"
                            )}
                        >
                            {t("audio.voice.man")}
                        </span>
                        <span
                            className={cn(
                                "relative z-10 px-6 py-2 transition-colors duration-300 text-center",
                                voice === "woman" ? "text-white" : "text-gray-500"
                            )}
                        >
                            {t("audio.voice.woman")}
                        </span>

                        {/* Sliding indicator */}
                        <div
                            className="absolute top-[4px] bottom-[4px] w-[calc(50%-4px)] rounded-full bg-white/[0.15] backdrop-blur-md border border-white/[0.1] shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                            style={{
                                left: voice === "man" ? "4px" : "calc(50%)",
                            }}
                        />
                    </button>
                </div>
            </div>

            <audio
                ref={audioRef}
                onEnded={handleEnded}
                className="hidden"
            />
        </section>
    );
}
