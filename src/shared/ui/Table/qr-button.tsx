'use client';

import { FC, useState } from 'react';
// import Image from 'next/image';

import { QrPopover } from './qr-popover';

import QrIcon from '@assets/icons/table/qr-icon.svg';
import clsx from 'clsx';

type TProps = {
  src: string;
};

export const QrButton: FC<TProps> = ({ src }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='relative'>
      <QrIcon
        onClick={() => setIsOpen(true)}
        className={clsx('qr-icon', { active: isOpen })}
      />
      <QrPopover isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
