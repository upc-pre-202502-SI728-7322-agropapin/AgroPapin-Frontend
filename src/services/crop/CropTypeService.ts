import { axiosClient } from "../api/axiosClient";
import type { CropTypeResource } from "../../features/crop-list/types/crop.types";

class CropTypeService {
  async getAllCropTypes(): Promise<CropTypeResource[]> {
    const response = await axiosClient.get<CropTypeResource[]>('/crop-types');
    return response.data;
  }
}

export default new CropTypeService();
