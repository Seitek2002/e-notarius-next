import { FC } from 'react';
import { TableCell } from './table-cell';
import { Application, Column } from '@/widgets/table/applications/model';

type TProps = {
  columns: Column<Application>[];
  data: Application[];
};

export const TableBody: FC<TProps> = ({ columns, data }) => {
  return (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {columns.map((column) => (
            <TableCell key={column.key} column={column} row={row} />
          ))}
        </tr>
      ))}
    </tbody>
  );
};
