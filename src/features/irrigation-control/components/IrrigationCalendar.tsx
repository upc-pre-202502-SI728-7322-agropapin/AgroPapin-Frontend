import { CustomCalendar } from '../../../shared/components/ui/CustomCalendar';
import type { IrrigationSchedule } from '../types/irrigation.types';

interface IrrigationCalendarProps {
  schedules: IrrigationSchedule[];
  selectedFieldId: string | null;
}

export function IrrigationCalendar({ schedules, selectedFieldId }: IrrigationCalendarProps) {
  const selectedSchedule = schedules.find(s => s.fieldId === selectedFieldId);

  const highlightedDates = selectedSchedule 
    ? selectedSchedule.dates
        .filter(d => d.scheduled)
        .map(d => d.date)
    : [];

  return <CustomCalendar highlightedDates={highlightedDates} />;
}
