export type SupplyCategory = 'FERTILIZER' | 'PESTICIDE' | 'SEED' | 'TOOL' | 'OTHER';

export interface InventoryItemResource {
  id: string;
  name: string;
  description: string;
  category: SupplyCategory;
  amount: number;
  unit: string;
}

export interface CreateInventoryItemResource {
  name: string;
  description: string;
  category: SupplyCategory;
  initialAmount: number;
  unit: string;
}

export interface UpdateInventoryItemResource {
  name: string;
  description: string;
  category: SupplyCategory;
}

export interface IncreaseInventoryAmountResource {
  amount: number;
}

export interface UseSupplyResource {
  amountToUse: number;
  purpose: string;
}

export interface UsageStatisticResource {
  itemId: string;
  itemName: string;
  totalAmountUsed: number;
  unit: string;
}
