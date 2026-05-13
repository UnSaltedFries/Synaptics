import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { projects, Project } from "@/data/projects";
import { blogPosts, BlogPost } from "@/data/blogPosts";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectVisuals } from "@/components/blog/ProjectVisuals";
import ChromeWord from "@/components/visuals/ChromeWord";

type DevItem = {
    type: 'project' | 'article';
    data: Project | BlogPost;
    id: string;
    date?: string;
};

const Blog = () => {
    const { lang } = useLanguage();

    const items = useMemo(() => {
        const p: DevItem[] = projects.map(proj => ({ type: 'project', data: proj, id: proj.id }));
        const a: DevItem[] = blogPosts.map(post => ({ type: 'article', data: post, id: post.id, date: post.date }));
        return [...p, ...a];
    }, []);

    const [selectedId, setSelectedId] = useState<string>(items[0].id);
    const selectedItem = items.find(item => item.id === selectedId) || items[0];

    // Helper to get localized content
    const getContent = () => {
        if (selectedItem.type === 'project') {
            const p = selectedItem.data as Project;
            return {
                title: lang === "fr" ? (p.title_fr || p.title) : p.title,
                description: lang === "fr" ? (p.fullDescription_fr || p.fullDescription) : p.fullDescription,
                review: lang === "fr" ? (p.review_fr || p.review) : p.review,
                tags: lang === "fr" ? (p.tags_fr || p.tags) : p.tags,
                category: "Project Case"
            };
        } else {
            const a = selectedItem.data as BlogPost;
            return {
                title: lang === "fr" ? a.title.fr : a.title.en,
                description: lang === "fr" ? a.content.fr : a.content.en,
                tags: [a.category],
                category: "Technical Article"
            };
        }
    };

    const display = getContent();

    return (
        <Layout variant="dark" footerThreshold={0.8}>
            <div className="bg-black text-white pt-24 pb-8">
                <div className="container px-6 max-w-[1400px] mx-auto">
                    <motion.div 
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
                            <ChromeWord>{lang === "fr" ? "Études de Cas" : "Case Studies"}</ChromeWord>
                        </h1>
                        <motion.p 
                            className="text-gray-500 mt-4 text-lg"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        >
                            {lang === "fr" 
                                ? "L'envers du décor de l'ingénierie Synaptics." 
                                : "Behind the scenes of Synaptics engineering."}
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        
                        {/* SIDEBAR: List of Projects and Articles */}
                        <div className="lg:col-span-4 h-[calc(100vh-120px)] sticky top-24 overflow-y-auto pr-8 space-y-4 pb-20 scrollbar-hide overscroll-contain will-change-transform" data-lenis-prevent>
                            {items.map((item, index) => {
                                let title = "";
                                let tag = "";
                                
                                if (item.type === 'project') {
                                    const p = item.data as Project;
                                    title = lang === "fr" ? (p.title_fr || p.title) : p.title;
                                    tag = (lang === "fr" ? p.tags_fr?.[0] : p.tags[0]) || "PROJECT";
                                } else {
                                    const a = item.data as BlogPost;
                                    title = lang === "fr" ? a.title.fr : a.title.en;
                                    tag = "ARTICLE";
                                }
                                
                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setSelectedId(item.id)}
                                        className={cn(
                                            "cursor-pointer p-6 rounded-[2rem] border transition-all duration-500 relative overflow-hidden group",
                                            selectedId === item.id
                                                ? "bg-white/[0.05] border-white/20 shadow-2xl scale-[1.02]"
                                                : "bg-transparent border-transparent hover:bg-white/[0.02] opacity-50 hover:opacity-100"
                                        )}
                                    >
                                        {selectedId === item.id && (
                                            <motion.div 
                                                layoutId="accent-line"
                                                className={cn(
                                                    "absolute left-0 top-0 bottom-0 w-1 shadow-[0_0_20px_rgba(168,85,247,0.5)]",
                                                    item.type === 'project' ? "bg-purple-500" : "bg-blue-500"
                                                )} 
                                            />
                                        )}

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className={cn(
                                                    "text-[9px] uppercase tracking-[0.3em] font-bold",
                                                    item.type === 'project' ? "text-purple-400" : "text-blue-400"
                                                )}>
                                                    {tag}
                                                </span>
                                                {item.date && (
                                                    <span className="text-[9px] text-gray-600 font-mono">
                                                        {item.date}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                                                {title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* CONTENT VIEW */}
                        <div className="lg:col-span-8 sticky top-24 h-[calc(100vh-120px)] bg-zinc-900/40 rounded-[3rem] border border-white/10 overflow-hidden relative shadow-2xl backdrop-blur-sm will-change-transform">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="h-full"
                                >
                                    <div className="grid grid-cols-1 xl:grid-cols-5 h-full">
                                        
                                        <div className="xl:col-span-3 h-full overflow-y-auto p-10 pr-6 scrollbar-hide overscroll-contain" data-lenis-prevent>
                                            {selectedItem.type === 'project' ? (
                                                <ProjectVisuals project={selectedItem.data as Project} />
                                            ) : (
                                                <div className="rounded-[2rem] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl">
                                                    <img 
                                                        src={(selectedItem.data as BlogPost).image} 
                                                        alt="Article cover" 
                                                        className="w-full aspect-video object-cover opacity-80"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="xl:col-span-2 h-full flex flex-col p-10 border-l border-white/5">
                                            <div className="flex-1 space-y-8 overflow-y-auto pr-2 scrollbar-hide overscroll-contain" data-lenis-prevent>
                                                <div className="space-y-2">
                                                    <span className="text-[10px] text-purple-500 font-bold tracking-widest uppercase">
                                                        {display.category}
                                                    </span>
                                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug">
                                                        <ChromeWord>{display.title}</ChromeWord>
                                                    </h2>
                                                </div>
                                                <div className="text-gray-400 text-base leading-relaxed font-light prose prose-invert">
                                                    {display.description.split('\n').map((para, i) => (
                                                        <p key={i} className="mb-4">{para}</p>
                                                    ))}
                                                </div>
                                            </div>

                                            {selectedItem.type === 'project' && (selectedItem.data as Project).review && (
                                                <div className="space-y-4 pt-8 border-t border-white/5 mt-auto">
                                                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                                                        REVIEW
                                                    </h4>
                                                    <p className="text-purple-400 text-lg font-medium leading-relaxed italic">
                                                        {lang === "fr" ? (selectedItem.data as Project).review_fr : (selectedItem.data as Project).review}
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
