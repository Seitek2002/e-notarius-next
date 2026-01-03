import { Table } from '@/shared/ui/Table';
import { applicationsColumns, applicationsData } from '@/widgets/table/config';

import DetailsIcon from '@assets/icons/table/details-icon.svg';
import EditIcon from '@assets/icons/table/edit-icon.svg';
import DownloadIcon from '@assets/icons/table/download-icon.svg';
import DeleteIcon from '@assets/icons/table/delete-icon.svg';

export const ApplicationsTable = () => {
  return (
    <div className='overflow-x-auto max-w-full h-[calc(100vh-100px)]'>
      <Table
        columns={applicationsColumns}
        data={applicationsData}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderRowActions={(row) => (
          <>
            <DetailsIcon className='cursor-pointer' />
            <EditIcon className='cursor-pointer' />
            <DownloadIcon className='cursor-pointer' />
            <DeleteIcon className='cursor-pointer' />
          </>
        )}
      />
    </div>
  );
};
