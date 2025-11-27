// CROP
export const CropStatus = {
  GERMINATING: "GERMINATING",
  GROWING: "GROWING",
  FLOWERING: "FLOWERING",
  FRUITING: "FRUITING",
  HARVESTED: "HARVESTED"
} as const;

export type CropStatus = typeof CropStatus[keyof typeof CropStatus];


export interface GrowthProfileResource {
  germinationDays: number;
  vegetativeDays: number;
  floweringDays: number;
  harvestDays: number;
}

export interface IdealConditionsResource {
  minTemperature: number;
  maxTemperature: number;
  minHumidity: number;
  maxHumidity: number;
  minPh: number;
  maxPh: number;
  sunlightHours: number;
}

export interface NutrientNeedsResource {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface CropTypeResource {
  id: string;
  name: string;
  description: string;
  variety: string;
  scientificName: string;
  category: string;
  imageUrl: string;
  growthProfile: GrowthProfileResource;
  idealConditions: IdealConditionsResource;
  nutrientNeeds: NutrientNeedsResource;
  createdAt: string;
  updatedAt: string;
}

// PLANTING
export interface PlantingResource {
  id: string;
  plantingDate: string;
  actualHarvestDate: string | null;
  status: CropStatus;
  plotId: string;
}

export interface CreatePlantingResource {
  plantingDate: string;
  actualHarvestDate: string | null;
  cropTypeId: string;
}

export interface UpdatePlantingResource {
  plantingDate: string;
  harvestDate: string | null;
  cropId: string;
}

export interface UpdatePlantingStatusResource {
  status: CropStatus;
}

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
  cropTypeId: string;
  plantingDate: string;
  actualHarvestDate?: string;
}
