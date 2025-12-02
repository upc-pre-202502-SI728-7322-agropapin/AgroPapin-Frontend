export interface ChartDataResource {
  time: string;
  temperature?: number;
  humidity?: number;
  soilMoisture?: number;
}

export interface AvgReadingResource {
  sensorType: 'TEMPERATURE' | 'HUMIDITY' | 'SOIL_MOISTURE';
  avgValue: number;
  timestamp: string;
}

export interface PlotReadingResource {
  plotId: string;
  serialNumber: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
}
