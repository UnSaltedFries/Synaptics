import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useState } from "react";
import { Project } from "@/data/projects";

interface ProjectVisualsProps {
  project: Project;
}

export function ProjectVisuals({ project }: ProjectVisualsProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-10">
      {/* 1. Main Visual / Video Player */}
      <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 group">
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
          {/* Abstract Wave Visual */}
          <div className="w-full h-full opacity-40 flex items-center justify-center p-12">
            <svg className="w-full h-full text-purple-500/50" viewBox="0 0 400 200" fill="none">
              <path d="M0 100 Q100 50 200 100 T400 100" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M0 110 Q100 60 200 110 T400 110" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
          
          {/* Play/Pause Button */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 ml-1 fill-current" />}
          </button>
        </div>

        {/* Video Progress Bar */}
        <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4">
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full w-[65%] bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
        </div>
      </div>

      {/* 2. Dashboard / Product Screenshot */}
      <div className="rounded-[2rem] border border-white/10 overflow-hidden bg-white/5">
        <img 
          src={project.dashboardImage || project.heroImage} 
          alt={`${project.title} Dashboard`} 
          className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>

      {/* 3. Voice Samples Section (Easy to expand later) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-500">
            VOICE SAMPLES
          </h4>
          <span className="text-[10px] text-gray-600 font-medium">PREVIEW</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.02 }}
              className="aspect-square rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center gap-3 group cursor-pointer hover:bg-white/[0.05] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <Play className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
              </div>
              <span className="text-[9px] uppercase tracking-widest text-gray-600 group-hover:text-gray-400">
                Sample 0{i}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. Additional Assets (Add more here later) */}
      {/* 
      <div className="rounded-2xl border border-dashed border-white/10 p-12 flex items-center justify-center">
        <span className="text-xs text-gray-600">Drag & drop more assets here</span>
      </div> 
      */}
    </div>
  );
}
