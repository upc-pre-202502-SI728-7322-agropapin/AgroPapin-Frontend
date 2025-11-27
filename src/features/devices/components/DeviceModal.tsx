import { useState, useEffect } from 'react';
import type { Device } from '../types/device.types';
import type { SensorResource } from '../types/sensor.types';
import type { ActuatorResource } from '../types/actuator.types';
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
  existingSensors: SensorResource[];
  existingActuators: ActuatorResource[];
}

export function DeviceModal({ isOpen, onClose, onSave, device, existingSensors, existingActuators }: DeviceModalProps) {
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
    const deviceTypeError = validateField({ value: formData.deviceType, required: true });
    if (deviceTypeError) return setError(deviceTypeError);
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
          {device ? 'Edit Device' : 'Add Device'}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          Enter the device information.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Serial Number
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
              Device Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sensor' | 'actuator', deviceType: '' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              required>
              <option value="sensor">Sensor</option>
              <option value="actuator">Actuator</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              {formData.type === 'sensor' ? 'Sensor Type' : 'Actuator Type'}
            </label>
            <select value={formData.deviceType} onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              required>
              <option value="">Select type...</option>
              {formData.type === 'sensor' ? (<>
                  <option value="TEMPERATURE" disabled={existingSensors.some(s => s.sensorType === 'TEMPERATURE')}>
                    Temperature {existingSensors.some(s => s.sensorType === 'TEMPERATURE') && '(Already exists)'}
                  </option>
                  <option value="HUMIDITY" disabled={existingSensors.some(s => s.sensorType === 'HUMIDITY')}>
                    Humidity {existingSensors.some(s => s.sensorType === 'HUMIDITY') && '(Already exists)'}
                  </option>
                  <option value="PH" disabled={existingSensors.some(s => s.sensorType === 'PH')}>
                    pH {existingSensors.some(s => s.sensorType === 'PH') && '(Already exists)'}
                  </option></>) : 
                (<>
                  <option value="IRRIGATION_VALVE" disabled={existingActuators.length > 0}>
                    Irrigation Valve {existingActuators.length > 0 && '(Only one actuator allowed per plot)'}
                  </option>
                  <option value="FERTILIZER_DISPENSER" disabled={existingActuators.length > 0}>
                    Fertilizer Dispenser {existingActuators.length > 0 && '(Only one actuator allowed per plot)'}
                  </option>
                </>)}
            </select>
            {formData.type === 'sensor' && formData.deviceType && existingSensors.some(s => s.sensorType === formData.deviceType) && (
              <p className="mt-2 text-sm text-red-600">
                Only one sensor of each type is allowed per plot.
              </p>
            )}
            {formData.type === 'actuator' && existingActuators.length > 0 && (
              <p className="mt-2 text-sm text-red-600">
                Only one actuator is allowed per plot. Please remove the existing one first.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Model
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
              Version
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
              {device ? 'Save' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
