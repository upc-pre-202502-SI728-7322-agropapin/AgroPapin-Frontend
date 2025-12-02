import type { PlotCardProps } from "../types/plot.types";
import fieldImage from "../../../assets/campo-predeterminado.png";
import { LuPencil } from "react-icons/lu";
import { IoTrashOutline } from "react-icons/io5";

export function PlotCard({ plot, onInfoClick, onDevicesClick, onMetricsClick, onEdit, onDelete, isAdmin = false }: PlotCardProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'EMPTY':
        return 'Empty';
      case 'PLANTED':
        return 'Planted';
      case 'HARVESTED':
        return 'Harvested';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 hover:shadow-lg transition-shadow">
      <div className="py-3 px-4 border-b border-gray-200 flex justify-between items-start">
        <div className="ml-2">
          <h3 className="text-lg font-semibold text-gray-800">{plot.plotName}</h3>
          <p className="text-sm text-gray-600">{plot.area} m²</p>
        </div>
        {!isAdmin && (
          <div className="flex gap-2">
            {onEdit && (
              <button onClick={(e) => {e.stopPropagation();onEdit(plot);}} className="text-orange-500 hover:text-orange-700 transition-colors p-2" title="Edit plot">
                <LuPencil size={22} />
              </button>
            )}
            {onDelete && (
              <button onClick={(e) => {e.stopPropagation();onDelete(plot.plotId);}}className="text-red-500 hover:text-red-700 transition-colors p-2" title="Delete plot">
                <IoTrashOutline size={22} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="relative h-48 overflow-hidden">
        <img src={fieldImage} alt={`Plot ${plot.plotName}`} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2 ">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold  ${
            plot.status === 'PLANTED' 
              ? 'bg-green-100 text-green-800' 
              : plot.status === 'HARVESTED'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {getStatusLabel(plot.status)}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex gap-3">
          <button onClick={() => onInfoClick(plot.plotId)} className="flex-1 bg-[#3E7C59] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#2d5f43] transition-colors">
            Crops
          </button>
          <button onClick={() => onDevicesClick(plot.plotId)} className="flex-1 bg-gray-200 text-[#3E7C59] px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors">
            Devices
          </button>
        </div>
        {onMetricsClick && (
          <button onClick={() => onMetricsClick(plot.plotId)} className="w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors">
            Live Metrics
          </button>
        )}
      </div>
    </div>
  );
}