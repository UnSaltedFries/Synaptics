import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check, Info, Minus, Plus, ShoppingCart, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Service {
    id: string;
    titleKey: string;
    price: number;
    categoryKey: string;
    manualKey: string;
    argumentKey: string;
}

const services: Service[] = [
    { id: "s1", titleKey: "config.s1.title", price: 99, categoryKey: "config.category.client", manualKey: "config.s1.manual", argumentKey: "config.s1.argument" },
    { id: "s2", titleKey: "config.s2.title", price: 69, categoryKey: "config.category.client", manualKey: "config.s2.manual", argumentKey: "config.s2.argument" },
    { id: "s3", titleKey: "config.s3.title", price: 169, categoryKey: "config.category.admin", manualKey: "config.s3.manual", argumentKey: "config.s3.argument" },
    { id: "s4", titleKey: "config.s4.title", price: 119, categoryKey: "config.category.admin", manualKey: "config.s4.manual", argumentKey: "config.s4.argument" },
    { id: "s5", titleKey: "config.s5.title", price: 99, categoryKey: "config.category.admin", manualKey: "config.s5.manual", argumentKey: "config.s5.argument" },
    { id: "s6", titleKey: "config.s6.title", price: 79, categoryKey: "config.category.sales", manualKey: "config.s6.manual", argumentKey: "config.s6.argument" },
    { id: "s7", titleKey: "config.s7.title", price: 119, categoryKey: "config.category.rh", manualKey: "config.s7.manual", argumentKey: "config.s7.argument" },
    { id: "s8", titleKey: "config.s8.title", price: 59, categoryKey: "config.category.rh", manualKey: "config.s8.manual", argumentKey: "config.s8.argument" },
];

const categories = [
    "config.category.client",
    "config.category.admin",
    "config.category.sales",
    "config.category.rh",
];

