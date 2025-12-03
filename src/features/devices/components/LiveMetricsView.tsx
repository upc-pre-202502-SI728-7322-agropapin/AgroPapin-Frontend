import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TelemetryService from '../../../services/telemetry/TelemetryService';
import type { ChartDataResource } from '../types/telemetry.types';
import { DataTable } from '../../../shared/components/ui/DataTable';

export function LiveMetricsView() {
  const { t } = useTranslation();
  const { plotId } = useParams<{ plotId: string }>();
  const [metrics, setMetrics] = useState<ChartDataResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    if (!plotId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      // jalar datos del último día
      const data = await TelemetryService.getHistoricalMetrics(plotId, 1);
      
      //desde la lectura más reciente a la más antigua
      setMetrics(data.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()));
    } catch (err: any) {
      // Si el endpoint no está disponible (400 o 404), mostrar mensaje informativo en lugar de error
      if (err.response?.status === 400 || err.response?.status === 404) {
        console.log('Historical metrics endpoint not available yet');
        setMetrics([]);
        setError(t('devices.noMetrics'));
      } else {
        setError(err instanceof Error ? err.message : 'Error loading metrics');
        console.error('Error fetching metrics:', err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    
    // Auto-refresh cada 60 segundos
    const interval = setInterval(fetchMetrics, 60000);
    return () => clearInterval(interval);
  }, [plotId]);

  const columns = [
    { key: 'time', label: 'Date & Time' },
    { key: 'temperature', label: 'Temperature' },
    { key: 'humidity', label: 'Humidity' },
    { key: 'soilMoisture', label: 'Soil Moisture' },
  ];

  const renderCell = (metric: ChartDataResource, columnKey: string) => {
    switch (columnKey) {
      case 'time':
        return (
          <div className="text-sm font-medium text-gray-900">
            {new Date(metric.time).toLocaleString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>
        );
      case 'temperature':
        return <div className="text-sm text-gray-600">{metric.temperature ?? 'N/A'}°C</div>;
      case 'humidity':
        return <div className="text-sm text-gray-600">{metric.humidity ?? 'N/A'}%</div>;
      case 'soilMoisture':
        return <div className="text-sm text-gray-600">{metric.soilMoisture ?? 'N/A'}%</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('devices.liveMetrics')}</h1>
        <button
          onClick={fetchMetrics}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3E7C59] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          title="Refresh metrics"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span>{t('common.refresh')}</span>
        </button>
      </div>

      {error && (
        <div className="text-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {isLoading && metrics.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Loading metrics...
        </div>
      )}

      {!isLoading && metrics.length === 0 && !error && (
        <div className="text-center py-12 text-gray-500">
          No metrics available for this plot
        </div>
      )}

      {metrics.length > 0 && (
        <DataTable
          columns={columns}
          data={metrics}
          getRowKey={(metric) => `${metric.time}-${Math.random()}`}
          renderCell={renderCell}
          showActions={false}
        />
      )}
    </div>
  );
}
