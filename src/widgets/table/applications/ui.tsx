import { Table } from '@/shared/ui/Table';
import { columns, data } from '@/widgets/table/applications/config';

export const ApplicationsTable = () => {
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
};
