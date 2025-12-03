import { useTranslation } from 'react-i18next';
import { DataTable } from '../../../shared/components/ui/DataTable';
import type { Product } from '../types/product.types';

interface ProductsTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  showActions?: boolean;
}

export function ProductsTable({ products, onEdit, onDelete, showActions = true }: ProductsTableProps) {
  const { t } = useTranslation();
  
  const columns = [
    { key: 'date', label: t('controls.date') },
    { key: 'type', label: t('controls.type') },
    { key: 'name', label: t('inventory.name') },
    { key: 'quantity', label: t('controls.quantity') },
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
      onDelete={onDelete ? (product) => onDelete(product.id) : undefined}
      getRowKey={(product) => product.id}
      showActions={showActions}
      emptyMessage={t('controls.noProducts')}
    />
  );
}
