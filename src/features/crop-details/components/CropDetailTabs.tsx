interface CropDetailTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'general', label: 'General Information' },
  { id: 'care', label: 'Crop Care' },
  { id: 'controls', label: 'Controls' },
  { id: 'pests', label: 'Pests' },
  { id: 'products', label: 'Products Used' },
];

export function CropDetailTabs({ activeTab, onTabChange }: CropDetailTabsProps) {
  return (
    <div className="border-b border-gray-300 mb-8">
      <nav className="flex space-x-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-4 font-medium text-base transition-colors relative ${
              activeTab === tab.id
                ? 'text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#3E7C59] rounded-t-sm" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
