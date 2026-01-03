import { Icon } from '@iconify/react';
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
              <div key={index} className="relative flex items-start pb-8 pl-10">
                {!isLast && (
                  <div
                    className={`absolute top-6 left-[11px] h-full w-0.5 ${
                      isComplete ? 'bg-cyan-400' : 'bg-neutral-200'
                    }`}
                  />
                )}

                {/* Dynamic Icon Container */}
                <div
                  className={`absolute top-0 left-0 z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    isComplete
                      ? 'border-cyan-400 bg-cyan-100'
                      : 'border-neutral-300 bg-neutral-50'
                  }`}
                >
                  {isComplete ? (
                    <img
                      src="/public/static/img/icons/ic-success.svg"
                      className="h-4 w-4"
                    />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-neutral-300" />
                  )}
                </div>

                <div className="flex flex-col">
                  <h3
                    className={`text-base leading-tight font-bold ${
                      isComplete ? 'text-neutral-800' : 'text-neutral-400'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
