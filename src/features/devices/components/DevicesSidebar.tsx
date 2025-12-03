import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft } from 'react-icons/fa';

interface DevicesSidebarProps {
  activeSection: 'devices' | 'metrics' | 'irrigation';
  onSectionChange: (section: 'devices' | 'metrics' | 'irrigation') => void;
}

export function DevicesSidebar({ activeSection, onSectionChange }: DevicesSidebarProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  return (
    <div className="w-full lg:w-56 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 p-4">
      {/* Back button and title */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-[#3E7C59] hover:text-[#2d5f43] transition-colors flex items-center gap-2 font-medium"
      >
        <FaArrowLeft size={16} />
          <span>{t('common.back')}</span>
      </button>

      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">{t('crops.cropName')} {id}</h2>

      {/* Navigation buttons */}
      <div className="flex lg:flex-col gap-2">
        <button
          onClick={() => onSectionChange('devices')}
          className={`flex-1 lg:w-full px-4 py-3 rounded-lg font-medium transition-colors text-left ${
            activeSection === 'devices'
              ? 'bg-[#3E7C59] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {t('dashboard.devices')}
        </button>
        <button
          onClick={() => onSectionChange('metrics')}
          className={`flex-1 lg:w-full px-4 py-3 rounded-lg font-medium transition-colors text-left ${
            activeSection === 'metrics'
              ? 'bg-[#3E7C59] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}>
          {t('devices.liveMetrics')}
        </button>
        <button
          onClick={() => onSectionChange('irrigation')}
          className={`flex-1 lg:w-full px-4 py-3 rounded-lg font-medium transition-colors text-left ${
            activeSection === 'irrigation'
              ? 'bg-[#3E7C59] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}>
          {t('irrigation.title')}
        </button>
      </div>
    </div>
  );
}
