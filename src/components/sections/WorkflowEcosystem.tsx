import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import BlurText from "@/components/visuals/BlurText";
import ScrollReveal from "@/components/visuals/ScrollReveal";
import {
    Bot,
    MessageSquare,
    Receipt,
    FileCheck,
    FileText,
    Search,
    UserCheck,
    Calendar,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    XCircle,
    Zap,
    TrendingUp,
    Shield,
    Clock,
    DollarSign,
    Layers,
    ChevronRight,
} from "lucide-react";

interface WorkflowItem {
    id: string;
    icon: React.ElementType;
    titleKey: string;
    manualKey: string;
    solutionKey: string;
    kpi: {
        value: string;
        labelFR: string;
        labelEN: string;
    };
    category: "frontoffice" | "finance" | "backoffice" | "growth";
    badgeFR: string;
    badgeEN: string;
    color: string;
}

const workflows: WorkflowItem[] = [
    // Front-Office & Support
    {
        id: "wf-1",
        icon: MessageSquare,
        titleKey: "config.s1.title",
        manualKey: "config.s1.manual",
        solutionKey: "config.s1.argument",
        kpi: { value: "3s", labelFR: "Temps de réponse 24/7", labelEN: "Response time 24/7" },
        category: "frontoffice",
        badgeFR: "Support Client",
        badgeEN: "Customer Support",
        color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-400",
    },
    {
        id: "wf-2",
        icon: UserCheck,
        titleKey: "config.s2.title",
        manualKey: "config.s2.manual",
        solutionKey: "config.s2.argument",
        kpi: { value: "+40%", labelFR: "Taux de conversion Google Reviews", labelEN: "Google Reviews conversion" },
        category: "frontoffice",
        badgeFR: "Réputation & Avis",
        badgeEN: "Reputation & Reviews",
        color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
    },

    // Finance & Facturation
    {
        id: "wf-3",
        icon: Receipt,
        titleKey: "config.s3.title",
        manualKey: "config.s3.manual",
        solutionKey: "config.s3.argument",
        kpi: { value: "5 min", labelFR: "Génération devis vs 45 min", labelEN: "Quote creation vs 45 min" },
        category: "finance",
        badgeFR: "Facturation & Devis",
        badgeEN: "Billing & Quotes",
        color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    },
    {
        id: "wf-4",
        icon: DollarSign,
        titleKey: "config.s4.title",
        manualKey: "config.s4.manual",
        solutionKey: "config.s4.argument",
        kpi: { value: "+8%", labelFR: "CA récupéré sur factures en retard", labelEN: "Revenue recovered from overdue" },
        category: "finance",
        badgeFR: "Trésorerie & Recouvrement",
        badgeEN: "Cashflow Recovery",
        color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    },

    // Documents & Back-Office
    {
        id: "wf-5",
        icon: FileText,
        titleKey: "config.s5.title",
        manualKey: "config.s5.manual",
        solutionKey: "config.s5.argument",
        kpi: { value: "3h / sem", labelFR: "Économisées par collaborateur", labelEN: "Saved per employee / week" },
        category: "backoffice",
        badgeFR: "OCR & Archivage",
        badgeEN: "OCR & Archiving",
        color: "from-violet-500/20 to-indigo-500/20 border-violet-500/30 text-violet-400",
    },
    {
        id: "wf-6",
        icon: FileCheck,
        titleKey: "config.s7.title",
        manualKey: "config.s7.manual",
        solutionKey: "config.s7.argument",
        kpi: { value: "100%", labelFR: "Onboarding fluide et sans oubli", labelEN: "Flawless automated onboarding" },
        category: "backoffice",
        badgeFR: "Onboarding Client",
        badgeEN: "Client Onboarding",
        color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-400",
    },

    // Stratégie & RH
    {
        id: "wf-7",
        icon: Search,
        titleKey: "config.s6.title",
        manualKey: "config.s6.manual",
        solutionKey: "config.s6.argument",
        kpi: { value: "24/7", labelFR: "Surveillance concurrentielle continue", labelEN: "Continuous competitor tracking" },
        category: "growth",
        badgeFR: "Veille & Alertes",
        badgeEN: "Market Intelligence",
        color: "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-400",
    },
    {
        id: "wf-8",
        icon: Calendar,
        titleKey: "config.s8.title",
        manualKey: "config.s8.manual",
        solutionKey: "config.s8.argument",
        kpi: { value: "0 friction", labelFR: "Gestion automatisée des congés", labelEN: "Zero-friction leave approvals" },
        category: "growth",
        badgeFR: "RH & Absences",
        badgeEN: "HR & Leaves",
        color: "from-teal-500/20 to-emerald-500/20 border-teal-500/30 text-teal-400",
    },
];

