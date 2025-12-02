import { useState, useEffect } from 'react';
import { PlotService } from '../../../services/plot';
import type { Plot, CreatePlotResource, UpdatePlotResource, UpdatePlotStatusResource } from '../types/plot.types';

export function usePlots(fieldId: string | null) {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchPlots = async () => {
    if (!fieldId) {
      setPlots([]);
      return;
    }

    setError(null);
    try {
      const data = await PlotService.getPlots(fieldId);
      setPlots(data);
    } catch (err) {
      console.error('Error obteniendo plots:', err);
      setPlots([]);
    }
  };

  useEffect(() => {
    fetchPlots();
  }, [fieldId]);

  const createPlot = async (data: CreatePlotResource): Promise<Plot | null> => {
    if (!fieldId) return null;

    try {
      const newPlot = await PlotService.createPlot(fieldId, data);
      setPlots(prev => [...prev, newPlot]);
      return newPlot;
    } catch (err) {
      console.error('Error creando plot:', err);
      return null;
    }
  };

  const updatePlot = async (plotId: string, data: UpdatePlotResource): Promise<Plot | null> => {
    if (!fieldId) return null;

    try {
      const updatedPlot = await PlotService.updatePlot(fieldId, plotId, data);
      setPlots(prev => prev.map(p => p.plotId === plotId ? updatedPlot : p));
      return updatedPlot;
    } catch (err) {
      console.error('Error actualizando plot:', err);
      setError('Failed to update plot');
      return null;
    }
  };

  const updatePlotStatus = async (plotId: string, data: UpdatePlotStatusResource): Promise<Plot | null> => {
    if (!fieldId) return null;

    try {
      const updatedPlot = await PlotService.updatePlotStatus(fieldId, plotId, data);
      setPlots(prev => prev.map(p => p.plotId === plotId ? updatedPlot : p));
      return updatedPlot;
    } catch (err) {
      console.error('Error actualizando estado del plot:', err);
      return null;
    }
  };

  const deletePlot = async (plotId: string): Promise<boolean> => {
    if (!fieldId) return false;

    try {
      await PlotService.deletePlot(fieldId, plotId);
      setPlots(prev => prev.filter(p => p.plotId !== plotId));
      return true;
    } catch (err: any) {
      console.error('Error eliminando plot:', err);
      return false;
    }
  };

  return {
    plots,
    error,
    fetchPlots,
    createPlot,
    updatePlot,
    updatePlotStatus,
    deletePlot
  };
}
