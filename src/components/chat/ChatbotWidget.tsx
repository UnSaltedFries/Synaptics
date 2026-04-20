interface ChatbotWidgetProps {
  onClick: () => void;
  isOpen: boolean;
}

export function ChatbotWidget({ onClick, isOpen }: ChatbotWidgetProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-[#E0E0E0] shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center z-[100] dark:bg-[#2A2A2A]"
      style={{ opacity: isOpen ? 0 : 1, pointerEvents: isOpen ? 'none' : 'auto' }}
    >
      <img
        src="/images/chatbot/zippy.png"
        alt="Zippy"
        className="w-full h-full object-contain rounded-full"
      />
    </button>
  );
}
