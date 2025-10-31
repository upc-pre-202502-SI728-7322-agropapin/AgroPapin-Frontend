import { StatusBadge } from '../../../shared/components/ui/StatusBadge';
import { DataTable } from '../../../shared/components/ui/DataTable';
import type { Device } from '../types/device.types';

interface DevicesListProps {
  devices: Device[];
  onRowClick: (deviceId: string) => void;
  onEdit: (deviceId: string) => void;
  onDelete: (deviceId: string) => void;
}

export function DevicesList({ devices, onRowClick, onEdit, onDelete }: DevicesListProps) {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'status', label: 'Status' },
    { key: 'location', label: 'Location' },
  ];

  const renderCell = (device: Device, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return <div className="text-sm font-medium text-gray-900">{device.name}</div>;
      case 'type':
        return <div className="text-sm text-gray-600 capitalize">{device.type}</div>;
      case 'status':
        return <StatusBadge status={device.status} />;
      case 'location':
        return <div className="text-sm text-gray-600">{device.location}</div>;
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
      onRowClick={(device) => onRowClick(device.id)}
      onEdit={(device) => onEdit(device.id)}
      onDelete={(device) => onDelete(device.id)}
      showActions={true}
    />
  );
}
