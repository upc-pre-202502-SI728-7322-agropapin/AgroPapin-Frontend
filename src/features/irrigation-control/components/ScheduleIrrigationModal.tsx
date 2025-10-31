import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import type { ScheduleIrrigationForm } from '../types/irrigation.types';

interface ScheduleIrrigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleIrrigationForm) => void;
  fields: Array<{ id: string; name: string }>;
}

export function ScheduleIrrigationModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  fields 
}: ScheduleIrrigationModalProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<ScheduleIrrigationForm>({
    fieldId: '',
    startDate: new Date(),
    endDate: new Date(),
  });

  const [errors, setErrors] = useState<{
    fieldId?: string;
    startDate?: string;
    endDate?: string;
  }>({});

  if (!isOpen) return null;

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    
    if (!formData.fieldId) {
      newErrors.fieldId = 'You must select a field';
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (formData.startDate < today) {
      newErrors.startDate = 'Start date cannot be before today';
    }
    
    if (formData.endDate < formData.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    onSubmit(formData);
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Schedule Irrigation</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Select the field and date range to schedule the automatic irrigation system.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field/Crop *
            </label>
            <select
              value={formData.fieldId}
              onChange={(e) => {
                setFormData({ ...formData, fieldId: e.target.value });
                setErrors({ ...errors, fieldId: undefined });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59] ${
                errors.fieldId ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Select field</option>
              {fields.map((field) => (
                <option key={field.id} value={field.id}>
                  {field.name}
                </option>
              ))}
            </select>
            {errors.fieldId && (
              <p className="text-red-500 text-xs mt-1">{errors.fieldId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              value={formatDateForInput(formData.startDate)}
              min={today}
              onChange={(e) => {
                setFormData({ 
                  ...formData, 
                  startDate: new Date(e.target.value) 
                });
                setErrors({ ...errors, startDate: undefined });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59] ${
                errors.startDate ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date *
            </label>
            <input
              type="date"
              value={formatDateForInput(formData.endDate)}
              min={formatDateForInput(formData.startDate)}
              onChange={(e) => {
                setFormData({ 
                  ...formData, 
                  endDate: new Date(e.target.value) 
                });
                setErrors({ ...errors, endDate: undefined });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59] ${
                errors.endDate ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.endDate && (
              <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#3E7C59] text-white rounded-lg hover:bg-[#2d5f43] transition-colors">
              Schedule
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
