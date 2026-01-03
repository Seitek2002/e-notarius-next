'use client';

import { useState } from 'react';

import { Table } from '@/shared/ui/Table';
import { filesColumns, filesData } from '@/widgets/table/config';

import DownloadIcon from '@assets/icons/table/download-icon.svg';
import DeleteIcon from '@assets/icons/table/delete-icon.svg';

export const FilesTable = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const allSelected = selectedIds.length === filesData.length;

  return (
    <div className='overflow-x-auto max-w-full h-[calc(100vh-100px)]'>
      <Table
        columns={filesColumns}
        data={filesData}
        selectedIds={selectedIds}
        allSelected={allSelected}
        onToggleAll={() => {
          setSelectedIds(allSelected ? [] : filesData.map((f) => f.id));
        }}
        onToggleRow={(id) => {
          setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
          );
        }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderRowActions={(row) => (
          <>
            <DownloadIcon />
            <DeleteIcon />
          </>
        )}
      />
    </div>
  );
};
