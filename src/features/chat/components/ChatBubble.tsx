import type { Message } from '../types/chat.types';

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-[#3E7C59] text-white rounded-br-none'
            : 'bg-gray-200 text-gray-900 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        <span className={`text-xs mt-1 block ${isUser ? 'text-green-100' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
}
