import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectVisuals } from "@/components/blog/ProjectVisuals";

const Blog = () => {
    const { lang } = useLanguage();
    const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);

    const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

    // Language fallback
    const selectedTitle = (lang === "fr" && selectedProject.title_fr) ? selectedProject.title_fr : selectedProject.title;
    const selectedFullDescription = (lang === "fr" && selectedProject.fullDescription_fr) ? selectedProject.fullDescription_fr : selectedProject.fullDescription;
    const selectedReview = (lang === "fr" && selectedProject.review_fr) ? selectedProject.review_fr : selectedProject.review;

    return (
        <Layout variant="dark">
            <div className="bg-black h-screen overflow-hidden text-white pt-24 pb-8" data-lenis-prevent>
                <div className="container h-full px-6 max-w-[1400px] mx-auto">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full items-start">
                        
                        {/* 2: COLONNE SCROLLABLE (Project List) */}
                        <div className="lg:col-span-4 h-[calc(100vh-160px)] overflow-y-auto pr-8 space-y-6 pb-40 scrollbar-hide overscroll-contain" data-lenis-prevent>
                            {projects.map((project, index) => {
                                const title = (lang === "fr" && project.title_fr) ? project.title_fr : project.title;
                                const tags = (lang === "fr" && project.tags_fr) ? project.tags_fr : project.tags;
                                
                                return (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setSelectedProjectId(project.id)}
                                        className={cn(
                                            "cursor-pointer p-8 rounded-[2.5rem] border transition-all duration-500 relative overflow-hidden group",
                                            selectedProjectId === project.id
                                                ? "bg-white/[0.05] border-white/20 shadow-2xl scale-[1.02]"
                                                : "bg-transparent border-transparent hover:bg-white/[0.02] opacity-50 hover:opacity-100"
                                        )}
                                    >
                                        {/* Accent line for selected project */}
                                        {selectedProjectId === project.id && (
                                            <motion.div 
                                                layoutId="accent-line"
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]" 
                                            />
                                        )}

                                        <div className="space-y-4">
                                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500 group-hover:text-purple-400 transition-colors">
                                                {tags[0]}
                                            </span>
                                            <h3 className="text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                                                {title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* 1: CADRE FIXE (Details) */}
                        <div className="lg:col-span-8 h-[calc(100vh-160px)] bg-zinc-900/40 rounded-[3rem] border border-white/10 overflow-hidden relative shadow-2xl backdrop-blur-sm">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedProjectId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="h-full"
                                >
                                    <div className="grid grid-cols-1 xl:grid-cols-5 h-full">
                                        
                                        {/* 3: BOXE SCROLLABLE (Visuals column) */}
                                        <div className="xl:col-span-3 h-[calc(100vh-160px)] overflow-y-auto p-10 pr-6 scrollbar-hide overscroll-contain" data-lenis-prevent>
                                            <ProjectVisuals project={selectedProject} />
                                        </div>

                                        {/* 4: TEXTE FIXE (Info column) */}
                                        <div className="xl:col-span-2 h-full flex flex-col p-10 border-l border-white/5">
                                            <div className="flex-1 space-y-8">
                                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                                                    {selectedTitle}
                                                </h2>
                                                <p className="text-gray-400 text-lg leading-relaxed font-light">
                                                    {selectedFullDescription}
                                                </p>
                                            </div>

                                            {/* Review Section */}
                                            {selectedReview && (
                                                <div className="space-y-4 pt-8 border-t border-white/5">
                                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                                                        REVIEW
                                                    </h4>
                                                    <p className="text-purple-400 text-xl font-medium leading-relaxed italic">
                                                        {selectedReview}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Blog;
