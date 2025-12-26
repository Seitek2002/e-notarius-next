import { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';

import Button from '../Button/button';

import QrIcon from '@assets/icons/table/qr-icon.svg';
import ShareIcon from '@assets/icons/table/share-icon.svg';

import './style.css';

type TProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export const QrPopover: FC<TProps> = ({ isOpen, setIsOpen }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={clsx('qr-popover', { open: isOpen })} ref={popoverRef}>
      <h2 className='mb-4'>Отсканируйте QR-код</h2>
      <center>
        <QrIcon />
      </center>
      <span className='font-semibold text-light-blue mt-2'>A5D75</span>
      <Button>
        <div className='flex items-center gap-2 text-[14px]'>
          Поделиться
          <ShareIcon />
        </div>
      </Button>
      <hr className='mt-4' />
      <button className='text-main-green py-3 font-semibold'>Подробнее</button>
      <br />
      <button
        onClick={() => setIsOpen(false)}
        className='text-light-blue py-3 font-semibold'
      >
        Закрыть
      </button>
    </div>
  );
};
