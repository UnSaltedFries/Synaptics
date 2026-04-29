import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

export function ROICalculator() {
    const { t } = useLanguage();
    const [calls, setCalls] = useState(500);
    const [missed, setMissed] = useState(30);
    const [dealValue, setDealValue] = useState(200);

    const missedCalls = Math.round(calls * (missed / 100));
    const monthlyLoss = missedCalls * dealValue;
    const yearlyLoss = monthlyLoss * 12;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <section className="py-24 md:py-32 bg-black relative overflow-hidden">


            <div className="container relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] mb-4">
                        {t("roi.title")}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        {t("roi.subtitle")}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {/* Calls per month */}
                            <div className="bg-white/[0.03] rounded-2xl p-8 border border-white/[0.05]">
                                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">
                                    {t("roi.callsPerMonth")}
                                </label>
                                <div className="flex flex-col gap-4">
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min={0}
                                            max={10000}
                                            value={calls}
                                            onChange={(e) => setCalls(Number(e.target.value))}
                                            className="w-full bg-transparent border-b border-white/[0.1] py-2 text-3xl font-bold text-white focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                    </div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={10000}
                                        step={50}
                                        value={calls}
                                        onChange={(e) => setCalls(Number(e.target.value))}
                                        className="w-full h-1 bg-white/[0.1] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125"
                                    />
                                </div>
                            </div>

                            {/* Missed % */}
                            <div className="bg-white/[0.03] rounded-2xl p-8 border border-white/[0.05]">
                                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">
                                    {t("roi.missedPercent")}
                                </label>
                                <div className="flex flex-col gap-4">
                                    <div className="relative flex items-center">
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={missed}
                                            onChange={(e) => setMissed(Number(e.target.value))}
                                            className="w-full bg-transparent border-b border-white/[0.1] py-2 text-3xl font-bold text-white focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-light">%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        step={5}
                                        value={missed}
                                        onChange={(e) => setMissed(Number(e.target.value))}
                                        className="w-full h-1 bg-white/[0.1] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125"
                                    />
                                </div>
                            </div>

                            {/* Avg deal value */}
                            <div className="bg-white/[0.03] rounded-2xl p-8 border border-white/[0.05]">
                                <label className="block text-[11px] uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">
                                    {t("roi.avgDealValue")}
                                </label>
                                <div className="flex flex-col gap-4">
                                    <div className="relative flex items-center">
                                        <input
                                            type="number"
                                            min={0}
                                            max={10000}
                                            value={dealValue}
                                            onChange={(e) => setDealValue(Number(e.target.value))}
                                            className="w-full bg-transparent border-b border-white/[0.1] py-2 text-3xl font-bold text-white focus:outline-none focus:border-blue-500 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 text-xl font-light">€</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={10000}
                                        step={10}
                                        value={dealValue}
                                        onChange={(e) => setDealValue(Number(e.target.value))}
                                        className="w-full h-1 bg-white/[0.1] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent mb-10" />

                        {/* Results */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                            <div className="text-center px-8 py-6 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium mb-3">
                                    {t("roi.result.missed")}
                                </p>
                                <p className="text-3xl font-bold text-red-400 break-all">{missedCalls}</p>
                            </div>
                            <div className="text-center px-8 py-6 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium mb-3">
                                    {t("roi.result.revenue")}
                                </p>
                                <p className="text-3xl font-bold text-red-400 break-all">{formatCurrency(monthlyLoss)}</p>
                            </div>
                            <div className="text-center px-8 py-6 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
                                <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500 font-medium mb-3">
                                    {t("roi.result.year")}
                                </p>
                                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 break-all">
                                    {formatCurrency(yearlyLoss)}
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center relative group w-fit mx-auto">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-40 group-hover:opacity-100 transition duration-500" />
                            <Link
                                to="/contact"
                                className="relative inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 w-full md:w-auto"
                            >
                                <span>{t("roi.cta")}</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
