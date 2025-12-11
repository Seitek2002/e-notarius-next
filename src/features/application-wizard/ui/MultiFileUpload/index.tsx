import { useState } from 'react';
import Image from 'next/image';

import { InputFile } from '@/shared/ui/Input';

import uploadOwnFilesIcon from '@/assets/icons/upload-own-files-icon.svg';
import minusIcon from '@/assets/icons/upload-minus-icon.svg';
import plusIcon from '@/assets/icons/upload-plus-icon.svg';

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
          <Image src={uploadOwnFilesIcon} alt='upload-own-files-icon' />
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
                <Image src={plusIcon} alt='plus-icon' />
              </div>
            ) : (
              <div className='minus' onClick={() => removeFile(item.id)}>
                <Image src={minusIcon} alt='minus-icon' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiFileUpload;
