export interface Plot {
  id: string;
  name: string;
  imageUrl: string;
  cropType: string;
}

export interface PlotCardProps {
  plot: Plot;
  onInfoClick: (plotId: string) => void;
  onDevicesClick: (plotId: string) => void;
}

export interface PlotListProps {
  plots: Plot[];
  onInfoClick: (plotId: string) => void;
  onDevicesClick: (plotId: string) => void;
}
