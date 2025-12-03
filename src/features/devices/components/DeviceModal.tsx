import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Device } from '../types/device.types';
import { validateField } from '../../../shared/utils/validations';

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { 
    serialNumber: string; 
    type: 'sensor' | 'actuator'; 
    deviceType: string;
    model: string;
    version: string;
  }) => void;
  device?: Device | null;
}

export function DeviceModal({ isOpen, onClose, onSave, device }: DeviceModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    serialNumber: '',
    type: 'sensor' as 'sensor' | 'actuator',
    deviceType: '',
    model: '',
    version: '',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (device) {
      setFormData({
        serialNumber: '',
        type: 'sensor',
        deviceType: '',
        model: '',
        version: '',
      });
    } else {
      setFormData({
        serialNumber: '',
        type: 'sensor',
        deviceType: '',
        model: '',
        version: '',
      });
    }
  }, [device, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const serialError = validateField({ value: formData.serialNumber, required: true });
    if (serialError) return setError(serialError);
    const typeError = validateField({ value: formData.type, required: true });
    if (typeError) return setError(typeError);
    
    // Solo validar deviceType si es actuador
    if (formData.type === 'actuator') {
      const deviceTypeError = validateField({ value: formData.deviceType, required: true });
      if (deviceTypeError) return setError(deviceTypeError);
    }
    
    const modelError = validateField({ value: formData.model, required: true });
    if (modelError) return setError(modelError);
    const versionError = validateField({ value: formData.version, required: true });
    if (versionError) return setError(versionError);
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t('devices.addDevice')}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          {t('devices.enterDeviceInfo')}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {t('devices.serialNumber')}
            </label>
            <input
              type="text"
              value={formData.serialNumber}
              onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., SN-12345"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {t('devices.deviceType')}
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sensor' | 'actuator', deviceType: '' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              required>
              <option value="sensor">{t('devices.sensor')}</option>
              <option value="actuator">{t('devices.actuator')}</option>
            </select>
          </div>

          {formData.type === 'actuator' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {t('devices.actuatorType')}
              </label>
              <select value={formData.deviceType} onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                required>
                <option value="">{t('devices.selectType')}</option>
                <option value="IRRIGATION_VALVE">{t('devices.irrigationValve')}</option>
                <option value="FERTILIZER_DISPENSER">{t('devices.fertilizerDispenser')}</option>
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {t('devices.model')}
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., DHT22"
              required/>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              {t('devices.version')}
            </label>
            <input
              type="text"
              value={formData.version}
              onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., v1.0"
              required/>
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold">
              {t('common.create')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
              {t('common.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
