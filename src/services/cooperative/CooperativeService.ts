import axiosClient from '../api/axiosClient';
import type { CooperativeResource } from '../../features/cooperative/types/cooperative.types';

export class CooperativeService {
  // POST
  static async createCooperative(cooperativeName: string): Promise<CooperativeResource> {
    const res = await axiosClient.post<CooperativeResource>('/cooperative/', { cooperativeName });
    return res.data;
  }

  // GET
  static async getMyCooperative(): Promise<CooperativeResource> {
    const res = await axiosClient.get<CooperativeResource>('/cooperative/me');
    return res.data;
  }

  // PUT
  static async updateMyCooperative(name: string): Promise<CooperativeResource> {
    const res = await axiosClient.put<CooperativeResource>('/cooperative/me', { name });
    return res.data;
  }

  // GET (Id)
  static async getCooperativeById(cooperativeId: string): Promise<CooperativeResource> {
    const res = await axiosClient.get<CooperativeResource>(`/cooperative/${cooperativeId}`);
    return res.data;
  }

    // DELETE
  static async deleteCooperativeById(cooperativeId: string): Promise<void> {
    await axiosClient.delete(`/cooperative/${cooperativeId}`);
  }

  //POST- administrador (sin uso)
  static async addAdministrator(cooperativeId: string, userId: string): Promise<CooperativeResource> {
    const res = await axiosClient.post<CooperativeResource>(`/cooperative/${cooperativeId}/administrators/${userId}`);
    return res.data;
  }

  //POST- farmer
  static async addFarmer(cooperativeId: string, userId: string): Promise<CooperativeResource> {
    const res = await axiosClient.post<CooperativeResource>(`/cooperative/${cooperativeId}/members/${userId}`);
    return res.data;
  }
}
