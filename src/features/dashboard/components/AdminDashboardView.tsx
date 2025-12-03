import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CooperativeService } from "../../../services/cooperative/CooperativeService";
import { ROUTES } from "../../../shared/constants/routes";
import type { CooperativeResource } from '../../cooperative/types/cooperative.types';
import { PiFarm } from 'react-icons/pi';
import { BiBox } from 'react-icons/bi';

export function AdminDashboardView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cooperative, setCooperative] = useState<CooperativeResource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCooperativeData = async () => {
      try {
        const data = await CooperativeService.getMyCooperative();
        setCooperative(data);
        console.log('Cooperative ID:', data.cooperativeId);
      } catch (error) {
        console.error('Error loading cooperative data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCooperativeData();
  }, []);

  const handleFieldInfoClick = () => {
    navigate(ROUTES.FIELD_INFO);
  };

  const handleSuppliesClick = () => {
    navigate(ROUTES.INVENTORY);
  };


  const handleManageMembersClick = () => {
    navigate(ROUTES.MANAGE_MEMBERS);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('dashboard.title')}</h1>
          <p className="text-gray-600">
            {loading 
              ? t('common.loading') 
              : cooperative 
                ? `${t('dashboard.welcome')}, ${cooperative.cooperativeName}`
                : t('dashboard.welcome')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
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
                {t('field.viewAllFields')}
              </p>
            </button>

            {/* Supplies Management Card */}
            <button
              onClick={handleSuppliesClick}
              className="w-full bg-[#9D3C3D] hover:bg-[#A0504F] text-white rounded-2xl p-8 text-left transition-all shadow-md hover:shadow-lg"
            >
              <div className="flex items-center gap-4 mb-3">
                <BiBox className="w-12 h-12" />
                <h3 className="text-2xl font-bold">{t('inventory.title')}</h3>
              </div>
              <p className="text-white/90 text-base">
                {t('inventory.manageInventory')}
              </p>
            </button>
          </div>

          {/* Right Column - Cooperative Members */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('cooperative.members')}</h2>
              
              <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                {loading ? (
                  <p className="text-gray-500 text-center py-4">{t('common.loading')}</p>
                ) : cooperative && cooperative.members.length > 0 ? (
                  cooperative.members.map((member) => (
                    <div key={member.id} className="text-gray-700 py-2 border-b border-gray-100 last:border-0">
                      {member.firstName} {member.lastName}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">{t('cooperative.noMembers')}</p>
                )}
              </div>

              <button onClick={handleManageMembersClick} className="w-full bg-[#3E7C59] hover:bg-[#2d5f43] text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                {t('dashboard.manageMembers')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
