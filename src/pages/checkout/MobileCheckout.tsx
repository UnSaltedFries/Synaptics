import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
    ChevronLeft, 
    ShieldCheck, 
    Building2, 
    User, 
    CheckCircle2,
    ArrowRight,
    Clock,
    Zap,
    ChevronDown,
    ShoppingBag
} from "lucide-react";

const allServices = [
    { id: "s1", titleKey: "config.s1.title", price: 99 },
    { id: "s2", titleKey: "config.s2.title", price: 69 },
    { id: "s3", titleKey: "config.s3.title", price: 169 },
    { id: "s4", titleKey: "config.s4.title", price: 119 },
    { id: "s5", titleKey: "config.s5.title", price: 99 },
    { id: "s6", titleKey: "config.s6.title", price: 79 },
    { id: "s7", titleKey: "config.s7.title", price: 119 },
    { id: "s8", titleKey: "config.s8.title", price: 59 },
];

const MobileCheckout = () => {
    const { t, lang } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const selectedIds = (location.state as any)?.selectedServices || [];
    const baseTotal = (location.state as any)?.total || 0;
    
    // Currency conversion logic
    const isUSD = lang === 'en';
    const conversionRate = isUSD ? 1.1 : 1;
    const total = Math.round(baseTotal * conversionRate);
    const currencySymbol = isUSD ? '$' : '€';

    const selectedServices = allServices.filter(s => selectedIds.includes(s.id));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <Layout variant="dark">
                <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 text-center">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/50"
                    >
                        <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-bold mb-4">{lang === 'fr' ? 'Merci !' : 'Thank you!'}</h1>
                    <p className="text-gray-400 mb-10 leading-relaxed">
                        {lang === 'fr' 
                            ? "Votre demande a été enregistrée. Un expert Synaptics vous contactera par email sous 24h."
                            : "Your request has been registered. A Synaptics expert will contact you via email within 24h."}
                    </p>
                    <Link 
                        to="/"
                        className="w-full py-4 rounded-xl bg-white text-black font-bold active:scale-95 transition-all"
                    >
                        {lang === 'fr' ? "Retour à l'accueil" : 'Back to home'}
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout variant="dark" hideFooter={true}>
            <div className="min-h-screen bg-black text-white pb-64">
                {/* Header */}
                <div className="pt-24 px-6 pb-8 border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-30">
                    <div className="flex items-center justify-between mb-4">
                        <Link to="/pricing" className="text-gray-500 active:text-white">
                            <ChevronLeft className="w-6 h-6" />
                        </Link>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            {lang === 'fr' ? 'Sécurisé' : 'Secure'}
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        {lang === 'fr' ? 'Finaliser la commande' : 'Complete Order'}
                    </h1>
                </div>

                {/* Summary Toggle */}
                <button 
                    onClick={() => setShowSummary(!showSummary)}
                    className="w-full px-6 py-4 bg-white/[0.03] border-b border-white/5 flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium">{lang === 'fr' ? 'Voir le résumé' : 'View summary'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-purple-400">
                            {isUSD ? `${currencySymbol}${total}` : `${total} ${currencySymbol}`}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${showSummary ? 'rotate-180' : ''}`} />
                    </div>
                </button>

                <AnimatePresence>
                    {showSummary && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white/[0.01] border-b border-white/5"
                        >
                            <div className="px-6 py-6 space-y-4">
                                {selectedServices.map(srv => (
                                    <div key={srv.id} className="flex justify-between text-sm">
                                        <span className="text-gray-400">{t(srv.titleKey)}</span>
                                        <span className="text-white/40">
                                            {isUSD ? `${currencySymbol}${Math.round(srv.price * conversionRate)}` : `${Math.round(srv.price * conversionRate)} ${currencySymbol}`}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form */}
                <form id="mobile-checkout-form" onSubmit={handleSubmit} className="p-6 space-y-10">
                    {/* Company */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-purple-400">
                            <Building2 className="w-4 h-4" />
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">{lang === 'fr' ? 'Entreprise' : 'Company'}</h3>
                        </div>
                        <div className="space-y-4">
                            <input required type="text" placeholder={lang === 'fr' ? "Nom de l'entreprise" : "Company Name"} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500/50 text-base" />
                            <input type="text" placeholder={lang === 'fr' ? "Numéro de TVA (Optionnel)" : "VAT Number (Optional)"} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500/50 text-base" />
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-purple-400">
                            <User className="w-4 h-4" />
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">{lang === 'fr' ? 'Contact' : 'Contact'}</h3>
                        </div>
                        <div className="space-y-4">
                            <input required type="text" placeholder={lang === 'fr' ? "Nom complet" : "Full Name"} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500/50 text-base" />
                            <input required type="email" placeholder={lang === 'fr' ? "Email professionnel" : "Work Email"} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500/50 text-base" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex gap-4">
                        <Clock className="w-5 h-5 text-purple-400 shrink-0" />
                        <p className="text-xs text-gray-500 leading-relaxed">
                            {lang === 'fr' 
                                ? 'Votre lien vers le moyen de paiement vous sera envoyé après validation de votre KYC.' 
                                : 'Your payment link will be sent after KYC validation.'}
                        </p>
                    </div>
                </form>

                {/* Sticky Bottom Bar */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/80 backdrop-blur-xl border-t border-white/5 z-40">
                    <div className="max-w-md mx-auto space-y-4">
                        <div className="flex justify-between items-end mb-2">
                            <div className="space-y-0.5">
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{lang === 'fr' ? 'Total mensuel' : 'Monthly total'}</span>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-3 h-3 text-purple-400" />
                                    <span className="text-[10px] text-purple-400 font-bold uppercase">{lang === 'fr' ? 'Sans engagement' : 'No commitment'}</span>
                                </div>
                            </div>
                            <div className="text-4xl font-bold tracking-tighter">
                                {isUSD ? `${currencySymbol}${total}` : `${total} ${currencySymbol}`}
                            </div>
                        </div>
                        <button
                            form="mobile-checkout-form"
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 rounded-xl bg-white text-black font-bold text-lg active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
                            ) : (
                                <>
                                    {lang === 'fr' ? 'Confirmer' : 'Confirm'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default MobileCheckout;
