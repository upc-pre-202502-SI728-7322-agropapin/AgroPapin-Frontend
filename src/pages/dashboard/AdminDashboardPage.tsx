import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminDashboardView } from "../../features/dashboard/components/AdminDashboardView";
import { CooperativeService } from '../../services/cooperative/CooperativeService';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [hasCooperative, setHasCooperative] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkCooperative();
  }, []);

  const checkCooperative = async () => {
    try {
      setIsChecking(true);
      await CooperativeService.getMyCooperative();
      setHasCooperative(true);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        // si no tiene cooperativa, que se rediriga a la página de crear cooperativa
        setHasCooperative(false);
        navigate('/create-cooperative');
      } else {
        console.error('Error checking cooperative:', error);
        setHasCooperative(false);
      }
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (hasCooperative === false) {
    return null; 
  }

  return <AdminDashboardView />;
}