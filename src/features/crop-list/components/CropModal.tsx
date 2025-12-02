import { useState, useEffect } from 'react';
import type { CreatePlantingResource } from '../types/crop.types';
import type { PlantingResource } from '../types/crop.types';
import { useCropTypes } from '../hooks';

export interface CropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreatePlantingResource) => void;
  externalError?: string | null;
  plantings: PlantingResource[];
}

export function CropModal({ isOpen, onClose, onSave, externalError, plantings }: CropModalProps) {
  const { cropTypes } = useCropTypes();
  const [formData, setFormData] = useState<{
    cropTypeId: string;
    plantingDate: string;
    actualHarvestDate: string | null;}>({
    cropTypeId: '',
    plantingDate: '',
    actualHarvestDate: null,
  });

  // validar si hay plantings activos
  const hasActivePlanting = Array.isArray(plantings) && plantings.some(p => 
    p.status === 'GROWING'
  );

  useEffect(() => {
    if (isOpen) {
      setFormData({
        cropTypeId: '',
        plantingDate: new Date().toISOString().split('T')[0],
        actualHarvestDate: '',
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createData: CreatePlantingResource = {
      cropTypeId: formData.cropTypeId,
      plantingDate: formData.plantingDate,
      actualHarvestDate: formData.actualHarvestDate === '' ? null : formData.actualHarvestDate,
    };
    onSave(createData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Add Crop
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          Select a crop type to add to your plot.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Crop Type *
            </label>
            <select
              value={formData.cropTypeId}
              onChange={(e) => setFormData({ ...formData, cropTypeId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              required
            >
              <option value="">Select a crop type</option>
              {cropTypes.map((cropType) => (
                <option key={cropType.id} value={cropType.id}>
                  {cropType.name} - {cropType.variety}
                </option>
              ))}
            </select>
            {hasActivePlanting && (
              <p className="mt-2 text-sm text-red-600">
                This plot already has an active crop. Please harvest or remove the existing crop before planting a new one.
              </p>
            )}
            {externalError && (
              <p className="mt-2 text-sm text-red-600">{externalError}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button 
              type="submit" 
              disabled={hasActivePlanting}
              className="flex-1 bg-[#3E7C59] text-white py-3 px-6 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
              Create
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-gray-200 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
