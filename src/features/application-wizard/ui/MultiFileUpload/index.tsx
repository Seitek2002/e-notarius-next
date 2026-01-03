import { useState } from 'react';

import { InputFile } from '@/shared/ui/Input';

import UploadOwnFilesIcon from '@assets/icons/files/upload-own-files-icon.svg';
import MinusIcon from '@assets/icons/files/upload-minus-icon.svg';
import PlusIcon from '@assets/icons/files/upload-plus-icon.svg';

type FileItem = {
  id: number;
  file: File | null;
};

const MultiFileUpload = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: 1,
      file: null,
    },
  ]);

  const addFile = () => {
    setFiles((p) => [
      ...p,
      {
        id: p[p.length - 1].id + 1,
        file: null,
      },
    ]);
  };

  const removeFile = (id: number) => {
    setFiles((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleFileChange = (id: number, file: File | null) => {
    setFiles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, file } : item))
    );
  };

  return (
    <div>
      <div className='flex justify-between items-center font-semibold text-[16px] mb-4'>
        <h2 className='text-light-blue'>Файлы для загрузки</h2>
        <button className='flex items-center text-main-green gap-1.5 cursor-pointer'>
          <UploadOwnFilesIcon />
          <span>Выбрать из моих файлов</span>
        </button>
      </div>
      <div className='flex flex-col gap-4'>
        {files.map((item, index) => (
          <div key={item.id} className='flex gap-2.5'>
            <InputFile
              label={item.file ? item.file.name : 'Выберите файл'}
              name={`files[${index}]`}
              onChange={(e) =>
                handleFileChange(item.id, e.target.files?.[0] ?? null)
              }
              className='flex-1'
            />
            {item === files[files.length - 1] ? (
              <div
                className='w-11 h-11 flex items-center justify-center cursor-pointer bg-main-green'
                onClick={addFile}
              >
                <PlusIcon />
              </div>
            ) : (
              <div
                className='w-11 h-11 flex items-center justify-center cursor-pointer bg-light-blue'
                onClick={() => removeFile(item.id)}
              >
                <MinusIcon />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiFileUpload;
