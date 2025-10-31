export interface Crop {
  id: string;
  name: string;
  plantedDate: string;
  estimatedHarvestDate: string;
  phase: string;
  plantedArea: number;
}

export interface CropFormData {
  name: string;
  plantedArea: number;
}
