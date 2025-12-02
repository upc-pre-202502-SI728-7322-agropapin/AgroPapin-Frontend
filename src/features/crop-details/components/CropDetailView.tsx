import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CropDetailTabs } from './CropDetailTabs';
import { GeneralInfoTab } from './GeneralInfoTab';
import { CropCareTab } from './CropCareTab';
import { ControlsTab } from './ControlsTab';
import { PestsTab } from './PestsTab';
import { ProductsTab } from './ProductsTab';
import { useAuth } from '../../auth/context/AuthContext';
import type { CropDetail } from '../types/crop-details.types';
import {FaArrowLeft} from "react-icons/fa";

const mockCropData: Record<string, CropDetail> = {
  '1': {
    id: '1',
    name: 'Lemon',
    creationDate: '19/07/2024',
    plantedArea: 100,
    description: 'Lemon (Citrus limon) is a perennial crop that requires well-drained soils and moderate water for optimal growth. It is cultivated in a variety of climatic conditions and its growth cycle includes stages such as flowering, fruit development and harvest. The mature fruits are harvested and can be processed into fresh juice or used in culinary applications. It is an important crop for the food industry.',
    imageUrl: 'https://images.unsplash.com/photo-1590502593747-42a996133562?w=600&h=400&fit=crop'
  },
  '2': {
    id: '2',
    name: 'Rice',
    creationDate: '19/07/2024',
    plantedArea: 700,
    description: 'Rice (Oryza sativa) is an annual herbaceous crop that requires well-drained soils and abundant water for optimal growth. It is cultivated in a variety of climatic conditions and its growth cycle includes stages such as germination, flowering and grain maturation. The mature grains are harvested and can be processed into refined white rice or brown rice. It is an important staple food worldwide.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop'
  },
  '3': {
    id: '3',
    name: 'Rice',
    creationDate: '19/07/2024',
    plantedArea: 700,
    description: 'Rice (Oryza sativa) is an annual herbaceous crop that requires well-drained soils and abundant water for optimal growth. It is cultivated in a variety of climatic conditions and its growth cycle includes stages such as germination, flowering and grain maturation. The mature grains are harvested and can be processed into refined white rice or brown rice. It is an important staple food worldwide.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop'
  },
  '4': {
    id: '4',
    name: 'Rice',
    creationDate: '19/07/2024',
    plantedArea: 700,
    description: 'Rice (Oryza sativa) is an annual herbaceous crop that requires well-drained soils and abundant water for optimal growth. It is cultivated in a variety of climatic conditions and its growth cycle includes stages such as germination, flowering and grain maturation. The mature grains are harvested and can be processed into refined white rice or brown rice. It is an important staple food worldwide.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop'
  }
};

export function CropDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.roles?.includes('ROLE_ADMINISTRATOR');
  const [activeTab, setActiveTab] = useState('general');

  // MOCKUP DATA
  const crop = id && mockCropData[id] ? mockCropData[id] : {
    id: id || '1',
    name: 'Tomato',
    creationDate: '15/11/2024',
    plantedArea: 150,
    description: 'Tomato (Solanum lycopersicum) is an annual herbaceous crop that requires well-drained soils and moderate water for optimal growth. It is cultivated in a variety of climatic conditions and its growth cycle includes stages such as germination, flowering, fruit development and harvest. The mature fruits are harvested and can be consumed fresh or processed into sauces and other products.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&h=400&fit=crop'
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralInfoTab crop={crop} />;
      case 'care':
        return <CropCareTab cropId={crop.id} />;
      case 'controls':
        return <ControlsTab cropId={crop.id} isAdmin={isAdmin} />;
      case 'pests':
        return <PestsTab cropId={crop.id} />;
      case 'products':
        return <ProductsTab cropId={crop.id} isAdmin={isAdmin} />;
      default:
        return <GeneralInfoTab crop={crop} />;
    }
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-[#3E7C59] hover:text-[#2d5a42] transition-colors flex items-center gap-2 font-medium">
        <div className="flex items-center justify-center gap-2">
          <FaArrowLeft />
          Back to Crop List
        </div>

      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
        Crop Information
      </h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <CropDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {renderTabContent()}
      </div>
    </>
  );
}
