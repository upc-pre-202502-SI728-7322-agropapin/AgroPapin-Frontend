import { useTranslation } from 'react-i18next';
import { DataTable } from '../../../shared/components/ui/DataTable';
import type { Control } from '../types/control.types';

interface ControlsTableProps {
  controls: Control[];
  onEdit?: (control: Control) => void;
  onDelete?: (controlId: string) => void;
  showActions?: boolean;
}

export function ControlsTable({ controls, onEdit, onDelete, showActions = true }: ControlsTableProps) {
  const { t } = useTranslation();
  
  const columns = [
    { key: 'date', label: t('common.date') },
    { key: 'leaves', label: t('controls.leaves') },
    { key: 'stemCondition', label: t('controls.stemCondition') },
    { key: 'soilMoisture', label: t('controls.soilMoisture') },
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
      onDelete={onDelete ? (control) => onDelete(control.id) : undefined}
      getRowKey={(control) => control.id}
      showActions={showActions}
      emptyMessage={t('controls.noControlsRecorded')}
    />
  );
}
