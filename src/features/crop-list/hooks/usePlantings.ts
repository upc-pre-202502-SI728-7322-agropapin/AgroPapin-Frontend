import { useState, useEffect } from 'react';
import { PlantingService } from '../../../services/crop';
import type { PlantingResource, CreatePlantingResource, UpdatePlantingResource, UpdatePlantingStatusResource } from '../types/crop.types';

export function usePlantings(fieldId: string | null, plotId: string | null) {
  const [plantings, setPlantings] = useState<PlantingResource[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPlantings = async () => {
    if (!fieldId || !plotId) {
      setPlantings([]);
      return;
    }

    setError(null);
    try {
      const data = await PlantingService.getPlantings(fieldId, plotId);
      setPlantings(data);
    } catch (err) {
      console.error('Error obteniendo los plantings:', err);
      setPlantings([]);
    }
  };

  useEffect(() => {
    fetchPlantings();
  }, [fieldId, plotId]);

  const createPlanting = async (data: CreatePlantingResource): Promise<PlantingResource | null> => {
    if (!fieldId || !plotId) return null;

    try {
      const newPlanting = await PlantingService.createPlanting(fieldId, plotId, data);
      setPlantings(prev => [...prev, newPlanting]);
      return newPlanting;
    } catch (err) {
      console.error('Error creando planting:', err);
      return null;
    }
  };

  const updatePlanting = async (plantingId: string, data: UpdatePlantingResource): Promise<PlantingResource | null> => {
    if (!fieldId || !plotId) return null;

    try {
      const updatedPlanting = await PlantingService.updatePlanting(fieldId, plotId, plantingId, data);
      console.log('RESPUESTA BACKEND', { plotId: updatedPlanting.plotId });
      setPlantings(prev => prev.map(p => p.id === plantingId ? updatedPlanting : p));
      return updatedPlanting;
    } catch (err) {
      console.error('Error actualizando planting:', err);
      setError('Failed to update planting');
      return null;
    }
  };

  const updatePlantingStatus = async (plantingId: string, data: UpdatePlantingStatusResource): Promise<PlantingResource | null> => {
    if (!fieldId || !plotId) return null;

    try {
      const updatedPlanting = await PlantingService.updatePlantingStatus(fieldId, plotId, plantingId, data);
      setPlantings(prev => prev.map(p => p.id === plantingId ? updatedPlanting : p));
      return updatedPlanting;
    } catch (err) {
      console.error('Error actualizando el estado del planting:', err);
      setError('Failed to update planting status');
      return null;
    }
  };

  const deletePlanting = async (plantingId: string): Promise<boolean> => {
    if (!fieldId || !plotId) return false;

    try {
      await PlantingService.deletePlanting(fieldId, plotId, plantingId);
      setPlantings(prev => prev.filter(p => p.id !== plantingId));
      return true;
    } catch (err: any) {
      console.error('Error eliminando planting:', err);
      setError('Failed to delete planting');
      return false;
    }
  };

  return {
    plantings,
    error,
    fetchPlantings,
    createPlanting,
    updatePlanting,
    updatePlantingStatus,
    deletePlanting
  };
}
