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
  warning,
  helperText,
  required = false,
  onChange,
  onBlur,
  fullWidth = false,
  readOnly = false,
}) => {
  const inputId = id || name;

  const baseStyles =
    'mt-1 min-h-10 w-full rounded-sm border border-neutral-200 px-3 py-2.5 text-xs outline-0 read-only:bg-neutral-100';
  const stateStyles = error
    ? 'border-red-500 ring-red-300 focus:ring-red-500'
    : warning
      ? 'border-warning ring-warning/30 focus:ring-warning'
      : 'ring-neutral-300 focus:ring-primary-600';

  const widthStyles = fullWidth ? 'w-full' : '';
  return (
    <div className={widthStyles}>
      {label && (
        <label
          htmlFor={inputId}
          className="cursor-pointer text-xs font-semibold"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div>
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          readOnly={readOnly}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          className={`${baseStyles} ${stateStyles} ${widthStyles}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${inputId}-error`
              : warning
                ? `${inputId}-warning`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
          }
        />
      </div>
      {error && (
        <p className="text-error mt-1 text-xs" id={`${inputId}-error`}>
          {error}
        </p>
      )}
      {warning && !error && (
        <p
          className="text-warning mt-1 text-xs tracking-wide"
          id={`${inputId}-warning`}
        >
          {warning}
        </p>
      )}

      {helperText && !error && !warning && (
        <p className="mt-2 text-sm text-neutral-500" id={`${inputId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
