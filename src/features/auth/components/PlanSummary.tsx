import type { PlanOption } from "../types/auth.types"
import {FiCheckCircle} from "react-icons/fi";

interface PlanSummaryProps {
    plan: PlanOption
}

export function PlanSummary({ plan }: PlanSummaryProps) {
    return (
        <div
            className="border-2 rounded-lg p-6 h-fit"
            style={{
                backgroundColor: plan.bgColor,
                borderColor: plan.bgColor,
            }}
        >
            <div className="space-y-4">
                <div>
                    <h4 className="text-lg font-bold " style={{ color: plan.textColor }}>
                        {plan.name}
                    </h4>
                    <p className="text-2xl font-bold mt-2" style={{ color: plan.textColor }}>
                        {plan.price}
                        <span className="text-sm font-normal" style={{ color: plan.textColor}}>
              {plan.period}
            </span>
                    </p>
                </div>
                <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm" style={{ color: plan.textColor }}>
                            <span className="font-bold mt-1"><FiCheckCircle /></span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
