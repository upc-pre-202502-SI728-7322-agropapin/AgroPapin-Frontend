import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    navigate(ROUTES.CROP_LIST);
  }

  const handleIrrigationClick = () => {
    navigate('/irrigation-history');
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            {loading 
              ? 'Loading...' 
              : farmerData 
                ? `Welcome, ${farmerData.firstName} ${farmerData.lastName}`
                : 'Welcome to Agrotech dashboard'}
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
                <h3 className="text-2xl font-bold">Field Information</h3>
              </div>
              <p className="text-white/90 text-base">
                Manage the details of your field, plots and crops.
              </p>
            </button>

            {/* Crop Tracking Card */}
            <button
              onClick={handleCropTrackingClick}
              className="w-full bg-[#9D683C] hover:bg-[#AC7A50] text-white rounded-2xl p-8 text-left transition-all shadow-md hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-3">
                <LuSprout className="w-12 h-12" />
                <h3 className="text-2xl font-bold">Crop Tracking</h3>
              </div>
              <p className="text-white/90 text-base">
                Track the stage of your crops and your supplies.
              </p>
            </button>

            {/* Irrigation Management Card */}
            <button
              onClick={handleIrrigationClick}
              className="w-full bg-[#3563BA] hover:bg-[#4A77C9] text-white rounded-2xl p-8 text-left transition-all shadow-md hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-3">
                <GiWaterDrop className="w-12 h-12" />
                <h3 className="text-2xl font-bold">Irrigation History</h3>
              </div>
              <p className="text-white/90 text-base">
                View irrigation history.
              </p>
            </button>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {loading ? 'Loading...' : field ? field.fieldName : 'No Field'}
              </h2>
              <p className="text-sm text-gray-500 mb-6">Your Plots</p>
              
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {loading ? (
                  <p className="text-gray-500 text-center py-4">Loading plots...</p>
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
                  <p className="text-gray-500 text-center py-4">No plots yet</p>
                )}
              </div>

              <button onClick={handleManagePlotsClick} className="w-full bg-[#3E7C59] hover:bg-[#2d5f43] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Manage Plots
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
