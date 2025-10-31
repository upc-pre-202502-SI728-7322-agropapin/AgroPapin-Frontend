interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonColor?: string;
}

export function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = "bg-red-500 hover:bg-red-600",
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>

        <p className="text-center text-gray-600 mb-8">{message}</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onConfirm}
            className={`${confirmButtonColor} text-white px-12 py-2 rounded-lg font-semibold transition-colors`}
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 px-12 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
