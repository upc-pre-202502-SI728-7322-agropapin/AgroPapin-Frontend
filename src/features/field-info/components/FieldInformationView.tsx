import { useNavigate } from "react-router-dom";
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
    console.log('ver dispositivos:', fieldId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

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
