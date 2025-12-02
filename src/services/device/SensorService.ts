import { axiosClient } from '../api/axiosClient';
import type {SensorResource, CreateSensorResource, UpdateDeviceStatusResource,} from '../../features/devices/types/sensor.types';

class SensorService {
  // POST 
  async createSensor(data: CreateSensorResource): Promise<string> {
    const response = await axiosClient.post<string>('/sensors', data);
    return response.data;
  }

  // GET
  async getSensorsByPlotId(plotId: string): Promise<SensorResource[]> {
    try {
      const response = await axiosClient.get<SensorResource[]>(`/sensors/plot/${plotId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log('No se encontraron sensores para este plot');
        return [];
      }
      throw error;
    }
  }

  // PATCH (solo actualiza el estado del sensor)
  async updateSensorStatus(plotId: string, sensorId: string, data: UpdateDeviceStatusResource): Promise<SensorResource> {
    const response = await axiosClient.patch<SensorResource>(`/sensors/plot/${plotId}/device/${sensorId}/status`,data);
    return response.data;
  }

  // DELETE
  async deleteSensor(sensorId: string): Promise<{ message: string }> {
    const response = await axiosClient.delete<{ message: string }>(`/sensors/device/${sensorId}`);
    return response.data;
  }
}

export default new SensorService();
