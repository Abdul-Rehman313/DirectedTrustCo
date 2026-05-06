import type { ReactNode } from 'react'

export interface DataTableColumn<Row> {
  key: string
  header: string
  cell: (row: Row) => ReactNode
  className?: string
}

interface DataTableProps<Row> {
  columns: DataTableColumn<Row>[]
  rows: Row[]
  rowKey: (row: Row) => string
  emptyState: ReactNode
  minWidthClassName?: string
}

export const DataTable = <Row,>({
  columns,
  rows,
  rowKey,
  emptyState,
  minWidthClassName = 'min-w-[780px]',
}: DataTableProps<Row>) => (
  <div className="overflow-x-auto rounded-2xl border border-border">
    <table className={`w-full border-collapse ${minWidthClassName}`}>
      <thead>
        <tr className="bg-slate-100">
          {columns.map((column) => (
            <th
              key={column.key}
              className="px-4 py-3 text-left text-[10px] font-semibold tracking-wide text-text-secondary"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row) => (
            <tr key={rowKey(row)} className="border-t border-border bg-surface">
              {columns.map((column) => (
                <td key={column.key} className={column.className ?? 'px-4 py-4 text-sm text-text-primary'}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} className="px-4 py-12">
              {emptyState}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)
