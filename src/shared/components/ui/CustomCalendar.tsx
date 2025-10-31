import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type CalendarValue = Date | null;

interface CustomCalendarProps {
  highlightedDates?: Date[];
  onDateSelect?: (date: Date) => void;
}

export function CustomCalendar({ highlightedDates = [], onDateSelect }: CustomCalendarProps) {
  const [date, setDate] = useState<CalendarValue>(new Date());

  const handleDateChange = (value: any) => {
    setDate(value);
    if (value instanceof Date) {
      onDateSelect?.(value);
    }
  };

  const tileClassName = ({ date: tileDate }: { date: Date }) => {
    const isHighlighted = highlightedDates.some(
      d => d.toDateString() === tileDate.toDateString()
    );

    return isHighlighted ? 'date-highlighted' : '';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <style>{`
        .react-calendar {
          border: none;
          font-family: inherit;
          width: 100%;
          padding: 0.5rem;
        }
        .react-calendar__tile {
          padding: 0.75rem 0.5rem;
          font-size: 0.875rem;
          margin: 3px;
          border-radius: 6px;
        }
        .react-calendar__tile:hover {
          background: #f0f0f0;
        }
        .react-calendar__tile--now {
          background: #e8f5e9;
        }
        .react-calendar__tile--active,
        .date-highlighted {
          background-color: #5B9279 !important;
          color: white !important;
        }
        .react-calendar__navigation button {
          font-size: 1rem;
          font-weight: 500;
        }
        .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.75rem;
          color: #666;
          padding-bottom: 0.5rem;
        }
        .react-calendar__month-view__days {
          gap: 2px;
        }
        .react-calendar__month-view__days__day--weekend {
          color: #d10000;
        }
      `}</style>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={tileClassName}
        locale="es"
      />
    </div>
  );
}
