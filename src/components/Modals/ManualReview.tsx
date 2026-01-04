import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Modal from '../ui/Modal/Modal';
import ModalBody from '../ui/Modal/Modal.Body';
import ModalFooter from '../ui/Modal/Modal.Footer';
import { FlagReviewForm } from '@/types/invoices';

export const ManualReviewModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FlagReviewForm>({
    defaultValues: {
      reason: '',
      notes: '',
    },
  });
  const selectedReason = watch('reason');
  const onSubmitFlag = (data: FlagReviewForm) => {
    console.log(data);
  };
  return (
    <Modal
      id="flagReviewModal"
      title="Flag for Manual Review"
      description="This invoice requires manual processing outside the automated workflow."
    >
      <form onSubmit={handleSubmit(onSubmitFlag)}>
        <ModalBody>
          <h6 className="mb-2 text-sm font-semibold tracking-wide">
            Reason for flag
          </h6>

          <div className="space-y-2">
            {[
              { id: 'duplicate', label: 'Duplicate Invoice' },
              { id: 'missing', label: 'Missing Information' },
              { id: 'vendor', label: 'Vendor Issue' },
              { id: 'otherIssue', label: 'Lorem, ipsum dolor.' },
              { id: 'other', label: 'Other' },
            ].map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <input
                  type="radio"
                  id={item.id}
                  value={item.id}
                  {...register('reason', {
                    required: 'Please select a reason',
                  })}
                  className="h-3.5 w-3.5 accent-blue-500"
                />
                <label
                  className="cursor-pointer text-xs font-semibold"
                  htmlFor={item.id}
                >
                  {item.label}
                </label>
              </div>
            ))}

            {errors.reason && (
              <p className="text-error mt-1 text-xs">{errors.reason.message}</p>
            )}

            {/* Notes only when "Other" is selected */}
            {selectedReason === 'other' && (
              <div className="mt-3">
                <label className="text-xs font-semibold">
                  Notes <span className="text-red-500">*</span>
                </label>

                <textarea
                  {...register('notes', {
                    required: 'Notes are required when selecting Other',
                    minLength: {
                      value: 5,
                      message: 'Minimum 5 characters',
                    },
                  })}
                  className={`mt-1 min-h-20 w-full resize-none rounded-sm border px-3 py-2.5 text-xs outline-0 ${
                    errors.notes ? 'border-red-500' : 'border-neutral-200'
                  }`}
                />

                {errors.notes && (
                  <p className="text-error mt-1 text-xs">
                    {errors.notes.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="secondary" type="button" data-twe-modal-dismiss>
            Cancel
          </Button>

          <Button variant="primary" type="submit">
            Submit Flag
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
