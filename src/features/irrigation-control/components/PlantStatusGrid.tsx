import type { FieldStatus } from '../types/irrigation.types';

interface PlantStatusGridProps {
  fields: FieldStatus[];
}

export function PlantStatusGrid({ fields }: PlantStatusGridProps) {
  const getStatusColor = (status: FieldStatus['status']) => {
    switch (status) {
      case 'Healthy':
        return 'text-green-600';
      case 'Needs attention':
        return 'text-yellow-600';
      case 'Water stress':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Plant Status
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {fields.map((field) => (
          <div key={field.id} className="text-center">
            <div className="rounded-lg overflow-hidden mb-2">
              <img 
                src={field.imageUrl} 
                alt={field.name}
                className="w-full h-32 object-cover"
              />
            </div>
            <h4 className="font-semibold text-gray-900 text-sm mb-1">
              {field.name}
            </h4>
            <p className={`text-sm font-medium ${getStatusColor(field.status)}`}>
              {field.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
