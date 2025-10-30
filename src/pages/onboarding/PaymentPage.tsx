import {Card} from "../../shared/components/ui/Card.tsx";
import {PaymentForm} from "../../features/auth/components/PaymentForm.tsx";
import {useOnboarding} from "../../features/auth/context/OnboardingContext.tsx";
import {Navigate} from "react-router-dom";
import {ROUTES} from "../../shared/constants/routes.ts";
import {PlanSummary} from "../../features/auth/components/PlanSummary.tsx";


export function PaymentPage() {
    const {selectedPlan} = useOnboarding();
    if(!selectedPlan){
        return <Navigate to={ROUTES.ONBOARDING.PLAN} replace/>
    }

    return (
        <div className="h-screen bg-gray-50 flex flex-col ">
            <div className="flex items-center justify-center min-h-[calc(100vh-150px)] px-4">
                <Card title="Enter your details" className="max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <PaymentForm/>
                        </div>
                        <div className="lg:col-span-1 mx-4">
                            <h3 className="text-xl font-bold mb-4">
                                Selected Plan
                            </h3>
                            <PlanSummary plan={selectedPlan}/>
                        </div>

                    </div>
                </Card>
            </div>
        </div>
    )
}
