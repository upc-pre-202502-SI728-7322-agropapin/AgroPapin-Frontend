import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { IrrigationCalendar } from './IrrigationCalendar';
import { LastIrrigationInfo } from './LastIrrigationInfo';
import { PlantStatusGrid } from './PlantStatusGrid';
import { ScheduleIrrigationModal } from './ScheduleIrrigationModal';
import { FieldSelector } from './FieldSelector';
import { AddButton } from '../../../shared/components/ui/AddButton';
import type { IrrigationSchedule, LastIrrigation, FieldStatus, ScheduleIrrigationForm } from '../types/irrigation.types';


const mockFields = [
  { id: '1', name: 'Lemon' },
  { id: '2', name: 'Rice 1' },
  { id: '3', name: 'Rice 2' },
  { id: '4', name: 'Rice 3' },
];


// Helper function to generate date ranges
const generateDateRange = (startDate: Date, endDate: Date): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

const mockSchedules: IrrigationSchedule[] = [
  {
    fieldId: '1',
    fieldName: 'Lemon',
    dates: [
      
      ...generateDateRange(new Date(2025, 9, 8), new Date(2025, 9, 14)).map(date => ({ date, scheduled: true })),
     
      ...generateDateRange(new Date(2025, 9, 15), new Date(2025, 9, 21)).map(date => ({ date, scheduled: true })),
      
      ...generateDateRange(new Date(2025, 9, 22), new Date(2025, 9, 28)).map(date => ({ date, scheduled: true })),
    ],
  },
  {
    fieldId: '2',
    fieldName: 'Rice 1',
    dates: [
      
      ...generateDateRange(new Date(2025, 9, 10), new Date(2025, 9, 16)).map(date => ({ date, scheduled: true })),
      
      ...generateDateRange(new Date(2025, 9, 17), new Date(2025, 9, 23)).map(date => ({ date, scheduled: true })),
      
      ...generateDateRange(new Date(2025, 9, 24), new Date(2025, 9, 30)).map(date => ({ date, scheduled: true })),
    ],
  },
  {
    fieldId: '3',
    fieldName: 'Rice 2',
    dates: [
      
      ...generateDateRange(new Date(2025, 9, 5), new Date(2025, 9, 11)).map(date => ({ date, scheduled: true })),
      
      ...generateDateRange(new Date(2025, 9, 19), new Date(2025, 9, 25)).map(date => ({ date, scheduled: true })),
    ],
  },
  {
    fieldId: '4',
    fieldName: 'Rice 3',
    dates: [
      
      ...generateDateRange(new Date(2025, 9, 1), new Date(2025, 9, 7)).map(date => ({ date, scheduled: true })),
      
      ...generateDateRange(new Date(2025, 9, 12), new Date(2025, 9, 18)).map(date => ({ date, scheduled: true })),
      
      ...generateDateRange(new Date(2025, 9, 26), new Date(2025, 9, 31)).map(date => ({ date, scheduled: true })),
    ],
  },
];

const mockLastIrrigation: LastIrrigation = {
  date: 'October 8th',
  time: '10:00 am',
  duration: '2 hours',
  waterUsed: '500 liters',
  imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=400&fit=crop',
};


const mockFieldStatus: FieldStatus[] = [
  {
    id: '1',
    name: 'Lemon',
    status: 'Healthy',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Rice 1',
    status: 'Needs attention',
    imageUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=300&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Rice 2',
    status: 'Healthy',
    imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=300&h=200&fit=crop',
  },
  {
    id: '4',
    name: 'Rice 3',
    status: 'Water stress',
    imageUrl: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=300&h=200&fit=crop',
  },
];

export function IrrigationControlView() {
  const navigate = useNavigate();
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(mockFields[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schedules] = useState<IrrigationSchedule[]>(mockSchedules);

  const handleScheduleIrrigation = (data: ScheduleIrrigationForm) => {
    console.log('Schedule irrigation:', data);
    alert(`Irrigation scheduled for ${mockFields.find(f => f.id === data.fieldId)?.name} from ${data.startDate.toLocaleDateString()} to ${data.endDate.toLocaleDateString()}`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3E7C59] hover:text-[#2d5f43] transition-colors mb-6 font-medium"
        >
          <FaArrowLeft size={16} />
          <span>Back</span>
        </button>
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Irrigation Actuators
            </h1>
            <p className="text-gray-600">
              Manage and monitor irrigation systems for your crops
            </p>
          </div>
          <AddButton
            onClick={() => setIsModalOpen(true)}
            label="Schedule Irrigation"
          />
        </div>

        {/* Calendar Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Irrigation Calendar
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <IrrigationCalendar 
                schedules={schedules}
                selectedFieldId={selectedFieldId}
              />
            </div>
            <div className="lg:col-span-1">
              <FieldSelector
                fields={mockFields}
                selectedFieldId={selectedFieldId}
                onSelectField={setSelectedFieldId}
              />
            </div>
          </div>
        </div>

        {/* Last Irrigation Info */}
        <div className="mb-6">
          <LastIrrigationInfo irrigation={mockLastIrrigation} />
        </div>

        {/* Plant Status */}
        <div>
          <PlantStatusGrid fields={mockFieldStatus} />
        </div>

        {/* Schedule Modal */}
        <ScheduleIrrigationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleScheduleIrrigation}
          fields={mockFields}
        />
      </div>
    </div>
  );
}
