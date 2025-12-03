import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CooperativeService } from '../../../services/cooperative/CooperativeService';

interface CreateCooperativeViewProps {
  onCooperativeCreated: () => void;
}

export function CreateCooperativeView({ onCooperativeCreated }: CreateCooperativeViewProps) {
  const { t } = useTranslation();
  const [cooperativeName, setCooperativeName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cooperativeName.trim()) {
      setError('Please enter a cooperative name');
      return;
    }

    try {
      setIsCreating(true);
      setError('');
      await CooperativeService.createCooperative(cooperativeName.trim());
      console.log('Cooperative created successfully');
      onCooperativeCreated();
    } catch (error) {
      console.error('Error creating cooperative:', error);
      setError('Failed to create cooperative. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('cooperative.createCooperative')}
          </h1>
          <p className="text-gray-600 text-sm">
            {t('cooperative.enterName')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="cooperativeName" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('cooperative.cooperativeName')}
            </label>
            <input
              id="cooperativeName"
              type="text"
              value={cooperativeName}
              onChange={(e) => setCooperativeName(e.target.value)}
              placeholder={t('cooperative.enterCooperativeName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isCreating}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isCreating}
            className="w-full bg-[#3E7C59] hover:bg-[#2d5f43] text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? t('common.loading') : t('cooperative.createCooperative')}
          </button>
        </form>
      </div>
    </div>
  );
}
