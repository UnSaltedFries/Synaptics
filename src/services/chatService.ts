
import { supabase } from "@/integrations/supabase/client";

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const chatService = {
  /**
   * Envoie la conversation à l'API via Supabase Edge Functions
   */
  async sendMessage(messages: Message[], lang: string = 'fr') {
    // 1. Préparation du System Prompt (La personnalité de Zippy)
    const systemPrompt: Message = {
      role: 'system',
      content: lang === 'fr' 
        ? "Tu es Zippy, la mascotte IA de Synaptics. Tu es amical, professionnel et concis. Ta mission est d'aider les visiteurs à comprendre comment Synaptics peut automatiser leur business grâce à l'IA. Réponds toujours en français."
        : "You are Zippy, the AI mascot of Synaptics. You are friendly, professional, and concise. Your mission is to help visitors understand how Synaptics can automate their business using AI. Always respond in English."
    };

    // 2. Fusion avec l'historique (Note: On insère le system prompt au début)
    const fullMessages = [systemPrompt, ...messages];

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { 
          messages: fullMessages,
          language: lang
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Chat Service Error:", error);
      throw error;
    }
  }
};
