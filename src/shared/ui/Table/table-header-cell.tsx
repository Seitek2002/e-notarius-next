import { Application, Column } from '@/widgets/table/applications/model';

export const TableHeaderCell = ({
  column,
}: {
  column: Column<Application>;
}) => {
  return <th>{column.label}</th>;
};
