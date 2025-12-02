export interface IrrigationDate {
  date: Date;
  scheduled: boolean;
}

export interface IrrigationSchedule {
  fieldId: string;
  fieldName: string;
  dates: IrrigationDate[];
}

export interface LastIrrigation {
  date: string;
  time: string;
  duration: string;
  waterUsed: string;
  imageUrl: string;
}

export interface FieldStatus {
  id: string;
  name: string;
  status: 'Healthy' | 'Needs attention' | 'Water stress';
  imageUrl: string;
}

export interface ScheduleIrrigationForm {
  fieldId: string;
  startDate: Date;
  endDate: Date;
}

export interface ActivateIrrigationRequest {
  actuatorId: string;
  minutes: number;
}

export interface IrrigationLogResource {
  logId: string;
  plotId: string;
  decisionTimestamp: string;
  decision: string;
  reason: string;
  humidityReading: number;
  humidityThreshold: number;
}
