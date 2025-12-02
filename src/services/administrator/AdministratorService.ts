import axiosClient from '../api/axiosClient';
import type { AdministratorResource, UpdateAdministratorResource } from '../../features/user-profile/types/user-profile.types';

export class AdministratorService {
  // GET - My Administrator Profile
  static async getMyAdministratorProfile(): Promise<AdministratorResource> {
    const res = await axiosClient.get<AdministratorResource>('/administrator/me');
    return res.data;
  }

  // PUT - Update My Administrator Profile
  static async updateMyAdministratorProfile(data: UpdateAdministratorResource): Promise<AdministratorResource> {
    const res = await axiosClient.put<AdministratorResource>('/administrator/me', data);
    return res.data;
  }

  // GET - Administrator by ID (Admin only)
  static async getAdministratorById(administratorId: string): Promise<AdministratorResource> {
    const res = await axiosClient.get<AdministratorResource>(`/administrator/${administratorId}`);
    return res.data;
  }

  // GET - Administrator by User ID (Admin only)
  static async getAdministratorByUserId(userId: string): Promise<AdministratorResource> {
    const res = await axiosClient.get<AdministratorResource>(`/administrator/user/${userId}`);
    return res.data;
  }
}
