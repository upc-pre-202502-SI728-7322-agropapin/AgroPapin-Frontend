import { IoMdAddCircleOutline } from 'react-icons/io';

interface AddButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
}

export function AddButton({ onClick, label, className = '' }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#3E7C59] text-white px-6 py-3 rounded-lg hover:bg-[#2d5f43] transition-colors font-medium flex items-center gap-2 ${className}`}
    >
      <IoMdAddCircleOutline size={20} />
      {label}
    </button>
  );
}
