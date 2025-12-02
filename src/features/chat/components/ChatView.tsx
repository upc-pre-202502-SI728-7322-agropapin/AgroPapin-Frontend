import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';
import type { Message } from '../types/chat.types';
import agropapinLogo from "../../../assets/agropapin.png"

// respuestas automáticas del bot
const getBotResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hola')) {
    return 'Hello! I\'m your farming assistant. How can I help you today?';
  }
  
  if (lowerMessage.includes('pest') || lowerMessage.includes('insect') || lowerMessage.includes('plaga')) {
    return 'For pest control, I recommend integrated pest management (IPM). This includes monitoring, using beneficial insects, crop rotation, and organic pesticides as a last resort. What specific pest are you dealing with?';
  }
  
  if (lowerMessage.includes('water') || lowerMessage.includes('irrigation') || lowerMessage.includes('riego')) {
    return 'Proper watering is crucial for crop health. Consider drip irrigation for efficiency, water early morning or late evening to reduce evaporation, and monitor soil moisture regularly.';
  }
  
  if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrient') || lowerMessage.includes('fertilizante')) {
    return 'I recommend getting a soil test first to understand your soil\'s needs. Common organic fertilizers include compost, manure, bone meal, and fish emulsion.';
  }
  
  return 'That\'s an interesting question! Based on your farming needs, I\'d recommend consulting with local agricultural experts. Is there anything specific about your crops I can help with?';
};

interface ChatViewProps {
  isFloating?: boolean;
}

export function ChatView({ isFloating = false }: ChatViewProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-full bg-white">
      <div className="flex flex-col w-full h-full">
        {!isFloating && (
          <div className="px-6 py-4 border-b border-gray-200">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors font-medium"
            >
              <FaArrowLeft size={16} />
              <span>Back</span>
            </button>
          </div>
        )}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            {messages.length > 0 ? (
              <>
                <ChatWindow messages={messages} isLoading={isLoading} />
                <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
              </>
            ) : (
              <>
                {isFloating ? (
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="flex justify-center mb-3"> 
                          <img src={agropapinLogo} className="h-12 w-12 object-contain" alt="AgroPapin logo"/>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">
                          Ask me anything!
                        </h3>
                        <p className="text-sm text-gray-500">
                          I'm here to help with farming
                        </p>
                      </div>
                    </div>
                    <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center px-4">
                      <div className="flex justify-center mb-4"> 
                        <img src={agropapinLogo} className="h-16 w-16 object-contain" alt="AgroPapin logo"/>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                        Say hi to AgroPapin!
                      </h3>
                      <p className="text-gray-500 mb-6">
                        Ask me anything about farming and I'll help you
                      </p>
                      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
