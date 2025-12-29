import { Column, TableRowBase } from '@/widgets/table/model';

type TProps<T extends TableRowBase> = {
  column: Column<T>;
  row: T;
};

export function TableCell<T extends TableRowBase>({ column, row }: TProps<T>) {
  const value = row[column.key];

  return (
    <td
      style={{
        width: column.width,
        minWidth: column.minWidth,
        textAlign: column.align ?? 'left',
      }}
    >
      {column.render ? column.render(value, row) : String(value ?? '')}
    </td>
  );
}
