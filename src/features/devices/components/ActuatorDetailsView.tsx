import { useParams, useNavigate } from 'react-router-dom';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import { AreaChart } from '../../../shared/components/charts/AreaChart';
import { StatusBadge } from '../../../shared/components/ui/StatusBadge';
import type { ChartData } from '../types/device.types';

const mockDevice = {
  id: '4',
  name: 'Actuator 2',
  type: 'actuator' as const,
  status: 'active' as const,
  location: 'Zone A'
};

const mockLastIrrigation = {
  time: '1 min',
  quantity: '30L',
  date: '05/10/2025 10:00am'
};

const mockConfigurations = {
  samplingRate: 5,
  alertThreshold: 'Medium'
};

export function ActuatorDetailsView() {
  const { cropId, deviceId } = useParams<{ cropId: string; deviceId: string }>();
  const navigate = useNavigate();


  const waterLevelData: ChartData[] = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 70 },
    { day: 'Wed', value: 68 },
    { day: 'Thu', value: 75 },
    { day: 'Fri', value: 80 },
    { day: 'Sat', value: 78 },
    { day: 'Sun', value: 72 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header  */}
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
        {/* Left  */}
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

          {/* Historical Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Historical Information</h3>
            </div>

            {/* Water Level chart */}
            <AreaChart
              title="Water Level Over Time (Last 7 Days)"
              subtitle="+2%"
              data={waterLevelData}
              color="#60a5fa"
              unit="L"
            />
          </div>
        </div>

        {/* Right  */}
        <div className="lg:col-span-1 space-y-6">
          {/* Last Irrigation ( */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Last Irrigation</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Time</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockLastIrrigation.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Quantity</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockLastIrrigation.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Date</p>
                <p className="text-gray-900 font-semibold text-2xl">{mockLastIrrigation.date}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/devices/${cropId}/readings/${deviceId}`)}
              className="flex flex-row items-center justify-center gap-3 w-full mt-6 bg-[#3E7C59] text-white py-3 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold">
              All Readings
                <FaArrowRight />

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
