import { axiosClient } from "../api/axiosClient";
import type { PlantingResource, CreatePlantingResource,  UpdatePlantingResource,  UpdatePlantingStatusResource, UpdatedPlantingResource } from "../../features/crop-list/types/crop.types";

class PlantingService {
  private basePath(fieldId: string, plotId: string): string {
    return `/fields/${fieldId}/plots/${plotId}/plantings`;
  }

  async getPlantings(fieldId: string, plotId: string): Promise<PlantingResource[]> {
    const response = await axiosClient.get<PlantingResource[]>(this.basePath(fieldId, plotId));
    return response.data;
  }

  async createPlanting(fieldId: string, plotId: string, data: CreatePlantingResource): Promise<PlantingResource> {
    const response = await axiosClient.post<PlantingResource>(this.basePath(fieldId, plotId), data);
    return response.data;
  }

  async getPlantingById(fieldId: string, plotId: string, plantingId: string): Promise<PlantingResource> {
    const response = await axiosClient.get<PlantingResource>(`${this.basePath(fieldId, plotId)}/${plantingId}`);
    return response.data;
  }

  async updatePlanting(fieldId: string, plotId: string, plantingId: string, data: UpdatePlantingResource): Promise<UpdatedPlantingResource> {
    const response = await axiosClient.put<UpdatedPlantingResource>(`${this.basePath(fieldId, plotId)}/${plantingId}`, data);
    return response.data;
  }

  async deletePlanting(fieldId: string, plotId: string, plantingId: string): Promise<void> {
    await axiosClient.delete(`${this.basePath(fieldId, plotId)}/${plantingId}`);
  }

  async updatePlantingStatus(fieldId: string, plotId: string, plantingId: string, data: UpdatePlantingStatusResource): Promise<PlantingResource> {
    const response = await axiosClient.patch<PlantingResource>(`${this.basePath(fieldId, plotId)}/${plantingId}/status`, data);
    return response.data;
  }

  async getCropDistribution(): Promise<PlantingResource[]> {
    const response = await axiosClient.get<PlantingResource[]>('/field/cropDistribution/me');
    return response.data;
  }
}

export default new PlantingService();
