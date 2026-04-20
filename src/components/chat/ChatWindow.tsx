import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  PenSquare, 
  PanelLeftClose, 
  X,
  AlignLeft,
  Type,
  Search,
  CheckCircle2,
  Plus,
  SlidersHorizontal,
  Mic,
  ArrowUp,
  Users
} from 'lucide-react';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestions = [
  { icon: AlignLeft, text: "Résumer cette page" },
  { icon: Type, text: "Traduire cette page" },
  { icon: Search, text: "Analyser pour obtenir des informations utiles" },
  { icon: CheckCircle2, text: "Créer un outil de suivi des tâches" },
];

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-24 right-6 w-full max-w-[400px] bg-[#1E1E1E] text-white rounded-2xl shadow-2xl overflow-hidden z-[100] border border-white/10 flex flex-col font-sans"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <button className="flex items-center gap-1.5 text-sm font-medium hover:bg-white/5 px-2 py-1.5 rounded-md transition-colors">
              Nouvelle discussion avec l'IA
              <ChevronDown className="w-4 h-4 text-white/50" />
            </button>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/70 hover:text-white">
                <PenSquare className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/70 hover:text-white">
                <PanelLeftClose className="w-4 h-4" />
              </button>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-white/10">
            {/* Initial Welcome State */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-[#E0E0E0] rounded-full flex items-center justify-center text-black">
                <img 
                  src="/images/chatbot/zippy.png" 
                  alt="Zippy"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h2 className="text-xl font-semibold leading-tight">
                Comment puis-je vous aider aujourd'hui ?
              </h2>
            </div>

            {/* Suggestions */}
            <div className="flex flex-col gap-0.5">
              {suggestions.map((item, idx) => (
                <button 
                  key={idx}
                  className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-white/80 hover:text-white text-sm"
                  onClick={() => setInputValue(item.text)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 pt-2">
            <div 
              className={`relative flex flex-col gap-3 p-3 rounded-xl bg-white/5 border transition-colors ${
                isFocused ? 'border-blue-500 bg-[#1A1A1A]' : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Badge */}
              <div className="flex items-start">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/10 border border-white/5 text-xs font-medium text-white/80 w-fit">
                  <Users className="w-3 h-3" />
                  E-com
                </div>
              </div>

              {/* Textarea */}
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Faites ce que vous voulez avec l'IA..."
                className="w-full bg-transparent border-none outline-none resize-none text-sm text-white placeholder:text-white/40 h-10 overflow-hidden leading-snug"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    // Handle submit logic later
                  }
                }}
              />

              {/* Action Bar */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/50 font-medium">Automatique</span>
                  <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                    <Mic className="w-4 h-4" />
                  </button>
                  <button 
                    className={`p-1.5 rounded-full flex items-center justify-center transition-colors ${
                      inputValue.trim() 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-white/10 text-white/30'
                    }`}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
