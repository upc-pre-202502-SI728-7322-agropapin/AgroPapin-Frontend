import { axiosClient } from '../api/axiosClient';
import type { CreateFieldRequest, UpdateFieldRequest, FieldResponse } from '../../features/field-info/types/field.types';

export class FieldService {
  // GET
  static async getField(): Promise<FieldResponse | null> {
    try {
      const response = await axiosClient.get<FieldResponse>('/field/me');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 403 || error.response?.status === 404) {
        console.log('no tiene ningún field');
        return null;
      }
      console.error('Error obteniendo field:', error);
      throw error;
    }
  }

  //POST
  static async createField(fieldData: CreateFieldRequest): Promise<FieldResponse> {
    try {
      const response = await axiosClient.post<FieldResponse>('/field/me', fieldData);
      console.log('field creado:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('error creando field:', error.response?.data || error.message);
      throw error;
    }
  }

  //PUT
  static async updateField(fieldData: UpdateFieldRequest): Promise<FieldResponse> {
    try {
      const response = await axiosClient.put<FieldResponse>('/field/me', fieldData);
      console.log('field actualizado:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('error actualizando field:', error.response?.data || error.message);
      throw error;
    }
  }
}
