export type DeviceType = 'sensor' | 'actuator';
export type DeviceStatus = 'active' | 'inactive';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  location: string;
}

export interface ChartData {
  day: string;
  value: number;
}
