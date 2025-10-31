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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          {crop ? 'Edit Crop' : 'Add Crop'}
        </h2>

        <form onSubmit={handleSubmit}>
        
          <div className="grid grid-cols-2 gap-8 mb-4">
            <div className="bg-[#3E7C59] text-white px-4 py-3 rounded font-semibold">
              Name
            </div>
            <div className="bg-[#3E7C59] text-white px-4 py-3 rounded font-semibold">
              Planted Area(m2)
            </div>
          </div>

         
          <div className="grid grid-cols-2 gap-8 mb-8">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-b-2 border-gray-300 px-4 py-2 focus:outline-none focus:border-[#3E7C59]"
              placeholder="Rice"
              required
            />
            <input
              type="number"
              value={formData.plantedArea || ''}
              onChange={(e) => setFormData({ ...formData, plantedArea: Number(e.target.value) })}
              className="border-b-2 border-gray-300 px-4 py-2 focus:outline-none focus:border-[#3E7C59]"
              placeholder="2000"
              required
            />
          </div>

        
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-[#3E7C59] text-white px-12 py-2 rounded-lg font-semibold hover:bg-[#2d5f43] transition-colors">
              Create
            </button>

            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-12 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
