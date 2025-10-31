import { DataTable } from '../../../shared/components/ui/DataTable';
import type { Crop } from '../types/crop.types';

interface CropTableProps {
  crops: Crop[];
  onRowClick: (cropId: string) => void;
  onEdit: (crop: Crop) => void;
  onDelete: (cropId: string) => void;
}

export function CropTable({ crops, onRowClick, onEdit, onDelete }: CropTableProps) {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'plantedDate', label: 'Planting Date' },
    { key: 'estimatedHarvestDate', label: 'Estimated Harvest Time' },
    { key: 'phase', label: 'Phase' },
    { key: 'plantedArea', label: 'Planted Area(m2)' },
  ];

  const renderCell = (crop: Crop, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return crop.name;
      case 'plantedDate':
        return crop.plantedDate;
      case 'estimatedHarvestDate':
        return crop.estimatedHarvestDate;
      case 'phase':
        return crop.phase;
      case 'plantedArea':
        return crop.plantedArea;
      default:
        return '';
    }
  };

  return (
      <DataTable
          columns={columns}
          data={crops}
          renderCell={renderCell}
          onRowClick={(crop) => onRowClick(crop.id)}
          onEdit={onEdit}
          onDelete={(crop) => onDelete(crop.id)}
          getRowKey={(crop) => crop.id}
      />
  );
}