const categoryKeys: { id: "frontoffice" | "finance" | "backoffice" | "growth"; labelKey: string; icon: React.ElementType }[] = [
    { id: "frontoffice", labelKey: "ecosystem.tab.frontoffice", icon: MessageSquare },
    { id: "finance", labelKey: "ecosystem.tab.finance", icon: Receipt },
    { id: "backoffice", labelKey: "ecosystem.tab.backoffice", icon: FileText },
    { id: "growth", labelKey: "ecosystem.tab.growth", icon: TrendingUp },
];

export function WorkflowEcosystem() {
    const { t, lang } = useLanguage();
    const [activeTab, setActiveTab] = useState<"frontoffice" | "finance" | "backoffice" | "growth">("frontoffice");

    const filteredWorkflows = workflows.filter((w) => w.category === activeTab);

    return (
        <section className="py-24 md:py-36 relative overflow-hidden bg-black text-white">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-purple-600/10 via-blue-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />

            <div className="container relative z-10 mx-auto px-5 md:px-8">
                {/* ── Section Header ── */}
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <ScrollReveal>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-6">
                            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-purple-300">
                                {t("ecosystem.eyebrow")}
                            </span>
                        </div>
                    </ScrollReveal>

                    <div className="mb-6">
                        <BlurText
                            text={t("ecosystem.title")}
                            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]"
                            delay={30}
                            animateBy="words"
                            direction="bottom"
                        />
                    </div>

                    <ScrollReveal delay={0.2}>
                        <p className="text-gray-400 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                            {t("ecosystem.subtitle")}
                        </p>
                    </ScrollReveal>
                </div>

                {/* ── Category Navigation Tabs ── */}
                <ScrollReveal delay={0.3}>
                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12 md:mb-16">
                        {categoryKeys.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeTab === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveTab(cat.id)}
                                    className={cn(
                                        "relative flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs md:text-sm font-semibold transition-all duration-300",
                                        isActive
                                            ? "text-white bg-white/[0.08] border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)]"
                                            : "text-gray-400 hover:text-white bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05]"
                                    )}
                                >
                                    <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-purple-400" : "text-gray-500")} />
                                    <span>{t(cat.labelKey)}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabBadge"
                                            className="absolute inset-0 rounded-2xl border border-purple-400/50 pointer-events-none"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </ScrollReveal>

                {/* ── Dynamic Workflow Cards (Before vs After Synaptics) ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-28"
                    >
                        {filteredWorkflows.map((wf) => {
                            const Icon = wf.icon;
                            return (
                                <div
                                    key={wf.id}
                                    className="group relative rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-[#141414] to-[#0c0c0c] p-6 md:p-9 hover:border-purple-500/40 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl shadow-black/60"
                                >
                                    {/* Top glow on hover */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition-all duration-500" />

                                    <div>
                                        {/* Card Top: Icon, Badge, KPI */}
                                        <div className="flex items-start justify-between gap-4 mb-6">
                                            <div className="flex items-center gap-3.5">
                                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center border bg-gradient-to-br", wf.color)}>
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 block mb-1">
                                                        {lang === "fr" ? wf.badgeFR : wf.badgeEN}
                                                    </span>
                                                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                                                        {t(wf.titleKey)}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Highlight KPI Pill */}
                                            <div className="hidden sm:flex flex-col items-end text-right bg-white/[0.04] border border-white/[0.08] px-3.5 py-1.5 rounded-xl">
                                                <span className="text-lg font-mono font-bold text-emerald-400">{wf.kpi.value}</span>
                                                <span className="text-[9px] uppercase tracking-wider text-gray-500 font-medium">
                                                    {lang === "fr" ? wf.kpi.labelFR : wf.kpi.labelEN}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Mobile KPI (shown on small screens) */}
                                        <div className="sm:hidden mb-6 flex items-center justify-between bg-white/[0.03] border border-white/[0.06] px-4 py-2 rounded-xl">
                                            <span className="text-xs text-gray-400 font-medium">{lang === "fr" ? wf.kpi.labelFR : wf.kpi.labelEN}</span>
                                            <span className="text-base font-mono font-bold text-emerald-400">{wf.kpi.value}</span>
                                        </div>

                                        {/* Comparison Block: Avant (Manuel) vs Après (Synaptics IA) */}
                                        <div className="space-y-3.5 mb-8">
                                            {/* Before */}
                                            <div className="rounded-2xl p-4 bg-red-500/[0.03] border border-red-500/10">
                                                <div className="flex items-center gap-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-red-400/90">
                                                    <XCircle className="w-3.5 h-3.5" />
                                                    <span>{t("ecosystem.label.before")}</span>
                                                </div>
                                                <p className="text-xs md:text-sm text-gray-400 leading-relaxed italic">
                                                    "{t(wf.manualKey)}"
                                                </p>
                                            </div>

                                            {/* After */}
                                            <div className="rounded-2xl p-4 bg-purple-500/[0.06] border border-purple-500/20 relative">
                                                <div className="flex items-center gap-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-purple-300">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                                                    <span>{t("ecosystem.label.after")}</span>
                                                </div>
                                                <p className="text-xs md:text-sm text-gray-200 leading-relaxed">
                                                    {t(wf.solutionKey)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action link */}
                                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                                        <span className="text-xs text-gray-500 font-mono flex items-center gap-1.5">
                                            <Shield className="w-3.5 h-3.5 text-purple-400" />
                                            100% Automatisé & Conforme RGPD
                                        </span>
                                        <Link
                                            to="/pricing"
                                            className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-purple-300 transition-colors"
                                        >
                                            <span>{lang === "fr" ? "Configurer" : "Configure"}</span>
                                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>

                {/* ── Interactive Automation Pipeline Chain ── */}
                <ScrollReveal delay={0.2}>
                    <div className="rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-black p-8 md:p-14 relative overflow-hidden mb-16 shadow-2xl">
                        {/* Glow */}
                        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                {t("ecosystem.chain.title")}
                            </h3>
                            <p className="text-sm md:text-base text-gray-400">
                                {t("ecosystem.chain.subtitle")}
                            </p>
                        </div>

                        {/* Pipeline Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                            {[
                                {
                                    num: "01",
                                    icon: MessageSquare,
                                    title: t("ecosystem.chain.step1"),
                                    desc: t("ecosystem.chain.step1.desc"),
                                    color: "border-blue-500/30 text-blue-400 bg-blue-500/10",
                                },
                                {
                                    num: "02",
                                    icon: Zap,
                                    title: t("ecosystem.chain.step2"),
                                    desc: t("ecosystem.chain.step2.desc"),
                                    color: "border-purple-500/30 text-purple-400 bg-purple-500/10",
                                },
                                {
                                    num: "03",
                                    icon: Receipt,
                                    title: t("ecosystem.chain.step3"),
                                    desc: t("ecosystem.chain.step3.desc"),
                                    color: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
                                },
                                {
                                    num: "04",
                                    icon: CheckCircle2,
                                    title: t("ecosystem.chain.step4"),
                                    desc: t("ecosystem.chain.step4.desc"),
                                    color: "border-amber-500/30 text-amber-400 bg-amber-500/10",
                                },
                            ].map((step, idx) => {
                                const StepIcon = step.icon;
                                return (
                                    <React.Fragment key={idx}>
                                        <div
                                            className="relative p-6 md:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-purple-500/40 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                                        >
                                            {/* Top line glow on hover */}
                                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", step.color)}>
                                                        <StepIcon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-xs font-mono font-bold text-gray-500 group-hover:text-purple-400 transition-colors">{step.num}</span>
                                                </div>
                                                <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                                                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                                            </div>

                                            {/* Desktop Connector Arrow */}
                                            {idx < 3 && (
                                                <div className="hidden md:flex absolute -right-[15px] top-1/2 -translate-y-1/2 z-30 items-center justify-center pointer-events-none">
                                                    <div className="w-7 h-7 rounded-full bg-[#121212] border border-purple-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                                                        <ArrowRight className="w-3.5 h-3.5 text-purple-400 stroke-[2.5]" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Mobile Connector Arrow between stacked cards */}
                                        {idx < 3 && (
                                            <div className="md:hidden flex justify-center -my-3 z-20 pointer-events-none">
                                                <div className="w-7 h-7 rounded-full bg-[#121212] border border-purple-500/40 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.25)] text-purple-400">
                                                    <ArrowRight className="w-3.5 h-3.5 rotate-90 stroke-[2.5]" />
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>

                {/* ── Call to Action Banner ── */}
                <ScrollReveal delay={0.3}>
                    <div className="relative rounded-[2.5rem] border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-[#121212] to-blue-950/40 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-xl pointer-events-none" />
                        
                        <div className="relative z-10 max-w-xl">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                {t("ecosystem.cta.title")}
                            </h3>
                            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                {t("ecosystem.cta.desc")}
                            </p>
                        </div>

                        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                            <Link
                                to="/pricing"
                                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black hover:bg-gray-200 transition-all font-bold text-sm shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group"
                            >
                                <span>{t("ecosystem.cta.button")}</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                to="/contact"
                                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.15] text-white transition-all font-bold text-sm flex items-center justify-center"
                            >
                                {lang === "fr" ? "Demander une démo" : "Book a Demo"}
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
