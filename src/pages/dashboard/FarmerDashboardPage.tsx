import { useState, useEffect } from 'react';
import {DashboardGrid} from "../../features/dashboard/components/DashboardGrid.tsx";
import { getFarmerData } from "../../services/dashboard/DashboardService";
import { useAuth } from "../../features/auth/context/AuthContext";


export default function FarmerDashboardPage() {
  const { user } = useAuth();
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
    console.log("Información de Campo clicked")
  }

  const handleChatClick = () => {
    console.log("AgroPapin Chat clicked")
  }

  const handleCropTrackingClick = () => {
    console.log("Seguimiento de Cultivo clicked")
  }

  const handleIrrigationClick = () => {
    console.log("Control de Riego clicked")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Control</h1>
          <p className="text-gray-600">
            {loading 
              ? 'Cargando...' 
              : farmerData 
                ? `Bienvenido, ${farmerData.firstName} ${farmerData.lastName}` 
                : 'Bienvenido a tu panel de control agrícola'}
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left  */}
          <div className="lg:col-span-2">
            <DashboardGrid
              onFieldInfoClick={handleFieldInfoClick}
              onChatClick={handleChatClick}
              onCropTrackingClick={handleCropTrackingClick}
              onIrrigationClick={handleIrrigationClick}
            />
          </div>


          <div className="lg:col-span-1">

              {/* <CropsChart />  */}
          </div>
        </div>
      </div>
    </div>
  )
}
