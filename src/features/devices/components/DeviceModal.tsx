import { useState, useEffect } from 'react';
import type { Device } from '../types/device.types';

interface DeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; type: 'sensor' | 'actuator'; location: string }) => void;
  device?: Device | null;
}

export function DeviceModal({ isOpen, onClose, onSave, device }: DeviceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'sensor' as 'sensor' | 'actuator',
    location: '',
  });

  useEffect(() => {
    if (device) {
      setFormData({
        name: device.name,
        type: device.type,
        location: device.location,
      });
    } else {
      setFormData({
        name: '',
        type: 'sensor',
        location: '',
      });
    }
  }, [device, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              Device Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., Sensor 1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sensor' | 'actuator' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              required
            >
              <option value="sensor">Sensor</option>
              <option value="actuator">Actuator</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Location (Zone)
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., Zone A"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold"
            >
              {device ? 'Save' : 'Create'}
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
