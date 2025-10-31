"use client"

import type React from "react"

interface FieldInfoCardProps {
    title: string
    icon: React.ReactNode
    onClick?: () => void
}

export function FieldInfoCard({ title, icon, onClick }: FieldInfoCardProps) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
        >
            <div className="mb-6 text-6xl text-gray-800 group-hover:scale-110 transition-transform">{icon}</div>
            <button className="px-6 py-2 bg-[#3E7C59] text-white rounded-full font-semibold hover:bg-[#2d5f45] transition-colors">
                {title}
            </button>
        </div>
    )
}
