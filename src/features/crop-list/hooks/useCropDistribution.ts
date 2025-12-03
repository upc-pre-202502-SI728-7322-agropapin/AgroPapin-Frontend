import { useState, useEffect } from 'react';
import { PlantingService } from '../../../services/crop';
import type { PlantingResource } from '../types/crop.types';

export function useCropDistribution() {
  const [plantings, setPlantings] = useState<PlantingResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCropDistribution = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PlantingService.getCropDistribution();
      setPlantings(data);
    } catch (err) {
      console.error('Error fetching crop distribution:', err);
      setError('Failed to load crop distribution');
      setPlantings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCropDistribution();
  }, []);

  return {
    plantings,
    loading,
    error,
    refetch: fetchCropDistribution
  };
}
