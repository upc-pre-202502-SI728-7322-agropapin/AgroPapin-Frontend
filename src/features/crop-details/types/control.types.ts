export interface ControlResource {
  controlId: string;
  date: string;
  stateLeaves: string;
  stateStem: string;
  soilMoisture: string;
  plantingId: string;
  plotId: string;
}

export interface CreateControlResource {
  date: string;
  stateLeaves: string;
  stateStem: string;
  soilMoisture: string;
  plantingId: string;
}

export interface UpdateControlResource {
  date: string;
  stateLeaves: string;
  stateStem: string;
  soilMoisture: string;
}

export interface Control {
  id: string;
  date: string;
  leaves: string;
  stemCondition: string;
  soilMoisture: string;
}

export interface ControlFormData {
  leaves: string;
  stemCondition: string;
  soilMoisture: string;
}
