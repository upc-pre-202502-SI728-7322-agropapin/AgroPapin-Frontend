import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldService } from '../../../services/field';
import type { CreateFieldRequest } from '../types/field.types';
import { ROUTES } from '../../../shared/constants/routes';

export function CreateFieldForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateFieldRequest>({
    fieldName: '',
    location: '',
    area: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await FieldService.createField(formData);
      navigate(ROUTES.FIELD_INFO);
    } catch (err: any) {
      console.error('error creando field', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your Field</h1>
            <p className="text-gray-600">To get started, we need some information about your field</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fieldName" className="block text-sm font-medium text-gray-700 mb-2">
                Field name *
              </label>
              <input
                id="fieldName"
                name="fieldName"
                type="text"
                required
                value={formData.fieldName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E7C59] focus:border-transparent outline-none transition"
                placeholder="Ex: Velasquez Field"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E7C59] focus:border-transparent outline-none transition"
                placeholder="Ex: Huacho, Lima"
              />
            </div>

            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                Area (m²) *
              </label>
              <input
                id="area"
                name="area"
                type="text"
                required
                value={formData.area}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3E7C59] focus:border-transparent outline-none transition"
                placeholder="Ex: 12000"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#3E7C59] text-white rounded-lg font-semibold hover:bg-[#2d5f43] transition"
              >
                Create Field
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
