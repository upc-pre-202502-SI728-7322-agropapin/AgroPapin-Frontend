import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { FieldService } from "../../../services/field";
import type { FieldResponse, UpdateFieldRequest } from "../types/field.types";
import { ROUTES } from "../../../shared/constants/routes";
import fieldImage from "../../../assets/campo-predeterminado.png";

export function FieldInformationView() {
  const navigate = useNavigate();
  const [field, setField] = useState<FieldResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState<UpdateFieldRequest>({
    fieldName: "",
    location: "",
    area: ""
  });

  useEffect(() => {
    const loadField = async () => {
      try {
        const fieldData = await FieldService.getField();
        
        if (fieldData) {
          console.log('field:', fieldData);
          setField(fieldData);
          setEditedField({
            fieldName: fieldData.fieldName,
            location: fieldData.location,
            area: fieldData.totalArea
          });
        } else {
          console.log('No se encontró ningún field');
          navigate(ROUTES.CREATE_FIELD, { replace: true });
        }
      } catch (err) {
        console.error('error cargando el field:', err);
      }
    };

    loadField();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (field) {
      setEditedField({
        fieldName: field.fieldName,
        location: field.location,
        area: field.totalArea
      });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const updatedField = await FieldService.updateField(editedField);
      setField(updatedField);
      setIsEditing(false);
      console.log('Field actualizado');
    } catch (err) {
      console.error('error actualiando el field:', err);
    }
  };

  const handleInputChange = (field: keyof UpdateFieldRequest, value: string) => {
    setEditedField(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!field) {
    return null;
  }

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
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedField.fieldName}
                      onChange={(e) => handleInputChange('fieldName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                    />
                  ) : (
                    <p className="text-xl font-bold text-gray-900">{field.fieldName}</p>
                  )}
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedField.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                    />
                  ) : (
                    <p className="text-xl font-bold text-gray-900">{field.location}</p>
                  )}
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Total Area
                  </label>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={editedField.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                      />
                      <span className="text-gray-600">m²</span>
                    </div>
                  ) : (
                    <p className="text-xl font-bold text-gray-900">{field.totalArea} m²</p>
                  )}
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

              {isEditing ? (
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-[#3E7C59] text-white rounded-lg font-medium text-sm hover:bg-[#2d5f43] transition">
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleEdit}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 mb-3 border-2 border-[#3E7C59] text-[#3E7C59] rounded-lg font-medium text-sm hover:hover:bg-gray-100  hover:border-[#2d5f43] hover:text-[#2d5f43] transition">
                    <FaEdit />
                    Edit Field Information
                  </button>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => navigate(ROUTES.CROP_LIST)}
                      className="flex-1 px-4 py-2 bg-[#3E7C59] text-white rounded-lg font-medium text-sm hover:bg-[#2d5f43] transition">
                      View Crops
                    </button>
                    <button
                      onClick={() => navigate(ROUTES.DEVICES.replace(':id', field.id))}
                      className="flex-1 px-4 py-2 border-2 border-[#3E7C59] bg-white text-[#3E7C59] rounded-lg font-medium text-sm hover:bg-gray-100 hover:border-[#2d5f43] hover:text-[#2d5f43] transition">
                      View Devices
                    </button>
                  </div>
                </>
              )}
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
      </div>
    </div>
  );
}
