export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
export interface ChatRequest {
  question: string;
  plotId?: string | null;
  fieldId?: string | null;
  userId?: string;
  role?: string;
}

export interface ChatResponse {
  response: string;
}
