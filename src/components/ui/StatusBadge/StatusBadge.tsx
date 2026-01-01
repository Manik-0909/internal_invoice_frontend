import type { StatusBadgeProps } from './StatusBadge.types';

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  size = 'md',
}) => {
  const baseStyles =
    'inline-flex items-center rounded-full font-medium ring-1 ring-inset';

  const statusStyles = {
    success: 'bg-green-50 text-green-700 ring-green-600/20',
    warning: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    error: 'bg-red-50 text-red-700 ring-red-600/20',
    info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
    neutral: 'bg-neutral-50 text-neutral-600 ring-neutral-500/20',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  const classes = `${baseStyles} ${statusStyles[status]} ${sizeStyles[size]}`;

  return <span className={classes}>{children}</span>;
};

export default StatusBadge;
