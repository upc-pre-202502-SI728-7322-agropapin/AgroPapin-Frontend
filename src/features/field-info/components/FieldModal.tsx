import { useState, useEffect } from 'react';
import type { CreateFieldRequest, UpdateFieldRequest, FieldModalProps } from '../types/field.types';

export function FieldModal({ isOpen, onClose, onSave, field }: FieldModalProps) {
  const [formData, setFormData] = useState<CreateFieldRequest | UpdateFieldRequest>({
    fieldName: '',
    location: '',
    area: ''
  });

  useEffect(() => {
    if (isOpen) {
      if (field) {
        setFormData({
          fieldName: field.fieldName,
          location: field.location,
          area: field.totalArea
        });
      } else {
        setFormData({
          fieldName: '',
          location: '',
          area: ''
        });
      }
    }
  }, [field, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {field ? 'Edit Field' : 'Create New Field'}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          {field 
            ? 'Update your field information.' 
            : 'To get started, we need some information about your field.'}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Field Name *
            </label>
            <input
              type="text"
              name="fieldName"
              value={formData.fieldName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="Ex: Velasquez Field"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="Ex: Huacho, Lima"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Area (m²) *
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="Ex: 12000"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold"
            >
              {field ? 'Save' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
