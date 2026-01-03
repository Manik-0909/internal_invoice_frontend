import Logo from '../../../public/static/img/full-logo.png';
import SuccessIndicator from '../../../public/static/img/icons/ic-success-indicator.svg';
import { Icon } from '@iconify/react';
import RotateIcon from '../../../public/static/img/icons/ic-rotate.svg';
import ZoomInIcon from '../../../public/static/img/icons/ic-zoom-in.svg';
import ZoomOutIcon from '../../../public/static/img/icons/ic-zoom-out.svg';
// import ErrorIndicator from '../../../public/static/img/icons/ic-error-indicator.svg';
// import WarningIndicator from '../../../public/static/img/icons/ic-warning-indicator.svg';
// import ProcessIndicator from '../../../public/static/img/icons/ic-processing-indicator.svg';
import ProgressBar from '@/components/progressBar';
const appStyles = {
  height: 5,
  width: 256,
  // margin: 50,
};

const Invoices: React.FC = () => {
  return (
    <div className="bg-gradient-effect min-h-screen">
      {/* Header Section Start */}
      <header className="border-b border-neutral-200 bg-white px-5 py-5 md:px-10">
        <div className="container-max-w mx-auto flex items-center justify-between gap-10">
          <a href="#" className="block w-fit">
            <img
              src={Logo}
              alt="Numois Logo"
              className="max-h-10"
              loading="lazy"
            />
          </a>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1">
              <Icon
                icon="mynaui:credit-card"
                width="20"
                height="20"
                className="text-neutral-800"
              />
              <p className="text-sm font-semibold tracking-wide text-nowrap">
                Credits: <span>49</span>
              </p>
            </div>

            <div className="relative" data-twe-dropdown-ref>
              <button
                className="bg-secondary-300 font-sora min-h-10 min-w-10 cursor-pointer rounded-full text-sm font-bold"
                type="button"
                id="profileDropdownButton"
                data-twe-dropdown-toggle-ref
                aria-expanded="false"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                DS
              </button>
              <ul
                className="absolute z-1000 float-left m-0 hidden w-40 list-none overflow-hidden rounded-lg border border-neutral-200 bg-white bg-clip-padding py-1 text-base shadow-lg data-[twe-dropdown-show]:block"
                aria-labelledby="profileDropdownButton"
                data-twe-dropdown-menu-ref
              >
                <li>
                  <a
                    className="hover:bg-secondary-200 flex w-full items-center gap-1 border-t border-transparent px-4 py-2 text-xs font-semibold no-underline duration-150 hover:border-neutral-200"
                    href="#"
                    data-twe-dropdown-item-ref
                  >
                    <Icon icon="solar:user-linear" width="16" height="16" />
                    Profile
                  </a>
                </li>

                <li>
                  <a
                    className="hover:bg-secondary-200 flex w-full items-center gap-1 border-t border-transparent px-4 py-2 text-xs font-semibold no-underline duration-150 hover:border-neutral-200"
                    href="#"
                    data-twe-dropdown-item-ref
                  >
                    <Icon icon="hugeicons:setting-07" width="16" height="16" />
                    Settings
                  </a>
                </li>

                <hr className="border-neutral-200" />

                <li>
                  <a
                    className="hover:bg-secondary-200 flex w-full items-center gap-1 px-4 py-2 text-xs font-semibold no-underline duration-150"
                    href="#"
                    data-twe-dropdown-item-ref
                  >
                    <Icon icon="humbleicons:logout" width="16" height="16" />
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      {/* Header Section End */}

      {/* Invoice Batches Screen Start */}
      <section className="mx-5 md:mx-10">
        <div className="container-max-w mx-auto mt-10 justify-between gap-10 rounded-xl border border-neutral-200 bg-white p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center md:gap-5">
            <div>
              <h5 className="font-manrope text-lg font-bold">
                Batch B-1038 : Invoice #002891
              </h5>

              <p className="text-sm text-neutral-500">
                Reviewing all invoices in this batch
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">Invoice 3 of 12</p>
              <div className="App" style={appStyles}>
                <ProgressBar
                  bgGradientColor={'#71F5BF'}
                  // 71F5BF , 72C2FD
                  progress={20}
                />
              </div>
            </div>
          </div>

          {/* Status Banner Start */}
          {/* Success */}
          <div className="bg-success-light border-success/10 my-8 flex items-start gap-2 rounded-xl border p-4">
            <div className="bg-success/15 grid h-9 w-9 place-items-center rounded-full">
              <img src={SuccessIndicator} alt="Success Icon" />
            </div>
            <div>
              <h6 className="text-success font-bold">Ready for approval</h6>
              <p className="text-xs">All fields verified, no issues found</p>
            </div>
          </div>
          {/* Error */}
          {/* <div className="bg-error-light border-success/10 my-8 flex items-start gap-2 rounded-xl border p-4">
          <div className="bg-error/15 grid h-9 w-9 place-items-center rounded-full">
            <img src={ErrorIndicator} alt="Error Icon" />
          </div>
          <div>
            <h6 className="text-error font-bold">
              {' '}
              Cannot approve: 2 issues must be fixed
            </h6>
            <ul className="list-disc ps-4 text-xs">
              <li>Invoice total mismatch (CHF 1.25)</li>
              <li>Due date must be after invoice date</li>
            </ul>
          </div>
        </div> */}

          {/* Warning */}
          {/* <div className="bg-warning-light border-warning/10 my-8 flex items-start gap-2 rounded-xl border p-4">
          <div className="bg-warning/15 grid h-9 w-9 place-items-center rounded-full">
            <img src={WarningIndicator} alt="Warning Icon" />
          </div>
          <div>
            <h6 className="text-warning font-bold">3 fields need review</h6>
            <p className="text-xs">
              Review recommended fields before approving
            </p>
          </div>
        </div> */}

          {/* Processing */}
          {/* <div className="bg-primary-300 border-primary-600/10 my-8 flex items-start gap-2 rounded-xl border p-4">
          <div className="bg-primary-600/15 grid h-9 w-9 place-items-center rounded-full">
            <img src={ProcessIndicator} alt="Processing Icon" />
          </div>
          <div>
            <h6 className="text-primary-600 font-bold">
              Validating invoice...
            </h6>
            <p className="text-xs">
              Please wait while we verify your changes
            </p>
          </div>
        </div> */}
          {/* Status Banner End */}

          {/* Invoive Preview/Edit Section Start */}
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2 rounded-sm border border-neutral-200 px-6 py-4">
              <div className="rounded-md bg-neutral-200 p-6 text-center">
                pdf here
              </div>

              <div className="mt-4 flex items-center justify-between gap-10 py-2">
                <div className="flex items-center gap-1">
                  <button type="button" className="cursor-pointer">
                    <Icon
                      icon="iconamoon:arrow-left-2-light"
                      width="20"
                      height="20"
                      className="text-neutral-300"
                    />
                  </button>
                  <div className="text-xs font-semibold tracking-wide text-neutral-600">
                    Page <span>1/3</span>
                  </div>
                  <button type="button" className="cursor-pointer">
                    <Icon
                      icon="iconamoon:arrow-right-2-light"
                      width="20"
                      height="20"
                    />
                  </button>
                </div>

                <button type="button" className="cursor-pointer">
                  <img src={RotateIcon} alt="Rotate Icon" />
                </button>

                <div className="flex items-center gap-3">
                  <button type="button" className="cursor-pointer">
                    <img src={ZoomInIcon} alt="Zoom In Icon" />
                  </button>

                  <button type="button" className="cursor-pointer">
                    <img src={ZoomOutIcon} alt="Zoom Out Icon" />
                  </button>
                </div>
              </div>
            </div>

            <div className="col-span-3 rounded-sm border border-neutral-200 pt-6"></div>
          </div>
          {/* Invoive Preview/Edit Section End */}
        </div>
      </section>
      {/* Invoice Batches Screen End */}
    </div>
  );
};

export default Invoices;
