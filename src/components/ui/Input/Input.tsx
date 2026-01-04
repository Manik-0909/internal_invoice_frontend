import { forwardRef } from 'react';
import type { InputProps } from './Input.types';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = 'text',
      placeholder,
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
      success,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    const baseStyles =
      'mt-1 min-h-10 w-full rounded-sm border px-3 py-2.5 text-xs outline-0 read-only:bg-neutral-100';

    const stateStyles = error
      ? 'border-error ring-error/30 focus:ring-error'
      : success
        ? 'border-green-500 focus:ring-green-500'
        : warning
          ? 'border-warning ring-warning/30 focus:ring-warning'
          : 'border-neutral-200 focus:ring-primary-600';

    const widthStyles = fullWidth ? 'w-full' : '';

    return (
      <div className={widthStyles}>
        {label && (
          <label
            htmlFor={inputId}
            className="cursor-pointer text-xs font-semibold"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          {...props}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          className={`${baseStyles} ${stateStyles} ${widthStyles}`}
          aria-invalid={!!error}
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

        {error && (
          <p className="text-error mt-1 text-xs" id={`${inputId}-error`}>
            {error}
          </p>
        )}

        {!error && warning && (
          <p
            className="text-warning mt-1 text-xs tracking-wide"
            id={`${inputId}-warning`}
          >
            {warning}
          </p>
        )}

        {!error && !warning && helperText && (
          <p className="mt-2 text-sm text-neutral-500" id={`${inputId}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
