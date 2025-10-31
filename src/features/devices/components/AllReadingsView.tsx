import {  useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { DataTable, type TableColumn } from '../../../shared/components/ui/DataTable';

interface Reading {
  id: string;
  timestamp: string;
  temperature: string;
  temperatureAlt: string;
  humidity: string;
  soilHumidity: string;
  ph: string;
  soilTemperature: string;
}

const mockReadings: Reading[] = [
  {
    id: '1',
    timestamp: '09/10/2025 12:35',
    temperature: '25°',
    temperatureAlt: '25°',
    humidity: '58%',
    soilHumidity: '69%',
    ph: '5.7',
    soilTemperature: '28°'
  },
  {
    id: '2',
    timestamp: '09/10/2025 12:30',
    temperature: '26°',
    temperatureAlt: '26°',
    humidity: '59%',
    soilHumidity: '67%',
    ph: '5.8',
    soilTemperature: '28°'
  },
  {
    id: '3',
    timestamp: '09/10/2025 12:25',
    temperature: '25°',
    temperatureAlt: '25°',
    humidity: '60%',
    soilHumidity: '68%',
    ph: '5.8',
    soilTemperature: '29°'
  },
  {
    id: '4',
    timestamp: '09/10/2025 12:20',
    temperature: '25°',
    temperatureAlt: '25°',
    humidity: '60%',
    soilHumidity: '67%',
    ph: '5.9',
    soilTemperature: '29°'
  },
  {
    id: '5',
    timestamp: '09/10/2025 12:15',
    temperature: '25°',
    temperatureAlt: '25°',
    humidity: '58%',
    soilHumidity: '69%',
    ph: '5.7',
    soilTemperature: '28°'
  },
  {
    id: '6',
    timestamp: '09/10/2025 12:10',
    temperature: '26°',
    temperatureAlt: '26°',
    humidity: '59%',
    soilHumidity: '67%',
    ph: '5.8',
    soilTemperature: '28°'
  },
  {
    id: '7',
    timestamp: '09/10/2025 12:05',
    temperature: '25°',
    temperatureAlt: '25°',
    humidity: '60%',
    soilHumidity: '68%',
    ph: '5.8',
    soilTemperature: '29°'
  },
  {
    id: '8',
    timestamp: '09/10/2025 12:00',
    temperature: '25°',
    temperatureAlt: '25°',
    humidity: '60%',
    soilHumidity: '67%',
    ph: '5.9',
    soilTemperature: '29°'
  },
];

const columns: TableColumn[] = [
  { key: 'timestamp', label: 'Reading Date', width: '15%' },
  { key: 'temperature', label: 'Temperature', width: '12%' },
  { key: 'temperatureAlt', label: 'Temperature', width: '12%' },
  { key: 'humidity', label: 'Humidity', width: '12%' },
  { key: 'soilHumidity', label: 'Soil Humidity', width: '15%' },
  { key: 'ph', label: 'pH', width: '10%' },
  { key: 'soilTemperature', label: 'Soil Temperature', width: '15%' },
];

export function AllReadingsView() {

  const navigate = useNavigate();

  const mockDevice = {
    name: 'Sensor 2'
  };

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
          Devices / {mockDevice.name} / All Readings
        </h1>
      </div>

      {/*  Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">All Device Readings</h2>
        <p className="text-gray-600">
          View the total data from the sensor device.
        </p>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={mockReadings}
        getRowKey={(item) => item.id}
        renderCell={(item, columnKey) => {
          const value = item[columnKey as keyof Reading];
          return <span className="text-gray-900">{value}</span>;
        }}
        showActions={false}
      />
    </div>
  );
}
