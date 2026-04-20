import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, ArrowUp, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micSupported, setMicSupported] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 6000);
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) setMicSupported(false);
    return () => clearTimeout(timer);
  }, []);

  const toggleMic = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SR();
    recognition.lang = 'fr-FR';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let final = '';
      let interim = '';
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      setInputValue(final || interim);
    };

    recognition.onerror = () => { setIsListening(false); recognitionRef.current = null; };
    recognition.onend = () => { setIsListening(false); recognitionRef.current = null; };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = '20px';

    // Ajouter le message utilisateur
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: newMessages }
      });

      if (error) throw error;
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.reply || "Désolé, j'ai rencontré une petite erreur dans ma réflexion." 
      }]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Oups ! Connexion perdue avec mon cerveau central. Réessayez ?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };



  const morphTransition = { type: 'spring', damping: 35, stiffness: 250, mass: 0.9, restDelta: 0.001 };

  return (
    <AnimatePresence>
      {isVisible && (
        <AnimatePresence mode="popLayout">
          {!isOpen ? (
            <motion.button
              key="widget"
              layoutId="chatbot-container"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              style={{ background: 'transparent', border: 'none', padding: 0 }}
              className="fixed bottom-6 right-6 z-[100] cursor-pointer flex items-center justify-center"
              transition={morphTransition}
            >
              <motion.img
                layoutId="zippy"
                layout
                transition={morphTransition}
                src="/images/chatbot/zippy.png"
                alt="Zippy"
                className="w-14 h-14 object-contain rounded-full"
              />
            </motion.button>
          ) : (
            <motion.div
              key="chat-window"
              layoutId="chatbot-container"
              transition={morphTransition}
              className="fixed bottom-6 right-6 z-[100] flex flex-col"
              style={{
                width: 340,
                height: 420,
                borderRadius: 16,
                background: 'rgba(0, 0, 0, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.1),
                  0 0 20px rgba(255,255,255,0.08),
                  0 0 40px rgba(255,255,255,0.05),
                  0 32px 64px rgba(0,0,0,0.9)
                `,
                transformOrigin: 'bottom right',
                fontFamily: "'Outfit', system-ui, sans-serif",
                pointerEvents: 'auto',
              }}
            >
              <style>
                {`
                  @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.9); }
                    100% { opacity: 1; transform: scale(1); }
                  }
                  .chat-scrollbar::-webkit-scrollbar {
                    width: 5px;
                  }
                  .chat-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  .chat-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                  }
                  .chat-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                  }
                `}
              </style>
              {/* Header */}
              <div className="flex items-center justify-between shrink-0" style={{ padding: '16px 16px 0' }}>
                <motion.img
                  layoutId="zippy"
                  layout
                  transition={morphTransition}
                  src="/images/chatbot/zippy.png"
                  alt="Zippy"
                  className="w-14 h-14 object-contain rounded-full"
                />
                <motion.button
                  whileHover={{ scale: 1.1, color: '#fff' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  style={{ padding: 6, borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', display: 'flex' }}
                >
                  <X size={16} />
                </motion.button>
              </div>

              {/* Body */}
              <div 
                ref={scrollRef}
                className="chat-scrollbar"
                onWheel={(e) => e.stopPropagation()}
                style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  padding: '20px', 
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  gap: 16, 
                  scrollBehavior: 'smooth',
                  minHeight: 0,
                  pointerEvents: 'auto',
                  overscrollBehavior: 'contain',
                  position: 'relative',
                  zIndex: 20,
                  touchAction: 'pan-y'
                }}
              >
                <div style={{ padding: '20px 0 30px', textAlign: 'center' }}>
                  <h2 style={{ color: '#fff', fontWeight: 700, fontSize: 24, lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
                    Une question ?<br />Un doute ?
                  </h2>
                </div>

                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    style={{
                      alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                      fontSize: 14,
                      lineHeight: 1.5,
                      background: msg.role === 'user' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                      color: '#fff',
                      border: `1px solid ${msg.role === 'user' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}`,
                      boxShadow: msg.role === 'user' ? '0 0 15px rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.3)' : 'none',
                      fontFamily: "'Outfit', system-ui, sans-serif",
                    }}
                  >
                    {msg.content}
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ alignSelf: 'flex-start', padding: '10px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                  >
                    <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div style={{ padding: '8px 16px 16px', flexShrink: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 12px',
                  borderRadius: 12,
                  background: isFocused ? '#050505' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isFocused ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: isFocused ? '0 0 20px rgba(255,255,255,0.15), 0 0 0 1px rgba(255,255,255,0.2) inset' : 'none',
                  transition: 'border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease',
                }}>
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      if (textareaRef.current) {
                        textareaRef.current.style.height = 'auto';
                        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
                      }
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Écrire ici"
                    rows={1}
                    style={{
                      flex: 1, background: 'transparent', border: 'none', outline: 'none',
                      resize: 'none', fontSize: 14, color: '#fff', lineHeight: 1.5,
                      fontFamily: "'Outfit', system-ui, sans-serif",
                      height: 21, maxHeight: 120, overflowY: 'auto', padding: 0,
                      caretColor: '#fff',
                    }}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  />

                  {/* Micro */}
                  {micSupported && (
                    <div style={{ position: 'relative', width: 28, height: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatePresence>
                        {isListening && (
                          <motion.div
                            initial={{ opacity: 0, y: 5, x: "-50%", scale: 0.85 }}
                            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
                            exit={{ opacity: 0, y: 5, x: "-50%", scale: 0.85 }}
                            transition={{ duration: 0.15 }}
                            style={{
                              position: 'absolute',
                              bottom: 'calc(100% + 14px)',
                              left: '50%',
                              zIndex: 100,
                              filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.8))',
                              pointerEvents: 'none',
                            }}
                          >
                            <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block', animation: 'pulse 1.5s infinite' }} />
                              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 500, letterSpacing: '0.02em' }}>Écoute...</span>
                            </div>
                            {/* Queue */}
                            <div style={{ position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '8px solid rgba(255,255,255,0.12)' }} />
                            <div style={{ position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '7px solid #111' }} />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {isListening && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{ boxShadow: ['0 0 0 0px rgba(255,255,255,0.6)', '0 0 0 10px rgba(255,255,255,0)'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                          style={{ pointerEvents: 'none' }}
                        />
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMic}
                        style={{
                          width: 28, height: 28, borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s, color 0.2s',
                          background: isListening ? '#fff' : 'transparent',
                          color: isListening ? '#000' : 'rgba(255,255,255,0.4)',
                          position: 'relative', zIndex: 10,
                        }}
                      >
                        <Mic size={15} />
                      </motion.button>
                    </div>
                  )}

                  {/* Envoyer */}
                  <motion.button
                    whileHover={inputValue.trim() ? { scale: 1.1 } : {}}
                    whileTap={inputValue.trim() ? { scale: 0.9 } : {}}
                    onClick={handleSend}
                    style={{
                      width: 28, height: 28, borderRadius: '50%', border: 'none', cursor: inputValue.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s, color 0.2s',
                      background: inputValue.trim() ? '#fff' : 'rgba(255,255,255,0.08)',
                      color: inputValue.trim() ? '#000' : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    <ArrowUp size={15} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </AnimatePresence>
  );
}
