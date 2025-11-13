export interface Field {
  id: string;
  fieldName: string;
  location: string;
  totalArea: string;
  status: string;
}

export interface CreateFieldRequest {
  fieldName: string;
  location: string;
  area: string;
}

export interface UpdateFieldRequest {
  fieldName: string;
  location: string;
  area: string;
}

export interface FieldResponse {
  id: string;
  fieldName: string;
  location: string;
  totalArea: string;
  status: string;
}

export interface FieldCardProps {
  field: Field;
  onInfoClick: (fieldId: string) => void;
  onDevicesClick: (fieldId: string) => void;
}
