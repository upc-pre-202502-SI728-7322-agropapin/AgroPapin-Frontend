import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';
import IrrigationService from '../../../services/irrigation/IrrigationService';
import { FieldService } from '../../../services/field/FieldService';
import PlotService from '../../../services/plot/PlotService';
import type { IrrigationLogResource } from '../types/irrigation.types';
import type { PlotResource } from '../../plot-list/types/plot.types.tsx';
import { DataTable } from '../../../shared/components/ui/DataTable';
import fieldImage from '../../../assets/campo-predeterminado.png';

export function IrrigationHistoryView() {
  const { t } = useTranslation();
  const { plotId } = useParams<{ plotId?: string }>();
  const navigate = useNavigate();
  const [plots, setPlots] = useState<PlotResource[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<PlotResource | null>(null);
  const [irrigationLogs, setIrrigationLogs] = useState<IrrigationLogResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [logsLoading, setLogsLoading] = useState(false);

  useEffect(() => {
    const loadPlots = async () => {
      setLoading(true);
      try {
        const field = await FieldService.getField();
        if (field?.id || field?.fieldId) {
          const fieldId = (field.id || field.fieldId)!;
          const plotsData = await PlotService.getPlots(fieldId);
          setPlots(plotsData);
          
          if (plotId) {
            const plot = plotsData.find(p => p.plotId === plotId);
            if (plot) {
              setSelectedPlot(plot);
              await loadIrrigationLogs(plotId);
            }
          }
        }
      } catch (error) {
        console.error('Error loading plots:', error);
        setPlots([]);
      } finally {
        setLoading(false);
      }
    };

    loadPlots();
  }, [plotId]);

  const loadIrrigationLogs = async (plotId: string) => {
    setLogsLoading(true);
    try {
      const logs = await IrrigationService.getIrrigationLogs(plotId);
      setIrrigationLogs(Array.isArray(logs) ? logs : []);
    } catch (error) {
      console.error('Error loading irrigation logs:', error);
      setIrrigationLogs([]);
    } finally {
      setLogsLoading(false);
    }
  };

  const handlePlotClick = async (plot: PlotResource) => {
    setSelectedPlot(plot);
    await loadIrrigationLogs(plot.plotId);
    navigate(`/plots/${plot.plotId}/irrigation-history`, { replace: true });
  };

  const handleBack = () => {
    if (selectedPlot) {
      setSelectedPlot(null);
      setIrrigationLogs([]);
      navigate('/irrigation-history', { replace: true });
    } else {
      navigate(-1);
    }
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatReason = (reason: string) => {
    const reasonMap: { [key: string]: string } = {
      'MANUAL_ACTIVATION': t('irrigation.manual'),
      'AUTOMATED_LOW_HUMIDITY': t('irrigation.automated'),
      'AUTOMATED_THRESHOLD_EXCEEDED': t('irrigation.automated'),
      'SCHEDULED_IRRIGATION': t('irrigation.scheduled'),
      'EMERGENCY_ACTIVATION': t('irrigation.active')
    };
    
    return reasonMap[reason] || reason;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'EMPTY':
        return t('common.none');
      case 'PLANTED':
        return t('crops.growing');
      case 'HARVESTED':
        return t('crops.harvested');
      default:
        return status;
    }
  };

  const columns = [
    { key: 'decision', label: t('irrigation.decision'), width: '15%' },
    { key: 'decisionTimestamp', label: t('devices.dateTime'), width: '20%' },
    { key: 'reason', label: t('irrigation.reason'), width: '30%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>{t('common.back')}</span>
        </button>

        {!selectedPlot ? (
          <>
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
              {t('plots.selectPlot')}
            </h1>

            {loading ? (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-gray-500 text-center py-8">{t('common.loading')}</p>
              </div>
            ) : plots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plots.map((plot) => (
                    <div
                      key={plot.plotId}
                      className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <div className="py-3 px-4 border-b border-gray-200">
                        <div className="ml-2 flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{plot.plotName}</h3>
                            <p className="text-sm text-gray-600">{plot.area} m²</p>
                          </div>
                        </div>
                      </div>

                      <div className="relative h-48 overflow-hidden">
                        <img src={fieldImage} alt={`Plot ${plot.plotName}`} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            plot.status === 'PLANTED' 
                              ? 'bg-green-100 text-green-800' 
                              : plot.status === 'HARVESTED'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {getStatusLabel(plot.status)}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <button
                          onClick={() => handlePlotClick(plot)}
                          className="w-full bg-[#3E7C59] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d5f43] transition-colors"
                        >
                          {t('irrigation.history')}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-gray-500 text-center py-8">{t('plots.noPlotsFound')}</p>
              </div>
            )}
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
              {t('irrigation.history')}
            </h1>
            <p className="text-xl text-gray-600 text-center mb-8">
              {selectedPlot.plotName}
            </p>

            <div className="bg-white rounded-lg shadow-lg p-8">
              {logsLoading ? (
                <p className="text-gray-500 text-center py-8">{t('common.loading')}</p>
              ) : (
                <DataTable
                  columns={columns}
                  data={irrigationLogs}
                  getRowKey={(item) => item.logId}
                  renderCell={(item, columnKey) => {
                    switch (columnKey) {
                      case 'decision':
                        return (
                          <span className={`font-semibold ${
                            item.decision === 'IRRIGATE' ? 'text-blue-600' : 'text-gray-600'
                          }`}>
                            {item.decision === 'IRRIGATE' ? t('irrigation.irrigated') : t('irrigation.noAction')}
                          </span>
                        );
                      case 'decisionTimestamp':
                        return <span>{formatDateTime(item.decisionTimestamp)}</span>;
                      case 'reason':
                        return <span>{formatReason(item.reason)}</span>;
                      default:
                        return <span>{String(item[columnKey as keyof IrrigationLogResource])}</span>;
                    }
                  }}
                  showActions={false}
                  emptyMessage={t('irrigation.noHistoryFound')}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
