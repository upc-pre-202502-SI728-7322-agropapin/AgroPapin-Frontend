import { FieldCard } from "./FieldCard";
import type { Field } from "../types/field.types";

interface FieldListProps {
  fields: Field[];
  onInfoClick: (fieldId: string) => void;
  onDevicesClick: (fieldId: string) => void;
}

export function FieldList({ fields, onInfoClick, onDevicesClick }: FieldListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fields.map((field) => (
        <FieldCard
          key={field.id}
          field={field}
          onInfoClick={onInfoClick}
          onDevicesClick={onDevicesClick}
        />
      ))}
    </div>
  );
}
