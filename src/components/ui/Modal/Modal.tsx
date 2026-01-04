import { Icon } from '@iconify/react';
import type { ModalProps } from './Modal.types';

const sizeStyles = {
  sm: 'min-[576px]:max-w-96',
  md: 'min-[576px]:max-w-160',
  lg: 'min-[576px]:max-w-200',
};

const Modal: React.FC<ModalProps> = ({
  id,
  title,
  description,
  children,
  staticBackdrop = true,
  disableKeyboard = true,

  size = 'md',
}) => {
  return (
    <div
      id={id}
      data-twe-modal-init
      data-twe-backdrop={staticBackdrop ? 'static' : undefined}
      data-twe-keyboard={disableKeyboard ? 'false' : undefined}
      className="fixed top-0 left-0 z-1055 hidden h-full w-full overflow-x-hidden overflow-y-auto outline-none"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      aria-hidden="true"
    >
      <div
        data-twe-modal-dialog-ref
        className={`pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto items-center px-5 opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] ${sizeStyles[size]} `}
      >
        <div className="shadow-4 pointer-events-auto relative flex w-full flex-col rounded-xl bg-white outline-none">
          {/* Header */}
          {(title || description) && (
            <div className="flex items-start justify-between p-4">
              <div>
                {title && (
                  <h5 className="text-base font-bold" id={`${id}-title`}>
                    {title}
                  </h5>
                )}

                {description && (
                  <p className="mt-1 text-xs text-neutral-500">{description}</p>
                )}
              </div>

              <button
                type="button"
                data-twe-modal-dismiss
                aria-label="Close"
                className="cursor-pointer opacity-50 transition-opacity hover:opacity-100"
              >
                <Icon icon="iconamoon:close-light" width={20} height={20} />
              </button>
            </div>
          )}

          {/* Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
