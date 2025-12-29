import { Column, TableRowBase } from '@/widgets/table/model';
import { TableHeaderCell } from './table-header-cell';
import { Checkbox } from '../Input';

type TProps<T extends TableRowBase> = {
  columns: Column<T>[];
};

export function TableHead<T extends TableRowBase>({ columns }: TProps<T>) {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          if (column.key === 'checkbox') {
            return (
              <th key={String(column.key)}>
                <Checkbox label='' name='' />
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
