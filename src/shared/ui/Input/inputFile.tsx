import { forwardRef } from 'react';
import clsx from 'clsx';

import { InputFileProps } from '../types';

import ClipIcon from '@assets/icons/files/clip-icon.svg';

const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  ({ label, error, className, ...props }, ref) => {
    const id = props.id ?? props.name;

    return (
      <div className={clsx('w-full', className)}>
        <label
          htmlFor={id}
          className={clsx(
            'flex items-center justify-between cursor-pointer border transition-colors',
            'text-sm text-light-blue',
            error ? 'border-red-500' : 'border-main-green'
          )}
        >
          <span className='pl-4 truncate max-w-[200px]'>
            {label || 'Выберите файл'}
          </span>

          <input type='file' id={id} ref={ref} className='sr-only' {...props} />

          <div className='w-[70px] h-[42px] flex items-center justify-center bg-main-green shrink-0'>
            <ClipIcon />
          </div>
        </label>

        {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
      </div>
    );
  }
);

InputFile.displayName = 'InputFile';

export default InputFile;
