import axiosClient from '../api/axiosClient';
import type { FarmerResource, UpdateFarmerResource } from '../../features/user-profile/types/user-profile.types';

export class FarmerService {
  // GET - My Farmer Profile
  static async getMyFarmerProfile(): Promise<FarmerResource> {
    const res = await axiosClient.get<FarmerResource>('/farmer/me');
    return res.data;
  }

  // PUT - Update My Farmer Profile
  static async updateMyFarmerProfile(data: UpdateFarmerResource): Promise<FarmerResource> {
    const res = await axiosClient.put<FarmerResource>('/farmer/me', data);
    return res.data;
  }

  // GET - Farmer by ID (Admin only)
  static async getFarmerById(farmerId: string): Promise<FarmerResource> {
    const res = await axiosClient.get<FarmerResource>(`/farmer/${farmerId}`);
    return res.data;
  }

  // GET - Farmer by User ID (Admin only)
  static async getFarmerByUserId(userId: string): Promise<FarmerResource> {
    const res = await axiosClient.get<FarmerResource>(`/farmer/user/${userId}`);
    return res.data;
  }

  // PUT - Update Farmer by User ID (Admin only)
  static async updateFarmerByUserId(userId: string, data: UpdateFarmerResource): Promise<FarmerResource> {
    const res = await axiosClient.put<FarmerResource>(`/farmer/${userId}`, data);
    return res.data;
  }
}
