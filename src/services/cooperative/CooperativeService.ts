import axiosClient from '../api/axiosClient';
import type { CooperativeResource, MemberSummaryResource, MemberFieldResource } from '../../features/cooperative/types/cooperative.types';

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

  // POST - add farmer
  static async addMember(cooperativeId: string, userId: string): Promise<CooperativeResource> {
    const res = await axiosClient.post<CooperativeResource>(`/cooperative/${cooperativeId}/members/${userId}`);
    return res.data;
  }

  // DELETE
  static async removeMember(cooperativeId: string, userId: string): Promise<{ message: string }> {
    const res = await axiosClient.delete<{ message: string }>(`/cooperative/${cooperativeId}/members/remove/${userId}`);
    return res.data;
  }

  // GET 
  static async getMembers(cooperativeId: string): Promise<MemberSummaryResource[]> {
    const res = await axiosClient.get<MemberSummaryResource[]>(`/cooperative/${cooperativeId}/members`);
    return res.data;
  }

  // GET - Get member's fields
  static async getMembersFields(cooperativeId: string): Promise<MemberFieldResource[]> {
    const res = await axiosClient.get<MemberFieldResource[]>(`/field/cooperative/${cooperativeId}/members`);
    return res.data;
  }
}
