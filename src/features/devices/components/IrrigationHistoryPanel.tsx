import { useTranslation } from 'react-i18next';
import { GiWaterDrop } from 'react-icons/gi';
import type { IrrigationLogResource } from '../../../features/irrigation-control/types/irrigation.types';

interface IrrigationHistoryPanelProps {
  logs: IrrigationLogResource[];
  loading: boolean;
}

export function IrrigationHistoryPanel({ logs, loading }: IrrigationHistoryPanelProps) {
  const { t } = useTranslation();
  
  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <GiWaterDrop className="w-8 h-8 text-[#3563BA]" />
        <h2 className="text-2xl font-bold text-gray-900">{t('irrigation.history')}</h2>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {loading ? (
          <p className="text-gray-500 text-center py-4">{t('common.loading')}</p>
        ) : logs.length > 0 ? (
          logs.map((log) => (
            <div 
              key={log.logId} 
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`font-semibold text-lg ${
                  log.decision === 'IRRIGATE' ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {log.decision === 'IRRIGATE' ? t('irrigation.irrigated') : `⏸ ${t('irrigation.noAction')}`}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDateTime(log.decisionTimestamp)}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{log.reason}</p>
              <div className="flex gap-4 text-sm text-gray-600 bg-gray-100 rounded p-2">
                <span>Humidity: <strong>{log.humidityReading.toFixed(1)}%</strong></span>
                <span>Threshold: <strong>{log.humidityThreshold.toFixed(1)}%</strong></span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <GiWaterDrop className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">{t('irrigation.noHistoryYet')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
