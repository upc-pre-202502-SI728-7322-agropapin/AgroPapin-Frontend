import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFarmerData } from "../../../services/dashboard/DashboardService";
import { useAuth } from "../../auth/context/AuthContext";
import { CropsChart } from "../../../shared/components/ui/CropsChart.tsx";
import { ROUTES } from "../../../shared/constants/routes.ts";
import { PiFarm } from 'react-icons/pi';
import { LuSprout } from 'react-icons/lu';
import { GiWaterDrop } from 'react-icons/gi';


export function FarmerDashboardView() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [farmerData, setFarmerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFarmerData = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getFarmerData(user.id);
        console.log('respuesta', data);
        setFarmerData(data);
      } catch (error) {
        console.error('Error loading farmer data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFarmerData();
  }, [user?.id]);

  const handleFieldInfoClick = () => {
    navigate(ROUTES.FIELD_INFO);
  }

  const handleCropTrackingClick = () => {
    navigate(ROUTES.CROP_LIST);
  }

  const handleIrrigationClick = () => {
    navigate(ROUTES.IRRIGATION_CONTROL);
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
                <h3 className="text-2xl font-bold">Irrigation Management</h3>
              </div>
              <p className="text-white/90 text-base">
                Optimize the irrigation of your field.
              </p>
            </button>
          </div>

          {/* Right Column - Crop Distribution Chart */}
          <div className="lg:col-span-1">
            <CropsChart />
          </div>
        </div>
      </div>
    </div>
  )
}
