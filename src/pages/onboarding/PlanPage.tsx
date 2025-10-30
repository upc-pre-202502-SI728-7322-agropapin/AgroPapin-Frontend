import {PlanSelector} from "../../features/auth/components/PlanSelector.tsx";
import {Card} from "../../shared/components/ui/Card.tsx";


export default function PlanPage() {
    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <div className="flex items-center justify-center min-h-[calc(100vh-150px)] px-4">
                <Card title="" className="max-w-6xl">
                    <PlanSelector/>
                </Card>
            </div>
        </div>
    )
}
