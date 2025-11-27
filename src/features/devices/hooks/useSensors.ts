import { useState, useEffect } from 'react';
import SensorService from '../../../services/device/SensorService';
import type { SensorResource } from '../types/sensor.types';

export function useSensors(plotId: string | undefined) {
  const [sensors, setSensors] = useState<SensorResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!plotId) return;

    const fetchSensors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await SensorService.getSensorsByPlotId(plotId);
        setSensors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading sensors');
        console.error('Error fetching sensors:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSensors();
  }, [plotId]);

  const refetch = async () => {
    if (!plotId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await SensorService.getSensorsByPlotId(plotId);
      setSensors(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading sensors');
      console.error('Error fetching sensors:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { sensors, isLoading, error, refetch };
}
