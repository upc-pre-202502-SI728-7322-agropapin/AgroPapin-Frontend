import type { CropCareRecommendation } from '../types/crop-care.types';

interface CropCareSuggestionsTableProps {
  recommendations: CropCareRecommendation[];
}

export function CropCareSuggestionsTable({ recommendations }: CropCareSuggestionsTableProps) {
  return (
    <div className="overflow-hidden rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-[#3E7C59] text-white">
            <th className="px-6 py-3.5 text-left font-semibold text-base first:rounded-tl-lg">Date</th>
            <th className="px-6 py-3.5 text-left font-semibold text-base last:rounded-tr-lg">Suggestions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {recommendations.slice(0, 5).map((rec) => (
            <tr 
              key={rec.id} 
              className="border-b border-gray-200 last:border-b-0"
            >
              <td className="px-6 py-4 text-gray-900 font-medium w-40">{rec.date}</td>
              <td className="px-6 py-4 text-gray-700">{rec.suggestion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* paginator */}
      <div className="flex items-center justify-end gap-4 py-4 px-6 bg-white border-t border-gray-200">
        <span className="text-sm text-gray-600">Records per page</span>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <span className="text-sm text-gray-600">1-5 of {recommendations.length}</span>
        <button className="p-1 hover:bg-gray-100 rounded">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
