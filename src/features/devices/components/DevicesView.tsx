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
import type { Device, ChartData } from '../types/device.types';

export function DevicesView() {
  const navigate = useNavigate();
  const { id: cropId } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'all' | 'sensors' | 'actuators'>('all');
  const [activeSection, setActiveSection] = useState<'devices' | 'alerts'>('devices');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null);
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Sensor 1',
      type: 'sensor',
      status: 'active',
      location: 'Zone A'
    },
    {
      id: '2',
      name: 'Sensor 2',
      type: 'sensor',
      status: 'inactive',
      location: 'Zone B'
    },
    {
      id: '3',
      name: 'Sensor 3',
      type: 'sensor',
      status: 'active',
      location: 'Zone C'
    },
    {
      id: '4',
      name: 'Actuator 1',
      type: 'actuator',
      status: 'active',
      location: 'Zone A'
    },
  ]);

  const tabs = [
    { id: 'all', label: 'All' },
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
    if (activeTab === 'all') return true;
    if (activeTab === 'sensors') return device.type === 'sensor';
    if (activeTab === 'actuators') return device.type === 'actuator';
    return true;
  });

  const handleAddDevice = () => {
    setSelectedDevice(null);
    setIsModalOpen(true);
  };

  const handleRowClick = (deviceId: string) => {
    navigate(`/devices/${cropId}/details/${deviceId}`);
  };

  const handleEdit = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (device) {
      setSelectedDevice(device);
      setIsModalOpen(true);
    }
  };

  const handleDelete = (deviceId: string) => {
    setDeviceToDelete(deviceId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deviceToDelete) {
      setDevices(devices.filter(device => device.id !== deviceToDelete));
      setDeviceToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSaveDevice = (data: { name: string; type: 'sensor' | 'actuator'; location: string }) => {
    if (selectedDevice) {
      // Edit
      setDevices(devices.map(device =>
        device.id === selectedDevice.id
          ? { ...device, name: data.name, type: data.type, location: data.location }
          : device
      ));
    } else {
      // Add 
      const newDevice: Device = {
        id: String(devices.length + 1),
        name: data.name,
        type: data.type,
        status: 'active',
        location: data.location,
      };
      setDevices([...devices, newDevice]);
    }
    setSelectedDevice(null);
  };

  const deviceToDeleteName = devices.find(d => d.id === deviceToDelete)?.name || '';

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DevicesSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />

      {/* Main content */}
      <div className="flex-1">
        {activeSection === 'alerts' ? (
          <AlertsView />
        ) : (
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Devices</h1>
              <AddButton onClick={handleAddDevice} label="Add Device" />
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <Tabs 
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={(tabId) => setActiveTab(tabId as 'all' | 'sensors' | 'actuators')}
              />
            </div>

            {/* Charts  */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">General Data</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AreaChart
                  title="Temperature Over Time (Last 7 Days)"
                  subtitle=""
                  data={temperatureData}
                  color="#4ade80"
                  unit="°C"
                />
                <AreaChart
                  title="Humidity Over Time (Last 7 Days)"
                  subtitle=""
                  data={humidityData}
                  color="#60a5fa"
                  unit="%"
                />
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
