import { ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// Общие пропсы для всех полей ввода
type BaseFieldProps = {
  label?: string;
  error?: string; // Теперь ошибка есть у всех
  className?: string; // Полезно добавить, чтобы стилизовать отступы снаружи
};

// INPUT
export type InputProps = BaseFieldProps & InputHTMLAttributes<HTMLInputElement>;

// INPUT FILE
export type InputFileProps = BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement>;

// CHECKBOX & RADIO
export type CheckboxProps = {
  label: string; // label обязателен для чекбокса
} & BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement>;

// DROPDOWN
export type DropdownOption = {
  value: string;
  label: string;
};

export type DropdownProps = BaseFieldProps & {
  name?: string;
  // Поддерживаем и массив строк, и массив объектов (на вырост)
  options: string[];
  searchable?: boolean;
  value: string | null;
  required?: boolean;
  // Возвращаем value, а не Event
  onChange: (value: string) => void;
};

// BUTTON
export type ButtonProps = {
  loading?: boolean;
  // variant?: 'primary' | 'secondary' | 'outline'; // Обычно добавляют варианты стилей
} & ButtonHTMLAttributes<HTMLButtonElement>;
