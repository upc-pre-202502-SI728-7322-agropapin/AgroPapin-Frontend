import type { LastIrrigation } from '../types/irrigation.types';
import { FaArrowRight } from "react-icons/fa";

interface LastIrrigationInfoProps {
  irrigation: LastIrrigation;
}

export function LastIrrigationInfo({ irrigation }: LastIrrigationInfoProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Last Irrigation Information
      </h3>
      
      <div className="space-y-4">
        <div className="flex gap-6 items-start">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Irrigation on {irrigation.date}</span>
            </p>
            <p className="text-sm text-gray-700 mb-4">
              The last irrigation was performed on {irrigation.date} at {irrigation.time}, with a duration of {irrigation.duration} and water consumption of {irrigation.waterUsed}.
            </p>
            
            <button className=" flex justify-center items-center gap-3 bg-[#3E7C59] text-white py-3 px-6 rounded-lg hover:bg-[#2d5f43] transition-colors font-medium">
              View Details 
              <FaArrowRight />
            </button>
          </div>
          
          <div className="rounded-lg overflow-hidden w-80 flex-shrink-0">
            <img 
              src={irrigation.imageUrl} 
              alt="Último riego"
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
