import { forwardRef } from 'react';
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip';
import type { SelectProps } from './Select.types';

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      name,
      label,
      options,
      defaultValue,
      disabled = false,
      required = false,
      error,
      warning,
      helperText,
      fullWidth = false,
      className = '',
      hasToolTip = false,
      toolTipId,
      toolTipContent,
      success,
      ...rest
    },
    ref
  ) => {
    const selectId = id || name;

    const baseStyles =
      'mt-1 min-h-10 w-full appearance-none rounded-sm border px-3 py-2.5 text-xs outline-0';

    const stateStyles = error
      ? 'border-red-500 focus:ring-red-500'
      : success
        ? 'border-green-500 focus:ring-green-500'
        : warning
          ? 'border-warning focus:ring-warning'
          : 'border-neutral-200 focus:ring-primary-600';

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        <div className={hasToolTip ? 'mb-1 flex items-center gap-2' : ''}>
          {label && (
            <label
              htmlFor={selectId}
              className="cursor-pointer text-xs font-semibold"
            >
              {label}
              {required && <span className="text-error ml-1">*</span>}
            </label>
          )}

          {hasToolTip && toolTipContent && toolTipId && (
            <>
              <Icon
                icon="material-symbols:info-outline-rounded"
                width="16"
                height="16"
                className="cursor-pointer text-neutral-500"
                data-tooltip-id={toolTipId}
                data-tooltip-content={toolTipContent}
              />
              <Tooltip
                id={toolTipId}
                className="font-manrope! rounded-sm! bg-neutral-800! px-3! py-2! text-xs! font-semibold!"
              />
            </>
          )}
        </div>

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            name={name}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
            className={`${baseStyles} ${stateStyles} ${className}`}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${selectId}-error`
                : warning
                  ? `${selectId}-warning`
                  : helperText
                    ? `${selectId}-helper`
                    : undefined
            }
            {...rest}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Icon
            icon="iconamoon:arrow-down-2-light"
            width="20"
            height="20"
            className="pointer-events-none absolute top-3.5 right-3 text-neutral-500"
          />
        </div>

        {error && (
          <p className="text-error mt-1 text-xs" id={`${selectId}-error`}>
            {error}
          </p>
        )}

        {!error && warning && (
          <p
            className="text-warning mt-1 text-xs tracking-wide"
            id={`${selectId}-warning`}
          >
            {warning}
          </p>
        )}

        {!error && !warning && helperText && (
          <p
            className="mt-2 text-sm text-neutral-500"
            id={`${selectId}-helper`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
