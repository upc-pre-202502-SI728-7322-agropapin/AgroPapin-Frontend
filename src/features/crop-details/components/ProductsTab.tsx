import { useState } from 'react';
import { ProductsTable } from './ProductsTable';
import { ProductModal } from './ProductModal';
import { ConfirmModal } from '../../../shared/components/ui/ConfirmModal';
import { AddButton } from '../../../shared/components/ui/AddButton';
import type { Product, ProductFormData } from '../types/product.types';

interface ProductsTabProps {
  cropId: string;
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

export function ProductsTab({ cropId }: ProductsTabProps) {
  const [products, setProducts] = useState<Product[]>(
    mockProductsData[cropId] || mockProductsData['1']
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete));
      setProductToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleSaveProduct = (data: ProductFormData) => {
    if (selectedProduct) {
      // Edit
      setProducts(
        products.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, ...data }
            : product
        )
      );
    } else {
      // Create
      const newProduct: Product = {
        id: String(products.length + 1),
        date: new Date().toLocaleDateString('en-GB'),
        ...data,
      };
      setProducts([newProduct, ...products]);
    }
    setSelectedProduct(null);
  };

  const handleOpenAddModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="py-6">
     
      <div className="flex justify-end mb-6">
        <AddButton
          onClick={handleOpenAddModal}
          label="Add Product"
        />
      </div>

      <div className="bg-white rounded-lg overflow-hidden ">
        <ProductsTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
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
