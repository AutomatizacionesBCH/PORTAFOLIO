import { TableScroll } from '@/components/ui/TableScroll'

type Column<T> = {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
  width?: string
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = 'Sin registros',
}: DataTableProps<T>) {
  return (
    <TableScroll>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/[0.07]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="text-left py-3 px-4 text-[10px] font-semibold text-white/30 uppercase tracking-widest"
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-12 text-center text-white/25 text-xs"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className="border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="py-3 px-4 text-white/70">
                    {col.render
                      ? col.render(row)
                      : String(row[col.key as keyof T] ?? '—')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </TableScroll>
  )
}
