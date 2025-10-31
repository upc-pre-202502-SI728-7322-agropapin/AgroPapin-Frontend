import { useState } from 'react';
import { ControlsTable } from './ControlsTable';
import { ControlModal } from './ControlModal';
import { ConfirmModal } from '../../../shared/components/ui/ConfirmModal';
import { AddButton } from '../../../shared/components/ui/AddButton';
import type { Control, ControlFormData } from '../types/control.types';

interface ControlsTabProps {
  cropId: string;
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

export function ControlsTab({ cropId }: ControlsTabProps) {
  const [controls, setControls] = useState<Control[]>(
    mockControlsData[cropId] || mockControlsData['1']
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedControl, setSelectedControl] = useState<Control | null>(null);
  const [controlToDelete, setControlToDelete] = useState<string | null>(null);

  const handleEdit = (control: Control) => {
    setSelectedControl(control);
    setIsModalOpen(true);
  };

  const handleDelete = (controlId: string) => {
    setControlToDelete(controlId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (controlToDelete) {
      setControls(controls.filter((control) => control.id !== controlToDelete));
      setControlToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSaveControl = (data: ControlFormData) => {
    if (selectedControl) {
      // Edit
      setControls(
        controls.map((control) =>
          control.id === selectedControl.id
            ? { ...control, ...data }
            : control
        )
      );
    } else {
      // Create
      const newControl: Control = {
        id: String(controls.length + 1),
        date: new Date().toLocaleDateString('en-GB'),
        ...data,
      };
      setControls([newControl, ...controls]);
    }
    setSelectedControl(null);
  };

  const handleOpenAddModal = () => {
    setSelectedControl(null);
    setIsModalOpen(true);
  };

  return (
    <div className="py-6">

      <div className="flex justify-end mb-6">
        <AddButton
          onClick={handleOpenAddModal}
          label="Add Control"
        />
      </div>

      <div className="bg-white rounded-lg overflow-hidden ">
        <ControlsTable
          controls={controls}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
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
