import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardGrid } from "./DashboardGrid.tsx";
import { getFarmerData } from "../../../services/dashboard/DashboardService";
import { useAuth } from "../../auth/context/AuthContext";
import { CropsChart } from "../../../shared/components/ui/CropsChart.tsx";
import { ROUTES } from "../../../shared/constants/routes.ts";


export function FarmerDashboardView() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [farmerData, setFarmerData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFarmerData = async () => {
      console.log('uudi', user?.id);
      console.log('token', localStorage.getItem('token'));
      
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        console.log(`uuid del usuaro: ${user.id}`);
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

  const handleChatClick = () => {
    navigate(ROUTES.CHAT);
  }

  const handleCropTrackingClick = () => {
    console.log("Seguimiento de Cultivo clicked")
  }

  const handleIrrigationClick = () => {
    console.log("Control de Riego clicked")
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8 ">
      <div className="max-w-8xl mx-auto p-4 ">

        <div className="mb-12 ">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            {loading 
              ? 'Cargando...' 
              : farmerData 
                ? `Welcome, ${farmerData.firstName} ${farmerData.lastName}`
                : 'Welcome to Agrotech dashboard'}
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left  */}
          <div className="lg:col-span-2">
            <DashboardGrid
              onFieldInfoClick={handleFieldInfoClick}
              onChatClick={handleChatClick}
              onCropTrackingClick={handleCropTrackingClick}
              onIrrigationClick={handleIrrigationClick}
            />
          </div>

          {/* right  */}
          <div className="lg:col-span-1 w-full">

              <CropsChart />
          </div>
        </div>
      </div>
    </div>
  )
}