export function PricingConfigurator() {
    const { t } = useLanguage();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleService = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const { totalBase, discount, finalTotal, packName } = useMemo(() => {
        const base = services
            .filter(s => selectedIds.includes(s.id))
            .reduce((sum, s) => sum + s.price, 0);
        
        let d = 0;
        let name = "config.pack.standard";
        
        const count = selectedIds.length;
        if (count >= 8) {
            d = 0.20;
            name = "config.pack.full";
        } else if (count >= 5) {
            d = 0.15;
            name = "config.pack.growth";
        } else if (count >= 3) {
            d = 0.10;
            name = "config.pack.starter";
        }
        
        return {
            totalBase: base,
            discount: d,
            finalTotal: Math.round(base * (1 - d)),
            packName: name
        };
    }, [selectedIds]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            {/* Services List */}
            <div className="lg:col-span-7 space-y-10">
                {categories.map(catKey => {
                    const catServices = services.filter(s => s.categoryKey === catKey);
                    return (
                        <div key={catKey} className="space-y-4">
                            <h3 className="text-xs font-bold tracking-[0.2em] text-purple-400/80 uppercase px-1">
                                {t(catKey)}
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {catServices.map(service => (
                                    <ServiceCard 
                                        key={service.id}
                                        service={service}
                                        isSelected={selectedIds.includes(service.id)}
                                        onToggle={() => toggleService(service.id)}
                                        t={t}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary Sticky Panel */}
            <div className="lg:col-span-5 relative">
                <div className="lg:sticky lg:top-32 transition-all duration-300">
                    <motion.div 
                        layout
                        className="relative p-6 md:p-8 rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden shadow-2xl shadow-purple-500/5 hover:shadow-purple-500/10 transition-shadow"
                    >
                    {/* Background Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[100px] rounded-full" />
                    
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Tag className="w-6 h-6 text-purple-400" />
                        {t("config.total")}
                    </h2>

                    <div className="space-y-6 relative z-10">
                        {/* Price Display */}
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <AnimatePresence mode="wait">
                                    <motion.span 
                                        key={finalTotal}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-5xl md:text-6xl font-bold text-white tracking-tighter"
                                    >
                                        €{finalTotal}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="text-gray-500 font-medium">{t("config.perMonth")}</span>
                            </div>
                            
                            {discount > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 mt-2"
                                >
                                    <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20 py-1">
                                        -{discount * 100}% {t("config.discount")}
                                    </Badge>
                                    <span className="text-sm text-gray-500 line-through">€{totalBase}</span>
                                </motion.div>
                            )}
                        </div>

                        {/* Selected Pack Badge */}
                        <div className="py-4 border-y border-white/[0.06]">
                            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">{t("config.currentTier")}</p>
                            <div className="text-lg font-bold text-white">
                                {t(packName)}
                            </div>
                        </div>

                        {/* Selected Items List */}
                        <div className="space-y-2 max-h-[200px] overflow-y-auto no-scrollbar pr-2">
                            {selectedIds.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">{t("config.emptyState")}</p>
                            ) : (
                                selectedIds.map(id => {
                                    const s = services.find(srv => srv.id === id);
                                    return (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            key={id} 
                                            className="flex justify-between items-center text-sm text-gray-400 bg-white/[0.03] p-2 rounded-lg border border-white/[0.05]"
                                        >
                                            <span className="line-clamp-1">{t(s?.titleKey || "")}</span>
                                            <span className="font-mono text-xs text-white/50 whitespace-nowrap ml-4">€{s?.price}</span>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>

                        <Button 
                            className="w-full py-6 rounded-2xl bg-white text-black hover:bg-gray-200 transition-all font-bold text-base shadow-[0_10px_30px_rgba(255,255,255,0.1)] group"
                            disabled={selectedIds.length === 0}
                        >
                            <ShoppingCart className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            {t("config.cta")}
                        </Button>
                    </div>
                </motion.div>
                </div>
            </div>
        </div>
    );
}

interface ServiceCardProps {
    service: Service;
    isSelected: boolean;
    onToggle: () => void;
    t: (key: string) => string;
}

function ServiceCard({ service, isSelected, onToggle, t }: ServiceCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onToggle}
            className={cn(
                "group relative p-4 md:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4",
                isSelected 
                    ? "bg-purple-500/[0.08] border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.1)]" 
                    : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
            )}
        >
            <div className="flex items-center gap-4 flex-1">
                {/* Custom Checkbox */}
                <div className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0",
                    isSelected 
                        ? "bg-purple-500 border-purple-500 text-white" 
                        : "border-white/10 group-hover:border-white/30"
                )}>
                    {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                            {t(service.titleKey)}
                        </h4>
                        <Dialog>
                            <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <button className="p-1 rounded-full text-gray-600 hover:text-white hover:bg-white/10 transition-all">
                                    <Info className="w-3.5 h-3.5" />
                                </button>
                            </DialogTrigger>
                            <DialogContent className="bg-[#0B0B0B] border-white/[0.08] text-white rounded-3xl max-w-lg">
                                <DialogHeader>
                                    <div className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4">
                                        {t(service.categoryKey)}
                                    </div>
                                    <DialogTitle className="text-2xl font-bold mb-4">{t(service.titleKey)}</DialogTitle>
                                    <DialogDescription className="text-gray-400 space-y-6">
                                        <div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-2">Current manual task</span>
                                            <p className="text-white bg-white/[0.03] p-4 rounded-2xl italic border border-white/[0.05]">"{t(service.manualKey)}"</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-2">The Synaptics approach</span>
                                            <p className="text-gray-300 relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-purple-500 before:rounded-full">
                                                {t(service.argumentKey)}
                                            </p>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="mt-8 flex justify-between items-center py-4 border-t border-white/[0.08]">
                                    <div className="text-2xl font-bold">€{service.price}<span className="text-sm text-gray-600">/mo</span></div>
                                    <Button onClick={onToggle} className={cn(
                                        "rounded-xl",
                                        isSelected ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20" : "bg-white text-black hover:bg-gray-200"
                                    )}>
                                        {isSelected ? <><Minus className="w-4 h-4 mr-2" /> Remove</> : <><Plus className="w-4 h-4 mr-2" /> Add to Pack</>}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <p className="text-[10px] text-gray-600 line-clamp-1 max-w-[200px] uppercase tracking-wider">
                        €{service.price} / month
                    </p>
                </div>
            </div>

            <div className="text-sm font-mono text-gray-500 group-hover:text-white transition-colors">
                +€{service.price}
            </div>
        </motion.div>
    );
}
