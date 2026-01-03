import { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';
import QRCode from 'react-qr-code';

import Button from '../Button/button';

import ShareIcon from '@assets/icons/table/share-icon.svg';

type TProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  QRvalue: string;
};

export const QrPopover: FC<TProps> = ({ isOpen, setIsOpen, QRvalue }) => {
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
    <div
      className={clsx(
        'absolute z-10 bg-white p-2.5 px-4 w-[200px] text-center text-[14px] ',
        'shadow-[0_10px_20px_0_#e9e9e9]',
        { block: isOpen, hidden: !isOpen }
      )}
      ref={popoverRef}
    >
      <h2 className='mb-4'>Отсканируйте QR-код</h2>
      <center>
        <QRCode value={QRvalue} className='size-[100px]' />
      </center>
      <span className='font-semibold text-light-blue mt-2'>{QRvalue}</span>
      <Button className='min-w-full'>
        <div className='flex items-center gap-2 text-[14px]'>
          Поделиться
          <ShareIcon />
        </div>
      </Button>
      <hr className='mt-4 border-[#efefef]' />
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
