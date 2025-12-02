import { axiosClient } from '../api/axiosClient';
import type { ChartDataResource, AvgReadingResource } from '../../features/devices/types/telemetry.types';

class TelemetryService {
  // GET (la última lectura del sensor para todos los tipos de sensores del plot)
  async getLatestMetrics(plotId: string): Promise<AvgReadingResource[]> {
    try {
      const response = await axiosClient.get<AvgReadingResource[]>(`/telemetry/latest-metrics/plot/${plotId}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
         console.log('No se encontraron métricas para este plot');
        return [];
      }
        console.error('Error obteniendo las métricas:', error);
      throw error;
    }
  }

  // GET (métricas historias de un plot en los últimos X días)
  async getHistoricalMetrics(plotId: string, days: number): Promise<ChartDataResource[]> {
    try {
      const response = await axiosClient.get<ChartDataResource[]>(`/telemetry/historical/plot/${plotId}/days/${days}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  }
}

export default new TelemetryService();
