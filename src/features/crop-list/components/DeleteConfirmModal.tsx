import { useTranslation } from 'react-i18next';
import { ConfirmModal } from "../../../shared/components/ui/ConfirmModal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  cropName: string;
}

export function DeleteConfirmModal({ isOpen, onConfirm, onCancel, cropName }: DeleteConfirmModalProps) {
  const { t } = useTranslation();
  
  return (
    <ConfirmModal
      isOpen={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title={t('crops.confirmDeletion')}
      message={`${t('crops.confirmDeleteCrop')} ${cropName}?`}
      confirmText={t('common.delete')}
      cancelText={t('common.cancel')}
    />
  );
}
