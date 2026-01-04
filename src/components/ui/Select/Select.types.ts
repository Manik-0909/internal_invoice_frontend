export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  warning?: string;
  helperText?: string;
  fullWidth?: boolean;
  hasToolTip?: boolean;
  toolTipId?: string;
  toolTipContent?: string;
  success?: boolean;
}
