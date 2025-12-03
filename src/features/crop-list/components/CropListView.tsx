import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { CropTable } from './CropTable';
import { CropModal } from './CropModal';
import { ConfirmModal } from '../../../shared/components/ui/ConfirmModal';
import { AddButton } from '../../../shared/components/ui/AddButton';
import { usePlantings } from '../hooks';
import { FieldService } from '../../../services/field';
import { useAuth } from '../../auth/context/AuthContext';
import type { CreatePlantingResource } from '../types/crop.types';
import { ROUTES } from '../../../shared/constants/routes';

export function CropListView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('ROLE_ADMINISTRATOR');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [plantingToDelete, setPlantingToDelete] = useState<string | null>(null);
  const [plantingToDeleteName, setPlantingToDeleteName] = useState<string>('');
  const [fieldId, setFieldId] = useState<string | null>(null);
  const [plotId, setPlotId] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);

  const { plantings, error, createPlanting, deletePlanting, markAsHarvested, fetchPlantings } = usePlantings(fieldId, plotId);


  useEffect(() => {
    const loadFieldAndPlot = async () => {
      try {
        
        const fieldIdFromUrl = searchParams.get('fieldId');
        const plotIdFromUrl = searchParams.get('plotId');
        
        if (fieldIdFromUrl && plotIdFromUrl) {
          setFieldId(fieldIdFromUrl);
          setPlotId(plotIdFromUrl);
          console.log('field id obtenido:', fieldIdFromUrl);
          console.log('plot id obtenido:', plotIdFromUrl);
        } else if (plotIdFromUrl) {
          // Si solo hay plotId, obtener el field del farmer
          setPlotId(plotIdFromUrl);
          console.log('plot id obtenido:', plotIdFromUrl);
          if (!isAdmin) {
            const field = await FieldService.getField();
            if (field) {
              setFieldId(field.id || field.fieldId || null);
            }
          }
        } else {
          if (!isAdmin) {
            const field = await FieldService.getField();
            if (field) {
              setFieldId(field.id || field.fieldId || null);
            } else {
              console.warn('usuario no tiene field');
              navigate(ROUTES.CREATE_FIELD);
            }
          }
        }
      } catch (err) {
        console.error('Error loading field:', err);
      }
    };
    loadFieldAndPlot();
  }, [searchParams, isAdmin, navigate]);

  const handleRowClick = (plantingId: string) => {
    if (!fieldId || !plotId) return;
    const url = ROUTES.CROP_DETAIL
      .replace(':fieldId', fieldId)
      .replace(':plotId', plotId)
      .replace(':plantingId', plantingId);
    navigate(url);
  };

  const handleDelete = (plantingId: string) => {
    const planting = plantings.find(p => p.id === plantingId);
    setPlantingToDelete(plantingId);
    setPlantingToDeleteName(planting?.croptype?.name || 'this crop');
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (plantingToDelete) {
      await deletePlanting(plantingToDelete);
      await fetchPlantings();
      setPlantingToDelete(null);
      setPlantingToDeleteName('');
      setIsDeleteModalOpen(false);
    }
  };

  const handleHarvest = async (plantingId: string) => {
    try {
      await markAsHarvested(plantingId);
      await fetchPlantings();
    } catch (err) {
      console.error('Error marking as harvested:', err);
    }
  };

  const handleCreatePlanting = async (data: CreatePlantingResource) => {
    setCreateError(null);
    try {
      await createPlanting(data);
      setIsModalOpen(false);
    } catch (err: any) {
      setCreateError(err.message || 'Failed to create planting. Please try again.');
    }
  };

  const handleOpenAddModal = () => {
    setCreateError(null);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>{t('common.back')}</span>
        </button>

        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          {t('crops.cropList')}
        </h1>

        {/* Card container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
          <input
            type="text"
            placeholder={t('common.search')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
          />
              </div>
              {!isAdmin && <AddButton onClick={handleOpenAddModal} label={t('crops.addCrop')} />}
            </div>
          </div>

          {error && (
            <div className="text-center py-8 text-red-600">
              {error}
            </div>
          )}

          {!error && Array.isArray(plantings) && (
            <CropTable
              plantings={plantings}
              onRowClick={handleRowClick}
              onDelete={handleDelete}
              onHarvest={handleHarvest}
              isAdmin={isAdmin}
            />
          )}
        </div>

        <CropModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCreateError(null);
          }}
          onSave={handleCreatePlanting}
          externalError={createError}
          plantings={plantings}
        />

        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setPlantingToDelete(null);
          }}
          title={t('crops.deleteCrop')}
          message={`${t('messages.confirmAction')} ${plantingToDeleteName}?`}
          confirmText={t('common.delete')}
          cancelText={t('common.cancel')}
          confirmButtonColor="bg-red-600 hover:bg-red-700"
        />
      </div>
    </div>
  );
}
