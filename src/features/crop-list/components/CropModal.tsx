import { useState, useEffect } from 'react';
import type { PlantingResource, CreatePlantingResource } from '../types/crop.types';
import { useCropTypes } from '../hooks';
import { validateField } from '../../../shared/utils/validations';

interface CropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreatePlantingResource) => void;
  planting?: PlantingResource | null;
}

export function CropModal({ isOpen, onClose, onSave, planting }: CropModalProps) {
  const { cropTypes } = useCropTypes();
  const [formData, setFormData] = useState<{ cropTypeId: string }>({
    cropTypeId: '',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (planting) {
        setFormData({
          cropTypeId: (planting as any).cropTypeId || '',
        });
      } else {
        setFormData({
          cropTypeId: '',
        });
      }
    }
  }, [planting, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Validations
    const cropTypeError = validateField({ value: formData.cropTypeId, required: true });
    if (cropTypeError) return setError(cropTypeError);
    // TODO: Remove hardcoded dates when backend logic is implemented
    const dates: CreatePlantingResource = {
      cropTypeId: formData.cropTypeId,
      plantingDate: new Date().toISOString().split('T')[0],
      actualHarvestDate: null
    };
    onSave(dates);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {planting ? 'Edit Crop' : 'Add Crop'}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          {planting ? 'Update the crop type.' : 'Select a crop type to add to your plot.'}
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
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold">
              {planting ? 'Save' : 'Create'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
