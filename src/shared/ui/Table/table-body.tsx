import { ReactNode } from 'react';
import { TableCell } from './table-cell';
import { Column, TableRowBase } from '@/widgets/table/model';

type TProps<T extends TableRowBase> = {
  columns: Column<T>[];
  data: T[];
  renderRowActions?: (row: T) => ReactNode;
  selectedIds?: Array<T['id']>;
  onToggleRow?: (id: T['id']) => void;
};

export function TableBody<T extends TableRowBase>({
  columns,
  data,
  renderRowActions,
  selectedIds,
  onToggleRow,
}: TProps<T>) {
  return (
    <tbody>
      {data.map((row) => (
        <tr
          key={row.id}
          className='group relative transition-colors duration-300 hover:bg-white outline-transparent hover:outline-1 hover:outline-[#ccc] hover:-outline-offset-1'
        >
          {columns.map((column) => (
            <TableCell
              key={String(column.key)}
              column={column}
              row={row}
              renderRowActions={renderRowActions}
              isActions={column.key === 'actions'}
              selectedIds={selectedIds}
              onToggleRow={onToggleRow}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
}
