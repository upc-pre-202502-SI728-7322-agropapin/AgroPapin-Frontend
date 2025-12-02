export type ProductType = 'FERTILIZER' | 'PESTICIDE' | 'FUNGICIDE' | 'HERBICIDE' | 'SOIL_AMENDMENT';

export interface ProductResource {
  productId: string;
  name: string;
  applicationDate: string;
  type: ProductType;
  amount: number;
  unit: string;
  plantingId: string;
  plotId: string;
}

export interface CreateProductResource {
  name: string;
  applicationDate: string;
  type: ProductType;
  amount: number;
  unit: string;
  plantingId: string;
}

export interface UpdateProductResource {
  name: string;
  applicationDate: string;
  type: ProductType;
  amount: number;
  unit: string;
}

// UI types
export interface Product {
  id: string;
  date: string;
  type: string;
  name: string;
  quantity: string;
}

export interface ProductFormData {
  name: string;
  type: ProductType;
  quantity: string;
}
