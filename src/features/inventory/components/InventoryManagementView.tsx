import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CooperativeService } from '../../../services/cooperative/CooperativeService';
import { InventoryService } from '../../../services/inventory/InventoryService';
import { DataTable, type TableColumn } from '../../../shared/components/ui/DataTable';
import type { InventoryItemResource, CreateInventoryItemResource, UpdateInventoryItemResource, SupplyCategory } from '../types/inventory.types';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import { AddButton } from '../../../shared/components/ui/AddButton';
import { ConfirmModal } from '../../../shared/components/ui/ConfirmModal';
import { FaArrowLeft } from 'react-icons/fa';

export function InventoryManagementView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [items, setItems] = useState<InventoryItemResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [cooperativeId, setCooperativeId] = useState<string>('');
  const [noCooperative, setNoCooperative] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showIncreaseModal, setShowIncreaseModal] = useState(false);
  const [showUseModal, setShowUseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<InventoryItemResource | null>(null);
  const [selectedItem, setSelectedItem] = useState<InventoryItemResource | null>(null);

  const [formData, setFormData] = useState<CreateInventoryItemResource>({
    name: '',
    description: '',
    category: 'OTHER',
    initialAmount: 0,
    unit: '',
  });

  const [editFormData, setEditFormData] = useState<UpdateInventoryItemResource>({
    name: '',
    description: '',
    category: 'OTHER',
  });

  const [increaseAmount, setIncreaseAmount] = useState(0);
  const [useAmount, setUseAmount] = useState(0);
  const [usePurpose, setUsePurpose] = useState('');

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const cooperative = await CooperativeService.getMyCooperative();
      setCooperativeId(cooperative.cooperativeId);
      setNoCooperative(false);
      const inventoryData = await InventoryService.getInventory(cooperative.cooperativeId);
      setItems(inventoryData);
    } catch (error: any) {
      console.error('Error loading inventory:', error);
      if (error?.response?.status === 404) {
        console.error('No cooperative found for current user.');
        setNoCooperative(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!formData.name.trim() || !formData.unit.trim() || formData.initialAmount < 0) {
      console.log('Please fill all required fields');
      return;
    }

    try {
      await InventoryService.createInventoryItem(cooperativeId, formData);
      console.log('Item created successfully');
      setShowCreateModal(false);
      setFormData({
        name: '',
        description: '',
        category: 'OTHER',
        initialAmount: 0,
        unit: '',
      });
      await loadInventory();
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleEdit = async () => {
    if (!selectedItem || !editFormData.name.trim()) {
      console.log('Please fill all required fields');
      return;
    }

    try {
      await InventoryService.updateInventoryItem(cooperativeId, selectedItem.id, editFormData);
      console.log('Item updated successfully');
      setShowEditModal(false);
      setSelectedItem(null);
      await loadInventory();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = (item: InventoryItemResource) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await InventoryService.deleteInventoryItem(cooperativeId, itemToDelete.id);
      console.log('Item deleted successfully');
      setShowDeleteModal(false);
      setItemToDelete(null);
      await loadInventory();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleIncrease = async () => {
    if (!selectedItem || increaseAmount <= 0) {
      console.log('Please enter a valid amount');
      return;
    }

    try {
      await InventoryService.increaseInventoryAmount(cooperativeId, selectedItem.id, { amount: increaseAmount });
      console.log('Stock increased successfully');
      setShowIncreaseModal(false);
      setIncreaseAmount(0);
      setSelectedItem(null);
      await loadInventory();
    } catch (error) {
      console.error('Error increasing stock:', error);
    }
  };

  const handleUse = async () => {
    if (!selectedItem || useAmount <= 0 || !usePurpose.trim()) {
      console.log('Please fill all fields');
      return;
    }

    try {
      await InventoryService.useSupply(cooperativeId, selectedItem.id, { 
        amountToUse: useAmount, 
        purpose: usePurpose 
      });
      console.log('Supply used successfully');
      setShowUseModal(false);
      setUseAmount(0);
      setUsePurpose('');
      setSelectedItem(null);
      await loadInventory();
    } catch (error: any) {
      console.error('Error using supply:', error);
      if (error?.response?.data) {
        console.error('Backend error details:', error.response.data);
      }
    }
  };

  const openEditModal = (item: InventoryItemResource) => {
    setSelectedItem(item);
    setEditFormData({
      name: item.name,
      description: item.description,
      category: item.category,
    });
    setShowEditModal(true);
  };

  const openIncreaseModal = (item: InventoryItemResource) => {
    setSelectedItem(item);
    setIncreaseAmount(0);
    setShowIncreaseModal(true);
  };

  const openUseModal = (item: InventoryItemResource) => {
    setSelectedItem(item);
    setUseAmount(0);
    setUsePurpose('');
    setShowUseModal(true);
  };

  const columns: TableColumn[] = [
    { key: 'name', label: t('inventory.name') },
    { key: 'category', label: t('inventory.category') },
    { key: 'amount', label: t('inventory.amount') },
    { key: 'unit', label: t('inventory.unit') },
    { key: 'description', label: t('common.description') },
    { key: 'stockActions', label: t('inventory.stock'), width: '150px' },
  ];

  const renderCell = (item: InventoryItemResource, columnKey: string) => {
    switch (columnKey) {
      case 'name':
        return <span className="font-medium text-gray-900">{item.name}</span>;
      case 'category':
        return <span className="text-gray-600">{item.category}</span>;
      case 'amount':
        return <span className="text-gray-900 font-semibold">{item.amount}</span>;
      case 'unit':
        return <span className="text-gray-600">{item.unit}</span>;
      case 'description':
        return <span className="text-gray-600 text-sm">{item.description || '-'}</span>;
      case 'stockActions':
        return (
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openIncreaseModal(item);
              }}
              className="text-green-600 hover:text-green-800 transition-colors p-2"
              title={t('inventory.increaseStock')}
            >
              <IoAddCircleOutline size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                openUseModal(item);
              }}
              className="text-orange-600 hover:text-orange-800 transition-colors p-2"
              title={t('inventory.useSupply')}
            >
              <IoRemoveCircleOutline size={22} />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">{t('common.loading')}</div>
      </div>
    );
  }

  if (noCooperative) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('cooperative.noCooperativeFound')}</h2>
            <p className="text-gray-600 mb-6">
              {t('inventory.needCooperative')}
            </p>
            <button
              onClick={() => window.location.href = '/create-cooperative'}
              className="bg-[#3E7C59] hover:bg-[#2d5f43] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              {t('cooperative.createCooperative')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>{t('common.back')}</span>
        </button>

        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('inventory.title')}</h1>
            <p className="text-gray-600">{t('inventory.manageInventory')}</p>
          </div>
          <AddButton onClick={() => setShowCreateModal(true)} label={t('inventory.addItem')} />
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-md">
          <DataTable
            columns={columns}
            data={items}
            getRowKey={(item) => item.id}
            renderCell={renderCell}
            onEdit={openEditModal}
            onDelete={handleDelete}
            showActions={true}
            emptyMessage={t('inventory.noItems')}
          />
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {t('inventory.createItem')}
              </h2>
              
              <p className="text-gray-600 text-center mb-6">
                {t('inventory.addNewItem')}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t('inventory.name')} *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                    placeholder={t('inventory.enterName')}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t('common.description')}</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                    rows={3}
                    placeholder={t('inventory.briefDescription')}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t('inventory.category')} *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as SupplyCategory })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                  >
                    <option value="FERTILIZER">{t('inventory.fertilizer')}</option>
                    <option value="PESTICIDE">{t('inventory.pesticide')}</option>
                    <option value="SEED">{t('inventory.seed')}</option>
                    <option value="TOOL">{t('inventory.tool')}</option>
                    <option value="OTHER">{t('inventory.other')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t('inventory.initialAmount')} *</label>
                  <input
                    type="number"
                    value={formData.initialAmount}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      const roundedValue = Math.round(value * 10) / 10;
                      setFormData({ ...formData, initialAmount: roundedValue });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                    min="0"
                    step="0.1"
                    placeholder="Ex: 50.5"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t('inventory.unit')} *</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder={t('inventory.unitPlaceholder')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleCreate}
                  className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold">
                  {t('common.create')}
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {t('inventory.editItem')}
              </h2>
              
              <p className="text-gray-600 text-center mb-6">
                {t('inventory.updateInfo')}
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t('inventory.name')} *</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t('common.description')}</label>
                  <textarea
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t('inventory.category')} *</label>
                  <select
                    value={editFormData.category}
                    onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value as SupplyCategory })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                  >
                    <option value="FERTILIZER">{t('inventory.fertilizer')}</option>
                    <option value="PESTICIDE">{t('inventory.pesticide')}</option>
                    <option value="SEED">{t('inventory.seed')}</option>
                    <option value="TOOL">{t('inventory.tool')}</option>
                    <option value="OTHER">{t('inventory.other')}</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button onClick={handleEdit} className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold">
                  {t('common.save')}
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedItem(null);
                  }}
                  className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors">
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Increase Stock Modal */}
        {showIncreaseModal && selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {t('inventory.increaseStock')}
              </h2>
              
              <p className="text-gray-600 text-center mb-6">
                {t('inventory.addMoreStock')} <span className="font-semibold">{selectedItem.name}</span>
              </p>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('inventory.currentStock')}</p>
                <p className="text-2xl font-bold text-gray-900">{selectedItem.amount} {selectedItem.unit}</p>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">{t('inventory.amountToAdd')} *</label>
                <input
                  type="number"
                  value={increaseAmount}
                  onChange={(e) => setIncreaseAmount(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                  min="0"
                  step="0.01"
                  placeholder="Ex: 25.5"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button 
                  onClick={handleIncrease} 
                  className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold"
                >
                  {t('inventory.addStock')}
                </button>
                <button
                  onClick={() => {
                    setShowIncreaseModal(false);
                    setSelectedItem(null);
                  }}
                  className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Use Supply Modal */}
        {showUseModal && selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {t('inventory.useSupply')}
              </h2>
              
              <p className="text-gray-600 text-center mb-6">
                {t('inventory.recordUsage')} <span className="font-semibold">{selectedItem.name}</span>
              </p>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{t('inventory.availableStock')}</p>
                <p className="text-2xl font-bold text-gray-900">{selectedItem.amount} {selectedItem.unit}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t('inventory.amountToUse')} *</label>
                  <input
                    type="number"
                    value={useAmount}
                    onChange={(e) => setUseAmount(parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                    min="0"
                    step="0.01"
                    max={selectedItem.amount}
                    placeholder="Ex: 10.5"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">{t('inventory.purpose')} *</label>
                  <textarea
                    value={usePurpose}
                    onChange={(e) => setUsePurpose(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7C59]"
                    rows={3}
                    placeholder={t('inventory.purposePlaceholder')}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button 
                  onClick={handleUse} 
                  className="flex-1 bg-[#3E7C59] text-white py-2 px-4 rounded-lg hover:bg-[#2d5f43] transition-colors font-semibold"
                >
                  {t('inventory.useSupply')}
                </button>
                <button
                  onClick={() => {
                    setShowUseModal(false);
                    setSelectedItem(null);
                  }}
                  className="flex-1 bg-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        <ConfirmModal
          isOpen={showDeleteModal}
          onConfirm={confirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setItemToDelete(null);
          }}
          title={t('inventory.deleteItem')}
          message={`${t('inventory.confirmDelete')} "${itemToDelete?.name}"? ${t('inventory.cannotUndo')}`}
          confirmText={t('common.delete')}
          cancelText={t('common.cancel')}
          confirmButtonColor="bg-red-600 hover:bg-red-700"
        />
      </div>
    </div>
  );
}
