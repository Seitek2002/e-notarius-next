import { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { Checkbox } from '../Input';

import './style.css';

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
    <div className={clsx('table-popover', { open: isOpen })} ref={popoverRef}>
      <div className='table-popover__content'>
        <Checkbox label='Доверенность' name='Доверенность' />
        <Checkbox label='Договор' name='Договор' />
        <Checkbox label='Соглашение' name='Соглашение' />
        <Checkbox label='Завещание' name='Завещание' />
        <Checkbox label='Иск' name='Иск' />
        <Checkbox label='Хадатойство' name='Хадатойство' />
      </div>
      <button>Готово</button>
    </div>
  );
};
