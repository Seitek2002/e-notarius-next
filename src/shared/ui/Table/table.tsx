import { ReactNode } from 'react';

import { TableBody } from './table-body';
import { TableHead } from './table-head';
import { Column, TableRowBase } from '@/widgets/table/model';

type TableProps<T extends TableRowBase> = {
  columns: Column<T>[];
  data: T[];
  renderRowActions?: (row: T) => ReactNode;

  selectedIds?: Array<T['id']>;
  onToggleAll?: () => void;
  onToggleRow?: (id: T['id']) => void;
  allSelected?: boolean;
};

export function Table<T extends TableRowBase>({
  columns,
  data,
  renderRowActions,
  onToggleAll,
  onToggleRow,
  allSelected,
  selectedIds
}: TableProps<T>) {
  return (
    <table>
      <TableHead columns={columns} onToggleAll={onToggleAll} allSelected={allSelected} />
      <TableBody
        columns={columns}
        data={data}
        renderRowActions={renderRowActions}
        selectedIds={selectedIds}
        onToggleRow={onToggleRow}
      />
    </table>
  );
}
