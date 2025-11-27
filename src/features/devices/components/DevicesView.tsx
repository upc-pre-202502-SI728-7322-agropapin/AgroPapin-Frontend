import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AddButton } from '../../../shared/components/ui/AddButton';
import { Tabs } from '../../../shared/components/ui/Tabs';
import { DevicesList } from './DevicesList';
import { DeviceModal } from './DeviceModal';
import { DeleteDeviceModal } from './DeleteDeviceModal';
import { AreaChart } from '../../../shared/components/charts/AreaChart';
import { DevicesSidebar } from './DevicesSidebar';
import { AlertsView } from './AlertsView';
import { useActuators, useSensors, useTelemetry } from '../hooks';
import ActuatorService from '../../../services/device/ActuatorService';
import SensorService from '../../../services/device/SensorService';
import type { Device } from '../types/device.types';
import type { ActuatorResource } from '../types/actuator.types';
import type { SensorResource } from '../types/sensor.types';

export function DevicesView() {
  const { plotId } = useParams<{ plotId: string }>();
  
  console.log('Current plotId from URL:', plotId);
  
  const [activeTab, setActiveTab] = useState<'sensors' | 'actuators'>('sensors');
  const [activeSection, setActiveSection] = useState<'devices' | 'alerts'>('devices');
  const [selectedDays, setSelectedDays] = useState<number>(1); // 1 día predeterminado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);

  const { actuators, refetch: refetchActuators } = useActuators(plotId);
  const { sensors, refetch: refetchSensors } = useSensors(plotId);
  const { telemetryData } = useTelemetry(plotId, selectedDays);

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
    { id: 'sensors', label: 'Sensors' },
    { id: 'actuators', label: 'Actuators' },
  ];

  const filteredDevices = devices.filter(device => {
    if (activeTab === 'sensors') return device.type === 'sensor';
    if (activeTab === 'actuators') return device.type === 'actuator';
    return true;
  });

  const handleAddDevice = () => {
    setSelectedDevice(null);
    setIsModalOpen(true);
  };

  const handleRowClick = (deviceId: string) => {
    // REVISAR SI TODAVÍA VA A EXISTIR LA VISTA DETALLADA DE SENSORES
    // navigate(`/devices/details/${deviceId}`);
  };

  const handleEdit = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      // TODO: NO HAY EDIT
      setSelectedDevice(device);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (deviceId: string) => {
    setDeviceToDelete(deviceId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deviceToDelete) {
      // TODO: NO HAY DELETE
      setDeviceToDelete(null);
      setIsDeleteModalOpen(false);
      await refetchActuators();
      await refetchSensors();
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
          sensorType: data.deviceType as any,
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
      if (errorMessage && errorMessage.includes('Duplicate entry')) {
        alert('Ya existe un dispositivo de este tipo para esta parcela. Elimina el existente primero.');
      } else {
        alert('Error al crear el dispositivo: ' + (errorMessage || 'Error desconocido'));
      }
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
        {activeSection === 'alerts' ? (
          <AlertsView />
        ) : (
          <div className="p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Devices</h1>
              <AddButton onClick={handleAddDevice} label="Add Device" />
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
                    Sensor Metrics (Last {selectedDays} {selectedDays === 1 ? 'Day' : 'Days'})
                  </h2>
                  <div className="relative">
                    <select
                      value={selectedDays}
                      onChange={(e) => setSelectedDays(Number(e.target.value))}
                      className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3E7C59] cursor-pointer"
                    >
                      <option value={1}>Last 1 Day</option>
                      <option value={7}>Last 7 Days</option>
                      <option value={30}>Last 30 Days</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  <div className="min-w-0">
                    <AreaChart
                      title="Temperature"
                      subtitle=""
                      data={telemetryData.map(d => ({ time: d.time, value: d.temperature || 0 }))}
                      color="#ef4444"
                      unit="°C"
                    />
                  </div>
                  <div className="min-w-0">
                    <AreaChart
                      title="Humidity"
                      subtitle=""
                      data={telemetryData.map(d => ({ time: d.time, value: d.humidity || 0 }))}
                      color="#3b82f6"
                      unit="%"
                    />
                  </div>
                  <div className="min-w-0">
                    <AreaChart
                      title="Soil Moisture"
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
              <h2 className="text-xl font-bold text-gray-900 mb-4">Device List</h2>
              <DevicesList 
                devices={filteredDevices}
                onRowClick={handleRowClick}
                onEdit={handleEdit}
                onDelete={handleDelete}
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
        existingSensors={sensors}
        existingActuators={actuators}
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
    </div>
  );
}
