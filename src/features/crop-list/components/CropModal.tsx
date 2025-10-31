import { useState, useEffect } from 'react';
import type { Crop, CropFormData } from '../types/crop.types';

interface CropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CropFormData) => void;
  crop?: Crop | null;
}

export function CropModal({ isOpen, onClose, onSave, crop }: CropModalProps) {
  const [formData, setFormData] = useState<CropFormData>({
    name: '',
    plantedArea: 0,
  });

  useEffect(() => {
    if (crop) {
      setFormData({
        name: crop.name,
        plantedArea: crop.plantedArea,
      });
    } else {
      setFormData({
        name: '',
        plantedArea: 0,
      });
    }
  }, [crop]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {crop ? 'Edit Crop' : 'Add Crop'}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          Enter the crop name and planted area.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., Rice"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Planted Area (m2)
            </label>
            <input
              type="number"
              value={formData.plantedArea || ''}
              onChange={(e) => setFormData({ ...formData, plantedArea: Number(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., 2000"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold"
            >
              {crop ? 'Save' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 px-4  rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
