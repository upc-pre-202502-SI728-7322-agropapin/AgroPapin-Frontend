import type { FieldCardProps } from "../types/field.types";

export function FieldCard({ field, onInfoClick, onDevicesClick }: FieldCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 hover:shadow-lg transition-shadow">

        <div className="text-center py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">{field.name}</h3>
      </div>

      <div className="relative h-48 overflow-hidden">
        <img
          src={field.imageUrl}
          alt={`Campo ${field.name}`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex gap-3 justify-center">
        <button
          onClick={() => onInfoClick(field.id)}
          className="flex-1 bg-[#3E7C59] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d5f43] transition-colors">
          Crop information
        </button>
        <button
          onClick={() => onDevicesClick(field.id)}
          className="flex-1 bg-gray-200 text-[#3E7C59] px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors">
          Devices
        </button>
      </div>
    </div>
  );
}
