import { useEffect, useRef } from 'react';
import type { Message } from '../types/chat.types';
import { ChatBubble } from './ChatBubble';
import agropapinLogo from "../../../assets/agropapin.png"

interface ChatWindowProps {
  messages: Message[];
  isLoading?: boolean;
}

export function ChatWindow({ messages, isLoading = false }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className=" text-center">
          <div className="text-6xl mb-4">
             <img src={agropapinLogo} className="h-30 mx-auto" alt="Agrotech's logo"/>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Start a Conversation
          </h3>
          <p className="text-gray-500">
            Ask me anything about farming, crops, or agriculture!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="bg-gray-200 rounded-lg rounded-bl-none px-4 py-3 max-w-[70%]">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
