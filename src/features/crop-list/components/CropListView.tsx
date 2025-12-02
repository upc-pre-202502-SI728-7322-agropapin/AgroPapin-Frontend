import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { CropTable } from './CropTable';
import { CropModal } from './CropModal';
import { ConfirmModal } from '../../../shared/components/ui/ConfirmModal';
import { AddButton } from '../../../shared/components/ui/AddButton';
import { usePlantings } from '../hooks';
import { FieldService } from '../../../services/field';
import { useAuth } from '../../auth/context/AuthContext';
import type { PlantingResource, CreatePlantingResource } from '../types/crop.types';
import { ROUTES } from '../../../shared/constants/routes';

export function CropListView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('ROLE_ADMINISTRATOR');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [plantingToDelete, setPlantingToDelete] = useState<string | null>(null);
  const [fieldId, setFieldId] = useState<string | null>(null);
  const [plotId, setPlotId] = useState<string | null>(null);

  const { plantings, error, createPlanting, deletePlanting, fetchPlantings } = usePlantings(fieldId, plotId);


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
    setPlantingToDelete(plantingId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (plantingToDelete) {
      await deletePlanting(plantingToDelete);
      await fetchPlantings();
      setPlantingToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCreatePlanting = async (data: CreatePlantingResource) => {
    await createPlanting(data);
  };



  const handleOpenAddModal = () => {
    setIsModalOpen(true);
  };

  const plantingToDeleteName = (Array.isArray(plantings) ? plantings.find(p => p.id === plantingToDelete)?.id : undefined) || 'this planting';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>Back</span>
        </button>

        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Crops in Progress List
        </h1>

        {/* Card container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
          <input
            type="text"
            placeholder="Search Crops"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
          />
              </div>
              {!isAdmin && <AddButton onClick={handleOpenAddModal} label="Add Crop" />}
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
              isAdmin={isAdmin}
            />
          )}
        </div>

        <CropModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          onSave={handleCreatePlanting}
        />

        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setIsDeleteModalOpen(false);
            setPlantingToDelete(null);
          }}
          title="Delete Crop"
          message={`Are you sure you want to delete ${plantingToDeleteName}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          confirmButtonColor="bg-red-600 hover:bg-red-700"
        />
      </div>
    </div>
  );
}
