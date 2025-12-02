import { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import agropapinChatIcon from '../../../assets/agropapinChat.png';
import { ChatView } from '../../../features/chat/components/ChatView';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams<{ plotId?: string }>();
  const location = useLocation();
  
  // Auto-detect context from URL
  const plotId = params.plotId || null;
  const fieldId = (location.state as any)?.fieldId || null;

  return (<>
      <button
        onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-40 bg-[#3E7C59] hover:bg-[#2d5f43] rounded-full p-3 shadow-lg transition-all hover:scale-110" title="Open AgroPapin Chat">
        <img src={agropapinChatIcon} alt="Chat" className="w-12 h-12 object-contain" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-2xl w-[400px] h-[600px] flex flex-col">
          
          <div className="bg-[#3E7C59] text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={agropapinChatIcon} alt="AgroPapin" className="w-10 h-10 object-contain" />
              <div>
                <h3 className="font-semibold">AgroPapin Assistant</h3>
                <p className="text-xs text-green-100">
                  {plotId ? 'Plot Context' : fieldId ? 'Field Context' : 'Online'}
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}className="text-white hover:text-gray-200 text-2xl leading-none">
              ×
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatView isFloating={true} plotId={plotId} fieldId={fieldId} />
          </div>
        </div>
      )}
    </>);
}
