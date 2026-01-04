import React from 'react';

type StatusVariant = 'success' | 'error' | 'warning' | 'processing';

interface StatusCardProps {
  variant: StatusVariant;
  title: string;
  description?: string;
  items?: string[]; // for error list
}

const VARIANT_CONFIG = {
  success: {
    container: 'bg-success-light border-success/10',
    iconBg: 'bg-success/15',
    title: 'text-success',
    icon: '/public/static/img/icons/ic-success-indicator.svg',
  },
  error: {
    container: 'bg-error-light border-error/10',
    iconBg: 'bg-error/15',
    title: 'text-error',
    icon: '/public/static/img/icons/ic-error-indicator.svg',
  },
  warning: {
    container: 'bg-warning-light border-warning/10',
    iconBg: 'bg-warning/15',
    title: 'text-warning',
    icon: '/public/static/img/icons/ic-warning-indicator.svg',
  },
  processing: {
    container: 'bg-primary-300 border-primary-600/10',
    iconBg: 'bg-primary-600/15',
    title: 'text-primary-600',
    icon: '/public/static/img/icons/ic-processing-indicator.svg',
  },
};

const StatusCard: React.FC<StatusCardProps> = ({
  variant,
  title,
  description,
  items,
}) => {
  const styles = VARIANT_CONFIG[variant];

  return (
    <div
      className={`my-8 flex items-start gap-2 rounded-xl border p-4 ${styles.container}`}
    >
      <div
        className={`grid h-9 w-9 place-items-center rounded-full ${styles.iconBg}`}
      >
        <img src={styles.icon} alt={`${variant} icon`} />
      </div>

      <div>
        <h6 className={`font-bold ${styles.title}`}>{title}</h6>

        {description && <p className="text-xs">{description}</p>}

        {items && items.length > 0 && (
          <ul className="list-disc ps-4 text-xs">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
