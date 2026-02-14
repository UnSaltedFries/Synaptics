import { useLanguage } from "@/contexts/LanguageContext";
import ScrollStack, { ScrollStackItem } from "./ScrollStack";

const steps = [
    {
        number: "01",
        icon: (
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
        ),
    },
    {
        number: "02",
        icon: (
            <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
    {
        number: "03",
        icon: (
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
        ),
    },
];

export function HowItWorks() {
    const { t } = useLanguage();

    return (
        <section className="py-8 md:py-20 bg-black relative z-30">
            <div className="container relative z-10">
                <div className="flex flex-col items-center max-w-5xl mx-auto">

                    {/* Header - Centered */}
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[-0.03em] mb-6">
                            {t("howItWorks.title")}
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            {t("howItWorks.subtitle")}
                        </p>
                    </div>

                    {/* Scrolling Steps */}
                    <div className="w-full min-h-[120vh]">
                        <ScrollStack
                            itemDistance={30} // Reverted to tighter scroll
                            itemScale={0.05} // Reverted to original scale diff
                            itemStackDistance={35} // Reverted to tighter cascading overlap
                            stackPosition="15%" // Brought up significantly to reduce gap
                            scaleEndPosition="10%"
                            baseScale={0.90} // Original base scale
                            scaleDuration={0.4}
                            useWindowScroll={true}
                            className="w-full"
                        >
                            {steps.map((step, i) => (
                                <ScrollStackItem key={i} itemClassName="relative overflow-hidden bg-zinc-900/80 backdrop-blur-xl border border-white/10 !p-10 md:!p-16 !h-auto !min-h-[350px] flex flex-col justify-center rounded-[2.5rem] shadow-2xl hover:border-white/20 transition-colors duration-500">
                                    {/* Glass shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />

                                    <div className="relative z-10 flex flex-col gap-8">
                                        {/* Header */}
                                        <div className="flex items-center justify-between border-b border-white/10 pb-8">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white">
                                                    {step.icon}
                                                </div>
                                                <h3 className="text-3xl md:text-4xl font-semibold text-white tracking-tight min-h-[1.2em] md:min-h-[1.2em]">
                                                    {t(`howItWorks.step${i + 1}.title`)}
                                                </h3>
                                            </div>
                                            <span className="text-6xl font-display font-bold text-white/5 tracking-tighter">
                                                {step.number}
                                            </span>
                                        </div>

                                        {/* Body */}
                                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl">
                                            {t(`howItWorks.step${i + 1}.desc`)}
                                        </p>
                                    </div>
                                </ScrollStackItem>
                            ))}
                        </ScrollStack>
                    </div>

                </div>
            </div>
        </section>
    );
}
