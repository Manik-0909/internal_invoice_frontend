import type { InputProps } from './Input.types';

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled = false,
  error,
  helperText,
  required = false,
  onChange,
  onBlur,
  fullWidth = false,
}) => {
  const inputId = id || name;

  const baseStyles =
    'block rounded-md border-0 py-2 px-3 text-neutral-900 shadow-sm ring-1 ring-inset placeholder:text-neutral-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-500';

  const errorStyles = error
    ? 'ring-red-300 focus:ring-red-500'
    : 'ring-neutral-300 focus:ring-primary-600';

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <div className={widthStyles}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium leading-6 text-neutral-900"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className={label ? 'mt-2' : ''}>
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          className={`${baseStyles} ${errorStyles} ${widthStyles}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${inputId}-error`}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-neutral-500" id={`${inputId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
