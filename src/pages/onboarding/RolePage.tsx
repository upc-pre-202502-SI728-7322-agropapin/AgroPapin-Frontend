import {RoleSelector} from "../../features/auth/components/RoleSelector.tsx";
import {Card} from "../../shared/components/ui/Card.tsx";



export function RolePage() {
    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <div className="flex items-center justify-center min-h-[calc(100vh-150px)] px-4">
                <Card title="" className="max-w-6xl">
                    <RoleSelector />
                </Card>
            </div>
        </div>
    )
}