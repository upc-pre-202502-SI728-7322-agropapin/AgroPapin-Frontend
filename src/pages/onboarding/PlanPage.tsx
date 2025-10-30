import {PlanSelector} from "../../features/auth/components/PlanSelector.tsx";


export default function PlanPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-1 flex items-center justify-center px-4 ">
                <div className="w-full max-w-6xl">
                    <PlanSelector/>
                </div>
            </div>
        </div>
    )
}
