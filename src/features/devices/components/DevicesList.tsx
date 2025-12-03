import { useTranslation } from 'react-i18next';
import { StatusBadge } from '../../../shared/components/ui/StatusBadge';
import { DataTable } from '../../../shared/components/ui/DataTable';
import type { Device } from '../types/device.types';

interface DevicesListProps {
  devices: Device[];
  onRowClick?: (deviceId: string) => void;
  onEdit?: (deviceId: string) => void;
  onDelete?: (deviceId: string) => void;
  isAdmin?: boolean;
}

export function DevicesList({ devices, onRowClick, onEdit, onDelete, isAdmin = false }: DevicesListProps) {
  const { t } = useTranslation();
  
  const columns = [
    { key: 'serialNumber', label: t('devices.serialNumber') },
    { key: 'deviceType', label: t('devices.deviceType') },
    { key: 'model', label: t('devices.model') },
    { key: 'version', label: t('devices.version') },
    { key: 'status', label: t('common.status') },
  ];

  const renderCell = (device: Device, columnKey: string) => {
    switch (columnKey) {
      case 'serialNumber':
        return <div className="text-sm font-medium text-gray-900">{device.serialNumber}</div>;
      case 'deviceType':
        return <div className="text-sm text-gray-600">{device.deviceType}</div>;
      case 'model':
        return <div className="text-sm text-gray-600">{device.model}</div>;
      case 'version':
        return <div className="text-sm text-gray-600">{device.version}</div>;
      case 'status':
        return <StatusBadge status={device.status} />;
      default:
        return null;
    }
  };

  return (
    <DataTable
      columns={columns}
      data={devices}
      getRowKey={(device) => device.id}
      renderCell={renderCell}
      onRowClick={onRowClick ? (device) => onRowClick(device.id) : undefined}
      onEdit={onEdit ? (device) => onEdit(device.id) : undefined}
      onDelete={onDelete ? (device) => onDelete(device.id) : undefined}
      showActions={!isAdmin}
      emptyMessage={t('devices.noDevices')}
    />
  );
}
