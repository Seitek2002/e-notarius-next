type TPropsRadio = {
  label: string;
  name: string;
  errors?: string;
  value?: string;
};

type TPropsInput = {
  label: string;
  name: string;
  type?: 'text' | 'password' | 'email' | 'tel' | 'number';
  error?: string;
  placeholder?: string;
};

type TPropsDropdown = {
  label?: string;
  name?: string;
  options: string[];
  errors?: string;
  searchable?: boolean;
  value: string | null;
  onChange: (value: string) => void;
};

export type { TPropsRadio, TPropsInput, TPropsDropdown };
