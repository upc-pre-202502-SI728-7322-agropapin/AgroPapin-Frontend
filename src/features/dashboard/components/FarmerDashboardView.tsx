import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getFarmerData } from "../../../services/dashboard/DashboardService";
import { FieldService } from "../../../services/field/FieldService";
import { useAuth } from "../../auth/context/AuthContext";
import { ROUTES } from "../../../shared/constants/routes.ts";
import { PiFarm } from 'react-icons/pi';
import { LuSprout } from 'react-icons/lu';
import { GiWaterDrop } from 'react-icons/gi';
import { CropsChart } from '../../../shared/components/ui/CropsChart';
import type { CropDistribution } from '../../field-info/types/field.types';


export function FarmerDashboardView() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [farmerData, setFarmerData] = useState<any>(null);
  const [cropDistribution, setCropDistribution] = useState<CropDistribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFarmerData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getFarmerData();
        console.log('respuesta', data);
        setFarmerData(data);
        
        await FieldService.getField();
        
        const distribution = await FieldService.getCropDistribution();
        setCropDistribution(distribution);
      } catch (error) {
        console.error('Error loading farmer data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFarmerData();
  }, [user]);

  const handleFieldInfoClick = () => {
    navigate(ROUTES.FIELD_INFO);
  }

  const handleCropTrackingClick = () => {
    navigate(ROUTES.CROP_TRACKING);
  }

  const handleIrrigationClick = () => {
    navigate(ROUTES.IRRIGATION_CONTROL);
  }

  const cropColors = [
    "#efb627", "#f13434", "#126de3", "#59a630", 
    "#ef9347", "#af4df4", "#34c759", "#ff9500",
    "#ff2d55", "#5856d6"
  ];

  // Formater for crop distribution data
  const cropCounts = cropDistribution.reduce((acc: any, crop: any) => {
    const cropName = crop.croptype?.name || 'Desconocido';
    acc[cropName] = (acc[cropName] || 0) + 1;
    return acc;
  }, {});

  const total = cropDistribution.length;
  const chartData = Object.entries(cropCounts).map(([name, count]: [string, any], index) => ({
    name,
    value: Math.round((count / total) * 100),
    color: cropColors[index % cropColors.length]
  }));

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('dashboard.title')}</h1>
          <p className="text-gray-600">
            {loading 
              ? t('common.loading') 
              : farmerData 
                ? `${t('dashboard.welcomeBack')}, ${farmerData.firstName} ${farmerData.lastName}`
                : t('dashboard.welcome')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Field Information Card */}
            <button
              onClick={handleFieldInfoClick}
              className="w-full bg-[#557420] hover:bg-[#6B8E23] text-white rounded-2xl p-8 text-left transition-all shadow-md hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-3">
                <PiFarm className="w-12 h-12" />
                <h3 className="text-2xl font-bold">{t('dashboard.fieldInfo')}</h3>
              </div>
              <p className="text-white/90 text-base">
                {t('field.fieldDetails')}
              </p>
            </button>

            {/* Crop Tracking Card */}
            <button
              onClick={handleCropTrackingClick}
              className="w-full bg-[#9D683C] hover:bg-[#AC7A50] text-white rounded-2xl p-8 text-left transition-all shadow-md hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-3">
                <LuSprout className="w-12 h-12" />
                <h3 className="text-2xl font-bold">{t('dashboard.cropTracking')}</h3>
              </div>
              <p className="text-white/90 text-base">
                {t('crops.cropDetails')}
              </p>
            </button>

            {/* Irrigation Management Card */}
            <button
              onClick={handleIrrigationClick}
              className="w-full bg-[#3563BA] hover:bg-[#4A77C9] text-white rounded-2xl p-8 text-left transition-all shadow-md hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-3">
                <GiWaterDrop className="w-12 h-12" />
                <h3 className="text-2xl font-bold">{t('irrigation.history')}</h3>
              </div>
              <p className="text-white/90 text-base">
                {t('irrigation.irrigationLogs')}
              </p>
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            {/* Crop Distribution Chart */}
            {!loading && cropDistribution.length > 0 ? (
              <CropsChart data={chartData} />
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('dashboard.cropDistribution')}</h2>
                <p className="text-gray-500 text-center py-12">
                  {loading ? t('common.loading') : t('dashboard.noPlots')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
