import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CropCareCalendar.css';

export function CropCareCalendar() {
  const [date, setDate] = useState<Date>(new Date());

  const onChange = (value: Date | null) => {
    if (value) {
      setDate(value);
    }
  };

  return (
    <div className="crop-care-calendar">
      <Calendar
        onChange={onChange as any}
        value={date}
        locale="en-US"
        className="custom-calendar"
      />
    </div>
  );
}
