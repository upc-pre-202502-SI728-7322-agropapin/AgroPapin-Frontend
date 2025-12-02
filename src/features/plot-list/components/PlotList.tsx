import type { PlotListProps } from "../types/plot.types";
import { PlotCard } from "./PlotCard";


export function PlotList({ plots, onInfoClick, onDevicesClick, onMetricsClick, onEdit, onDelete, isAdmin = false }: PlotListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plots.map((plot) => (
        <PlotCard
          key={plot.plotId}
          plot={plot}
          onInfoClick={onInfoClick}
          onDevicesClick={onDevicesClick}
          onMetricsClick={onMetricsClick}
          onEdit={onEdit}
          onDelete={onDelete}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
}