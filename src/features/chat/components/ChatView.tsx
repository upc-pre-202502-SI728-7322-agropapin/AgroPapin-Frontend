import { useState } from 'react';
import { ChatHistoryPanel } from './ChatHistoryPanel';
import { ChatWindow } from './ChatWindow';
import { ChatInput } from './ChatInput';
import type { ChatSession, Message } from '../types/chat.types';
import agropapinLogo from "../../../assets/agropapinChat.png"

const mockSessions: ChatSession[] = [
  {
    id: '1',
    title: 'Crop Rotation Tips',
    lastMessage: 'Thank you for the advice!',
    timestamp: new Date('2024-01-15T10:30:00'),
    messages: [
      {
        id: '1-1',
        content: 'What are the best practices for crop rotation?',
        sender: 'user',
        timestamp: new Date('2024-01-15T10:25:00'),
      },
      {
        id: '1-2',
        content: 'Crop rotation is essential for maintaining soil health. Here are some key practices:\n\n1. Rotate crops from different plant families\n2. Include legumes to fix nitrogen\n3. Alternate deep and shallow-rooted crops\n4. Plan rotations for at least 3-4 years',
        sender: 'bot',
        timestamp: new Date('2024-01-15T10:26:00'),
      },
      {
        id: '1-3',
        content: 'Thank you for the advice!',
        sender: 'user',
        timestamp: new Date('2024-01-15T10:30:00'),
      },
    ],
  },
  {
    id: '2',
    title: 'Pest Control',
    lastMessage: 'Try neem oil as a natural solution.',
    timestamp: new Date('2024-01-14T15:20:00'),
    messages: [
      {
        id: '2-1',
        content: 'How can I control aphids naturally?',
        sender: 'user',
        timestamp: new Date('2024-01-14T15:15:00'),
      },
      {
        id: '2-2',
        content: 'Try neem oil as a natural solution. Mix 2 tablespoons of neem oil with 1 gallon of water and spray on affected plants. Also, encourage beneficial insects like ladybugs.',
        sender: 'bot',
        timestamp: new Date('2024-01-14T15:20:00'),
      },
    ],
  },
];

// respuestas automáticas del bot
const getBotResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return 'Hello! I\'m your farming assistant. How can I help you today?';
  }
  
  if (lowerMessage.includes('pest') || lowerMessage.includes('insect')) {
    return 'For pest control, I recommend integrated pest management (IPM). This includes monitoring, using beneficial insects, crop rotation, and organic pesticides as a last resort. What specific pest are you dealing with?';
  }
  
  if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
    return 'Proper watering is crucial for crop health. Consider drip irrigation for efficiency, water early morning or late evening to reduce evaporation, and monitor soil moisture regularly. Different crops have different water requirements.';
  }
  
  if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrient')) {
    return 'I recommend getting a soil test first to understand your soil\'s needs. Common organic fertilizers include compost, manure, bone meal, and fish emulsion. The NPK ratio depends on your crop type.';
  }
  
  return 'That\'s an interesting question! Based on your farming needs, I\'d recommend consulting with local agricultural experts or checking your crop-specific guidelines. Is there anything specific about your crops I can help with?';
};

export function ChatView() {
  const [sessions, setSessions] = useState<ChatSession[]>(mockSessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(sessions[0]?.id || null);
  const [isLoading, setIsLoading] = useState(false);

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Conversation',
      lastMessage: '',
      timestamp: new Date(),
      messages: [],
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
  };

  const handleSendMessage = (content: string) => {
    if (!activeSessionId) {
      handleNewChat();
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    // Actualizar la sesión con el nuevo mensaje
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: [...session.messages, newMessage],
              lastMessage: content,
              timestamp: new Date(),
              title: session.messages.length === 0 ? content.slice(0, 30) + '...' : session.title,
            }
          : session
      )
    );

    // Simular respuesta del bot
    setIsLoading(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(content),
        sender: 'bot',
        timestamp: new Date(),
      };

      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === activeSessionId
            ? {
                ...session,
                messages: [...session.messages, botResponse],
                lastMessage: botResponse.content,
                timestamp: new Date(),
              }
            : session
        )
      );
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-full bg-white">
      <ChatHistoryPanel
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSessionSelect={setActiveSessionId}
        onNewChat={handleNewChat}
      />
      
      <div className="flex-1 flex flex-col">
        {activeSession ? (
          <>
            <div className="border-b border-gray-200 px-6 py-4 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">
                {activeSession.title}
              </h2>
            </div>
            <ChatWindow messages={activeSession.messages} isLoading={isLoading} />
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4"> 
                  <img src={agropapinLogo} className="h-10" alt="Agrotech's logo"/>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                Say hi to Agropapin!
              </h3>
              <p className="text-gray-500 mb-6">
                Start a new conversation to get farming advice
              </p>
              <button
                onClick={handleNewChat}
                className="bg-[#3E7C59] text-white px-6 py-3 rounded-lg hover:bg-[#2d5f43] transition-colors">
                Start New Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
