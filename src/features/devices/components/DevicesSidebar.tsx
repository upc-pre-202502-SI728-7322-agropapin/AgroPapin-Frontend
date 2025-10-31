import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface DevicesSidebarProps {
  activeSection: 'devices' | 'alerts';
  onSectionChange: (section: 'devices' | 'alerts') => void;
}

export function DevicesSidebar({ activeSection, onSectionChange }: DevicesSidebarProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <div className="w-56 bg-gray-50 min-h-screen border-r border-gray-200 p-4">
      {/* Back button and title */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-[#3E7C59] hover:text-[#2d5f43] transition-colors flex items-center gap-2 font-medium"
      >
        <FaArrowLeft size={16} />
      </button>

      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Crop {id}</h2>

      {/* Navigation buttons */}
      <div className="space-y-2">
        <button
          onClick={() => onSectionChange('devices')}
          className={`w-full px-4 py-3 rounded-lg font-medium transition-colors text-left ${
            activeSection === 'devices'
              ? 'bg-[#3E7C59] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Devices
        </button>
        <button
          onClick={() => onSectionChange('alerts')}
          className={`w-full px-4 py-3 rounded-lg font-medium transition-colors text-left ${
            activeSection === 'alerts'
              ? 'bg-[#3E7C59] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Alerts
        </button>
      </div>
    </div>
  );
}
