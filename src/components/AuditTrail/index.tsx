import SuccessIcon from '../../../public/static/img/icons/ic-success.svg';

const auditSteps = [
  {
    title: 'Invoice Uploaded',
    description: 'invoice_sample.pdf (638.5 KB)',
    status: 'complete',
  },
  {
    title: 'QR-Bill Detection',
    description: 'QR-bill detected and parsed',
    status: 'complete',
  },
  {
    title: 'Document Extraction',
    description: 'Extracted 5 line items',
    status: 'complete',
  },
  {
    title: 'Data Normalization',
    description: 'QR data override vendor info',
    status: 'complete',
  },
  {
    title: 'Validation',
    description: '5/5 validations passed',
    status: 'complete',
  },
  {
    title: 'Confidence Verification',
    description: 'Field confidence verified through validation rules',
    status: 'uncomplete',
  },
  {
    title: 'Status Determination',
    description: 'Ready for posting',
    status: 'uncomplete',
  },
];

export const AuditTrail = () => {
  return (
    <div className="max-w-md bg-white">
      <div className="relative">
        <div className="flex flex-col">
          {auditSteps.map((step, index) => {
            const isComplete = step.status === 'complete';
            const isLast = index === auditSteps.length - 1;

            return (
              <div key={index} className="relative flex items-start pb-8 pl-6">
                {!isLast && (
                  <div
                    className={`absolute top-2 left-1.5 h-full w-px sm:w-0.5 sm:-translate-px ${
                      isComplete ? 'bg-cyan-400' : 'bg-neutral-200'
                    }`}
                  />
                )}

                <div
                  className={`absolute top-0 left-0 z-10 flex h-3 w-3 shrink-0 items-center justify-center rounded-full ${
                    isComplete ? '' : 'border border-neutral-300 bg-neutral-50'
                  }`}
                >
                  {isComplete ? <img src={SuccessIcon} /> : <div />}
                </div>

                <div className="flex flex-col">
                  <h6
                    className={`text-sm leading-2.5 font-semibold ${
                      isComplete ? 'text-neutral-800' : 'text-neutral-500'
                    }`}
                  >
                    {step.title}
                  </h6>
                  <p className="mt-1.5 text-xs">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
