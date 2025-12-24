import { FC } from 'react';

import { TableHeaderCell } from './table-header-cell';
import { Application, Column } from '@/widgets/table/applications/model';

type TProps = {
  columns: Column<Application>[];
};

export const TableHead: FC<TProps> = ({ columns }) => {
  return (
    <thead>
      {columns.map((column) => (
        <TableHeaderCell key={column.key} column={column} />
      ))}
    </thead>
  );
};
