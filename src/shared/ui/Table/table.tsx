import { FC } from 'react';

import { TableBody } from './table-body';
import { TableHead } from './table-head';
import { Application, Column } from '@/widgets/table/applications/model';

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export const Table: FC<TableProps<Application>> = ({ columns, data }) => {
  return (
    <table>
      <TableHead columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};
