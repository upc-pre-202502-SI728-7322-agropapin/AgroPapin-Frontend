import axiosClient from '../api/axiosClient';
import type {InventoryItemResource,CreateInventoryItemResource,UpdateInventoryItemResource,IncreaseInventoryAmountResource,UseSupplyResource,UsageStatisticResource} from '../../features/inventory/types/inventory.types';

export class InventoryService {
  // POST 
  static async createInventoryItem(cooperativeId: string, data: CreateInventoryItemResource): Promise<InventoryItemResource> {
    const res = await axiosClient.post<InventoryItemResource>(`/cooperative/${cooperativeId}/inventory`, data);
    return res.data;
  }

  // GET 
  static async getInventory(cooperativeId: string): Promise<InventoryItemResource[]> {
    const res = await axiosClient.get<InventoryItemResource[]>(`/cooperative/${cooperativeId}/inventory`);
    return res.data;
  }

  // PUT
  static async updateInventoryItem(cooperativeId: string, itemId: string, data: UpdateInventoryItemResource): Promise<InventoryItemResource> {
    const res = await axiosClient.put<InventoryItemResource>(`/cooperative/${cooperativeId}/inventory/${itemId}`, data);
    return res.data;
  }

  // PATCH 
  static async increaseInventoryAmount(cooperativeId: string, itemId: string, data: IncreaseInventoryAmountResource): Promise<InventoryItemResource> {
    const res = await axiosClient.patch<InventoryItemResource>(`/cooperative/${cooperativeId}/inventory/${itemId}/increase-amount`, data);
    return res.data;
  }

  // DELETE 
  static async deleteInventoryItem(cooperativeId: string, itemId: string): Promise<void> {
    await axiosClient.delete(`/cooperative/${cooperativeId}/inventory/${itemId}`);
  }

  // POST 
  static async useSupply(cooperativeId: string, itemId: string, data: UseSupplyResource): Promise<InventoryItemResource> {
    console.log('Sending use supply request:', { cooperativeId, itemId, data });
    const res = await axiosClient.post<InventoryItemResource>(`/cooperative/${cooperativeId}/inventory/${itemId}/use`, data);
    return res.data;
  }

  // GET
  static async getUsageStatistics(cooperativeId: string): Promise<UsageStatisticResource[]> {
    const res = await axiosClient.get<UsageStatisticResource[]>(`/cooperative/${cooperativeId}/inventory/statistics`);
    return res.data;
  }
}
