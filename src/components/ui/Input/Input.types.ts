export interface InputProps {
  id?: string;
  name?: string;
  label?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: string;
  warning?: string;
  helperText?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  readOnly?: boolean;
}
