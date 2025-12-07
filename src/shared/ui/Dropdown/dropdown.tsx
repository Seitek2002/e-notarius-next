'use client';

import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import { TPropsDropdown } from '../types';

import dropdownArrow from '@/assets/icons/dropdown-arrow.svg';
import dropdownSearch from '@/assets/icons/dropdown-search.svg';

import './style.css';

const Dropdown: FC<TPropsDropdown> = ({
  label,
  searchable,
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) {
      setIsOpen(true);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) =>
        Math.min(prev + 1, filteredOptions.length - 1)
      );
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0) {
        onChange(filteredOptions[highlightIndex]);
        setIsOpen(false);
      }
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredBySearchOptions = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );

    console.log(filteredBySearchOptions);
    setFilteredOptions(filteredBySearchOptions);
  };

  useEffect(() => {
    if (isOpen && value) {
      const index = filteredOptions.indexOf(value);
      setHighlightIndex(index);
    } else if (!isOpen) {
      setHighlightIndex(-1);
    }
  }, [isOpen, value, filteredOptions]);

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
      <span>{label}</span>
      <div className='dropdown-top' onClick={() => setIsOpen(true)}>
        {searchable ? (
          <>
            <Image src={dropdownSearch} alt='' />
            <input
              type='text'
              value={value || ''}
              onKeyDown={handleKeyDown}
              onChange={(e) => handleSearch(e)}
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
      <ul className={`dropdown-list ${isOpen ? 'active' : ''}`}>
        {filteredOptions.map((option, i) => (
          <li
            key={option}
            className={highlightIndex === i ? 'active' : ''}
            onClick={() => {
              onChange(option); // ← Логика выбора
              setIsOpen(false);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
