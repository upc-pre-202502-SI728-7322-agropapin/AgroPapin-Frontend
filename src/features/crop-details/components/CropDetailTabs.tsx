import { Tabs } from '../../../shared/components/ui/Tabs';

interface CropDetailTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'general', label: 'General Information' },
  { id: 'controls', label: 'Controls' },
  { id: 'products', label: 'Products Used' },
];

export function CropDetailTabs({ activeTab, onTabChange }: CropDetailTabsProps) {
  return (
    <div className="mb-8">
      <Tabs 
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}
