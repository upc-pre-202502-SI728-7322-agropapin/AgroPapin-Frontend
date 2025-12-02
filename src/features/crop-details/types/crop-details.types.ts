import type { ReactNode } from 'react';

export interface CropDetail {
  id: string;
  name: string;
  creationDate: string;
  description: string;
  imageUrl: string;
}

export interface CropInfoField {
  icon: ReactNode;
  label: string;
  value: string | number;
}
