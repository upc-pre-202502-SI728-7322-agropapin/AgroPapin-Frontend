import { useState, useEffect } from 'react';
import type { Control, ControlFormData } from '../types/control.types';
import { validateField } from '../../../shared/utils/validations';

interface ControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ControlFormData) => void;
  control: Control | null;
}

export function ControlModal({ isOpen, onClose, onSave, control }: ControlModalProps) {
  const [formData, setFormData] = useState<ControlFormData>({
    leaves: '',
    stemCondition: '',
    soilMoisture: '',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (control) {
      setFormData({
        leaves: control.leaves,
        stemCondition: control.stemCondition,
        soilMoisture: control.soilMoisture,
      });
    } else {
      setFormData({
        leaves: '',
        stemCondition: '',
        soilMoisture: '',
      });
    }
  }, [control, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const leavesError = validateField({ value: formData.leaves, required: true });
    if (leavesError) return setError(leavesError);
    const stemError = validateField({ value: formData.stemCondition, required: true });
    if (stemError) return setError(stemError);
    const soilError = validateField({ value: formData.soilMoisture, required: true });
    if (soilError) return setError(soilError);
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {control ? 'Edit Control' : 'Add Control'}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          Enter the leaf condition, stem condition and soil moisture.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Leaf Condition
            </label>
            <input
              type="text"
              value={formData.leaves}
              onChange={(e) => setFormData({ ...formData, leaves: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., Shows two spots or areas."
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Stem Condition
            </label>
            <input
              type="text"
              value={formData.stemCondition}
              onChange={(e) => setFormData({ ...formData, stemCondition: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., Shows lesions and discoloration."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Soil Moisture
            </label>
            <input
              type="text"
              value={formData.soilMoisture}
              onChange={(e) => setFormData({ ...formData, soilMoisture: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., The soil is very wet."
              required
            />
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold">
              {control ? 'Save' : 'Add'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 px-4  rounded-lg font-semibold hover:bg-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
