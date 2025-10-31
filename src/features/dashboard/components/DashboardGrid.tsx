"use client"



import {FieldInfoCard} from "../../../shared/components/ui/FieldInfoCard.tsx";

interface DashboardGridProps {
    onFieldInfoClick?: () => void
    onChatClick?: () => void
    onCropTrackingClick?: () => void
    onIrrigationClick?: () => void
}

// SVG Icons as React components
const FieldIcon = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
        <path
            d="M20 60 Q20 40 35 30 Q50 20 65 30 Q80 40 80 60 L80 80 Q80 85 75 85 L25 85 Q20 85 20 80 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="35" cy="25" r="4" fill="currentColor" />
        <circle cx="65" cy="25" r="4" fill="currentColor" />
        <path d="M30 50 Q30 45 35 45 Q40 45 40 50" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M60 50 Q60 45 65 45 Q70 45 70 50" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
)

const ChatIcon = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
        <path
            d="M20 30 Q20 20 30 20 L70 20 Q80 20 80 30 L80 60 Q80 70 70 70 L50 70 L35 85 L40 70 L30 70 Q20 70 20 60 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M35 40 L35 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 40 L50 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M65 40 L65 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
)

const CropIcon = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
        <circle cx="50" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M50 35 L50 60" stroke="currentColor" strokeWidth="2" />
        <path
            d="M35 50 L50 60 L65 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M40 45 L50 55 L60 45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

const IrrigationIcon = () => (
    <svg viewBox="0 0 100 100" className="w-16 h-16">
        <rect x="35" y="20" width="30" height="35" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="28" r="3" fill="currentColor" />
        <path
            d="M30 60 Q30 50 40 50 L60 50 Q70 50 70 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
        />
        <path d="M35 65 L35 75 M50 65 L50 75 M65 65 L65 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="35" cy="78" r="2" fill="currentColor" />
        <circle cx="50" cy="78" r="2" fill="currentColor" />
        <circle cx="65" cy="78" r="2" fill="currentColor" />
    </svg>
)

export function DashboardGrid({
                                  onFieldInfoClick,
                                  onChatClick,
                                  onCropTrackingClick,
                                  onIrrigationClick,
                              }: DashboardGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FieldInfoCard title="Información de Campo" icon={<FieldIcon />} onClick={onFieldInfoClick} />
            <FieldInfoCard title="AgroPapin Chat" icon={<ChatIcon />} onClick={onChatClick} />
            <FieldInfoCard title="Seguimiento de Cultivo" icon={<CropIcon />} onClick={onCropTrackingClick} />
            <FieldInfoCard title="Control de Riego" icon={<IrrigationIcon />} onClick={onIrrigationClick} />
        </div>
    )
}
