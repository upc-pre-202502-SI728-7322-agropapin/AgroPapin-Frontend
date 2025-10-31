import type { LastIrrigation } from '../types/irrigation.types';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

interface LastIrrigationInfoProps {
  irrigation: LastIrrigation;
}

export function LastIrrigationInfo({ irrigation }: LastIrrigationInfoProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">

      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Last Irrigation Information
      </h3>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side - Text content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Irrigation on {irrigation.date}</span>
            </p>
            <p className="text-sm text-gray-700 mb-4">
              The last irrigation was performed on {irrigation.date} at {irrigation.time}, with a duration of {irrigation.duration} and water consumption of {irrigation.waterUsed}.
            </p>
          </div>

          <button
            onClick={() => navigate('/devices/1/details/4')}
            className="flex justify-center items-center gap-3 bg-[#3E7C59] text-white py-3 px-6 rounded-lg hover:bg-[#2d5f43] transition-colors font-medium w-full sm:w-auto"
          >
            View Details
            <FaArrowRight />
          </button>
        </div>

        {/* Right side - Image */}
        <div className="rounded-lg overflow-hidden w-full md:w-80 flex-shrink-0">
          <img
            src={irrigation.imageUrl}
            alt="Último riego"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
