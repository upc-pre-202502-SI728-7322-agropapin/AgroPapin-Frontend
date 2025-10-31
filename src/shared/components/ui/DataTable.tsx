import {FaRegEdit} from 'react-icons/fa';
import type { ReactNode } from 'react';
import {IoTrashOutline} from "react-icons/io5";

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

interface DataTableProps<T> {
  columns: TableColumn[];
  data: T[];
  onRowClick?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  getRowKey: (item: T) => string;
  renderCell: (item: T, columnKey: string) => ReactNode;
  showActions?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  onRowClick,
  onEdit,
  onDelete,
  getRowKey,
  renderCell,
  showActions = true,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#3E7C59] text-white">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="px-6 py-4 text-left font-semibold whitespace-nowrap"
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.label}
                </th>
              ))}
              {showActions && <th className="px-6 py-4 w-24"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr
                key={getRowKey(item)}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 whitespace-nowrap ${onRowClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onRowClick?.(item)}
                  >
                    {renderCell(item, column.key)}
                  </td>
                ))}
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2 justify-end">
                      {onEdit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                          }}
                          className="text-orange-500 rounded p-3 hover:bg-orange-200 transition-colors">
                          <FaRegEdit  size={20} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item);
                          }}
                          className=" text-red-500 p-3 rounded hover:bg-red-200 transition-colors">
                          <IoTrashOutline  size={25} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* paginator */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end items-center gap-4">
        <span className="text-sm text-gray-600">Records per page</span>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
        <span className="text-sm text-gray-600">1-5 of 10</span>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-gray-600">‹</button>
          <button className="text-gray-400 hover:text-gray-600">›</button>
        </div>
      </div>
    </div>
  );
}
