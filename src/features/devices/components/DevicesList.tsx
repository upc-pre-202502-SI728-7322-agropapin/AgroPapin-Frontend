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
  const columns = [
    { key: 'serialNumber', label: 'Serial Number' },
    { key: 'deviceType', label: 'Device Type' },
    { key: 'model', label: 'Model' },
    { key: 'version', label: 'Version' },
    { key: 'status', label: 'Status' },
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
      emptyMessage="No devices found. Add your first device to get started."
    />
  );
}
