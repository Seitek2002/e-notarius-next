import { ReactNode } from 'react';

import { TableCell } from './table-cell';
import { Column, TableRowBase } from '@/widgets/table/model';

type TProps<T extends TableRowBase> = {
  columns: Column<T>[];
  data: T[];
  renderRowActions?: (row: T) => ReactNode;
};

export function TableBody<T extends TableRowBase>({
  columns,
  data,
  renderRowActions,
}: TProps<T>) {
  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <TableCell
              key={String(column.key)}
              column={column}
              row={row}
              renderRowActions={renderRowActions}
              isActions={column.key === 'actions'}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
}
