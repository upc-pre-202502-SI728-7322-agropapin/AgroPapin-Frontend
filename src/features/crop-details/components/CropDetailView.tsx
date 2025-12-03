import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CropDetailTabs } from './CropDetailTabs';
import { GeneralInfoTab } from './GeneralInfoTab';
import { ControlsTab } from './ControlsTab';
import { ProductsTab } from './ProductsTab';
import { useAuth } from '../../auth/context/AuthContext';
import PlantingService from '../../../services/crop/PlantingService';
import type { PlantingResource } from '../../crop-list/types/crop.types';
import {FaArrowLeft} from "react-icons/fa";

export function CropDetailView() {
  const { t } = useTranslation();
  const { fieldId, plotId, plantingId } = useParams<{ fieldId: string; plotId: string; plantingId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('ROLE_ADMINISTRATOR');
  const [activeTab, setActiveTab] = useState('general');
  const [planting, setPlanting] = useState<PlantingResource | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanting = async () => {
      if (!fieldId || !plotId || !plantingId) {
        setError('Missing field, plot or planting information');
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const plantingData = await PlantingService.getPlantingById(fieldId, plotId, plantingId);
        setPlanting(plantingData);
      } catch (err) {
        setError('Error loading planting details');
      } finally {
        setLoading(false);
      }
    };
    fetchPlanting();
  }, [fieldId, plotId, plantingId]);

  const renderTabContent = () => {
    if (loading) return <div>{t('common.loading')}</div>;
    if (error) return <div className="text-red-600">{error}</div>;
    if (!planting) return <div>{t('crops.noPlantingFound')}</div>;

    const cropDetail = planting.croptype ? {
      ...planting.croptype,
      creationDate: planting.plantingDate ? new Date(planting.plantingDate).toLocaleDateString() : '',
      plantedArea: 0,
      description: planting.croptype.description ?? '',
      imageUrl: planting.croptype.imageUrl ?? '',
    } : null;
    switch (activeTab) {
      case 'general':
        return cropDetail ? <GeneralInfoTab crop={cropDetail} /> : <div>{t('crops.noCropDetail')}</div>;
      case 'controls':
        return fieldId && plotId && plantingId ? (
          <ControlsTab cropId={planting.id} plotId={plotId} plantingId={plantingId} isAdmin={isAdmin} />
        ) : <div>{t('errors.missingInfo')}</div>;
      case 'products':
        return fieldId && plotId && plantingId ? (
          <ProductsTab cropId={planting.id} plotId={plotId} plantingId={plantingId} isAdmin={isAdmin} />
        ) : <div>{t('errors.missingInfo')}</div>;
      default:
        return cropDetail ? <GeneralInfoTab crop={cropDetail} /> : <div>{t('crops.noCropDetail')}</div>;
    }
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-[#3E7C59] hover:text-[#2d5a42] transition-colors flex items-center gap-2 font-medium">
        <div className="flex items-center justify-center gap-2">
          <FaArrowLeft />
          {t('crops.backToCropList')}
        </div>

      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
        Crop Information
      </h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <CropDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </div>
    </>
  );
}
