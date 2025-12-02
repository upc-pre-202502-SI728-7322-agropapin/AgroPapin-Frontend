export const PlotStatus = {
  EMPTY: "EMPTY",
  PLANTED: "PLANTED",
  HARVESTED: "HARVESTED"
} as const;

export type PlotStatus = typeof PlotStatus[keyof typeof PlotStatus];

export interface PlotResource {
  plotId: string;
  plotName: string;
  area: number;
  status: PlotStatus;
}

export interface CreatePlotResource {
  plotName: string;
  plotArea: number;
}

export interface UpdatePlotResource {
  plotName: string;
  plotArea: number;
}

export interface UpdatePlotStatusResource {
  status: PlotStatus;
}

export type Plot = PlotResource;

export interface PlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreatePlotResource | UpdatePlotResource) => Promise<void>;
  plot?: Plot | null;
}

export interface PlotCardProps {
  plot: Plot;
  onInfoClick: (plotId: string) => void;
  onDevicesClick: (plotId: string) => void;
  onMetricsClick: (plotId: string) => void;
  onEdit: (plot: Plot) => void;
  onDelete: (plotId: string) => void;
}

export interface PlotListProps {
  plots: Plot[];
  onInfoClick: (plotId: string) => void;
  onDevicesClick: (plotId: string) => void;
  onMetricsClick: (plotId: string) => void;
  onEdit: (plot: Plot) => void;
  onDelete: (plotId: string) => void;
}
