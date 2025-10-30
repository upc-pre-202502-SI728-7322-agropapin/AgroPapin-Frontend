import {RoleSelector} from "../../features/auth/components/RoleSelector.tsx";


export function RolePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <RoleSelector />
                </div>
            </div>
        </div>
    )
}
