interface StatusBadgeProps {
  status: 'online' | 'offline' | 'maintenance' | 'provisioned';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    online: {
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      dotColor: 'bg-green-500',
      label: 'Online'
    },
    offline: {
      bgColor: 'bg-gray-100',
      textColor: 'text-gray-600',
      dotColor: 'bg-gray-400',
      label: 'Offline'
    },
    maintenance: {
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      dotColor: 'bg-yellow-500',
      label: 'Maintenance'
    },
    provisioned: {
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      dotColor: 'bg-blue-500',
      label: 'Provisioned'
    }
  };

  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor}`}>
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}
