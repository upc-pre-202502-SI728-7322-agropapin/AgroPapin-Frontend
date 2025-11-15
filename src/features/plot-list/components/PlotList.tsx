import type { PlotListProps } from "../types/plot.types";
import { PlotCard } from "./PlotCard";


export function PlotList({ plots, onInfoClick, onDevicesClick }: PlotListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plots.map((plot) => (
        <PlotCard
          key={plot.id}
          plot={plot}
          onInfoClick={onInfoClick}
          onDevicesClick={onDevicesClick}
        />
      ))}
    </div>
  );
}