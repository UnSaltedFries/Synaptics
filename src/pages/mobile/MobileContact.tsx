import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MobileFooter } from "./MobileFooter";

const formSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    email: z.string().trim().email("Invalid email").max(255),
    company: z.string().trim().min(1, "Company required").max(100),
    projectType: z.string().min(1, "Please select"),
    otherDetail: z.string().optional(),
    description: z.string().trim().min(1, "Required").max(2000),
    budget: z.string().min(1, "Please select"),
    timeline: z.string().trim().min(1, "Required").max(200),
    referral: z.string().trim().min(1, "Required").max(200),
});

type FormData = z.infer<typeof formSchema>;

const MobileContact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedProjectType, setSelectedProjectType] = useState<string>("");
    const [useCaseOpen, setUseCaseOpen] = useState(false);
    const [budgetOpen, setBudgetOpen] = useState(false);
    const { t } = useLanguage();

    const projectTypes = [
        t("project.type.medical"),
        t("project.type.realestate"),
        t("project.type.law"),
        t("project.type.restaurant"),
        t("project.type.plumber"),
        t("project.type.tiling"),
        t("project.type.plasterer"),
        t("project.type.electrician"),
        t("project.type.accountant"),
        t("project.type.other"),
    ];

    const budgetOptions = [
        { value: "starter", label: t("contact.budget.starter") },
        { value: "growth", label: t("contact.budget.growth") },
        { value: "enterprise", label: t("contact.budget.enterprise") },
    ];

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "", email: "", company: "", projectType: "",
            description: "", budget: "", timeline: "", referral: "", otherDetail: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const { error } = await supabase.functions.invoke("send-contact-email", { body: data });
            if (error) console.warn("Supabase function error:", error);
            setIsSubmitted(true);
            form.reset();
            setSelectedProjectType("");
        } catch (error) {
            console.error("Error:", error);
            setIsSubmitted(true);
            form.reset();
            setSelectedProjectType("");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass =
        "w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3.5 text-white text-base placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors";

    return (
        <div className="min-h-screen bg-black text-white" style={{ backgroundColor: "#000000" }}>
            <div className="px-5 pt-24 pb-10">
                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-3">{t("contact.success.title")}</h2>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">{t("contact.success.desc")}</p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="px-6 py-3 rounded-full border border-white/[0.12] text-sm font-medium hover:bg-white/5"
                            >
                                {t("contact.success.button")}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h1 className="text-2xl font-bold tracking-tight mb-1.5">
                                {t("contact.title.line1")}
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                    {t("contact.title.line2")}
                                </span>
                            </h1>
                            <p className="text-sm text-gray-400 mb-5 leading-relaxed">{t("contact.desc")}</p>

                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-2">{t("contact.form.name")}</label>
                                    <input {...form.register("name")} placeholder={t("contact.form.name")} className={inputClass} />
                                    {form.formState.errors.name && <p className="text-red-400 text-xs mt-1">{form.formState.errors.name.message}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-2">{t("contact.form.email")}</label>
                                    <input {...form.register("email")} type="email" placeholder={t("contact.form.email")} className={inputClass} />
                                    {form.formState.errors.email && <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>}
                                </div>

                                {/* Company */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-2">{t("contact.form.company")}</label>
                                    <input {...form.register("company")} placeholder={t("contact.form.company")} className={inputClass} />
                                    {form.formState.errors.company && <p className="text-red-400 text-xs mt-1">{form.formState.errors.company.message}</p>}
                                </div>

                                {/* Use Case — Custom inline dropdown */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-2">{t("contact.form.useCase")}</label>
                                    <button
                                        type="button"
                                        onClick={() => { setUseCaseOpen(!useCaseOpen); setBudgetOpen(false); }}
                                        className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3.5 text-left flex items-center justify-between focus:outline-none focus:border-purple-500/50 transition-colors"
                                    >
                                        <span className={cn("text-base", selectedProjectType ? "text-white" : "text-gray-600")}>
                                            {selectedProjectType || t("contact.form.useCase")}
                                        </span>
                                        <svg className={cn("w-5 h-5 text-gray-500 transition-transform", useCaseOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <AnimatePresence>
                                        {useCaseOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-1.5 rounded-xl border border-white/[0.1] bg-[#111] overflow-hidden max-h-[250px] overflow-y-auto">
                                                    {projectTypes.map((type) => (
                                                        <button
                                                            type="button"
                                                            key={type}
                                                            onClick={() => {
                                                                setSelectedProjectType(type);
                                                                form.setValue("projectType", type);
                                                                setUseCaseOpen(false);
                                                            }}
                                                            className={cn(
                                                                "w-full text-left px-4 py-3 text-base flex items-center justify-between border-b border-white/[0.05] last:border-b-0 transition-colors",
                                                                type === selectedProjectType
                                                                    ? "text-white bg-purple-500/10"
                                                                    : "text-gray-400 active:bg-white/[0.05]"
                                                            )}
                                                        >
                                                            {type}
                                                            {type === selectedProjectType && (
                                                                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    {form.formState.errors.projectType && <p className="text-red-400 text-xs mt-1">{form.formState.errors.projectType.message}</p>}

                                    {/* "Other" detail input */}
                                    <AnimatePresence>
                                        {selectedProjectType === t("project.type.other") && (
                                            <motion.div
                                                key="other-detail"
                                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                                animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                className="overflow-hidden"
                                            >
                                                <input
                                                    {...form.register("otherDetail")}
                                                    placeholder={t("contact.form.otherDetail.placeholder")}
                                                    className={inputClass}
                                                />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-2">{t("contact.form.tellMore")}</label>
                                    <textarea {...form.register("description")} placeholder={t("contact.form.tellMore.placeholder")} rows={4} className={cn(inputClass, "resize-none")} />
                                    {form.formState.errors.description && <p className="text-red-400 text-xs mt-1">{form.formState.errors.description.message}</p>}
                                </div>

                                {/* Budget — Custom inline dropdown */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-2">{t("contact.form.budget")}</label>
                                    <button
                                        type="button"
                                        onClick={() => { setBudgetOpen(!budgetOpen); setUseCaseOpen(false); }}
                                        className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3.5 text-left flex items-center justify-between focus:outline-none focus:border-purple-500/50 transition-colors"
                                    >
                                        <span className={cn("text-base", form.watch("budget") ? "text-white" : "text-gray-600")}>
                                            {form.watch("budget") ? budgetOptions.find(o => o.value === form.watch("budget"))?.label : t("contact.form.budget")}
                                        </span>
                                        <svg className={cn("w-5 h-5 text-gray-500 transition-transform", budgetOpen && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <AnimatePresence>
                                        {budgetOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-1.5 rounded-xl border border-white/[0.1] bg-[#111] overflow-hidden">
                                                    {budgetOptions.map((option) => (
                                                        <button
                                                            type="button"
                                                            key={option.value}
                                                            onClick={() => {
                                                                form.setValue("budget", option.value);
                                                                setBudgetOpen(false);
                                                            }}
                                                            className={cn(
                                                                "w-full text-left px-4 py-3 text-base flex items-center justify-between border-b border-white/[0.05] last:border-b-0 transition-colors",
                                                                option.value === form.watch("budget")
                                                                    ? "text-white bg-purple-500/10"
                                                                    : "text-gray-400 active:bg-white/[0.05]"
                                                            )}
                                                        >
                                                            {option.label}
                                                            {option.value === form.watch("budget") && (
                                                                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                    {form.formState.errors.budget && <p className="text-red-400 text-xs mt-1">{form.formState.errors.budget.message}</p>}
                                </div>

                                {/* Timeline */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-2">{t("contact.form.timeline")}</label>
                                    <input {...form.register("timeline")} placeholder={t("contact.form.timelinePlaceholder")} className={inputClass} />
                                    {form.formState.errors.timeline && <p className="text-red-400 text-xs mt-1">{form.formState.errors.timeline.message}</p>}
                                </div>

                                {/* Referral */}
                                <div>
                                    <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-medium mb-2">{t("contact.form.referral")}</label>
                                    <input {...form.register("referral")} placeholder={t("contact.form.referralPlaceholder")} className={inputClass} />
                                    {form.formState.errors.referral && <p className="text-red-400 text-xs mt-1">{form.formState.errors.referral.message}</p>}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-base mt-1 disabled:opacity-50"
                                >
                                    {isSubmitting ? t("contact.form.submitting") : t("contact.form.submit")}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <MobileFooter />
        </div>
    );
};

export default MobileContact;
