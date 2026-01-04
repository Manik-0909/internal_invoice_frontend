import SuccessIndicator from '../../../public/static/img/icons/ic-success-indicator.svg';
import { Icon } from '@iconify/react';
import RotateIcon from '../../../public/static/img/icons/ic-rotate.svg';
import ZoomInIcon from '../../../public/static/img/icons/ic-zoom-in.svg';
import ZoomOutIcon from '../../../public/static/img/icons/ic-zoom-out.svg';
// import ErrorIndicator from '../../../public/static/img/icons/ic-error-indicator.svg';
// import WarningIndicator from '../../../public/static/img/icons/ic-warning-indicator.svg';
// import ProcessIndicator from '../../../public/static/img/icons/ic-processing-indicator.svg';
import CollapseIcon from '../../../public/static/img/icons/ic-collapse.svg';
import { Tooltip } from 'react-tooltip';

import ProgressBar from '@/components/progressBar';
import { Worker, Viewer, ViewMode } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { InvoicesProps } from '@/types/invoices';
import { AuditTrail } from '@/components/AuditTrail';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const appStyles = {
  height: 5,
  width: 256,
  // margin: 50,
};

const Invoices = ({ fileUrl }: InvoicesProps): React.ReactNode => {
  const zoomPluginInstance = zoomPlugin();
  const rotatePluginInstance = rotatePlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const { ZoomIn, ZoomOut } = zoomPluginInstance;
  const { Rotate } = rotatePluginInstance;
  const { CurrentPageLabel, GoToNextPage, GoToPreviousPage, NumberOfPages } =
    pageNavigationPluginInstance;

  if (!fileUrl) return <div>Invalid PDF URL</div>;
  return (
    <div className="bg-gradient-effect min-h-screen">
      {/* Invoice Batches Screen Start */}
      <section className="mx-4 md:mx-10">
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
              <p className="mb-1 text-sm font-semibold">Invoice 3 of 12</p>
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
          <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            <div className="rounded-sm border border-neutral-200 px-6 py-4 md:sticky md:top-28 lg:col-span-2">
              <div className="rounded-md bg-neutral-200 p-6 text-center">
                <div
                  style={{ height: '600px', overflow: 'hidden' }}
                  className="rounded-md bg-neutral-200"
                >
                  <Worker workerUrl="/node_modules/pdfjs-dist/build/pdf.worker.min.js">
                    <Viewer
                      key={fileUrl}
                      fileUrl={fileUrl}
                      viewMode={ViewMode.SinglePage}
                      initialPage={0}
                      defaultScale={0.7}
                      plugins={[
                        zoomPluginInstance,
                        rotatePluginInstance,
                        pageNavigationPluginInstance,
                      ]}
                    />
                  </Worker>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-10 py-2">
                <div className="flex items-center gap-1">
                  <GoToPreviousPage>
                    {(props) => (
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={props.onClick}
                        disabled={props.isDisabled}
                      >
                        <Icon
                          icon="iconamoon:arrow-left-2-light"
                          width="20"
                          height="20"
                          className={
                            props.isDisabled
                              ? 'text-neutral-300'
                              : 'text-neutral-800'
                          }
                        />
                      </button>
                    )}
                  </GoToPreviousPage>
                  <div className="text-xs font-semibold tracking-wide text-neutral-600">
                    Page {''}
                    <span>
                      <CurrentPageLabel />
                      /<NumberOfPages />
                    </span>
                  </div>
                  <GoToNextPage>
                    {(props) => (
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={props.onClick}
                        disabled={props.isDisabled}
                      >
                        <Icon
                          icon="iconamoon:arrow-right-2-light"
                          width="20"
                          height="20"
                          className={
                            props.isDisabled
                              ? 'text-neutral-300'
                              : 'text-neutral-800'
                          }
                        />
                      </button>
                    )}
                  </GoToNextPage>
                </div>
                <Rotate>
                  {(renderProps) => (
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={renderProps.onClick}
                    >
                      <img src={RotateIcon} alt="Rotate Icon" />
                    </button>
                  )}
                </Rotate>
                <div className="flex items-center gap-3">
                  <ZoomIn>
                    {(props) => (
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={props.onClick}
                      >
                        <img src={ZoomInIcon} alt="Zoom In Icon" />
                      </button>
                    )}
                  </ZoomIn>

                  <ZoomOut>
                    {(props) => (
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={props.onClick}
                      >
                        <img src={ZoomOutIcon} alt="Zoom Out Icon" />
                      </button>
                    )}
                  </ZoomOut>
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-b-0 border-neutral-200 pt-6 lg:col-span-3">
              <div id="focusAccordion">
                <div className="border-b border-neutral-200 pb-6">
                  <h2 className="mb-0" id="headingOne">
                    <button
                      className="group [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b relative flex w-full cursor-pointer items-center border-0 px-6 text-base font-semibold transition [overflow-anchor:none] hover:z-2 focus:z-3 focus:outline-none [&:not([data-twe-collapse-collapsed])]:bg-white"
                      type="button"
                      data-twe-collapse-init
                      data-twe-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Invoice Details
                      <span className="ms-auto transition-transform duration-200 ease-in-out group-data-twe-collapse-collapsed:-rotate-180 motion-reduce:transition-none">
                        <img src={CollapseIcon} alt="Collapse Icon" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="visible!"
                    data-twe-collapse-item
                    data-twe-collapse-show
                    aria-labelledby="headingOne"
                  >
                    <div className="px-4 pt-4 sm:px-6">
                      <div className="grid gap-x-3 gap-y-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                        <div>
                          <Input
                            label=" Vendor Name"
                            error="PAN format looks unusual"
                          />
                        </div>

                        <div>
                          <Input
                            label="Invoice Number"
                            placeholder="XXXXXXXXXX"
                            warning="PAN format looks unusual"
                            helperText="Enter a valid PAN"
                          />
                        </div>

                        <div>
                          <Input label="Invoice Date" type="date" />
                        </div>

                        <div>
                          <Input label="Due Date" type="date" />
                        </div>

                        <div>
                          <label
                            htmlFor="currency"
                            className="cursor-pointer text-xs font-semibold"
                          >
                            Currency
                          </label>
                          <div className="relative">
                            <select
                              name="currency"
                              id="currency"
                              className="focus-within:border-success mt-1 min-h-10 w-full appearance-none rounded-sm border border-neutral-200 px-3 py-2.5 text-xs outline-0"
                            >
                              <option value="select">Select</option>
                              <option value="a">A</option>
                              <option value="b">B</option>
                            </select>

                            <Icon
                              icon="iconamoon:arrow-down-2-light"
                              width="20"
                              height="20"
                              className="absolute top-3.5 right-3"
                            />
                          </div>
                        </div>

                        <div>
                          <Input
                            label="Payment Reference"
                            placeholder="XXXXXXXXXXXXXXX"
                          />
                        </div>

                        <div>
                          <Input label="IBAN" placeholder="XXXXXXXXXXXXXXX" />
                        </div>

                        <div>
                          <Input
                            label="Tax ID"
                            placeholder="XXXXXXXXXXXXXXX"
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-neutral-200 p-6">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <label
                        htmlFor="expenseClassification"
                        className="cursor-pointer text-xs font-semibold"
                      >
                        Expense Classification
                      </label>
                      <Icon
                        icon="material-symbols:info-outline-rounded"
                        width="16"
                        height="16"
                        className="cursor-pointer text-neutral-500"
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Must be unique per vendor"
                      />
                      <Tooltip
                        id="my-tooltip"
                        className="font-manrope! rounded-sm! bg-neutral-800! px-3! py-2! text-xs! font-semibold!"
                      />
                    </div>

                    <div className="relative">
                      <select
                        name="expenseClassification"
                        id="expenseClassification"
                        className="focus-within:border-success mt-1 min-h-10 w-full appearance-none rounded-sm border border-neutral-200 px-3 py-2.5 text-xs outline-0"
                      >
                        <option value="select">Select</option>
                        <option value="officeSupplies">
                          6000 — Office Supplies
                        </option>
                      </select>

                      <Icon
                        icon="iconamoon:arrow-down-2-light"
                        width="20"
                        height="20"
                        className="absolute top-3.5 right-3"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b border-neutral-200 py-6">
                  <h2 className="mb-0" id="headingTwo">
                    <button
                      className="group [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b relative flex w-full cursor-pointer items-center border-0 px-6 text-base font-semibold transition [overflow-anchor:none] hover:z-2 focus:z-3 focus:outline-none [&:not([data-twe-collapse-collapsed])]:bg-white"
                      type="button"
                      data-twe-collapse-init
                      // data-twe-collapse-collapsed
                      data-twe-target="#collapseTwo"
                      aria-expanded="true"
                      // aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Line Items
                      <span className="ms-auto transition-transform duration-200 ease-in-out group-data-twe-collapse-collapsed:-rotate-180 motion-reduce:transition-none">
                        <img src={CollapseIcon} alt="Collapse Icon" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    // hidden
                    className="visible!"
                    data-twe-collapse-item
                    // data-twe-collapse-show
                    data-twe-collapse-show
                    aria-labelledby="headingTwo"
                  >
                    <div className="px-4 pt-4 sm:px-6">
                      <strong>This is the second item's accordion body.</strong>{' '}
                      It is hidden by default, until the collapse plugin adds
                      the appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>

                <div className="border-b border-neutral-200 py-6">
                  <h2 className="mb-0" id="headingThree">
                    <button
                      className="group [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b relative flex w-full cursor-pointer items-center border-0 px-6 text-base font-semibold transition [overflow-anchor:none] hover:z-2 focus:z-3 focus:outline-none [&:not([data-twe-collapse-collapsed])]:bg-white"
                      type="button"
                      data-twe-collapse-init
                      // data-twe-collapse-collapsed
                      data-twe-target="#collapseThree"
                      aria-expanded="true"
                      // aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Totals
                      <span className="ms-auto transition-transform duration-200 ease-in-out group-data-twe-collapse-collapsed:-rotate-180 motion-reduce:transition-none">
                        <img src={CollapseIcon} alt="Collapse Icon" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    // hidden
                    className="visible!"
                    data-twe-collapse-item
                    // data-twe-collapse-show
                    data-twe-collapse-show
                    aria-labelledby="headingThree"
                  >
                    <div className="px-4 pt-4 sm:px-6">
                      <div className="flex flex-col rounded-xl border border-neutral-200">
                        <div className="overflow-x-auto">
                          <div className="inline-block min-w-full p-4 sm:p-6">
                            <div className="overflow-hidden">
                              <table className="text-surface min-w-full">
                                <thead className="border-b border-neutral-200">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="pb-2 text-left text-sm font-semibold tracking-wide whitespace-nowrap"
                                    >
                                      Sub Total
                                    </th>
                                    <th
                                      scope="col"
                                      className="pb-2 text-sm font-semibold tracking-wide"
                                    >
                                      <div className="flex items-center justify-end gap-2 sm:gap-5">
                                        <span className="text-left text-sm font-semibold">
                                          CHF
                                        </span>

                                        <span className="min-w-18 text-right">
                                          11111111
                                        </span>
                                      </div>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="py-2 text-left text-sm whitespace-nowrap">
                                      VAT (7.7%)
                                    </td>
                                    <td className="py-2 text-sm font-semibold">
                                      <div className="flex items-center justify-end gap-2 sm:gap-5">
                                        <span className="text-left text-sm font-semibold">
                                          CHF
                                        </span>

                                        <span className="min-w-18 text-right">
                                          1,112525.00
                                        </span>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr className="border-t border-neutral-200 px-4 sm:px-6">
                                    <td className="py-2 text-left text-sm whitespace-nowrap">
                                      VAT (2.5%)
                                    </td>
                                    <td className="py-2 text-sm font-semibold">
                                      <div className="flex items-center justify-end gap-2 sm:gap-5">
                                        <span className="text-left text-sm font-semibold">
                                          CHF
                                        </span>

                                        <span className="min-w-18 text-right">
                                          1,112525.00
                                        </span>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr className="border-t border-neutral-200">
                                    <td className="py-2 text-left text-sm whitespace-nowrap">
                                      Shpping
                                    </td>
                                    <td className="py-2 text-sm font-semibold">
                                      <div className="flex items-center justify-end gap-2 sm:gap-5">
                                        <span className="text-left text-sm font-semibold">
                                          CHF
                                        </span>

                                        <span className="min-w-18 text-right">
                                          1,112525.00
                                        </span>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr className="border-t border-neutral-200">
                                    <td className="py-2 text-left text-sm whitespace-nowrap">
                                      Discount
                                    </td>
                                    <td className="border-t border-neutral-200 py-2 text-sm font-semibold">
                                      <div className="flex items-center justify-end gap-2 sm:gap-5">
                                        <span className="text-left text-sm font-semibold">
                                          CHF
                                        </span>

                                        <span className="min-w-18 text-right">
                                          1,112525.00
                                        </span>
                                      </div>
                                    </td>
                                  </tr>

                                  {/* Class for Needs Review bg-warning-light */}
                                  {/* Class for Failed bg-error-light */}
                                  <tr className="border-t border-neutral-200">
                                    <td className="py-2 text-left text-sm font-bold whitespace-nowrap">
                                      Total
                                    </td>
                                    <td className="py-2 text-sm font-semibold">
                                      <div className="flex items-center justify-end gap-2 sm:gap-5">
                                        <span className="flex items-center gap-2 text-left text-sm font-semibold">
                                          <Icon
                                            icon="charm:tick"
                                            width="16"
                                            height="16"
                                            className="text-success"
                                          />
                                          {/* Icon for need review */}
                                          {/* <Icon
                                            icon="clarity:warning-line"
                                            width="16px"
                                            height="16px"
                                            className="text-warning"
                                          /> */}
                                          {/* Icon for failed */}
                                          {/* <Icon
                                            icon="iconamoon:close-light"
                                            width="16px"
                                            height="16px"
                                            className="text-error"
                                          /> */}
                                          CHF
                                        </span>

                                        <span className="min-w-18 text-right">
                                          1,112525.00
                                        </span>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr className="border-t border-transparent">
                                    <td className="py-2 text-left text-sm whitespace-nowrap">
                                      Extracted
                                    </td>
                                    <td className="border-t border-transparent py-2 text-sm font-semibold">
                                      {/* Class for failed text-error */}
                                      <div className="text-warning flex items-center justify-end gap-2 sm:gap-5">
                                        <span className="text-left text-sm font-semibold">
                                          CHF
                                        </span>

                                        <span className="min-w-18 text-right">
                                          1,112525.00
                                        </span>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr className="border-t border-transparent">
                                    <td className="py-2 text-left text-sm whitespace-nowrap">
                                      Difference
                                    </td>
                                    <td className="border-t border-transparent py-2 text-sm font-semibold">
                                      <div className="flex items-center justify-end gap-2 sm:gap-5">
                                        <span className="text-left text-sm font-semibold">
                                          CHF
                                        </span>

                                        <span className="min-w-18 text-right">
                                          1,112525.00
                                        </span>
                                      </div>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td colSpan={2}>
                                      <div className="text-error mt-2 flex items-start gap-1 text-xs font-medium">
                                        <Icon
                                          icon="clarity:warning-line"
                                          width="16px"
                                          height="16px"
                                          className="text-error min-h-4 min-w-4"
                                        />
                                        Total does not match invoice amount.
                                        Please review line items before
                                        approval.
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-neutral-200 py-6">
                  <h2 className="mb-0" id="headingFour">
                    <button
                      className="group [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b relative flex w-full cursor-pointer items-center border-0 px-6 text-base font-semibold capitalize transition [overflow-anchor:none] hover:z-2 focus:z-3 focus:outline-none [&:not([data-twe-collapse-collapsed])]:bg-white"
                      type="button"
                      data-twe-collapse-init
                      // data-twe-collapse-collapsed
                      data-twe-target="#collapseFour"
                      aria-expanded="true"
                      // aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      All validations passed
                      <span className="ms-auto transition-transform duration-200 ease-in-out group-data-twe-collapse-collapsed:-rotate-180 motion-reduce:transition-none">
                        <img src={CollapseIcon} alt="Collapse Icon" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    // hidden
                    className="visible!"
                    data-twe-collapse-item
                    // data-twe-collapse-show
                    data-twe-collapse-show
                    aria-labelledby="headingFour"
                  >
                    <div className="px-4 pt-4 sm:px-6">
                      <ul className="space-y-2 text-xs">
                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          All required fields present
                        </li>

                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Invoice total matches calculated (within tolerance)
                        </li>

                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Tax calculations correct
                        </li>

                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Date fields valid and logical
                        </li>

                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Field formats valid (IBAN, Tax ID)
                        </li>
                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Business rules (duplicates, thresholds)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-b border-neutral-200 py-6">
                  <h2 className="mb-0" id="headingFive">
                    <button
                      className="group [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b relative flex w-full cursor-pointer items-center border-0 px-6 text-base font-semibold capitalize transition [overflow-anchor:none] hover:z-2 focus:z-3 focus:outline-none [&:not([data-twe-collapse-collapsed])]:bg-white"
                      type="button"
                      data-twe-collapse-init
                      // data-twe-collapse-collapsed
                      data-twe-target="#collapseFive"
                      aria-expanded="true"
                      // aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Analysis
                      <span className="ms-auto transition-transform duration-200 ease-in-out group-data-twe-collapse-collapsed:-rotate-180 motion-reduce:transition-none">
                        <img src={CollapseIcon} alt="Collapse Icon" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    // hidden
                    className="visible!"
                    data-twe-collapse-item
                    // data-twe-collapse-show
                    data-twe-collapse-show
                    aria-labelledby="headingFive"
                  >
                    <div className="px-4 pt-4 sm:px-6">
                      <ul className="space-y-2 text-xs">
                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Aliquam, nihil.
                        </li>
                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Aliquam, nihil.
                        </li>
                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Aliquam, nihil.
                        </li>
                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Aliquam, nihil.
                        </li>
                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Aliquam, nihil.
                        </li>
                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Aliquam, nihil.
                        </li>
                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Aliquam, nihil.
                        </li>
                        <li className="relative ps-5 before:absolute before:top-0.5 before:left-0 before:h-3 before:w-3 before:bg-[url('/public/static/img/icons/ic-success.svg')] before:bg-contain before:bg-no-repeat">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Aliquam, nihil.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="py-6">
                  <h2 className="mb-0" id="headingSix">
                    <button
                      className="group [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b relative flex w-full cursor-pointer items-center border-0 px-6 text-base font-semibold capitalize transition [overflow-anchor:none] hover:z-2 focus:z-3 focus:outline-none [&:not([data-twe-collapse-collapsed])]:bg-white"
                      type="button"
                      data-twe-collapse-init
                      // data-twe-collapse-collapsed
                      data-twe-target="#collapseSix"
                      aria-expanded="true"
                      // aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      Audit Trail
                      <span className="ms-auto transition-transform duration-200 ease-in-out group-data-twe-collapse-collapsed:-rotate-180 motion-reduce:transition-none">
                        <img src={CollapseIcon} alt="Collapse Icon" />
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    // hidden
                    className="visible!"
                    data-twe-collapse-item
                    // data-twe-collapse-show
                    data-twe-collapse-show
                    aria-labelledby="headingSix"
                  >
                    <div className="px-4 pt-4 sm:px-6">
                      <AuditTrail />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 z-10 flex flex-wrap justify-end gap-4 border-t border-neutral-200 bg-white px-6 py-4 md:py-6">
                <Button variant="primary">Approve & Next</Button>
                <Button variant="secondary"> Review Later</Button>
                <Button variant="tertiary">Flag for Manual Review</Button>
              </div>
            </div>
          </div>
          {/* Invoive Preview/Edit Section End */}
        </div>
      </section>

      {/* Invoice Batches Screen End */}
    </div>
  );
};

export default Invoices;
