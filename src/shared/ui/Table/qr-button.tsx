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
        className={clsx('qr-icon', { active: isOpen })}
      />
      <QrPopover isOpen={isOpen} setIsOpen={setIsOpen} QRvalue={value} />
    </div>
  );
};
