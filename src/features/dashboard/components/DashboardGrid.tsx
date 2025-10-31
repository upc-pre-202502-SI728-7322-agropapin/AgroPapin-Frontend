"use client"



import {FieldInfoCard} from "../../../shared/components/ui/FieldInfoCard.tsx";
import irrigationLogo from "../../../assets/riego.png";
import fieldLogo from "../../../assets/campo.png";
import cropLogo from "../../../assets/cultivo.png";
import agropapinLogo from "../../../assets/agropapinChat.png"

interface DashboardGridProps {
    onFieldInfoClick?: () => void
    onChatClick?: () => void
    onCropTrackingClick?: () => void
    onIrrigationClick?: () => void
}

export function DashboardGrid({
                                  onFieldInfoClick,
                                  onChatClick,
                                  onCropTrackingClick,
                                  onIrrigationClick,
                              }: DashboardGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <FieldInfoCard title="Field Information" icon={fieldLogo } onClick={onFieldInfoClick} />
            <FieldInfoCard title="AgroPapin Chat" icon={ agropapinLogo} onClick={onChatClick} />
            <FieldInfoCard title="Crop Tracking" icon={cropLogo } onClick={onCropTrackingClick} />
            <FieldInfoCard title="Irrigation Management" icon={irrigationLogo } onClick={onIrrigationClick} />
        </div>
    )
}
