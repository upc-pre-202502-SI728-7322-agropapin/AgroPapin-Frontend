import { useState, useEffect } from 'react';
import ActuatorService from '../../../services/device/ActuatorService';
import type { ActuatorResource } from '../types/actuator.types';

export function useActuators(plotId: string | undefined) {
  const [actuators, setActuators] = useState<ActuatorResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!plotId) return;

    const fetchActuators = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ActuatorService.getActuatorsByPlotId(plotId);
        console.log(`Actuators fetched for plotId ${plotId}:`, data);
        setActuators(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading actuators');
        console.error('Error fetching actuators:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActuators();
  }, [plotId]);

  const refetch = async () => {
    if (!plotId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await ActuatorService.getActuatorsByPlotId(plotId);
      setActuators(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading actuators');
      console.error('Error fetching actuators:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return { actuators, isLoading, error, refetch };
}
