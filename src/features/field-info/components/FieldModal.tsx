import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { CreateFieldRequest, UpdateFieldRequest, FieldModalProps } from '../types/field.types';
import { validateField } from '../../../shared/utils/validations';

export function FieldModal({ isOpen, onClose, onSave, field }: FieldModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<CreateFieldRequest | UpdateFieldRequest>({
    fieldName: '',
    location: '',
    area: ''
  });

  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    const nameError = validateField({ value: formData.fieldName, required: true });
    if (nameError) return setError(nameError);
    const locationError = validateField({ value: formData.location, required: true });
    if (locationError) return setError(locationError);
    const areaError = validateField({ value: formData.area, required: true, numeric: true, positive: true, max: 1000000 });
    if (areaError) return setError(areaError);
    await onSave({ ...formData, area: String(formData.area) });
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
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 ">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {field ? t('field.updateField') : t('field.createField')}
        </h2>
        
        <p className="text-gray-600  mb-6">
          {field 
            ? t('field.fieldInfo') 
            : t('field.createFirstField')}
        </p>

        <div className="text-left">
            <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {t('field.fieldName')} *
            </label>
            <input
              type="text"
              name="fieldName"
              value={formData.fieldName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder={t('field.enterFieldName')}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {t('plots.location')} *
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
              {t('plots.area')} (m²) *
            </label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="Ex: 12000"
              required
              min="0"
              max="1000000"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold"
            >
              {field ? t('common.save') : t('common.create')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              {t('common.cancel')}
            </button>
          </div>
        </form>
        </div>
        
      </div>
    </div>
  );
}
