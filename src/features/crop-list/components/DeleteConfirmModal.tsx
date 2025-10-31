import { ConfirmModal } from "../../../shared/components/ui/ConfirmModal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  cropName: string;
}

export function DeleteConfirmModal({ isOpen, onConfirm, onCancel, cropName }: DeleteConfirmModalProps) {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title="Confirm Deletion"
      message={`Are you sure you want to delete the crop ${cropName}?`}
      confirmText="Delete"
      cancelText="Cancel"
    />
  );
}
