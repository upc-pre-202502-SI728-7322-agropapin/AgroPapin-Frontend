import { ChatHistoryItem } from './ChatHistoryItem';
import type { ChatSession } from '../types/chat.types';
import { IoMdAddCircleOutline } from 'react-icons/io';

interface ChatHistoryPanelProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
  onNewChat: () => void;
}

export function ChatHistoryPanel({
  sessions,
  activeSessionId,
  onSessionSelect,
  onNewChat,
}: ChatHistoryPanelProps) {
  return (
    <div className="w-full md:w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Chat History</h2>
        <button
          onClick={onNewChat}
          className="w-full bg-[#3E7C59] text-white py-2.5 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold flex items-center justify-center gap-2"
        >
          <IoMdAddCircleOutline size={20} />
          New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4">
        {sessions.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-sm">No chat history yet</p>
            <p className="text-xs mt-2">Start a new chat to begin</p>
          </div>
        ) : (
          sessions.map((session) => (
            <ChatHistoryItem
              key={session.id}
              session={session}
              isActive={session.id === activeSessionId}
              onClick={() => onSessionSelect(session.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
