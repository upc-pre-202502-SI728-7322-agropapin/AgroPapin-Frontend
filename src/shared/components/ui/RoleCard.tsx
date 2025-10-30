"use client"
import farmer from "../../../assets/granjero.png"
import cooperative from "../../../assets/cooperativa.png"

interface RoleCardProps {
    role: "farmer" | "cooperative"
    isSelected: boolean
    isLoading: boolean
    onClick: () => void
}

export function RoleCard({ role, isSelected, isLoading, onClick }: RoleCardProps) {
    const isFarmer = role === "farmer"

    const bgColor = isFarmer
        ? isSelected
            ? "bg-[#F3F1E7] border-[#F3F1E7]"
            : "bg-[#F3F1E7] border-[#F3F1E7] hover:border-[#E6DEB5]"
        : isSelected
            ? "bg-[#A9B8B3] border-[#A9B8B3]"
            : "bg-[#A9B8B3] border-[#A9B8B3] hover:border-[#899B95]"

    const textColor = isFarmer ? "text-[#3E7C59]" : "text-white"

    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className={`p-12 rounded-2xl transition transform hover:scale-105 border-2 ${bgColor} disabled:opacity-50 flex flex-col items-center justify-center min-h-64`}
        >
            <div className="text-7xl mb-6">
                <img src={isFarmer ? farmer : cooperative} alt="Icon role" className="h-30" />
            </div>
            <h3 className={`text-3xl font-bold ${textColor}`}>{isFarmer ? "Farmer" : "Cooperative"}</h3>
            <p className={`text-gray-600 mt-3 text-center ${textColor}`}>
                {isFarmer ? "Individual agricultural producer" : "Agricultural cooperative organization"}
            </p>
        </button>
    )
}
