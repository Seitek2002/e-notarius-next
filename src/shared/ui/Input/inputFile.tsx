import { FC } from 'react';
import Image from 'next/image';

import { TPropsInputFile } from '../types';

import clipIcon from '@/assets/icons/clip-icon.svg';

import './style.css';

const inputFile: FC<TPropsInputFile> = ({
  label = 'Выберите файл',
  error,
  ...props
}) => {
  const id = props.id ?? props.name;

  return (
    <label className='input-file' htmlFor={id}>
      <span>{label}</span>
      <input type='file' id={id} {...props} />
      <div className='input-file__icon'>
        <Image src={clipIcon} alt='clip-icon' />
      </div>
      {error && <p className='error'>{error}</p>}
    </label>
  );
};

export default inputFile;
