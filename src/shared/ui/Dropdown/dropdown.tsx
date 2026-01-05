'use client';

import { FC, useEffect, useRef, useState, useMemo } from 'react';
import clsx from 'clsx';

import { DropdownProps } from '../types';

import DropdownArrow from '@assets/icons/dropdown/dropdown-arrow.svg';
import DropdownSearch from '@assets/icons/dropdown/dropdown-search.svg';

const Dropdown: FC<DropdownProps> = ({
  label,
  searchable,
  options,
  value,
  onChange,
  required,
  error, // Принимаем ошибку для красной рамки
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(''); // Текст поиска
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // 1. Оптимизация: Фильтруем список "на лету"
  // Если searchable выключен — показываем всё. Если включен — фильтруем.
  const filteredOptions = useMemo(() => {
    if (!searchable || !query) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query, searchable]);

  // 2. Синхронизация: Если value изменился снаружи (например, reset формы) — обновляем query
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(value || '');
  }, [value]);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        // Если закрыли и ничего не выбрали — сбрасываем поиск к текущему value
        setQuery(value || '');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const handleSelect = (option: string) => {
    onChange(option); // Сообщаем React Hook Form
    setQuery(option); // Обновляем инпут
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  return (
    <div
      className={clsx(
        'relative flex flex-col gap-1.5',
        'text-sm text-light-blue'
      )}
      ref={dropdownRef}
    >
      {label && (
        <span className='font-medium'>
          {label} {required && <span className='text-red-500'>*</span>}
        </span>
      )}

      <div
        className={clsx(
          'flex items-center justify-between border transition-all duration-200 cursor-pointer',
          'py-3 px-3', // Единый паддинг
          error
            ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-200'
            : 'border-main-green focus-within:ring-2 focus-within:ring-main-green/30'
        )}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {searchable ? (
          <div className='flex items-center gap-2 w-full overflow-hidden'>
            {/* Иконка поиска (опционально, если она нужна всегда) */}
            <div className='shrink-0 text-gray-400'>
              <DropdownSearch />
            </div>

            <input
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => {
                e.stopPropagation(); // ВАЖНО: Клик по инпуту не должен закрывать дропдаун
                setIsOpen(true);
              }}
              placeholder={value ? '' : 'Выберите значение'}
              className='w-full outline-none bg-transparent placeholder:text-gray-400'
            />
          </div>
        ) : (
          <span className={clsx(!value && 'text-gray-400')}>
            {value || 'Выберите значение'}
          </span>
        )}

        <div
          className={clsx(
            'shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        >
          <DropdownArrow />
        </div>
      </div>

      {/* Ошибка под дропдауном */}
      {error && (
        <span className='text-xs text-red-500 animate-fadeIn'>{error}</span>
      )}

      {/* Список опций */}
      {isOpen && (
        <ul
          className={clsx(
            'absolute top-full left-0 mt-1 w-full max-h-60 overflow-y-auto',
            'bg-white border border-gray-200 shadow-lg z-50',
            'animate-in fade-in zoom-in-95 duration-100' // Простая анимация появления
          )}
        >
          {filteredOptions.length === 0 ? (
            <li className='py-3 px-3 text-gray-400 text-center'>
              Ничего не найдено
            </li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={option}
                className={clsx(
                  'py-2.5 px-3 cursor-pointer transition-colors',
                  value === option
                    ? 'bg-main-green/10 text-main-green font-medium'
                    : 'hover:bg-gray-50',
                  highlightIndex === index && 'bg-gray-100'
                )}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
