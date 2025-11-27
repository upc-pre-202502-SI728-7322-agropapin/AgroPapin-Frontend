import { axiosClient } from "../api/axiosClient";
import type {PlotResource,CreatePlotResource,UpdatePlotResource,UpdatePlotStatusResource} from "../../features/plot-list/types/plot.types";

class PlotService {
  private basePath(fieldId: string): string {
    return `/fields/${fieldId}/plots`;
  }

  async getPlots(fieldId: string): Promise<PlotResource[]> {
    const response = await axiosClient.get<PlotResource[]>(this.basePath(fieldId));
    return response.data;
  }

  async createPlot(fieldId: string, data: CreatePlotResource): Promise<PlotResource> {
    const response = await axiosClient.post<PlotResource>(this.basePath(fieldId), data);
    return response.data;
  }

  async getPlotById(fieldId: string, plotId: string): Promise<PlotResource> {
    const response = await axiosClient.get<PlotResource>(`${this.basePath(fieldId)}/${plotId}`);
    return response.data;
  }

  async updatePlot(fieldId: string, plotId: string, data: UpdatePlotResource): Promise<PlotResource> {
    const response = await axiosClient.put<PlotResource>(`${this.basePath(fieldId)}/${plotId}`, data);
    return response.data;
  }

  async deletePlot(fieldId: string, plotId: string): Promise<void> {
    await axiosClient.delete(`${this.basePath(fieldId)}/${plotId}`);
  }

  async updatePlotStatus(fieldId: string, plotId: string, data: UpdatePlotStatusResource): Promise<PlotResource> {
    const response = await axiosClient.patch<PlotResource>(
      `${this.basePath(fieldId)}/${plotId}/status`,
      data
    );
    return response.data;
  }
}

export default new PlotService();
