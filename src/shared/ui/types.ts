import { InputHTMLAttributes } from 'react';

type BaseFieldProps = {
  label?: string;
  error?: string;
};

type TPropsRadio = {
  label: string;
} & BaseFieldProps &
  InputHTMLAttributes<HTMLInputElement>;

type TPropsInput = BaseFieldProps & InputHTMLAttributes<HTMLInputElement>;

type TPropsDropdown = {
  label?: string;
  name?: string;
  options: string[];
  searchable?: boolean;
  value: string | null;
  onChange: (value: string) => void;
};

export type { TPropsRadio, TPropsInput, TPropsDropdown };
