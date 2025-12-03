import { useTranslation } from 'react-i18next';
import type { PlantingResource } from '../types/crop.types';
import { LuPencil } from 'react-icons/lu';
import { IoTrashOutline } from 'react-icons/io5';

interface CropTableProps {
  plantings: PlantingResource[];
  onRowClick: (plantingId: string) => void;
  onEdit?: (planting: PlantingResource) => void;
  onDelete?: (plantingId: string) => void;
  onHarvest?: (plantingId: string) => void;
  isAdmin?: boolean;
}

export function CropTable({ plantings, onRowClick, onEdit, onDelete, onHarvest, isAdmin = false }: CropTableProps) {
  const { t } = useTranslation();
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'GROWING':
        return t('crops.growing');
      case 'HARVESTED':
        return t('crops.harvested');
      case 'FAILED':
        return t('crops.failed');
      default:
        return status;
    }
  };

  if (plantings.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
        {t('crops.noCropsFound')}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#3E7C59] text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold whitespace-nowrap">{t('crops.cropType')}</th>
              <th className="px-6 py-4 text-left font-semibold whitespace-nowrap">{t('crops.status')}</th>
              <th className="px-6 py-4 text-left font-semibold whitespace-nowrap">{t('crops.plantingDate')}</th>
              <th className="px-6 py-4 text-left font-semibold whitespace-nowrap">{t('crops.harvestDate')}</th>
              {!isAdmin && <th className="px-6 py-4 w-24"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {plantings.map((planting) => {
              const isHarvested = planting.status === 'HARVESTED';
              
              return (
                <tr
                  key={planting.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => onRowClick(planting.id)}
                  >
                    {planting.croptype?.name || ''}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => onRowClick(planting.id)}
                  >
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      planting.status === 'HARVESTED' 
                        ? 'bg-blue-100 text-blue-800' 
                        : planting.status === 'FAILED'
                        ? 'bg-red-100 text-red-800'
                        : planting.status === 'GROWING'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusLabel(planting.status)}
                    </span>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => onRowClick(planting.id)}
                  >
                    {formatDate(planting.plantingDate)}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => onRowClick(planting.id)}
                  >
                    {formatDate(planting.actualHarvestDate)}
                  </td>
                  {!isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2 justify-end items-center">
                        {onHarvest && !isHarvested && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onHarvest(planting.id);
                            }}
                            className="bg-[#3E7C59] text-white px-4 py-2 rounded-lg hover:bg-[#2d5f43] transition-colors font-medium text-sm"
                          >
                            Harvest
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(planting);
                            }}
                            className="text-orange-500 hover:text-orange-700 transition-colors p-3">
                            <LuPencil size={22} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(planting.id);
                            }}
                            className="text-red-500 hover:text-red-700 transition-colors p-3">
                            <IoTrashOutline size={25} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* paginator */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end items-center gap-4">
        <span className="text-sm text-gray-600">{t('common.recordsPerPage')}</span>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
        <span className="text-sm text-gray-600">1-{plantings.length} of {plantings.length}</span>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-gray-600">‹</button>
          <button className="text-gray-400 hover:text-gray-600">›</button>
        </div>
      </div>
    </div>
  );
}