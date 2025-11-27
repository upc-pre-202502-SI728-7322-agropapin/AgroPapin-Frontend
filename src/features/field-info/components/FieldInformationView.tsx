import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { FieldService } from "../../../services/field";
import { FieldModal } from "./FieldModal";
import type { FieldResponse, CreateFieldRequest, UpdateFieldRequest } from "../types/field.types";
import { ROUTES } from "../../../shared/constants/routes";
import fieldImage from "../../../assets/campo-predeterminado.png";

export function FieldInformationView() {
  const navigate = useNavigate();
  const [field, setField] = useState<FieldResponse | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingField, setLoadingField] = useState(true);

  useEffect(() => {
    loadField();
  }, []);

  const loadField = async () => {
    try {
      setLoadingField(true);
      const fieldData = await FieldService.getField();
      
      if (fieldData) {
        console.log('field:', fieldData);
        setField(fieldData);
      } else {
        console.log('No se encontró ningún field');
        setField(null);
      }
    } catch (err) {
      console.error('error cargando el field:', err);
      setField(null);
    } finally {
      setLoadingField(false);
    }
  };

  const handleSaveField = async (data: CreateFieldRequest | UpdateFieldRequest) => {
    try {
      let savedField: FieldResponse;
      
      if (field) {
        savedField = await FieldService.updateField(data as UpdateFieldRequest);
        console.log('Field actualizado');
      } else {
        savedField = await FieldService.createField(data as CreateFieldRequest);
        console.log('Field creado');
      }
      
      setField(savedField);
      setIsModalOpen(false);
    } catch (err) {
      console.error('error guardando el field:', err);
    }
  };

  if (loadingField) {
    return null;
  }

  // cuando no hay field muestra esta vista
  if (!field) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
          >
            <FaArrowLeft size={16} />
            <span>Back</span>
          </button>

          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Field information
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaPlus className="text-gray-400 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  No Field Found
                </h2>
                <p className="text-gray-600 mb-6">
                  You haven't created a field yet. Create your first field.
                </p>
              </div>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#3E7C59] text-white rounded-lg font-semibold hover:bg-[#2d5f43] transition"
              >
                <FaPlus />
                Add Field
              </button>
            </div>
          </div>

          <FieldModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveField}
          />
        </div>
      </div>
    );
  }

  // cuando hay field
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>Back</span>
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Field information
        </h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="pb-4 border-b border-gray-200">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Field Name
                  </label>
                  <p className="text-xl font-bold text-gray-900">{field.fieldName}</p>
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Location
                  </label>
                  <p className="text-xl font-bold text-gray-900">{field.location}</p>
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Total Area
                  </label>
                  <p className="text-xl font-bold text-gray-900">{field.totalArea} m²</p>
                </div>

                <div className="pb-4">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Status
                  </label>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    field.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {field.status === 'ACTIVE' ? 'Active' : field.status}
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 mb-3 border-2 border-[#3E7C59] text-[#3E7C59] rounded-lg font-medium text-sm hover:bg-gray-100 hover:border-[#2d5f43] hover:text-[#2d5f43] transition"
                >
                  <LuPencil />
                  Edit Field Information
                </button>
                <button
                  onClick={() => navigate(ROUTES.PLOT_LIST)}
                  className="w-full px-4 py-2 bg-[#3E7C59] text-white rounded-lg font-medium text-sm hover:bg-[#2d5f43] transition"
                >
                  View Plots
                </button>
              </div>
            </div>

            <div className="w-full md:w-[300px] h-[350px] md:h-auto flex-shrink-0">
              <img 
                src={fieldImage} 
                alt="Field view" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <FieldModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveField}
          field={field}
        />
      </div>
    </div>
  );
}
