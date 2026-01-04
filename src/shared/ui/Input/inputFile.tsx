import { FC } from 'react';

import { InputFileProps } from '../types';

import СlipIcon from '@assets/icons/files/clip-icon.svg';

const inputFile: FC<InputFileProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  const id = props.id ?? props.name;

  return (
    <label
      className={
        'border border-main-green cursor-pointer max-w-full flex items-center justify-between text-light-blue ' +
        (className || '')
      }
      htmlFor={id}
    >
      <span className='pl-[15px] text-[14px]'>{label || 'Выберите файл'}</span>
      <input type='file' id={id} className='sr-only' {...props} />
      <div className='w-[70px] h-[42px] grid place-items-center bg-main-green box-border'>
        <СlipIcon />
      </div>
      {error && <p className='text-red-500 text-[12px]'>{error}</p>}
    </label>
  );
};

export default inputFile;
