import type { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  type = 'button',
  fullWidth = false,
}) => {
  const baseStyles =
    'flex items-center gap-1 cursor-pointer transition-all duration-300 ' +
    'focus:outline-none disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed';
  const variantStyles = {
    primary:
      'bg-linear-to-r from-primary-500 to-secondary-500 ' +
      'hover:from-primary-600 hover:to-secondary-600 ' +
      'text-black font-semibold tracking-wide',

    secondary:
      'border-2 border-transparent ' +
      'bg-[linear-gradient(#fff,#fff),linear-gradient(90deg,#72C2FD,#71F5BF)] ' +
      '[background-clip:padding-box,border-box] bg-origin-border ' +
      'hover:bg-[linear-gradient(90deg,#72C2FD,#71F5BF),linear-gradient(90deg,#72C2FD,#71F5BF)] ' +
      'hover:text-black font-semibold',
    tertiary:
      'bg-transparent text-neutral-600 font-semibold tracking-wide ' +
      'hover:text-black',
    danger: 'bg-error-light text-error hover:bg-red-700',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm rounded-sm',
    md: 'px-4 py-2 text-sm rounded-sm',
    lg: 'px-6 py-3 text-base rounded-md',
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles}`;

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <>
          {children}
          <span className="ml-2 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-[dot_1.4s_ease-in-out_infinite] rounded-full bg-black" />

            <span className="h-1.5 w-1.5 animate-[dot_1.4s_ease-in-out_0.2s_infinite] rounded-full bg-black" />

            <span className="h-1.5 w-1.5 animate-[dot_1.4s_ease-in-out_0.4s_infinite] rounded-full bg-black" />
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
