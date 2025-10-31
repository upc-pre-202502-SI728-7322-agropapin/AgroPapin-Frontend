import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { CropTable } from './CropTable';
import { CropModal } from './CropModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { AddButton } from '../../../shared/components/ui/AddButton';
import type { Crop, CropFormData } from '../types/crop.types';
import { ROUTES } from '../../../shared/constants/routes';

export function CropListView() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [cropToDelete, setCropToDelete] = useState<string | null>(null);

  const [crops, setCrops] = useState<Crop[]>([
    {
      id: '1',
      name: 'Lemon',
      plantedDate: '19/07/2024',
      estimatedHarvestDate: '19/12/2024',
      phase: 'Germinating',
      plantedArea: 100,
    },
    {
      id: '2',
      name: 'Rice',
      plantedDate: '19/07/2024',
      estimatedHarvestDate: '19/12/2024',
      phase: 'Germinating',
      plantedArea: 700,
    },
    {
      id: '3',
      name: 'Rice',
      plantedDate: '19/07/2024',
      estimatedHarvestDate: '19/12/2024',
      phase: 'Germinating',
      plantedArea: 700,
    },
    {
      id: '4',
      name: 'Rice',
      plantedDate: '19/07/2024',
      estimatedHarvestDate: '19/12/2024',
      phase: 'Germinating',
      plantedArea: 700,
    },
  ]);

  const handleRowClick = (cropId: string) => {
    navigate(ROUTES.CROP_DETAIL.replace(':id', cropId));
  };

  const handleEdit = (crop: Crop) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  const handleDelete = (cropId: string) => {
    setCropToDelete(cropId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (cropToDelete) {
      setCrops(crops.filter(crop => crop.id !== cropToDelete));
      setCropToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSaveCrop = (data: CropFormData) => {
    if (selectedCrop) {
      // Edit
      setCrops(crops.map(crop => 
        crop.id === selectedCrop.id 
          ? { ...crop, name: data.name, plantedArea: data.plantedArea }
          : crop
      ));
    } else {
      // Create
      const newCrop: Crop = {
        id: String(crops.length + 1),
        name: data.name,
        plantedDate: new Date().toLocaleDateString('en-US'),
        estimatedHarvestDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US'),
        phase: 'Germinating',
        plantedArea: data.plantedArea,
      };
      setCrops([...crops, newCrop]);
    }
    setSelectedCrop(null);
  };

  const handleOpenAddModal = () => {
    setSelectedCrop(null);
    setIsModalOpen(true);
  };

  const cropToDeleteName = crops.find(c => c.id === cropToDelete)?.name || '';

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
              <AddButton
                onClick={handleOpenAddModal}
                label="Add Crop"
              />
            </div>
          </div>


          <CropTable
              crops={crops}
              onRowClick={handleRowClick}
              onEdit={handleEdit}
              onDelete={handleDelete}
          />
        </div>


        <CropModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedCrop(null);
            }}
            onSave={handleSaveCrop}
            crop={selectedCrop}
        />

        <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onConfirm={handleConfirmDelete}
            onCancel={() => {
              setIsDeleteModalOpen(false);
              setCropToDelete(null);
            }}
            cropName={cropToDeleteName}
        />
      </div>
    </div>
  );
}
