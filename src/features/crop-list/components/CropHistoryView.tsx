import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { CropTable } from './CropTable';
import PlantingService from '../../../services/crop/PlantingService';
import type { PlantingResource } from '../types/crop.types';

export function CropHistoryView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [plantings, setPlantings] = useState<PlantingResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCropHistory = async () => {
      try {
        setLoading(true);
        const data = await PlantingService.getCropDistribution();
        setPlantings(data);
      } catch (err) {
        console.error('Error loading crop history:', err);
        setError('Failed to load crop history');
      } finally {
        setLoading(false);
      }
    };

    loadCropHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium">
          <FaArrowLeft size={16} />
          <span>{t('common.back')}</span>
        </button>

        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          {t('crops.cropTrackingHistory')}
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {error && (
            <div className="text-center py-8 text-red-600">
              {error}
            </div>
          )}

          {!error && (
            <CropTable
              plantings={plantings}
              onRowClick={() => {}}
              isAdmin={false}
            />
          )}

          {!error && plantings.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">{t('crops.noCropsFound')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
