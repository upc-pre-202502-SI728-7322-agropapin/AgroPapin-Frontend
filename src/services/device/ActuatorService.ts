import { axiosClient } from '../api/axiosClient';
import type {ActuatorResource, CreateActuatorResource, UpdateDeviceStatusResource,} from '../../features/devices/types/actuator.types';

class ActuatorService {
  // POST
  async createActuator(data: CreateActuatorResource): Promise<string> {
    const response = await axiosClient.post<string>('/actuators', data);
    return response.data;
  }

  // GET 
  async getActuatorsByPlotId(plotId: string): Promise<ActuatorResource[]> {
    try {
      const response = await axiosClient.get<ActuatorResource[]>(`/actuators/plot/${plotId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  }

  // PATCH (solo actualiza el estado del actuador)
  async updateActuatorStatus(plotId: string, actuatorId: string, data: UpdateDeviceStatusResource): Promise<ActuatorResource> {
    const response = await axiosClient.patch<ActuatorResource>(`/actuators/plot/${plotId}/device/${actuatorId}/status`,data);
    return response.data;
  }

  // DELETE
  async deleteActuator(actuatorId: string): Promise<{ message: string }> {
    const response = await axiosClient.delete<{ message: string }>(`/actuators/device/${actuatorId}`);
    return response.data;
  }
}

export default new ActuatorService();
