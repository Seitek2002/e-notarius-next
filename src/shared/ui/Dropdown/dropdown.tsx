'use client';

import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { TPropsDropdown } from '../types';

import dropdownArrow from '@assets/icons/dropdown/dropdown-arrow.svg';
import dropdownSearch from '@assets/icons/dropdown/dropdown-search.svg';

import './style.css';

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
    <div className='dropdown' ref={dropdownRef}>
      {label && (
        <span>
          {label} {required && <sup style={{ color: 'red' }}>*</sup>}
        </span>
      )}
      <div
        className='dropdown-top'
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
          <>
            <Image src={dropdownSearch} alt='' />
            <input
              type='text'
              value={inputValue || ''}
              onKeyDown={(e) => {
                e.stopPropagation();
                handleKeyDown(e);
              }}
              onChange={(e) => handleSearch(e)}
              placeholder={value ? '' : 'Поиск или выберите'}
            />
          </>
        ) : (
          <span>{value || 'Выберите значение'}</span>
        )}
        <Image
          src={dropdownArrow}
          className={isOpen ? 'active' : ''}
          alt='dropdown-arrow'
        />
      </div>

      {/* Hidden input для отправки формы */}
      {name && <input type='hidden' name={name} value={value ?? ''} />}

      <ul className={clsx('dropdown-list', { active: isOpen })}>
        {filtered.length === 0 && <li className='empty'>Ничего не найдено</li>}
        {filtered.map((option, i) => (
          <li
            key={option}
            className={highlightIndex === i ? 'active' : ''}
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
