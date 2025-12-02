import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { DataTable, type TableColumn } from '../../../shared/components/ui/DataTable';

interface ActuatorReading {
  id: string;
  timestamp: string;
  time: string;
  quantity: string;
}


const mockActuatorReadings: ActuatorReading[] = [
  {
    id: '1',
    timestamp: '09/10/2025 12:35',
    time: '25°',
    quantity: '25°'
  },
  {
    id: '2',
    timestamp: '09/10/2025 12:30',
    time: '26°',
    quantity: '26°'
  },
  {
    id: '3',
    timestamp: '09/10/2025 12:25',
    time: '25°',
    quantity: '25°'
  },
  {
    id: '4',
    timestamp: '09/10/2025 12:20',
    time: '25°',
    quantity: '25°'
  },
  {
    id: '5',
    timestamp: '09/10/2025 12:15',
    time: '25°',
    quantity: '25°'
  },
  {
    id: '6',
    timestamp: '09/10/2025 12:10',
    time: '26°',
    quantity: '26°'
  },
  {
    id: '7',
    timestamp: '09/10/2025 12:05',
    time: '25°',
    quantity: '25°'
  },
  {
    id: '8',
    timestamp: '09/10/2025 12:00',
    time: '25°',
    quantity: '25°'
  },
];

const columns: TableColumn[] = [
  { key: 'timestamp', label: 'Reading Date', width: '40%' },
  { key: 'time', label: 'Time', width: '30%' },
  { key: 'quantity', label: 'Quantity', width: '30%' },
];

export function ActuatorReadingsView() {
  const navigate = useNavigate();

  const mockDevice = {
    name: 'Actuator 2'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
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

      {/* Title */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">All Device Readings</h2>
        <p className="text-gray-600">
          View the total data from the sensor device.
        </p>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={mockActuatorReadings}
        getRowKey={(item) => item.id}
        renderCell={(item, columnKey) => {
          const value = item[columnKey as keyof ActuatorReading];
          return <span className="text-gray-900">{value}</span>;
        }}
        showActions={false}
        emptyMessage="No actuator readings available."
      />
    </div>
  );
}
