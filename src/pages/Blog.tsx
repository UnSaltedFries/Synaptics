import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects } from "@/data/projects";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Blog = () => {
    const { t, lang } = useLanguage();
    const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0].id);

    // Find the currently selected project
    const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

    // Language fallback for selected project
    const selectedTitle = (lang === "fr" && selectedProject.title_fr) ? selectedProject.title_fr : selectedProject.title;
    const selectedSubtitle = (lang === "fr" && selectedProject.subtitle_fr) ? selectedProject.subtitle_fr : selectedProject.subtitle;
    const selectedFullDescription = (lang === "fr" && selectedProject.fullDescription_fr) ? selectedProject.fullDescription_fr : selectedProject.fullDescription;
    const selectedRole = (lang === "fr" && selectedProject.role_fr) ? selectedProject.role_fr : selectedProject.role;
    const selectedTags = (lang === "fr" && selectedProject.tags_fr) ? selectedProject.tags_fr : selectedProject.tags;


    return (
        <Layout variant="dark">
            <div className="bg-black min-h-screen text-white">
                <div className="container px-6 md:px-12 max-w-[1400px] mx-auto pt-24 md:pt-32 pb-20">

                    <div className="mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                            {lang === "fr" ? "Études de cas" : "Case Studies"}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl font-light">
                            {lang === "fr"
                                ? "Découvrez comment nous transformons les entreprises avec nos agents IA."
                                : "Discover how we transform businesses with our AI agents."
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        {/* Left Column: List of Projects */}
                        <div className="lg:col-span-4 flex flex-col gap-2">
                            {projects.map((project) => {
                                const title = (lang === "fr" && project.title_fr) ? project.title_fr : project.title;
                                const tags = (lang === "fr" && project.tags_fr) ? project.tags_fr : project.tags;
                                const isSelected = selectedProjectId === project.id;

                                return (
                                    <button
                                        key={project.id}
                                        onClick={() => setSelectedProjectId(project.id)}
                                        className={`text-left p-6 rounded-xl transition-all duration-300 border group ${isSelected
                                                ? "bg-white/10 border-white/20 shadow-lg"
                                                : "bg-transparent border-transparent hover:bg-white/5"
                                            }`}
                                    >
                                        <div className="flex flex-col gap-2">
                                            <span className={`text-[10px] uppercase tracking-widest font-mono ${isSelected ? "text-purple-400" : "text-gray-500 group-hover:text-gray-400"}`}>
                                                {tags[0]}
                                            </span>
                                            <h3 className={`text-xl font-medium ${isSelected ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                                                {title}
                                            </h3>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Column: Sticky Detail View */}
                        <div className="lg:col-span-8 relative">
                            <div className="sticky top-32">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedProjectId}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm"
                                    >
                                        {/* Tag & Year Banner */}
                                        <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                {selectedTags.map(tag => (
                                                    <span key={tag} className="text-xs font-mono py-1 px-3 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-500 font-mono">{selectedProject.year}</span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2">
                                            {/* Text Content */}
                                            <div className="p-8 md:p-10 flex flex-col justify-center order-2 md:order-1">
                                                <h2 className="text-3xl font-bold mb-4">{selectedTitle}</h2>
                                                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                                    {selectedFullDescription}
                                                </p>

                                                <div className="pt-6 border-t border-white/5">
                                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{t("projectDetail.role")}</p>
                                                    <p className="text-sm font-medium">{selectedRole}</p>
                                                </div>
                                            </div>

                                            {/* Image */}
                                            <div className="h-64 md:h-auto overflow-hidden order-1 md:order-2 bg-white/5 relative">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                                                <img
                                                    src={selectedProject.heroImage}
                                                    alt={selectedTitle}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Blog;
