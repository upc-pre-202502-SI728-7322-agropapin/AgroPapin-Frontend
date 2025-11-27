export type SensorStatus = 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'PROVISIONED';
export type SensorType = 'HUMIDITY' | 'TEMPERATURE' | 'PH';

export interface SensorResource {
  sensorId: string;
  serialNumber: string;
  plotId: string;
  status: string;
  model: string;
  version: string;
}

export interface CreateSensorResource {
  serialNumber: string;
  plotId: string;
  model: string;
  version: string;
  sensorType: SensorType;
}

export interface UpdateDeviceStatusResource {
  status: SensorStatus;
}
