import { useState, useEffect } from 'react';
import type { PlotModalProps, CreatePlotResource, UpdatePlotResource } from '../types/plot.types';
import { validateField } from '../../../shared/utils/validations';

export function PlotModal({ isOpen, onClose, onSave, plot }: PlotModalProps) {
  const [formData, setFormData] = useState<CreatePlotResource | UpdatePlotResource>({
    plotName: '',
    plotArea: 0
  });

  useEffect(() => {
    if (isOpen) {
      if (plot) {
        setFormData({
          plotName: plot.plotName,
          plotArea: plot.area
        });
      } else {
        setFormData({
          plotName: '',
          plotArea: 0
        });
      }
    }
  }, [plot, isOpen]);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // Validations
    const nameError = validateField({ value: formData.plotName, required: true });
    if (nameError) return setError(nameError);
    const areaError = validateField({ value: formData.plotArea, required: true, numeric: true, positive: true, max: 100000 });
    if (areaError) return setError(areaError);
    await onSave(formData);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'plotArea' ? Number(value) : value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {plot ? 'Edit Plot' : 'Create New Plot'}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          {plot 
            ? 'Update your plot information.' 
            : 'Create a new plot within your field to organize your crops.'}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Plot Name *
            </label>
            <input
              type="text"
              name="plotName"
              value={formData.plotName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="Ex: North Section A"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Plot Area (m²) *
            </label>
            <input
              type="number"
              name="plotArea"
              step="0.01"
              value={formData.plotArea || ''}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="Ex: 1500"
              required
              min="0"
              max="100000"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold">
              {plot ? 'Save' : 'Create'}
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
