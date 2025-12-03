import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getFarmerData } from "../../../services/dashboard/DashboardService";
import { FieldService } from "../../../services/field/FieldService";
import PlotService from "../../../services/plot/PlotService";
import { useAuth } from "../../auth/context/AuthContext";
import { ROUTES } from "../../../shared/constants/routes.ts";
import { PiFarm } from 'react-icons/pi';
import { LuSprout } from 'react-icons/lu';
import { GiWaterDrop } from 'react-icons/gi';
import type { FieldResponse } from '../../field-info/types/field.types';
import type { PlotResource } from '../../plot-list/types/plot.types.tsx';


export function FarmerDashboardView() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [farmerData, setFarmerData] = useState<any>(null);
  const [field, setField] = useState<FieldResponse | null>(null);
  const [plots, setPlots] = useState<PlotResource[]>([]);
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
        
        const fieldData = await FieldService.getField();
        setField(fieldData);
        
        if (fieldData?.id || fieldData?.fieldId) {
          const fieldId = (fieldData.id || fieldData.fieldId)!;
          const plotsData = await PlotService.getPlots(fieldId);
          setPlots(plotsData);
        }
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

  const handleManagePlotsClick = () => {
    navigate(ROUTES.PLOT_LIST);
  }

  const handlePlotClick = (plotId: string) => {
    if (!field?.id && !field?.fieldId) return;
    const fieldId = field.id || field.fieldId;
    navigate(`${ROUTES.PLOT_LIST}?fieldId=${fieldId}&plotId=${plotId}`);
  }

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
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {loading ? t('common.loading') : field ? field.fieldName : t('field.noField')}
              </h2>
              <p className="text-sm text-gray-500 mb-6">{t('dashboard.yourPlots')}</p>
              
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {loading ? (
                  <p className="text-gray-500 text-center py-4">{t('common.loading')}</p>
                ) : plots.length > 0 ? (
                  plots.map((plot) => (
                    <button
                      key={plot.plotId}
                      onClick={() => handlePlotClick(plot.plotId)}
                      className="w-full text-left text-gray-700 py-2 px-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded transition-colors"
                    >
                      {plot.plotName}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">{t('dashboard.noPlots')}</p>
                )}
              </div>

              <button onClick={handleManagePlotsClick} className="w-full bg-[#3E7C59] hover:bg-[#2d5f43] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                {t('dashboard.managePlots')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
