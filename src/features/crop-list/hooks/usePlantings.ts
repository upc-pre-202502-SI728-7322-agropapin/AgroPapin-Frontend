import { useState, useEffect } from 'react';
import { PlantingService } from '../../../services/crop';
import PlotService from '../../../services/plot/PlotService';
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
      // validación para no permitir un planting nuevo si ya hay uno con el status de GROWING
      const hasPlantedCrop = Array.isArray(plantings) && plantings.some(p => 
        p.status === 'GROWING'
      );
      
      if (hasPlantedCrop) {
        throw new Error('This plot already has an active crop. Please harvest or remove the existing crop before planting a new one.');
      }

      const newPlanting = await PlantingService.createPlanting(fieldId, plotId, data);
      
      // actualizar el estado del plot al crear un planting
      try {
        await PlotService.updatePlotStatus(fieldId, plotId, { status: 'PLANTED' });
      } catch (statusError) {
        console.warn('Warning: Failed to update plot status to PLANTED:', statusError);
      }
      
      setPlantings(prev => [...prev, newPlanting]);
      return newPlanting;
    } catch (err: any) {
      if (!err.message?.includes('already has an active crop')) {
        console.error('Error creando planting:', err);
      }
      throw err;
    }
  };

  const updatePlanting = async (plantingId: string, data: UpdatePlantingResource): Promise<boolean> => {
    if (!fieldId || !plotId) return false;

    try {
      await PlantingService.updatePlanting(fieldId, plotId, plantingId, data);
      await fetchPlantings();
      return true;
    } catch (err) {
      console.error('Error actualizando planting:', err);
      setError('Failed to update planting');
      return false;
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
      setPlantings(prev => {
        const updatedPlantings = prev.filter(p => p.id !== plantingId);
        
        // si ya no hay plantings activos se actualiza el estado del plot a EMPTY
        if (updatedPlantings.length === 0) {
          PlotService.updatePlotStatus(fieldId, plotId, { status: 'EMPTY' })
            .catch(err => console.warn('Warning: Failed to update plot status to EMPTY:', err));
        }
        
        return updatedPlantings;
      });
      return true;
    } catch (err: any) {
      console.error('Error eliminando planting:', err);
      setError('Failed to delete planting');
      return false;
    }
  };

  const markAsHarvested = async (plantingId: string): Promise<boolean> => {
    if (!fieldId || !plotId) return false;

    try {
      // se actualiza la fecha con la actual
      const currentPlanting = await PlantingService.getPlantingById(fieldId, plotId, plantingId);
      const currentDate = new Date().toISOString();
      await PlantingService.updatePlanting(fieldId, plotId, plantingId, {
        plantingDate: currentPlanting.plantingDate,
        harvestDate: currentDate
      });

      // y luego el estado del planting
      await PlantingService.updatePlantingStatus(fieldId, plotId, plantingId, { status: 'HARVESTED' });
      
      await fetchPlantings();
      return true;
    } catch (err: any) {
      console.error('Error marking planting as harvested:', err);
      setError('Failed to mark planting as harvested');
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
    deletePlanting,
    markAsHarvested
  };
}
