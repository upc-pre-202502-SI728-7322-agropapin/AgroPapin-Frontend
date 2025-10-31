import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

interface CropData {
    name: string
    value: number
    color: string
}

interface CropsChartProps {
    data?: CropData[]
}

const defaultData: CropData[] = [
    { name: "Maíz", value: 35, color: "#efb627" },
    { name: "Trigo", value: 24, color: "#f13434" },
    { name: "Arroz", value: 16, color: "#126de3" },
    { name: "Soja", value: 11, color: "#59a630" },
    { name: "Otros", value: 5, color: "#ef9347" },
    { name: "Garbanzos", value: 9, color: "#af4df4" },
]

export function CropsChart({ data = defaultData }: CropsChartProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-8 h-full flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Crop Distribution</h2>
            <div className="flex-1 flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data as never}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name} ${value}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
