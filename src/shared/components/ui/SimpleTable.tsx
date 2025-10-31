interface Column {
  key: string;
  label: string;
  width?: string;
}

interface SimpleTableProps<T> {
  columns: Column[];
  data: T[];
  renderCell: (item: T, columnKey: string) => React.ReactNode;
  getRowKey: (item: T) => string;
  itemsPerPage?: number;
  totalItems?: number;
}

export function SimpleTable<T>({
  columns,
  data,
  renderCell,
  getRowKey,
  itemsPerPage = 5,
  totalItems,
}: SimpleTableProps<T>) {
  const displayedItems = data.slice(0, itemsPerPage);
  const total = totalItems || data.length;

  return (
    <div className="overflow-hidden rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-[#3E7C59] text-white">
            {columns.map((column, index) => (
              <th
                key={column.key}
                className={`px-6 py-3.5 text-left font-semibold text-base ${
                  index === 0 ? 'first:rounded-tl-lg' : ''
                } ${index === columns.length - 1 ? 'last:rounded-tr-lg' : ''}`}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {displayedItems.map((item) => (
            <tr key={getRowKey(item)} className="border-b border-gray-200 last:border-b-0">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 text-gray-700">
                  {renderCell(item, column.key)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* paginator */}
      <div className="flex items-center justify-end gap-4 py-4 px-6 bg-white border-t border-gray-200">
        <span className="text-sm text-gray-600">Records per page</span>
        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <span className="text-sm text-gray-600">
          1-{Math.min(itemsPerPage, displayedItems.length)} of {total}
        </span>
        <button className="p-1 hover:bg-gray-100 rounded">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
