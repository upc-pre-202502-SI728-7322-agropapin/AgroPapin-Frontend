import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CooperativeService } from '../../../services/cooperative/CooperativeService';
import type { MemberFieldResource } from '../../cooperative/types/cooperative.types';
import { FaArrowLeft } from 'react-icons/fa';
import fieldImage from '../../../assets/campo-predeterminado.png';

export function AdminFieldsView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [membersFields, setMembersFields] = useState<MemberFieldResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [noCooperative, setNoCooperative] = useState(false);

  useEffect(() => {
    loadMembersFields();
  }, []);

  const loadMembersFields = async () => {
    try {
      setLoading(true);
      const cooperative = await CooperativeService.getMyCooperative();
      setNoCooperative(false);
      const data = await CooperativeService.getMembersFields(cooperative.cooperativeId);
      setMembersFields(data);
    } catch (error: any) {
      console.error('Error loading farmers fields:', error);
      if (error?.response?.status === 404) {
        console.error('No cooperative found for current user.');
        setNoCooperative(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewPlots = (memberField: MemberFieldResource) => {
    if (memberField.fieldId) {
      navigate(`/plot-list?fieldId=${memberField.fieldId}`);
    }
  };

  const getStatusLabel = (memberField: MemberFieldResource) => {
    if (!memberField.fieldId) return 'No Field';
    return memberField.status || 'Active';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-600">{t('common.loading')}</div>
          </div>
        </div>
      </div>
    );
  }

  if (noCooperative) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cooperative.noCooperativeFound')}</h2>
            <p className="text-gray-600 mb-6">
              {t('field.needCooperativeView')}
            </p>
            <button
              onClick={() => window.location.href = '/create-cooperative'} className="bg-[#3E7C59] hover:bg-[#2d5f43] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              {t('cooperative.createCooperative')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>{t('common.back')}</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('field.fieldsInformation')}</h1>
          <p className="text-gray-600">{t('field.viewAllFields')}</p>
        </div>

        {/* Fields Grid */}
        {membersFields.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {t('field.noFieldsFound')}
              </h2>
              <p className="text-gray-600">
                {t('field.noFarmersFields')}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {membersFields.map((memberField) => (
              <div 
                key={memberField.farmerId}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="pb-4 border-b border-gray-200">
                        <label className="block text-sm font-medium text-gray-500 mb-2">
                          {t('cooperative.farmerName')}
                        </label>
                        <p className="text-xl font-bold text-gray-900">{memberField.farmerFullName}</p>
                      </div>

                      <div className="pb-4 border-b border-gray-200">
                        <label className="block text-sm font-medium text-gray-500 mb-2">
                          {t('field.fieldName')}
                        </label>
                        <p className="text-xl font-bold text-gray-900">
                          {memberField.fieldName}
                        </p>
                      </div>

                      {memberField.location && (
                        <div className="pb-4 border-b border-gray-200">
                          <label className="block text-sm font-medium text-gray-500 mb-2">
                            {t('plots.location')}
                          </label>
                          <p className="text-xl font-bold text-gray-900">{memberField.location}</p>
                        </div>
                      )}

                      {memberField.totalArea && (
                        <div className="pb-4 border-b border-gray-200">
                          <label className="block text-sm font-medium text-gray-500 mb-2">
                            {t('field.totalArea')}
                          </label>
                          <p className="text-xl font-bold text-gray-900">{memberField.totalArea} m²</p>
                        </div>
                      )}

                      <div className="pb-4">
                        <label className="block text-sm font-medium text-gray-500 mb-2">
                          {t('common.status')}
                        </label>
                        <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                          memberField.fieldId
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {getStatusLabel(memberField)}
                        </span>
                      </div>
                    </div>

                    <div>
                      {memberField.fieldId ? (
                        <button
                          onClick={() => handleViewPlots(memberField)}
                          className="w-full px-4 py-2 bg-[#3E7C59] text-white rounded-lg font-medium text-sm hover:bg-[#2d5f43] transition"
                        >
                          {t('plots.plotList')}
                        </button>
                      ) : (
                        <div className="text-center text-gray-400 py-2 text-sm">
                          {t('field.noFieldAssigned')}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full md:w-[300px] h-[350px] md:h-auto flex-shrink-0">
                    <img 
                      src={fieldImage} 
                      alt={`Field ${memberField.fieldName}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
