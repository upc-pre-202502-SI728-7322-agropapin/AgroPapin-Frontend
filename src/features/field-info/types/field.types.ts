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
  fieldId?: string;
}

export interface FieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateFieldRequest | UpdateFieldRequest) => Promise<void>;
  field?: FieldResponse | null;
}

export interface CropType {
  id: string;
  name: string;
  description: string;
}

export interface CropDistribution {
  id: string;
  plantingDate: string;
  actualHarvestDate?: string;
  status: string;
  plotId: string;
  croptype: CropType;
}
