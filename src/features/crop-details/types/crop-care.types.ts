export interface CropCareRecommendation {
  id: string;
  date: string;
  suggestion: string;
}

export interface CropCareData {
  phase: string;
  phaseDate: string;
  recommendations: CropCareRecommendation[];
}
