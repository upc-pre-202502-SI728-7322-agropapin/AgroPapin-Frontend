import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldService } from '../../../services/field';
import { FieldModal } from './FieldModal';
import type { CreateFieldRequest } from '../types/field.types';
import { ROUTES } from '../../../shared/constants/routes';

export function CreateFieldForm() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSaveField = async (data: CreateFieldRequest) => {
    try {
      await FieldService.createField(data);
      navigate(ROUTES.FIELD_INFO);
    } catch (err: any) {
      console.error('error creando field', err);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to AgroPapin</h1>
        <p className="text-gray-600 text-lg mb-8">
          Let's start by creating your field to manage your crops efficiently.
        </p>
        
        <FieldModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSave={handleSaveField}
        />
      </div>
    </div>
  );
}
