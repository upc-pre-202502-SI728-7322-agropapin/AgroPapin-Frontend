import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { AreaChart } from '../../../shared/components/charts/AreaChart';
import { StatusBadge } from '../../../shared/components/ui/StatusBadge';
import type { ChartData } from '../types/device.types';

const mockDevice = {
  id: '2',
  name: 'Sensor 2',
  type: 'sensor' as const,
  status: 'active' as const,
  location: 'Zone B'
};

const mockCurrentReadings = {
  temperature: '25°C',
  humidity: '60%',
  soilHumidity: '40%',
  ph: '5.6'
};

const mockConfigurations = {
  samplingRate: 5,
  alertThreshold: 'Medium'
};

export function DeviceDetailsView() {
  const { cropId, deviceId } = useParams<{ cropId: string; deviceId: string }>();
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState<'temperature' | 'humidity' | 'soilHumidity' | 'ph'>('temperature');

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
    { day: 'Mon', value: 55 },
    { day: 'Tue', value: 60 },
    { day: 'Wed', value: 58 },
    { day: 'Thu', value: 62 },
    { day: 'Fri', value: 65 },
    { day: 'Sat', value: 63 },
    { day: 'Sun', value: 60 },
  ];

  const soilHumidityData: ChartData[] = [
    { day: 'Mon', value: 35 },
    { day: 'Tue', value: 38 },
    { day: 'Wed', value: 42 },
    { day: 'Thu', value: 40 },
    { day: 'Fri', value: 37 },
    { day: 'Sat', value: 39 },
    { day: 'Sun', value: 40 },
  ];

  const phData: ChartData[] = [
    { day: 'Mon', value: 5.4 },
    { day: 'Tue', value: 5.6 },
    { day: 'Wed', value: 5.5 },
    { day: 'Thu', value: 5.7 },
    { day: 'Fri', value: 5.8 },
    { day: 'Sat', value: 5.6 },
    { day: 'Sun', value: 5.6 },
  ];

  const chartDataMap = {
    temperature: { data: temperatureData, unit: '°C', color: '#4ade80', label: 'Temperature' },
    humidity: { data: humidityData, unit: '%', color: '#60a5fa', label: 'Humidity' },
    soilHumidity: { data: soilHumidityData, unit: '%', color: '#a78bfa', label: 'Soil Humidity' },
    ph: { data: phData, unit: '', color: '#f472b6', label: 'pH' }
  };

  const currentChart = chartDataMap[selectedMetric];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header with back button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-4 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>Devices</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          Devices / {mockDevice.name}
        </h1>
      </div>

      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Device Details</h2>
        <p className="text-gray-600">
          Manage and view the configuration and information of the selected device.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Device Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              Device Information
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Device Name</p>
                <p className="text-gray-900 font-medium">{mockDevice.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Device Type</p>
                <p className="text-gray-900 font-medium capitalize">{mockDevice.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <StatusBadge status={mockDevice.status} />
              </div>
            </div>
          </div>

          {/* Historical Information with chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Historical Information</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59] bg-white text-sm"
              >
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="soilHumidity">Soil Humidity</option>
                <option value="ph">pH</option>
              </select>
            </div>

            {/* chart  */}
            <AreaChart
              title={`${currentChart.label} Over Time (Last 7 Days)`}
              subtitle="+2%"
              data={currentChart.data}
              color={currentChart.color}
              unit={currentChart.unit}
            />
          </div>
        </div>

        {/* Right column  */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Readings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Current Readings</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Temperature</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockCurrentReadings.temperature}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Humidity</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockCurrentReadings.humidity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Soil Humidity</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockCurrentReadings.soilHumidity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">pH</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockCurrentReadings.ph}</p>
              </div>
            </div>
            <button className="w-full mt-6 bg-[#3E7C59] text-white py-3 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold">
              All Readings →
            </button>
          </div>

          {/* Configurations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Configurations</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Sampling Rate (minutes)
                </label>
                <input
                  type="number"
                  value={mockConfigurations.samplingRate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Alert Threshold
                </label>
                <select
                  value={mockConfigurations.alertThreshold}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                  disabled
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
