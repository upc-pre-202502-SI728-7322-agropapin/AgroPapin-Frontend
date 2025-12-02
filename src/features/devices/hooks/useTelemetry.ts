import { useState, useEffect } from 'react';
import TelemetryService from '../../../services/telemetry/TelemetryService';
import type { ChartDataResource } from '../types/telemetry.types';

export function useTelemetry(plotId: string | undefined, days: number = 7) {
  const [telemetryData, setTelemetryData] = useState<ChartDataResource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTelemetry = async () => {
    if (!plotId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const data = await TelemetryService.getHistoricalMetrics(plotId, days);
      setTelemetryData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading telemetry data');
      console.error('Error fetching telemetry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
  }, [plotId, days]);

  return { telemetryData, error, isLoading, refetch: fetchTelemetry };
}
