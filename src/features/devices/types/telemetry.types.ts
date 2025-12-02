export interface ChartDataResource {
  time: string;
  temperature?: number;
  humidity?: number;
  soilMoisture?: number;
}

export interface AvgReadingResource {
  plotId: string;
  serialNumber: string;
  avgTemperature: number;
  avgHumidity: number;
  avgSoilMoisture: number;
  lastUpdated: string;
}

export interface PlotReadingResource {
  plotId: string;
  serialNumber: string;
  timestamp: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
}
