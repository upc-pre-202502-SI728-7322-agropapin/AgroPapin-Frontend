import { DataTable } from '../../../shared/components/ui/DataTable';
import type { Product } from '../types/product.types';

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export function ProductsTable({ products, onEdit, onDelete }: ProductsTableProps) {
  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'type', label: 'Type' },
    { key: 'name', label: 'Name' },
    { key: 'quantity', label: 'Quantity' },
  ];

  const renderCell = (product: Product, columnKey: string) => {
    switch (columnKey) {
      case 'date':
        return product.date;
      case 'type':
        return product.type;
      case 'name':
        return product.name;
      case 'quantity':
        return product.quantity;
      default:
        return '';
    }
  };

  return (
    <DataTable
      columns={columns}
      data={products}
      renderCell={renderCell}
      onEdit={onEdit}
      onDelete={(product) => onDelete(product.id)}
      getRowKey={(product) => product.id}
    />
  );
}
