export type DeviceType = 'sensor' | 'actuator';
export type DeviceStatus = 'online' | 'offline' | 'maintenance' | 'provisioned';

export interface Device {
  id: string;
  serialNumber: string;
  deviceType: string;
  model: string;
  version: string;
  type: DeviceType;
  status: DeviceStatus;
}

export interface ChartData {
  day: string;
  value: number;
}
