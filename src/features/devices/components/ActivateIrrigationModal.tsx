import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ActivateIrrigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onActivate: (actuatorId: string, minutes: number) => Promise<void>;
  actuators: Array<{ actuatorId: string; serialNumber: string; actuatorType: string }>;
}

export function ActivateIrrigationModal({ isOpen, onClose, onActivate, actuators }: ActivateIrrigationModalProps) {
  const { t } = useTranslation();
  const [selectedActuator, setSelectedActuator] = useState('');
  const [minutes, setMinutes] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const irrigationActuators = actuators.filter(a => 
    a.actuatorType?.toUpperCase().includes('IRRIGATION') || 
    a.actuatorType?.toUpperCase().includes('WATER')
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!selectedActuator || minutes <= 0) return;

    setIsSubmitting(true);
    try {
      await onActivate(selectedActuator, minutes);
      onClose();
      setSelectedActuator('');
      setMinutes(5);
    } catch (error) {
      console.error('Error activating irrigation:', error);
      setError('Failed to activate irrigation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t('irrigation.activate')}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {t('irrigation.selectActuatorDuration')}
        </p>

        <div className="text-left">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {t('irrigation.selectActuator')} *
              </label>
              <select
                value={selectedActuator}
                onChange={(e) => setSelectedActuator(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                required
              >
                <option value="">{t('irrigation.chooseActuator')}</option>
                {irrigationActuators.map((actuator) => (
                  <option key={actuator.actuatorId} value={actuator.actuatorId}>
                    {actuator.serialNumber} - {actuator.actuatorType}
                  </option>
                ))}
              </select>
              {irrigationActuators.length === 0 && (
                <p className="mt-2 text-sm text-red-600">{t('irrigation.noActuators')}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                {t('irrigation.duration')} *
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                placeholder="Ex: 5"
                required
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit" 
                disabled={isSubmitting || !selectedActuator || irrigationActuators.length === 0}
                className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? t('common.activating') : t('irrigation.activate')}
              </button>
              <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors disabled:opacity-50">
                {t('common.cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
