import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ActivateIrrigationModal } from './ActivateIrrigationModal';
import { useActuators } from '../hooks';
import { useAuth } from '../../auth/context/AuthContext';
import IrrigationService from '../../../services/irrigation/IrrigationService';
import type { IrrigationLogResource } from '../../../features/irrigation-control/types/irrigation.types';
import { DataTable } from '../../../shared/components/ui/DataTable';

export function IrrigationView() {
  const { plotId } = useParams<{ plotId: string }>();
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('ROLE_ADMINISTRATOR');
  
  const [isIrrigationModalOpen, setIsIrrigationModalOpen] = useState(false);
  const [irrigationLogs, setIrrigationLogs] = useState<IrrigationLogResource[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);

  const { actuators } = useActuators(plotId);

  useEffect(() => {
    const loadIrrigationLogs = async () => {
      if (!plotId) return;
      
      setLogsLoading(true);
      try {
        const logs = await IrrigationService.getIrrigationLogs(plotId);
        setIrrigationLogs(logs);
      } catch (error) {
        console.error('Error loading irrigation logs:', error);
        setIrrigationLogs([]);
      } finally {
        setLogsLoading(false);
      }
    };

    loadIrrigationLogs();
  }, [plotId]);

  const handleActivateIrrigation = async (actuatorId: string, minutes: number) => {
    try {
      await IrrigationService.activateIrrigation({ actuatorId, minutes });
      
      if (plotId) {
        const logs = await IrrigationService.getIrrigationLogs(plotId);
        setIrrigationLogs(logs);
      }
    } catch (error: any) {
      console.error('Error activating irrigation:', error);
      throw error;
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
      'MANUAL_ACTIVATION': 'Manual activation by user',
      'AUTOMATED_LOW_HUMIDITY': 'Automated: Low humidity detected',
      'AUTOMATED_THRESHOLD_EXCEEDED': 'Automated: Humidity threshold exceeded',
      'SCHEDULED_IRRIGATION': 'Scheduled irrigation',
      'EMERGENCY_ACTIVATION': 'Emergency activation'
    };
    return reasonMap[reason] || reason;
  };

  const columns = [
    { key: 'decision', label: 'Decision', width: '12%' },
    { key: 'decisionTimestamp', label: 'Date & Time', width: '18%' },
    { key: 'reason', label: 'Reason', width: '35%' },
    { key: 'humidityReading', label: 'Humidity', width: '15%' },
    { key: 'humidityThreshold', label: 'Threshold', width: '15%' }
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Irrigation Management</h1>
        {!isAdmin && (
          <button
            onClick={() => setIsIrrigationModalOpen(true)}
            className="flex items-center gap-2 bg-[#3563BA] hover:bg-[#4A77C9] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Activate Irrigation
          </button>
        )}
      </div>

      {/* Irrigation History */}
      {logsLoading ? (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <p className="text-gray-500 text-center py-8">Loading irrigation history...</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={irrigationLogs}
          getRowKey={(log: IrrigationLogResource) => log.decisionTimestamp}
          renderCell={(log: IrrigationLogResource, columnKey: string) => {
            switch (columnKey) {
              case 'decision':
                return (
                  <span className={`font-semibold text-lg ${
                    log.decision === 'IRRIGATE' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {log.decision === 'IRRIGATE' ? 'Irrigated' : 'No Action'}
                  </span>
                );
              case 'decisionTimestamp':
                return <span>{formatDateTime(log.decisionTimestamp)}</span>;
              case 'reason':
                return <span>{formatReason(log.reason)}</span>;
              case 'humidityReading':
                return <span>{log.humidityReading.toFixed(1)}%</span>;
              case 'humidityThreshold':
                return <span>{log.humidityThreshold.toFixed(1)}%</span>;
              default:
                return <span>{String(log[columnKey as keyof IrrigationLogResource])}</span>;
            }
          }}
          showActions={false}
          emptyMessage="No irrigation history yet"
        />
      )}

      {/* Modal */}
      <ActivateIrrigationModal
        isOpen={isIrrigationModalOpen}
        onClose={() => setIsIrrigationModalOpen(false)}
        onActivate={handleActivateIrrigation}
        actuators={actuators}
      />
    </div>
  );
}
