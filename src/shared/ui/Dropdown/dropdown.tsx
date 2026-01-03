'use client';

import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { TPropsDropdown } from '../types';

import DropdownArrow from '@assets/icons/dropdown/dropdown-arrow.svg';
import DropdownSearch from '@assets/icons/dropdown/dropdown-search.svg';

const Dropdown: FC<TPropsDropdown> = ({
  label,
  searchable,
  options,
  value,
  onChange,
  name,
  required,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(value ?? '');
  const [filtered, setFiltered] = useState(options);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) setIsOpen(true);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0) {
        onChange(filtered[highlightIndex]);
        setIsOpen(false);
      }
      return;
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value;
    setInputValue(v);

    const filt = options.filter((o) =>
      o.toLowerCase().includes(v.toLowerCase())
    );
    setFiltered(filt);

    setHighlightIndex(filt.length > 0 ? 0 : -1);
  }

  function handleOptionClick(option: string) {
    onChange(option);
    setInputValue(option);
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      setHighlightIndex(-1);
    }

    const newValue = value || '';
    if (inputValue !== newValue) {
      setInputValue(newValue);
    }

    setFiltered(options);

    const idx = value ? options.indexOf(value) : -1;
    if (highlightIndex !== idx) {
      setHighlightIndex(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
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
    <div className='text-[14px] text-light-blue relative' ref={dropdownRef}>
      {label && (
        <span>
          {label} {required && <sup className='text-red'>*</sup>}
        </span>
      )}
      <div
        className='flex justify-between items-center border border-main-green px-2.5'
        role='button'
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((s) => !s);
          }
        }}
      >
        {searchable ? (
          <div className='flex items-center w-full'>
            <DropdownSearch />
            <input
              type='text'
              value={inputValue || ''}
              onKeyDown={(e) => {
                e.stopPropagation();
                handleKeyDown(e);
              }}
              onChange={(e) => handleSearch(e)}
              placeholder={value ? '' : 'Поиск или выберите'}
              className='w-full py-3 px-2.5 outline-none'
            />
          </div>
        ) : (
          <span className='py-3 px-2.5'>{value || 'Выберите значение'}</span>
        )}
        <DropdownArrow
          className={clsx(
            'transition duration-200',
            isOpen ? 'rotate-180' : 'rotate-0'
          )}
        />
      </div>

      {/* Hidden input для отправки формы */}
      {name && <input type='hidden' name={name} value={value ?? ''} />}

      <ul
        className={clsx(
          'absolute w-full top-full z-10 bg-white overflow-y-auto transition-all duration-300',
          'max-h-0 border-main-green border-0',
          isOpen && 'max-h-52 border'
        )}
      >
        {filtered.length === 0 && (
          <li className='py-1.5 px-1 text-light-blue'>Ничего не найдено</li>
        )}
        {filtered.map((option, i) => (
          <li
            key={option}
            className={clsx(
              'py-1.5 px-1 cursor-pointer transition-colors duration-200',
              i === highlightIndex && 'bg-main-green text-white'
            )}
            onMouseEnter={() => setHighlightIndex(i)}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
