import { useState } from 'react';
import Image from 'next/image';

import { InputFile } from '@/shared/ui/Input';

import UploadOwnFilesIcon from '@assets/icons/files/upload-own-files-icon.svg';
import MinusIcon from '@assets/icons/files/upload-minus-icon.svg';
import PlusIcon from '@assets/icons/files/upload-plus-icon.svg';

import './style.css';

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
    <div className='multi-file-upload'>
      <div className='multi-file-upload__top'>
        <h2>Файлы для загрузки</h2>
        <button>
          <UploadOwnFilesIcon />
          <span>Выбрать из моих файлов</span>
        </button>
      </div>
      <div className='multi-file-upload__content'>
        {files.map((item, index) => (
          <div key={item.id} className='flex gap-2.5'>
            <InputFile
              label={item.file ? item.file.name : 'Выберите файл'}
              name={`files[${index}]`}
              onChange={(e) =>
                handleFileChange(item.id, e.target.files?.[0] ?? null)
              }
            />
            {item === files[files.length - 1] ? (
              <div className='plus' onClick={addFile}>
                <PlusIcon />
              </div>
            ) : (
              <div className='minus' onClick={() => removeFile(item.id)}>
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
