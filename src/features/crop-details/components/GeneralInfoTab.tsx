import { useTranslation } from 'react-i18next';
import type { CropDetail } from '../types/crop-details.types';
import {PiPottedPlant} from "react-icons/pi";
import {MdOutlineCalendarToday} from "react-icons/md";

interface GeneralInfoTabProps {
  crop: CropDetail;
}

export function GeneralInfoTab({ crop }: GeneralInfoTabProps) {
  const { t } = useTranslation();
  
  return (
    <div className="py-8">
      {/* Image and Info Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
        {/* Image */}
        <div className="flex justify-center items-start">
          <img
            src={crop.imageUrl}
            alt={crop.name}
            className="rounded-lg w-full max-w-md h-80 object-cover"
          />
        </div>

        {/* Info Cards */}
        <div className="space-y-5">
          {/* Crop name */}
          <div className="bg-[#FAFAFA] border border-gray-200 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-[#3E7C59] text-2xl">
                <PiPottedPlant size={35}/>
              </div>
              <p className="text-base font-medium text-gray-700">{t('crops.cropName')}</p>
            </div>
            <p className="text-lg font-semibold text-gray-900">{crop.name}</p>
          </div>

          {/* Creation date */}
          <div className="bg-[#FAFAFA]  border border-gray-200 rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-[#3E7C59] text-2xl">
                <MdOutlineCalendarToday size={25}/>
              </div>
              <p className="text-base font-medium text-gray-700">{t('crops.creationDate')}</p>
            </div>
            <p className="text-lg font-semibold text-gray-900">{crop.creationDate}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#E8F5E9] rounded-xl p-6 border border-[#C8E6C9]">
        <p className="text-[#2E7D32] leading-relaxed text-base">{crop.description}</p>
      </div>
    </div>
  );
}
