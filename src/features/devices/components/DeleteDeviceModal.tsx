import { useTranslation } from 'react-i18next';
import { ConfirmModal } from "../../../shared/components/ui/ConfirmModal";

interface DeleteDeviceModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  deviceName: string;
}

export function DeleteDeviceModal({ isOpen, onConfirm, onCancel, deviceName }: DeleteDeviceModalProps) {
  const { t } = useTranslation();
  
  return (
    <ConfirmModal
      isOpen={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title={t('devices.confirmDeletion')}
      message={`${t('devices.confirmDeleteDevice')} ${deviceName}?`}
      confirmText={t('common.delete')}
      cancelText={t('common.cancel')}
    />
  );
}
