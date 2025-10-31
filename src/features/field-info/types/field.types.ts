export interface Field {
  id: string;
  name: string;
  imageUrl: string;
  cropType: string;
}

export interface FieldCardProps {
  field: Field;
  onInfoClick: (fieldId: string) => void;
  onDevicesClick: (fieldId: string) => void;
}
