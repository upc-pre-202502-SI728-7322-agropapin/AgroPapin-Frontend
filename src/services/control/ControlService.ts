import axiosClient from "../api/axiosClient";
import type { ControlResource, CreateControlResource, UpdateControlResource } from "../../features/crop-details/types/control.types";

export class ControlService {
  // GET - All controls by plot
  static async getControlsByPlotId(plotId: string): Promise<ControlResource[]> {
    const res = await axiosClient.get<ControlResource[]>(`/plots/${plotId}/controls`);
    return res.data;
  }

  // GET - Controls filtered by planting
  static async getControlsByPlantingId(plotId: string, plantingId: string): Promise<ControlResource[]> {
    const res = await axiosClient.get<ControlResource[]>(`/plots/${plotId}/controls?plantingId=${plantingId}`);
    return res.data;
  }

  // GET - Single control by ID
  static async getControlById(plotId: string, controlId: string): Promise<ControlResource> {
    const res = await axiosClient.get<ControlResource>(`/plots/${plotId}/controls/${controlId}`);
    return res.data;
  }

  // POST - Create control
  static async createControl(plotId: string, data: CreateControlResource): Promise<ControlResource> {
    const res = await axiosClient.post<ControlResource>(`/plots/${plotId}/controls`, data);
    return res.data;
  }

  // PUT - Update control
  static async updateControl(plotId: string, controlId: string, data: UpdateControlResource): Promise<ControlResource> {
    const res = await axiosClient.put<ControlResource>(`/plots/${plotId}/controls/${controlId}`, data);
    return res.data;
  }

  // DELETE - Delete control
  static async deleteControl(plotId: string, controlId: string): Promise<void> {
    await axiosClient.delete(`/plots/${plotId}/controls/${controlId}`);
  }
}
