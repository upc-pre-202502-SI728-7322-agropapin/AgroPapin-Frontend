import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsTable } from './ProductsTable';
import { ProductModal } from './ProductModal';
import { ConfirmModal } from '../../../shared/components/ui/ConfirmModal';
import { AddButton } from '../../../shared/components/ui/AddButton';
import { ProductService } from '../../../services/product';
import type { Product, ProductFormData, ProductResource, CreateProductResource, UpdateProductResource } from '../types/product.types';

interface ProductsTabProps {
  cropId: string;
}

// Helper function to convert ProductResource to Product for UI
const mapProductResourceToProduct = (resource: ProductResource): Product => ({
  id: resource.productId,
  date: new Date(resource.applicationDate).toLocaleDateString('en-GB'),
  type: resource.type,
  name: resource.name,
  quantity: `${resource.amount} ${resource.unit}`,
});

export function ProductsTab({ cropId: _ }: ProductsTabProps) {
  const { plotId, plantingId } = useParams<{ plotId: string; plantingId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!plotId || !plantingId) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await ProductService.getProductsByPlantingId(plotId, plantingId);
        setProducts(data.map(mapProductResourceToProduct));
      } catch (err) {
        setError('Error loading products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [plotId, plantingId]);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete || !plotId) return;

    try {
      await ProductService.deleteProduct(plotId, productToDelete);
      setProducts(products.filter((product) => product.id !== productToDelete));
      setProductToDelete(null);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Error deleting product');
    }
  };

  const handleSaveProduct = async (data: ProductFormData) => {
    if (!plotId || !plantingId) return;

    try {
      // Parse quantity and unit from the quantity string (e.g., "10 Kg" -> amount: 10, unit: "Kg")
      const quantityParts = data.quantity.split(' ');
      const amount = parseFloat(quantityParts[0]) || 0;
      const unit = quantityParts.slice(1).join(' ') || 'units';

      if (selectedProduct) {
        // Edit
        const updateData: UpdateProductResource = {
          name: data.name,
          applicationDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
          type: data.type,
          amount,
          unit,
        };
        const updated = await ProductService.updateProduct(plotId, selectedProduct.id, updateData);
        setProducts(
          products.map((product) =>
            product.id === selectedProduct.id ? mapProductResourceToProduct(updated) : product
          )
        );
      } else {
        // Create
        const createData: CreateProductResource = {
          name: data.name,
          applicationDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
          type: data.type,
          amount,
          unit,
          plantingId: plantingId,
        };
        const created = await ProductService.createProduct(plotId, createData);
        setProducts([mapProductResourceToProduct(created), ...products]);
      }
      setSelectedProduct(null);
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Error saving product');
    }
  };

  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="py-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-4 text-center text-gray-600">
          Loading products...
        </div>
      )}

      <div className="flex justify-end mb-6">
        <AddButton
          onClick={handleOpenAddModal}
          label="Add Product"
        />
      </div>

      <div className="bg-white rounded-lg overflow-hidden ">
        {products.length === 0 && !loading && !error ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No products registered yet</p>
            <p className="text-sm">Click "Add Product" to register your first product</p>
          </div>
        ) : (
          <ProductsTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProduct}
        product={selectedProduct}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}
