import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChromeWord } from "@/components/visuals/ChromeWord";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Section {
    title: string;
    text: string;
    list?: string[];
}

interface LegalWrapperProps {
    title: string;
    lastUpdate: string;
    sections: Section[];
    contact: string;
}

export const LegalWrapper = ({ title, lastUpdate, sections, contact }: LegalWrapperProps) => {
    const { t } = useLanguage();

    return (
        <div className="bg-black min-h-screen pt-24 pb-16 md:pt-40 md:pb-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container max-w-4xl px-5 md:px-0 relative z-10"
            >
                <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-medium">{t("nav.home") || "Back Home"}</span>
                </Link>

                <header className="mb-20">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                        <ChromeWord text={title} />
                    </h1>
                    <p className="text-gray-500 text-sm tracking-widest uppercase font-medium">
                        {lastUpdate}
                    </p>
                </header>

                <div className="space-y-16">
                    {sections.map((section, idx) => (
                        <div key={idx} className="group">
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-baseline gap-4">
                                <span className="text-blue-500/40 text-sm font-mono">0{idx + 1}</span>
                                {section.title}
                            </h2>
                            <div className="text-gray-400 leading-relaxed space-y-6 pl-8 border-l border-white/5 group-hover:border-white/10 transition-colors">
                                <p>{section.text}</p>
                                {section.list && (
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        {section.list.map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm">
                                                <span className="text-blue-500 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="mt-24 pt-12 border-t border-white/5 space-y-8">
                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 md:p-10">
                        <p className="text-white font-medium mb-6">{contact}</p>
                        <div className="text-sm text-gray-500 space-y-1">
                            <p className="text-white">Synaptics AI Lab</p>
                            <p>Paris, France</p>
                            <p className="pt-4 font-mono text-blue-400">hello@synaptics.fr</p>
                        </div>
                    </div>
                </footer>
            </motion.div>
        </div>
    );
};
