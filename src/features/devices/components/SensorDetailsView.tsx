import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
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

export function SensorDetailsView() {
  const { t } = useTranslation();
  const { cropId, deviceId } = useParams<{ cropId: string; deviceId: string }>();
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState<'temperature' | 'humidity' | 'soilHumidity' | 'ph'>('temperature');

  const temperatureData: ChartData[] = [
    { day: 'Mon', time: 'Mon', value: 24 },
    { day: 'Tue', time: 'Tue', value: 26 },
    { day: 'Wed', time: 'Wed', value: 23 },
    { day: 'Thu', time: 'Thu', value: 25 },
    { day: 'Fri', time: 'Fri', value: 28 },
    { day: 'Sat', time: 'Sat', value: 27 },
    { day: 'Sun', time: 'Sun', value: 25 },
  ];

  const humidityData: ChartData[] = [
    { day: 'Mon', time: 'Mon', value: 55 },
    { day: 'Tue', time: 'Tue', value: 60 },
    { day: 'Wed', time: 'Wed', value: 58 },
    { day: 'Thu', time: 'Thu', value: 62 },
    { day: 'Fri', time: 'Fri', value: 65 },
    { day: 'Sat', time: 'Sat', value: 63 },
    { day: 'Sun', time: 'Sun', value: 60 },
  ];

  const soilHumidityData: ChartData[] = [
    { day: 'Mon', time: 'Mon', value: 35 },
    { day: 'Tue', time: 'Tue', value: 38 },
    { day: 'Wed', time: 'Wed', value: 42 },
    { day: 'Thu', time: 'Thu', value: 40 },
    { day: 'Fri', time: 'Fri', value: 37 },
    { day: 'Sat', time: 'Sat', value: 39 },
    { day: 'Sun', time: 'Sun', value: 40 },
  ];

  const phData: ChartData[] = [
    { day: 'Mon', time: 'Mon', value: 5.4 },
    { day: 'Tue', time: 'Tue', value: 5.6 },
    { day: 'Wed', time: 'Wed', value: 5.5 },
    { day: 'Thu', time: 'Thu', value: 5.7 },
    { day: 'Fri', time: 'Fri', value: 5.8 },
    { day: 'Sat', time: 'Sat', value: 5.6 },
    { day: 'Sun', time: 'Sun', value: 5.6 },
  ];

  const chartDataMap = {
    temperature: { data: temperatureData, unit: '°C', color: '#4ade80', label: t('devices.temperature') },
    humidity: { data: humidityData, unit: '%', color: '#60a5fa', label: t('devices.humidity') },
    soilHumidity: { data: soilHumidityData, unit: '%', color: '#a78bfa', label: t('devices.soilHumidity') },
    ph: { data: phData, unit: '', color: '#f472b6', label: 'pH' }
  };

  const currentChart = chartDataMap[selectedMetric];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-4 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>{t('devices.title')}</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {t('devices.title')} / {mockDevice.name}
        </h1>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('devices.deviceDetails')}</h2>
        <p className="text-gray-600">
          {t('devices.manageConfiguration')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Device Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">
              {t('devices.deviceInformation')}
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('devices.deviceName')}</p>
                <p className="text-gray-900 font-medium">{mockDevice.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('devices.deviceType')}</p>
                <p className="text-gray-900 font-medium capitalize">{mockDevice.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('common.status')}</p>
                <StatusBadge status={mockDevice.status} />
              </div>
            </div>
          </div>

          {/* Historial info  */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">{t('devices.historicalInfo')}</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59] bg-white text-sm"
              >
                <option value="temperature">{t('devices.temperature')}</option>
                <option value="humidity">{t('devices.humidity')}</option>
                <option value="soilHumidity">{t('devices.soilHumidity')}</option>
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

        {/* Right   */}
        <div className="lg:col-span-1 space-y-6">
          {/* Current Readings */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('devices.currentReadings')}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('devices.temperature')}</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockCurrentReadings.temperature}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('devices.humidity')}</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockCurrentReadings.humidity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{t('devices.soilHumidity')}</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockCurrentReadings.soilHumidity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">pH</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockCurrentReadings.ph}</p>
              </div>
            </div>
            <button
                onClick={() => navigate(`/devices/${cropId}/readings/${deviceId}`)}
                className=" flex flex-row  gap-2 items-center justify-center w-full mt-6 bg-[#3E7C59] text-white py-3 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold"
            >
              {t('devices.allReadings')}

                <FaArrowRight/>

            </button>
          </div>

          {/* Configurations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('devices.configurations')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  {t('devices.samplingRate')}
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
                  {t('devices.alertThreshold')}
                </label>
                <select
                  value={mockConfigurations.alertThreshold}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                  disabled
                >
                  <option>{t('devices.low')}</option>
                  <option>{t('devices.medium')}</option>
                  <option>{t('devices.high')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
