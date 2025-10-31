import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FieldList } from "./FieldList";
import type { Field } from "../types/field.types";
import fieldImage from "../../../assets/campo-predeterminado.png";
import { ROUTES } from "../../../shared/constants/routes";

export function FieldInformationView() {
  const navigate = useNavigate();
  
  const fields: Field[] = [
    {
      id: '1',
      name: 'Crop 1',
      imageUrl: fieldImage,
      cropType: 'Maíz'
    },
    {
      id: '2',
      name: 'Crop 2',
      imageUrl: fieldImage,
      cropType: 'Trigo'
    },
    {
      id: '3',
      name: 'Crop 3',
      imageUrl: fieldImage,
      cropType: 'Arroz'
    },
  ];

  const handleInfoClick = (fieldId: string) => {
    console.log('ver info de campo', fieldId);
    navigate(ROUTES.CROP_LIST);
  };

  const handleDevicesClick = (fieldId: string) => {
    navigate(ROUTES.DEVICES.replace(':id', fieldId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-2">
            Information field
          </h1>
        </div>

        <FieldList
          fields={fields}
          onInfoClick={handleInfoClick}
          onDevicesClick={handleDevicesClick}/>
      </div>
    </div>
  );
}
