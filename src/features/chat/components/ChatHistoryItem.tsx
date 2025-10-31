import type { ChatSession } from '../types/chat.types';

interface ChatHistoryItemProps {
  session: ChatSession;
  isActive: boolean;
  onClick: () => void;
}

export function ChatHistoryItem({ session, isActive, onClick }: ChatHistoryItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg transition-colors mb-2 ${
        isActive
          ? 'bg-[#3E7C59] text-white'
          : 'bg-white hover:bg-gray-100 text-gray-900'
      }`}
    >
      <h3 className={`font-semibold text-sm mb-1 truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>
        {session.title}
      </h3>
      <p className={`text-xs truncate ${isActive ? 'text-green-100' : 'text-gray-600'}`}>
        {session.lastMessage}
      </p>
      <span className={`text-xs ${isActive ? 'text-green-200' : 'text-gray-400'} mt-1 block`}>
        {session.timestamp.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
    </button>
  );
}
