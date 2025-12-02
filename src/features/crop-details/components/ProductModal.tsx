import { useState, useEffect } from 'react';
import type { Product, ProductFormData, ProductType } from '../types/product.types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
  product: Product | null;
}

export function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    type: 'FERTILIZER',
    name: '',
    quantity: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        type: product.type as ProductType,
        name: product.name,
        quantity: product.quantity,
      });
    } else {
      setFormData({
        type: 'FERTILIZER',
        name: '',
        quantity: '',
      });
    }
  }, [product, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedData: ProductFormData = {
      type: formData.type,
      name: formData.name.trim(),
      quantity: formData.quantity.trim(),
    };
    
    if (!trimmedData.name || !trimmedData.quantity) {
      return;
    }
    
    const quantityPattern = /^\d+(\.\d+)?\s+[a-zA-Z]+$/;
    if (!quantityPattern.test(trimmedData.quantity)) {
      alert('Quantity must be in format: "number unit" (e.g., "10 Kg", "2.5 L")');
      return;
    }
    
    onSave(trimmedData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          Enter the type of input, name and quantity used.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as ProductType })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              required
            >
              <option value="FERTILIZER">Fertilizer</option>
              <option value="PESTICIDE">Pesticide</option>
              <option value="FUNGICIDE">Fungicide</option>
              <option value="HERBICIDE">Herbicide</option>
              <option value="SOIL_AMENDMENT">Soil Amendment</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., Aminofol"
              minLength={2}
              maxLength={100}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
              placeholder="e.g., 20 Kg"
              pattern="^\d+(\.\d+)?\s+[a-zA-Z]+$"
              title="Format: number + space + unit (e.g., 20 Kg, 2.5 L)"
              required
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Format: number + space + unit (e.g., 20 Kg, 2.5 L)</p>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold">
              {product ? 'Save' : 'Create'}
            </button>
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 py-2 px-4  rounded-lg font-semibold hover:bg-gray-400 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
