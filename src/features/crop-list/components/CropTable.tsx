import { DataTable } from '../../../shared/components/ui/DataTable';
import type { PlantingResource } from '../types/crop.types';

interface CropTableProps {
  plantings: PlantingResource[];
  onRowClick: (plantingId: string) => void;
  onEdit: (planting: PlantingResource) => void;
  onDelete: (plantingId: string) => void;
  isAdmin?: boolean;
}

export function CropTable({ plantings, onRowClick, onEdit, onDelete, isAdmin = false }: CropTableProps) {
  const columns = [
    { key: 'plantingDate', label: 'Planting Date' },
    { key: 'harvestDate', label: 'Harvest Date' },
    { key: 'status', label: 'Status' },
  ];

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
      case 'GERMINATING':
        return 'Germinating';
      case 'GROWING':
        return 'Growing';
      case 'FLOWERING':
        return 'Flowering';
      case 'FRUITING':
        return 'Fruiting';
      case 'HARVESTED':
        return 'Harvested';
      default:
        return status;
    }
  };

  const renderCell = (planting: PlantingResource, columnKey: string) => {
    switch (columnKey) {
      case 'plantingDate':
        return formatDate(planting.plantingDate);
      case 'harvestDate':
        return formatDate(planting.actualHarvestDate);
      case 'status':
        return (
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            planting.status === 'HARVESTED' 
              ? 'bg-blue-100 text-blue-800' 
              : planting.status === 'FRUITING'
              ? 'bg-yellow-100 text-yellow-800'
              : planting.status === 'FLOWERING'
              ? 'bg-pink-100 text-pink-800'
              : planting.status === 'GROWING'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {getStatusLabel(planting.status)}
          </span>
        );
      default:
        return '';
    }
  };

  return (
      <DataTable
          columns={columns}
          data={plantings}
          renderCell={renderCell}
          onRowClick={(planting) => onRowClick(planting.id)}
          onEdit={isAdmin ? undefined : onEdit}
          onDelete={isAdmin ? undefined : (planting) => onDelete(planting.id)}
          getRowKey={(planting) => planting.id}
          showActions={!isAdmin}
          emptyMessage="No crops found. Start by adding your first crop."
      />
  );
}