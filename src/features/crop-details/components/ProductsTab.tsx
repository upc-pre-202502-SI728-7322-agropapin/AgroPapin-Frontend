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
  isAdmin?: boolean;
}

const mockProductsData: Record<string, Product[]> = {
  '1': [
    {
      id: '1',
      date: '09/05/2025',
      type: 'Fertilizer',
      name: 'Aminofol Plus',
      quantity: '10 Kg',
    },
    {
      id: '2',
      date: '07/05/2025',
      type: 'Pesticide',
      name: 'Beta-Baytroide',
      quantity: '10 Kg',
    },
    {
      id: '3',
      date: '05/05/2025',
      type: 'Fungicide',
      name: 'Antracol',
      quantity: '2 L',
    },
    {
      id: '4',
      date: '03/05/2025',
      type: 'Fertilizer',
      name: 'Aminofol Plus',
      quantity: '15 Kg',
    },
    {
      id: '5',
      date: '01/05/2025',
      type: 'Pesticide',
      name: 'Beta-Baytroide',
      quantity: '10 Kg',
    },
  ],
  '2': [
    {
      id: '1',
      date: '20/07/2024',
      type: 'Fertilizer',
      name: 'NPK Complex',
      quantity: '25 Kg',
    },
    {
      id: '2',
      date: '25/07/2024',
      type: 'Herbicide',
      name: 'Glyphosate',
      quantity: '5 L',
    },
  ],
  '3': [
    {
      id: '1',
      date: '20/07/2024',
      type: 'Fertilizer',
      name: 'NPK Complex',
      quantity: '25 Kg',
    },
  ],
  '4': [
    {
      id: '1',
      date: '20/07/2024',
      type: 'Fertilizer',
      name: 'NPK Complex',
      quantity: '25 Kg',
    },
  ],
};

export function ProductsTab({ cropId, isAdmin = false }: ProductsTabProps) {
  const [products, setProducts] = useState<Product[]>(
    mockProductsData[cropId] || mockProductsData['1']
  );
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
    if (isAdmin) return;
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (isAdmin) return;
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
    if (isAdmin) return;
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="py-6">
     
      {!isAdmin && (
        <div className="flex justify-end mb-6">
          <AddButton
            onClick={handleOpenAddModal}
            label="Add Product"
          />
        </div>
      )}

      <div className="bg-white rounded-lg overflow-hidden ">
        <ProductsTable
          products={products}
          onEdit={isAdmin ? undefined : handleEdit}
          onDelete={isAdmin ? undefined : handleDelete}
          showActions={!isAdmin}
        />
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
