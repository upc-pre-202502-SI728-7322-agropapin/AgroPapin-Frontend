import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AddButton } from '../../../shared/components/ui/AddButton';
import { Tabs } from '../../../shared/components/ui/Tabs';
import { DevicesList } from './DevicesList';
import { DeviceModal } from './DeviceModal';
import { DeleteDeviceModal } from './DeleteDeviceModal';
import { AreaChart } from '../../../shared/components/charts/AreaChart';
import { DevicesSidebar } from './DevicesSidebar';
import { AlertsView } from './AlertsView';
import { useActuators, useSensors } from '../hooks';
import ActuatorService from '../../../services/device/ActuatorService';
import SensorService from '../../../services/device/SensorService';
import type { Device, ChartData } from '../types/device.types';
import type { ActuatorResource } from '../types/actuator.types';
import type { SensorResource } from '../types/sensor.types';

export function DevicesView() {
  const navigate = useNavigate();
  const { plotId } = useParams<{ plotId: string }>();
  const [activeTab, setActiveTab] = useState<'sensors' | 'actuators'>('sensors');
  const [activeSection, setActiveSection] = useState<'devices' | 'alerts'>('devices');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);

  const { actuators, refetch: refetchActuators } = useActuators(plotId);
  const { sensors, refetch: refetchSensors } = useSensors(plotId);

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


  const temperatureData: ChartData[] = [
    { day: 'Mon', value: 24 },
    { day: 'Tue', value: 26 },
    { day: 'Wed', value: 23 },
    { day: 'Thu', value: 25 },
    { day: 'Fri', value: 28 },
    { day: 'Sat', value: 27 },
    { day: 'Sun', value: 25 },
  ];


  const humidityData: ChartData[] = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 68 },
    { day: 'Wed', value: 70 },
    { day: 'Thu', value: 66 },
    { day: 'Fri', value: 64 },
    { day: 'Sat', value: 62 },
    { day: 'Sun', value: 65 },
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
    navigate(`/devices/details/${deviceId}`);
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

            {/* Charts  */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">General Data</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="min-w-0">
                  <AreaChart
                    title="Temperature Over Time (Last 7 Days)"
                    subtitle=""
                    data={temperatureData}
                    color="#4ade80"
                    unit="°C"
                  />
                </div>
                <div className="min-w-0">
                  <AreaChart
                    title="Humidity Over Time (Last 7 Days)"
                    subtitle=""
                    data={humidityData}
                    color="#60a5fa"
                    unit="%"
                  />
                </div>
              </div>
            </div>

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
