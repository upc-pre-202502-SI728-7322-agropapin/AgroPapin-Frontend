import { axiosClient } from '../api/axiosClient';
import type { ActivateIrrigationRequest, IrrigationLogResource } from '../../features/irrigation-control/types/irrigation.types';

export class IrrigationService {

  async activateIrrigation(data: ActivateIrrigationRequest): Promise<void> {
    await axiosClient.post('/irrigation/activate', data);
  }

  async getIrrigationLogs(plotId: string): Promise<IrrigationLogResource[]> {
    const response = await axiosClient.get<IrrigationLogResource[]>(`/plots/${plotId}/irrigation-logs`);
      return Array.isArray(response.data) ? response.data : [];
  }
}

export default new IrrigationService();

