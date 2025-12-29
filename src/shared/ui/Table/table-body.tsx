import { FC, ReactNode } from 'react';
import { TableCell } from './table-cell';
import { Application, Column } from '@/widgets/table/applications/model';

type TProps<T> = {
  columns: Column<T>[];
  data: T[];
  renderRowActions?: (row: T) => ReactNode;
};

export const TableBody: FC<TProps<Application>> = ({
  columns,
  data,
  renderRowActions,
}) => {
  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <TableCell key={column.key} column={column} row={row} />
          ))}

          {renderRowActions && (
            <td className='icons'>{renderRowActions(row)}</td>
          )}
        </tr>
      ))}
    </tbody>
  );
};
