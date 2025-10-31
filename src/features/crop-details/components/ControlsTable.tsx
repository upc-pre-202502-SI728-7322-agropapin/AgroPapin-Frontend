import { DataTable } from '../../../shared/components/ui/DataTable';
import type { Control } from '../types/control.types';

interface ControlsTableProps {
  controls: Control[];
  onEdit: (control: Control) => void;
  onDelete: (controlId: string) => void;
}

export function ControlsTable({ controls, onEdit, onDelete }: ControlsTableProps) {
  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'leaves', label: 'Leaves' },
    { key: 'stemCondition', label: 'Stem Condition' },
    { key: 'soilMoisture', label: 'Soil Moisture' },
  ];

  const renderCell = (control: Control, columnKey: string) => {
    switch (columnKey) {
      case 'date':
        return control.date;
      case 'leaves':
        return control.leaves;
      case 'stemCondition':
        return control.stemCondition;
      case 'soilMoisture':
        return control.soilMoisture;
      default:
        return '';
    }
  };

  return (
    <DataTable
      columns={columns}
      data={controls}
      renderCell={renderCell}
      onEdit={onEdit}
      onDelete={(control) => onDelete(control.id)}
      getRowKey={(control) => control.id}
    />
  );
}
