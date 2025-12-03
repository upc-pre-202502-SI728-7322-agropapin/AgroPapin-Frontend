import { useTranslation } from 'react-i18next';
import { CropCareCalendar } from './CropCareCalendar';
import { CropCareSuggestionsTable } from './CropCareSuggestionsTable';
import type { CropCareData } from '../types/crop-care.types';

interface CropCareTabProps {
  cropId: string;
}

const mockCropCareData: Record<string, CropCareData> = {
  '1': {
    phase: 'Flowering',
    phaseDate: '12/11/2025',
    recommendations: [
      { id: '1', date: '25/07/2024', suggestion: 'Water the crop for 30 minutes.' },
      { id: '2', date: '05/08/2024', suggestion: 'Water the crop for 30 minutes.' },
      { id: '3', date: '15/08/2024', suggestion: 'Water the crop for 30 minutes.' },
      { id: '4', date: '10/09/2024', suggestion: 'Water the crop for 30 minutes.' },
      { id: '5', date: '15/09/2024', suggestion: 'Water the crop for 30 minutes.' },
      { id: '6', date: '20/09/2024', suggestion: 'Apply organic fertilizer to boost growth.' },
      { id: '7', date: '25/09/2024', suggestion: 'Check for pest infestation and apply treatment if needed.' },
      { id: '8', date: '30/09/2024', suggestion: 'Water the crop for 30 minutes.' },
      { id: '9', date: '05/10/2024', suggestion: 'Prune dead leaves and branches.' },
      { id: '10', date: '10/10/2024', suggestion: 'Water the crop for 30 minutes.' },
    ]
  },
  '2': {
    phase: 'Germinating',
    phaseDate: '19/07/2024',
    recommendations: [
      { id: '1', date: '20/07/2024', suggestion: 'Water the crop for 20 minutes.' },
      { id: '2', date: '22/07/2024', suggestion: 'Monitor soil moisture levels.' },
      { id: '3', date: '25/07/2024', suggestion: 'Water the crop for 20 minutes.' },
      { id: '4', date: '28/07/2024', suggestion: 'Check seed germination progress.' },
      { id: '5', date: '01/08/2024', suggestion: 'Water the crop for 20 minutes.' },
    ]
  },
  '3': {
    phase: 'Germinating',
    phaseDate: '19/07/2024',
    recommendations: [
      { id: '1', date: '20/07/2024', suggestion: 'Water the crop for 20 minutes.' },
      { id: '2', date: '22/07/2024', suggestion: 'Monitor soil moisture levels.' },
      { id: '3', date: '25/07/2024', suggestion: 'Water the crop for 20 minutes.' },
      { id: '4', date: '28/07/2024', suggestion: 'Check seed germination progress.' },
      { id: '5', date: '01/08/2024', suggestion: 'Water the crop for 20 minutes.' },
    ]
  },
  '4': {
    phase: 'Germinating',
    phaseDate: '19/07/2024',
    recommendations: [
      { id: '1', date: '20/07/2024', suggestion: 'Water the crop for 20 minutes.' },
      { id: '2', date: '22/07/2024', suggestion: 'Monitor soil moisture levels.' },
      { id: '3', date: '25/07/2024', suggestion: 'Water the crop for 20 minutes.' },
      { id: '4', date: '28/07/2024', suggestion: 'Check seed germination progress.' },
      { id: '5', date: '01/08/2024', suggestion: 'Water the crop for 20 minutes.' },
    ]
  }
};

export function CropCareTab({ cropId }: CropCareTabProps) {
  const careData = mockCropCareData[cropId] || mockCropCareData['1'];
  const { t } = useTranslation();

  return (
    <div className="py-6">
      {/* phase Information */}
      <div className="mb-8 flex items-center gap-8 text-lg">
        <div>
          <span className="font-semibold text-gray-700">{t('crops.phase')}: </span>
          <span className="text-gray-900">{careData.phase}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">{t('crops.phaseDate')}: </span>
          <span className="text-gray-900">{careData.phaseDate}</span>
        </div>
      </div>

      {/* Grid calendar/sugestions */}
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8">

        {/* Calendar */}
        <div>
          <CropCareCalendar />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg overflow-hidden border-b-1 border-gray-200">
          <CropCareSuggestionsTable recommendations={careData.recommendations} />
        </div>
      </div>
    </div>
  );
}
