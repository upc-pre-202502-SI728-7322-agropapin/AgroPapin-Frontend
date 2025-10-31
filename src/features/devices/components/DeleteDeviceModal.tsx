import { ConfirmModal } from "../../../shared/components/ui/ConfirmModal";

interface DeleteDeviceModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  deviceName: string;
}

export function DeleteDeviceModal({ isOpen, onConfirm, onCancel, deviceName }: DeleteDeviceModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title="Confirm Deletion"
      message={`Are you sure you want to delete the device ${deviceName}?`}
      confirmText="Delete"
      cancelText="Cancel"
    />
  );
}
