import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AddButton } from '../../../shared/components/ui/AddButton';
import { Tabs } from '../../../shared/components/ui/Tabs';
import { DevicesList } from './DevicesList';
import { DeviceModal } from './DeviceModal';
import { DeleteDeviceModal } from './DeleteDeviceModal';
import { AreaChart } from '../../../shared/components/charts/AreaChart';
import { DevicesSidebar } from './DevicesSidebar';
import { LiveMetricsView } from './LiveMetricsView';
import { IrrigationView } from './IrrigationView';
import { useActuators, useSensors, useTelemetry } from '../hooks';
import { useAuth } from '../../auth/context/AuthContext';
import { FloatingChatButton } from '../../../shared/components/ui/FloatingChatButton';
import ActuatorService from '../../../services/device/ActuatorService';
import SensorService from '../../../services/device/SensorService';
import type { Device } from '../types/device.types';
import type { ActuatorResource } from '../types/actuator.types';
import type { SensorResource } from '../types/sensor.types';

export function DevicesView() {
  const { t } = useTranslation();
  const { plotId } = useParams<{ plotId: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('ROLE_ADMINISTRATOR');
  
  console.log('Current plotId from URL:', plotId);
  
  const [activeTab, setActiveTab] = useState<'sensors' | 'actuators'>('sensors');
  const [activeSection, setActiveSection] = useState<'devices' | 'metrics' | 'irrigation'>('devices');
  const [selectedDays, setSelectedDays] = useState<number>(1); // 1 día predeterminado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);

  useEffect(() => {
    const section = searchParams.get('section');
    if (section === 'metrics') {
      setActiveSection('metrics');
    } else if (section === 'irrigation') {
      setActiveSection('irrigation');
    }
  }, [searchParams]);

  const { actuators, refetch: refetchActuators } = useActuators(plotId);
  const { sensors, refetch: refetchSensors } = useSensors(plotId);
  const { telemetryData, isLoading, refetch: refetchTelemetry } = useTelemetry(plotId, selectedDays);

  console.log('Telemetry data in DevicesView:', telemetryData);
  console.log('Number of telemetry points:', telemetryData.length);

  // une a los actuadores y sensores en un único array de devices para mostrarlos en la tabla
  const devices: Device[] = [
    ...sensors.map((sensor: SensorResource) => ({
      id: sensor.sensorId,
      serialNumber: sensor.serialNumber,
      deviceType: 'Sensor',
      model: sensor.model,
      version: sensor.version,
      type: 'sensor' as const,
      status: sensor.status.toLowerCase() as 'online' | 'offline' | 'maintenance' | 'provisioned',
    })),
    ...actuators.map((actuator: ActuatorResource) => ({
      id: actuator.actuatorId,
      serialNumber: actuator.serialNumber,
      deviceType: actuator.actuatorType,
      model: actuator.model,
      version: actuator.version,
      type: 'actuator' as const,
      status: actuator.status.toLowerCase() as 'online' | 'offline' | 'maintenance' | 'provisioned',
    })),
  ];

  const tabs = [
    { id: 'sensors', label: t('devices.sensors') },
    { id: 'actuators', label: t('devices.actuators') },
  ];

  const filteredDevices = devices.filter(device => {
    if (activeTab === 'sensors') return device.type === 'sensor';
    if (activeTab === 'actuators') return device.type === 'actuator';
    return true;
  });

  const handleAddDevice = () => {
    if (isAdmin) return;
    setSelectedDevice(null);
    setIsModalOpen(true);
  };

  const handleDelete = (deviceId: string) => {
    if (isAdmin) return;
    setDeviceToDelete(deviceId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deviceToDelete) return;

    try {
      const device = devices.find(d => d.id === deviceToDelete);
      if (!device) return;

      if (device.type === 'sensor') {
        await SensorService.deleteSensor(deviceToDelete);
      } else {
        await ActuatorService.deleteActuator(deviceToDelete);
      }

      setDeviceToDelete(null);
      setIsDeleteModalOpen(false);
      await refetchActuators();
      await refetchSensors();
    } catch (error: any) {
      alert('Error al eliminar el dispositivo: ' + (error.response?.data?.message || 'Error desconocido'));
    }
  };

  const handleSaveDevice = async (data: { 
    serialNumber: string; 
    type: 'sensor' | 'actuator'; 
    deviceType: string;
    model: string;
    version: string;
  }) => {
    if (!plotId) return;

    try {
      if (data.type === 'sensor') {
        await SensorService.createSensor({
          serialNumber: data.serialNumber,
          plotId: plotId,
          model: data.model,
          version: data.version,
        });
      } else {
        await ActuatorService.createActuator({
          serialNumber: data.serialNumber,
          plotId: plotId,
          model: data.model,
          version: data.version,
          actuatorType: data.deviceType as any,
        });
      }
      
      setIsModalOpen(false);
      setSelectedDevice(null);

      await refetchActuators();
      await refetchSensors();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      alert('Error al crear el dispositivo: ' + (errorMessage || 'Error desconocido'));
    }
  };

  const deviceToDeleteName = devices.find(d => d.id === deviceToDelete)?.serialNumber || '';

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DevicesSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {activeSection === 'metrics' ? (
          <LiveMetricsView />
        ) : activeSection === 'irrigation' ? (
          <IrrigationView />
        ) : (
          <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{t('devices.title')}</h1>
              {!isAdmin && <AddButton onClick={handleAddDevice} label={t('devices.addDevice')} />}
            </div>

            {/* Tabs */}
            <div className="mb-8 overflow-x-auto">
              <Tabs 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={(tabId) => setActiveTab(tabId as 'sensors' | 'actuators')}
              />
            </div>

            {/* Charts */}
            {activeTab === 'sensors' && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    {t('devices.sensorMetrics')} ({t('devices.last')} {selectedDays} {selectedDays === 1 ? t('devices.day') : t('devices.days')})
                  </h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={refetchTelemetry}
                      disabled={isLoading}
                      className="p-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3E7C59] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      title="Refresh charts"
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
                    </button>
                    <select
                      value={selectedDays}
                      onChange={(e) => setSelectedDays(Number(e.target.value))}
                      className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3E7C59] cursor-pointer"
                    >
                      <option value={1}>{t('devices.last')} 1 {t('devices.day')}</option>
                      <option value={7}>{t('devices.last')} 7 {t('devices.days')}</option>
                      <option value={30}>{t('devices.last')} 30 {t('devices.days')}</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <div className="min-w-0">
                    <AreaChart
                      title={t('devices.temperature')}
                      subtitle=""
                      data={telemetryData.map(d => ({ time: d.time, value: d.temperature || 0 }))}
                      color="#ef4444"
                      unit="°C"
                    />
                  </div>
                  <div className="min-w-0">
                    <AreaChart
                      title={t('devices.humidity')}
                      subtitle=""
                      data={telemetryData.map(d => ({ time: d.time, value: d.humidity || 0 }))}
                      color="#3b82f6"
                      unit="%"
                    />
                  </div>
                  <div className="min-w-0">
                    <AreaChart
                      title={t('devices.soilMoisture')}
                      subtitle=""
                      data={telemetryData.map(d => ({ time: d.time, value: d.soilMoisture || 0 }))}
                      color="#10b981"
                      unit="%"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Devices List */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('devices.deviceList')}</h2>
              <DevicesList 
                devices={filteredDevices}
                onDelete={isAdmin ? undefined : handleDelete}
                isAdmin={isAdmin}
              />
            </div>
            
          </div>
        )}
      </div>

      {/* Modals */}
      <DeviceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDevice(null);
        }}
        onSave={handleSaveDevice}
        device={selectedDevice}
      />

      <DeleteDeviceModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setDeviceToDelete(null);
        }}
        deviceName={deviceToDeleteName}
      />

      <FloatingChatButton />
    </div>
  );
}
