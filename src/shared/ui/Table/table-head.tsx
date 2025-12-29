import { Column, TableRowBase } from '@/widgets/table/model';
import { TableHeaderCell } from './table-header-cell';
import { Checkbox } from '../Input';

type TProps<T extends TableRowBase> = {
  columns: Column<T>[];

  onToggleAll?: () => void;
  allSelected?: boolean;
};

export function TableHead<T extends TableRowBase>({ columns, onToggleAll, allSelected }: TProps<T>) {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          if (column.key === 'checkbox') {
            return (
              <th key={String(column.key)}>
                <Checkbox label='' name='' onChange={onToggleAll} checked={allSelected} />
              </th>
            );
          } else {
            return <TableHeaderCell key={String(column.key)} column={column} />;
          }
        })}
      </tr>
    </thead>
  );
}
