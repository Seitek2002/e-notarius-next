import { Application, Column } from '@/widgets/table/applications/model';

export const TableCell = ({
  column,
  row,
}: {
  column: Column<Application>;
  row: Application;
}) => {
  const value = row[column.key];

  return (
    <td>{column.render ? column.render(value, row) : String(value ?? '')}</td>
  );
};
