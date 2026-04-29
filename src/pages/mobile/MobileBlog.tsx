import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import BlurText from "@/components/BlurText";
import ScrollReveal from "@/components/ScrollReveal";
import ChromeWord from "@/components/ChromeWord";

const MobileBlog = () => {
    const { t, lang } = useLanguage();
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

    const selectedProject = selectedProjectId
        ? projects.find(p => p.id === selectedProjectId) || null
        : null;

    useEffect(() => {
        if (selectedProjectId) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            (window as any).lenis?.stop();
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            (window as any).lenis?.start();
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            (window as any).lenis?.start();
        };
    }, [selectedProjectId]);

    return (
        <Layout>
            <div className="min-h-screen bg-black text-white" style={{ backgroundColor: "#000000" }}>
                <div className="px-5 pt-24 pb-10">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">
                        <ChromeWord>Dev Blog</ChromeWord>
                    </h1>
                    <ScrollReveal delay={0.2}>
                        <p className="text-sm text-gray-400 mb-5">
                            {lang === "fr"
                                ? "Découvrez comment nous transformons les entreprises avec nos agents IA."
                                : "Discover how we transform businesses with our AI agents."}
                        </p>
                    </ScrollReveal>

                    {/* Project List */}
                    <div className="flex flex-col gap-2">
                        {projects.map((project) => {
                            const title = (lang === "fr" && project.title_fr) ? project.title_fr : project.title;
                            const tags = (lang === "fr" && project.tags_fr) ? project.tags_fr : project.tags;

                            return (
                                <button
                                    key={project.id}
                                    onClick={() => setSelectedProjectId(project.id)}
                                    className="text-left p-4 rounded-xl bg-white/5 border border-white/10"
                                >
                                    <span className="text-[8px] uppercase tracking-widest font-mono text-gray-500">{tags[0]}</span>
                                    <h3 className="text-base font-medium text-white mt-0.5">{title}</h3>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Detail Overlay */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-50 bg-black overflow-y-auto"
                            style={{ backgroundColor: "#000000" }}
                            data-lenis-prevent="true"
                        >
                            {/* Back Button — below navbar */}
                            <button
                                onClick={() => setSelectedProjectId(null)}
                                className="fixed top-20 left-5 z-[60] p-2.5 bg-black/60 backdrop-blur-md rounded-full text-white border border-white/10"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>

                            {/* Hero Image — with top padding for navbar */}
                            <div className="aspect-video overflow-hidden relative mt-16 bg-zinc-900">
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                                <img
                                    src={selectedProject.heroImage}
                                    alt={(lang === "fr" && selectedProject.title_fr) ? selectedProject.title_fr : selectedProject.title}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>

                            {/* Content */}
                            <div className="px-6 py-8 -mt-8 relative z-20">
                                {/* Tags */}
                                <div className="flex gap-2 mb-4 flex-wrap">
                                    {((lang === "fr" && selectedProject.tags_fr) ? selectedProject.tags_fr : selectedProject.tags).map(tag => (
                                        <span key={tag} className="text-[10px] font-mono py-1 px-3 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                            {tag}
                                        </span>
                                    ))}
                                    <span className="text-[10px] font-mono py-1 px-3 text-gray-500">{selectedProject.year}</span>
                                </div>

                                <h2 className="text-2xl font-bold mb-4 tracking-tight leading-normal">
                                    <ChromeWord>
                                        {(lang === "fr" && selectedProject.title_fr) ? selectedProject.title_fr : selectedProject.title}
                                    </ChromeWord>
                                </h2>

                                <div className="space-y-4 mb-8">
                                    <p className="text-[15px] text-white/90 leading-relaxed font-light">
                                        {(lang === "fr" && selectedProject.fullDescription_fr) 
                                            ? selectedProject.fullDescription_fr 
                                            : selectedProject.fullDescription}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{t("projectDetail.role")}</p>
                                    <p className="text-sm font-medium">
                                        {(lang === "fr" && selectedProject.role_fr) ? selectedProject.role_fr : selectedProject.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Layout>
    );
};

export default MobileBlog;
