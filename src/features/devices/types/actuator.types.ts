export type ActuatorStatus = 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'PROVISIONED';
export type ActuatorType = 'IRRIGATION_VALVE' | 'FERTILIZER_DISPENSER';
export type ActuatorState = 'ACTIVE' | 'IDLE' | 'OPEN' | 'CLOSED';

export interface ActuatorResource {
  actuatorId: string;
  serialNumber: string;
  plotId: string;
  status: string;
  model: string;
  version: string;
  actuatorType: string;
}

export interface CreateActuatorResource {
  serialNumber: string;
  plotId: string;
  model: string;
  version: string;
  actuatorType: ActuatorType;
}

export interface UpdateDeviceStatusResource {
  status: ActuatorStatus;
}
