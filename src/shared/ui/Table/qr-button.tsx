'use client';

import { FC, useState } from 'react';
import clsx from 'clsx';

import { QrPopover } from './qr-popover';

import QrIcon from '@assets/icons/table/qr-icon.svg';

type TProps = {
  value: string;
};

export const QrButton: FC<TProps> = ({ value }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <QrIcon
        onClick={() => setIsOpen(true)}
        className={clsx(
          'cursor-pointer',
          // default stroke from SVG is dark-blue; when open, override to main green via arbitrary property
          isOpen && '[&_path]:stroke-[#1BAA75]'
        )}
      />
      <QrPopover isOpen={isOpen} setIsOpen={setIsOpen} QRvalue={value} />
    </div>
  );
};
