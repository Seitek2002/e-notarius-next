import { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { Checkbox } from '../Input';

type TPopover = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const Popover: FC<TPopover> = ({ isOpen, setIsOpen }) => {
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
        'absolute left-0 bottom-[-220px] min-w-full bg-white p-2.5 px-4 shadow-[0_10px_20px_0_#e9e9e9] z-10',
        { block: isOpen, hidden: !isOpen }
      )}
      ref={popoverRef}
    >
      <div className='text-[14px] font-normal max-h-[150px] overflow-y-auto'>
        <Checkbox label='Доверенность' name='Доверенность' />
        <Checkbox label='Договор' name='Договор' />
        <Checkbox label='Соглашение' name='Соглашение' />
        <Checkbox label='Завещание' name='Завещание' />
        <Checkbox label='Иск' name='Иск' />
        <Checkbox label='Хадатойство' name='Хадатойство' />
      </div>
      <button className='w-full py-3 text-main-green'>Готово</button>
    </div>
  );
};
