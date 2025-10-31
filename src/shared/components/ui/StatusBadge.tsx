interface StatusBadgeProps {
  status: 'active' | 'inactive';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const isActive = status === 'active';
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
      isActive 
        ? 'bg-green-100 text-green-800' 
        : 'bg-gray-100 text-gray-600'
    }`}>
      <span className={`w-2 h-2 rounded-full ${
        isActive ? 'bg-green-500' : 'bg-gray-400'
      }`} />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}
