"use client"

interface PlanCardProps {
    id: string
    name: string
    price: string
    period: string
    bgColor: string
    borderColor: string
    textColor: string
    accentColor: string
    hoverBg: string
    features: string[]
    isSelected: boolean
    isLoading: boolean
    onClick: () => void
}

export function PlanCard({
                             id,
                             name,
                             price,
                             period,
                             bgColor,
                             borderColor,
                             textColor,
                             accentColor,
                             hoverBg,
                             features,
                             isSelected,
                             isLoading,
                             onClick,
                         }: PlanCardProps) {
    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="p-8 rounded-2xl border-2 transition transform hover:scale-105 text-left disabled:opacity-50 flex flex-col min-h-96"
            style={{
                backgroundColor: bgColor,
                borderColor: borderColor,
                color: textColor,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = hoverBg
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = bgColor
            }}
        >
            <h3 className="text-3xl font-bold mb-4" style={{ color: textColor }}>
                {name}
            </h3>
            <div className="mb-6">
        <span className="text-4xl font-bold" style={{ color: textColor }}>
          {price}
        </span>
                <span className="ml-2 opacity-90" style={{ color: textColor }}>
          {period}
        </span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
                {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3" style={{ color: textColor }}>
            <span className="font-bold mt-1 flex-shrink-0" style={{ color: accentColor }}>
              ✓
            </span>
                        <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                ))}
            </ul>

            <button
                type="button"
                className="w-full bg-[#3E7C59] text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
                Select
            </button>
        </button>
    )
}
