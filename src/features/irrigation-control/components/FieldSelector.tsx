import { useTranslation } from 'react-i18next';

interface FieldSelectorProps {
  fields: Array<{ id: string; name: string }>;
  selectedFieldId: string | null;
  onSelectField: (fieldId: string) => void;
}

export function FieldSelector({ fields, selectedFieldId, onSelectField }: FieldSelectorProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('field.selectField')}</h4>
      <div className="space-y-2">
        {fields.map((field) => (
          <button
            key={field.id}
            onClick={() => onSelectField(field.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedFieldId === field.id
                ? 'bg-[#3E7C59] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {field.name}
          </button>
        ))}
      </div>
    </div>
  );
}
