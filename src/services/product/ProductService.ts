import axiosClient from "../api/axiosClient";
import type { ProductResource, CreateProductResource, UpdateProductResource } from "../../features/crop-details/types/product.types";

export class ProductService {
  // GET - All products by plot
  static async getProductsByPlotId(plotId: string): Promise<ProductResource[]> {
    const res = await axiosClient.get<ProductResource[]>(`/plots/${plotId}/products`);
    return res.data;
  }

  // GET - Products filtered by planting
  static async getProductsByPlantingId(plotId: string, plantingId: string): Promise<ProductResource[]> {
    const res = await axiosClient.get<ProductResource[]>(`/plots/${plotId}/products/planting/${plantingId}`);
    return res.data;
  }

  // GET - Single product by ID
  static async getProductById(plotId: string, productId: string): Promise<ProductResource> {
    const res = await axiosClient.get<ProductResource>(`/plots/${plotId}/products/${productId}`);
    return res.data;
  }

  // POST - Create product
  static async createProduct(plotId: string, data: CreateProductResource): Promise<ProductResource> {
    const res = await axiosClient.post<ProductResource>(`/plots/${plotId}/products`, data);
    return res.data;
  }

  // PUT - Update product
  static async updateProduct(plotId: string, productId: string, data: UpdateProductResource): Promise<ProductResource> {
    const res = await axiosClient.put<ProductResource>(`/plots/${plotId}/products/${productId}`, data);
    return res.data;
  }

  // DELETE - Delete product
  static async deleteProduct(plotId: string, productId: string): Promise<void> {
    await axiosClient.delete(`/plots/${plotId}/products/${productId}`);
  }
}
