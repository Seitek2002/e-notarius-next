import { ReactNode } from 'react';

import { TableBody } from './table-body';
import { TableHead } from './table-head';
import { Column, TableRowBase } from '@/widgets/table/model';

type TableProps<T extends TableRowBase> = {
  columns: Column<T>[];
  data: T[];
  renderRowActions?: (row: T) => ReactNode;
};

export function Table<T extends TableRowBase>({
  columns,
  data,
  renderRowActions,
}: TableProps<T>) {
  return (
    <table>
      <TableHead columns={columns} />
      <TableBody
        columns={columns}
        data={data}
        renderRowActions={renderRowActions}
      />
    </table>
  );
}
