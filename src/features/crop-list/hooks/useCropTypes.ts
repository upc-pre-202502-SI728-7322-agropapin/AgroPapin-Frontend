import { useState, useEffect } from 'react';
import { CropTypeService } from '../../../services/crop';
import type { CropTypeResource } from '../types/crop.types';

export function useCropTypes() {
  const [cropTypes, setCropTypes] = useState<CropTypeResource[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCropTypes = async () => {
      setError(null);
      try {
        const data = await CropTypeService.getAllCropTypes();
        setCropTypes(data);
      } catch (err) {
        console.error('Error obteniendo crop types:', err);
        setCropTypes([]);
      }
    };

    fetchCropTypes();
  }, []);

  return {
    cropTypes,
    error
  };
}
