import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ControlsTable } from './ControlsTable';
import { ControlModal } from './ControlModal';
import { ConfirmModal } from '../../../shared/components/ui/ConfirmModal';
import { AddButton } from '../../../shared/components/ui/AddButton';
import { ControlService } from '../../../services/control';
import type { Control, ControlFormData, ControlResource, CreateControlResource, UpdateControlResource } from '../types/control.types';

interface ControlsTabProps {
  cropId: string;
  isAdmin?: boolean;
}

const mockControlsData: Record<string, Control[]> = {
  '1': [
    {
      id: '1',
      date: '09/05/2025',
      leaves: 'Shows two spots or areas.',
      stemCondition: 'Shows lesions and discoloration.',
      soilMoisture: 'The soil is very wet.',
    },
    {
      id: '2',
      date: '07/05/2025',
      leaves: 'Shows two spots or areas.',
      stemCondition: 'Shows lesions and discoloration.',
      soilMoisture: 'The soil is very wet.',
    },
    {
      id: '3',
      date: '05/05/2025',
      leaves: 'Shows two spots or areas.',
      stemCondition: 'Shows lesions and discoloration.',
      soilMoisture: 'The soil is very wet.',
    },
    {
      id: '4',
      date: '03/05/2025',
      leaves: 'Shows two spots or areas.',
      stemCondition: 'Shows lesions and discoloration.',
      soilMoisture: 'The soil is very wet.',
    },
    {
      id: '5',
      date: '01/05/2025',
      leaves: 'Shows two spots or areas.',
      stemCondition: 'Shows lesions and discoloration.',
      soilMoisture: 'The soil is very wet.',
    },
  ],
  '2': [
    {
      id: '1',
      date: '20/07/2024',
      leaves: 'Healthy green leaves.',
      stemCondition: 'Strong and upright.',
      soilMoisture: 'The soil is adequately moist.',
    },
    {
      id: '2',
      date: '25/07/2024',
      leaves: 'No visible damage.',
      stemCondition: 'Growing well.',
      soilMoisture: 'The soil is slightly dry.',
    },
  ],
  '3': [
    {
      id: '1',
      date: '20/07/2024',
      leaves: 'Healthy green leaves.',
      stemCondition: 'Strong and upright.',
      soilMoisture: 'The soil is adequately moist.',
    },
  ],
  '4': [
    {
      id: '1',
      date: '20/07/2024',
      leaves: 'Healthy green leaves.',
      stemCondition: 'Strong and upright.',
      soilMoisture: 'The soil is adequately moist.',
    },
  ],
};

export function ControlsTab({ cropId, isAdmin = false }: ControlsTabProps) {
  const [controls, setControls] = useState<Control[]>(
    mockControlsData[cropId] || mockControlsData['1']
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [controlToDelete, setControlToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchControls = async () => {
      if (!plotId || !plantingId) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await ControlService.getControlsByPlantingId(plotId, plantingId);
        setControls(data.map(mapControlResourceToControl));
      } catch (err) {
        setError('Error loading controls');
        console.error('Error fetching controls:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchControls();
  }, [plotId, plantingId]);

  const handleEdit = (control: Control) => {
    if (isAdmin) return;
    setSelectedControl(control);
    setIsModalOpen(true);
  };

  const handleDelete = (controlId: string) => {
    if (isAdmin) return;
    setControlToDelete(controlId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!controlToDelete || !plotId) return;

    try {
      await ControlService.deleteControl(plotId, controlToDelete);
      setControls(controls.filter((control) => control.id !== controlToDelete));
      setControlToDelete(null);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Error deleting control:', err);
      setError('Error deleting control');
    }
  };

  const handleSaveControl = async (data: ControlFormData) => {
    if (!plotId || !plantingId) return;

    try {
      if (selectedControl) {
        // Edit
        const updateData: UpdateControlResource = {
          date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
          stateLeaves: data.leaves,
          stateStem: data.stemCondition,
          soilMoisture: data.soilMoisture,
        };
        const updated = await ControlService.updateControl(plotId, selectedControl.id, updateData);
        setControls(
          controls.map((control) =>
            control.id === selectedControl.id ? mapControlResourceToControl(updated) : control
          )
        );
      } else {
        // Create
        const createData: CreateControlResource = {
          date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
          stateLeaves: data.leaves,
          stateStem: data.stemCondition,
          soilMoisture: data.soilMoisture,
          plantingId: plantingId,
        };
        const created = await ControlService.createControl(plotId, createData);
        setControls([mapControlResourceToControl(created), ...controls]);
      }
      setSelectedControl(null);
    } catch (err) {
      console.error('Error saving control:', err);
      setError('Error saving control');
    }
  };

  const handleOpenAddModal = () => {
    if (isAdmin) return;
    setSelectedControl(null);
    setIsModalOpen(true);
  };

  return (
    <div className="py-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-4 text-center text-gray-600">
          Loading controls...
        </div>
      )}

      {!isAdmin && (
        <div className="flex justify-end mb-6">
          <AddButton
            onClick={handleOpenAddModal}
            label="Add Control"
          />
        </div>
      )}

      <div className="bg-white rounded-lg overflow-hidden ">
        {controls.length === 0 && !loading && !error ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No controls registered yet</p>
            <p className="text-sm">Click "Add Control" to register your first control</p>
          </div>
        ) : (
          <ControlsTable
            controls={controls}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ControlModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedControl(null);
        }}
        onSave={handleSaveControl}
        control={selectedControl}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setControlToDelete(null);
        }}
        title="Delete Control"
        message="Are you sure you want to delete this control? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}
