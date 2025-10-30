import type React from "react"
interface CardProps {
    title: string
    icon?: React.ReactNode
    children: React.ReactNode
    className?: string
}

export function Card({ title, icon, children, className = "" }: CardProps) {
    return (
        <div className={`bg-white rounded-2xl shadow-lg p-8 w-full ${className}`}>
            <div className="flex items-center flex-col text-center ">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                {icon && <div className="text-4xl mt-2">{icon}</div>}
            </div>
            {children}
        </div>
    )
}
