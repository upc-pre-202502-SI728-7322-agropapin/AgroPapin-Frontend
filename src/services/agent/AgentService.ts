import axiosClient from '../api/axiosClient';
import type { ChatRequest, ChatResponse } from "../../features/chat/types/chat.types";
import { AxiosError } from 'axios';

class AgentService {
  async chat(request: ChatRequest): Promise<string> {
    try {
      const payload = {
        question: request.question,
        plotId: request.plotId,
        fieldId: request.fieldId,
        userId: request.userId,
        role: request.role,
      };
      
      console.log('Sending to agent:', payload);
      
      const response = await axiosClient.post<ChatResponse>('/agent/chat', payload);
      return response.data.response;
    } catch (error) {
      console.error('Error chatting with agent:', error);
      if (error instanceof AxiosError && error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw error;
    }
  }
}

export default new AgentService();
