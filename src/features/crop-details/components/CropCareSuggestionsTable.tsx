import { SimpleTable } from '../../../shared/components/ui/SimpleTable';
import type { CropCareRecommendation } from '../types/crop-care.types';

interface CropCareSuggestionsTableProps {
  recommendations: CropCareRecommendation[];
}

export function CropCareSuggestionsTable({ recommendations }: CropCareSuggestionsTableProps) {
  const columns = [
    { key: 'date', label: 'Date', width: '160px' },
    { key: 'suggestion', label: 'Suggestions' },
  ];

  const renderCell = (rec: CropCareRecommendation, columnKey: string) => {
    switch (columnKey) {
      case 'date':
        return <span className="font-medium text-gray-900">{rec.date}</span>;
      case 'suggestion':
        return rec.suggestion;
      default:
        return '';
    }
  };

  return (
    <SimpleTable
      columns={columns}
      data={recommendations}
      renderCell={renderCell}
      getRowKey={(rec) => rec.id}
      itemsPerPage={5}
      totalItems={recommendations.length}
    />
  );
}
