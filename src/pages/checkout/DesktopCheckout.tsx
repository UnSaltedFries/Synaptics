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
    Mail, 
    CreditCard, 
    CheckCircle2,
    ArrowRight,
    Tag,
    Clock,
    Zap
} from "lucide-react";
import BlurText from "@/components/visuals/BlurText";
import ScrollReveal from "@/components/visuals/ScrollReveal";
import { cn } from "@/lib/utils";
import ChromeWord from "@/components/visuals/ChromeWord";
import { Globe } from "@/components/visuals/Globe";

// ... (existing services data)
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

const Checkout = () => {
    const { t, lang } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get data from router state (passed from PricingConfigurator)
    const selectedIds = (location.state as any)?.selectedServices || [];
    const baseTotal = (location.state as any)?.total || 0;
    
    // Currency conversion logic
    const isUSD = lang === 'en';
    const conversionRate = isUSD ? 1.1 : 1;
    const total = Math.round(baseTotal * conversionRate);
    const currencySymbol = isUSD ? '$' : '€';

    // Fallback if accessed directly without state
    useEffect(() => {
        if (selectedIds.length === 0 && !isSubmitted) {
            // Option: Redirect to pricing if no selection
            // navigate("/pricing");
        }
    }, [selectedIds, isSubmitted, navigate]);

    const selectedServices = allServices.filter(s => selectedIds.includes(s.id));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    };

    if (isSubmitted) {
        return (
            <Layout variant="dark">
                <div className="min-h-screen bg-black text-white flex items-center justify-center px-5 py-20">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-md w-full text-center space-y-8"
                    >
                        <div className="relative mx-auto w-24 h-24">
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                className="absolute inset-0 bg-purple-500 rounded-full blur-2xl opacity-20"
                            />
                            <div className="relative bg-gradient-to-br from-purple-500 to-blue-600 rounded-full w-full h-full flex items-center justify-center shadow-2xl shadow-purple-500/40">
                                <CheckCircle2 className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                {lang === 'fr' ? 'Demande enregistrée !' : 'Order Registered!'}
                            </h1>
                            <p className="text-gray-400 leading-relaxed">
                                {lang === 'fr' 
                                    ? "Votre configuration a été transmise à notre équipe. Un expert Synaptics vous contactera sous 24h avec votre lien de paiement sécurisé et votre accès prioritaire."
                                    : "Your configuration has been transmitted to our team. A Synaptics expert will contact you within 24h with your secure payment link and priority access."}
                            </p>
                        </div>

                        <div className="pt-8">
                            <Link 
                                to="/"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all active:scale-95"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                {lang === 'fr' ? 'Retour à l\'accueil' : 'Back to Home'}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout variant="dark" hideFooter={true}>
            <div className="h-screen bg-black text-white overflow-hidden flex flex-col md:flex-row relative">
                
                {/* Background Aesthetics */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[10%] w-[30%] h-[30%] bg-blue-600/5 blur-[120px] rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                {/* LEFT SIDE: Form & Header (60%) */}
                <div className="flex-1 md:flex-[0.6] p-8 md:p-12 lg:p-24 flex flex-col h-full overflow-y-auto chat-scrollbar relative z-10" data-lenis-prevent="true">
                    <div className="max-w-xl mx-auto w-full space-y-16">
                        {/* Header */}
                        <div className="space-y-6">
                            <Link 
                                to="/pricing" 
                                className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-all text-xs font-medium group"
                            >
                                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                                {lang === 'fr' ? 'Retour aux tarifs' : 'Back to pricing'}
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-normal text-white">
                                {lang === 'fr' ? (
                                    <>
                                        Finaliser la <br />
                                        <ChromeWord>commande</ChromeWord>
                                    </>
                                ) : (
                                    <>
                                        Complete your <br />
                                        <ChromeWord>Order</ChromeWord>
                                    </>
                                )}
                            </h1>
                            <p className="text-gray-400 text-base max-w-md font-light leading-relaxed">
                                {lang === 'fr' 
                                    ? 'Saisissez vos informations pour activer votre accès prioritaire aux agents Synaptics.' 
                                    : 'Enter your details to activate your priority access to Synaptics agents.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} id="checkout-form" className="space-y-12">
                            {/* Section 1: Company */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 shadow-xl shadow-purple-500/5">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">{lang === 'fr' ? 'Informations Entreprise' : 'Company Details'}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">{lang === 'fr' ? "Nom de l'entreprise" : "Company Name"}</label>
                                        <input required type="text" placeholder="Synaptics Inc." className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-purple-500/5 transition-all text-sm placeholder:text-gray-700" />
                                    </div>
                                    <div className="group space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">{lang === 'fr' ? "Numéro de TVA" : "VAT Number"}</label>
                                        <input type="text" placeholder="FR 00 000 000 000" className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-purple-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-purple-500/5 transition-all text-sm placeholder:text-gray-700" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Contact */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/5">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">{lang === 'fr' ? 'Contact Référent' : 'Primary Contact'}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">{lang === 'fr' ? "Nom complet" : "Full Name"}</label>
                                        <input required type="text" placeholder="John Doe" className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-blue-500/5 transition-all text-sm placeholder:text-gray-700" />
                                    </div>
                                    <div className="group space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-1">{lang === 'fr' ? "Email professionnel" : "Work Email"}</label>
                                        <input required type="email" placeholder="john@company.com" className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-blue-500/5 transition-all text-sm placeholder:text-gray-700" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Billing Info */}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 space-y-5 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                                        <Clock className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-base text-white">{lang === 'fr' ? 'Facturation Pré-lancement' : 'Pre-launch Billing'}</h4>
                                        <p className="text-xs text-purple-400/70 font-medium tracking-wide">{lang === 'fr' ? 'Réseau de paiement Beta' : 'Payment Beta Network'}</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed relative z-10">
                                    {lang === 'fr' 
                                        ? 'Synaptics est en phase finale de déploiement. Pour garantir la sécurité, votre lien vers le moyen de paiement vous sera envoyé personnellement après validation de votre KYC.' 
                                        : 'Synaptics is in its final deployment phase. To ensure maximum security, your personal payment link will be sent after KYC validation.'}
                                </p>
                            </motion.div>
                        </form>
                    </div>
                </div>

                {/* RIGHT SIDE: Summary (40%) */}
                <div className="flex-1 md:flex-[0.4] bg-[#020202] border-l border-white/5 p-8 md:p-12 lg:p-24 flex flex-col h-full relative">
                    {/* Decorative glow */}
                    <div className="absolute top-[20%] left-[-10%] w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 opacity-20 pointer-events-none">
                        <Globe size={400} />
                    </div>
                    
                    <div className="max-w-md mx-auto w-full flex flex-col h-full relative z-10">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500">{lang === 'fr' ? 'Résumé' : 'Summary'}</h3>
                            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] uppercase tracking-widest font-bold text-gray-400">
                                {selectedServices.length} {lang === 'fr' ? 'SERVICES' : 'SERVICES'}
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto chat-scrollbar pr-4 space-y-6 mb-12" data-lenis-prevent="true">
                            {selectedServices.map((srv, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={srv.id} 
                                    className="flex justify-between items-start group"
                                >
                                    <div className="space-y-1">
                                        <span className="text-gray-300 text-base font-medium group-hover:text-white transition-colors block">{t(srv.titleKey)}</span>
                                        <span className="text-[10px] text-gray-600 uppercase tracking-widest block">Agent Synaptics v4.0</span>
                                    </div>
                                    <span className="font-mono text-purple-400 text-base">
                                        {isUSD ? `${currencySymbol}${Math.round(srv.price * conversionRate)}` : `${Math.round(srv.price * conversionRate)} ${currencySymbol}`}
                                    </span>
                                </motion.div>
                            ))}
                        </div>

                        <div className="space-y-10 mt-auto pt-12 border-t border-white/10">
                            <div className="flex justify-between items-end">
                                <div className="space-y-2">
                                    <span className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">{lang === 'fr' ? 'Total mensuel' : 'Monthly total'}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <p className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-widest">
                                            {lang === 'fr' ? 'Sans engagement • HT' : 'No commitment • Excl. VAT'}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-6xl md:text-7xl font-bold text-white tracking-tighter leading-none flex items-baseline">
                                    {isUSD && <span className="text-2xl mr-2 text-white/30">{currencySymbol}</span>}
                                    {total}
                                    {!isUSD && <span className="text-2xl ml-2 text-white/30">{currencySymbol}</span>}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <button
                                    form="checkout-form"
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="relative overflow-hidden w-full py-7 rounded-2xl bg-white text-black font-black text-xl group active:scale-[0.98] transition-all disabled:opacity-50 shadow-2xl shadow-white/5"
                                >
                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                    
                                    <span className="relative z-10 flex items-center justify-center gap-4">
                                        {isSubmitting ? (
                                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full" />
                                        ) : (
                                            <>
                                                {lang === 'fr' ? 'Confirmer la commande' : 'Confirm Order'}
                                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                </button>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/[0.02] border border-white/5">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        <span className="text-[9px] uppercase tracking-widest font-black text-gray-500">{lang === 'fr' ? 'Paiement Sécurisé' : 'Secure Payment'}</span>
                                    </div>
                                    <div className="flex items-center justify-center gap-3 py-3 rounded-xl bg-white/[0.02] border border-white/5">
                                        <Zap className="w-4 h-4 text-blue-500" />
                                        <span className="text-[9px] uppercase tracking-widest font-black text-gray-500">{lang === 'fr' ? 'Accès Prioritaire' : 'Priority Access'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Checkout;
