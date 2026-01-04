import { Icon } from '@iconify/react';
import { useForm } from 'react-hook-form';
import RotateIcon from '../../../public/static/img/icons/ic-rotate.svg';
import ZoomInIcon from '../../../public/static/img/icons/ic-zoom-in.svg';
import ZoomOutIcon from '../../../public/static/img/icons/ic-zoom-out.svg';
import CollapseIcon from '../../../public/static/img/icons/ic-collapse.svg';

import ProgressBar from '@/components/progressBar';
import {
  Worker,
  Viewer,
  ViewMode,
  ScrollMode,
  RotateDirection,
} from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { InvoiceFormValues, InvoicesProps } from '@/types/invoices';
import { AuditTrail } from '@/components/AuditTrail';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select/Select';
import { benefitsData, validationChecksData } from '@/utils/utils';
import { SuccessList } from '@/components/SuccessList';
import { ManualReviewModal } from '@/components/Modals/ManualReview';
import { useEffect } from 'react';
import StatusCard from '@/components/StatusCard';

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

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<InvoiceFormValues>({
    mode: 'onBlur',
  });
  const onSubmit = (data: InvoiceFormValues) => {
    console.log('Form Data:', data);
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      document
        .querySelector('[aria-controls="collapseOne"]')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [errors]);
  if (!fileUrl) return <div>Invalid PDF URL</div>;
  return (
    <>
      {/* Invoice Batches Screen Start */}
      <section className="mx-4 pb-5 md:mx-10 md:pb-10">
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
          <StatusCard
            variant="success"
            title="Ready for approval"
            description="All fields verified, no issues found"
          />

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
                      fileUrl={fileUrl}
                      viewMode={ViewMode.SinglePage}
                      initialPage={0}
                      scrollMode={ScrollMode.Horizontal}
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
                <Rotate direction={RotateDirection.Forward}>
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
              <form onSubmit={handleSubmit(onSubmit)}>
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
                              label="Vendor Name"
                              {...register('vendorName', {
                                required: 'Vendor name is required',
                              })}
                              error={errors.vendorName?.message}
                              success={
                                touchedFields.vendorName && !errors.vendorName
                              }
                            />
                          </div>

                          <div>
                            <Input
                              label="Invoice Number"
                              placeholder="XXXXXXXXXX"
                              {...register('invoiceNumber', {
                                required: 'Invoice number is required',
                                minLength: {
                                  value: 6,
                                  message: 'Minimum 6 characters',
                                },
                              })}
                              error={errors.invoiceNumber?.message}
                              success={
                                touchedFields.invoiceNumber &&
                                !errors.invoiceNumber
                              }
                              // warning="Make sure this matches the invoice"
                            />
                          </div>

                          <div>
                            <Input
                              label="Invoice Date"
                              type="date"
                              {...register('invoiceDate', {
                                required: 'Invoice date is required',
                              })}
                              error={errors.invoiceDate?.message}
                              success={
                                touchedFields.invoiceDate && !errors.invoiceDate
                              }
                            />
                          </div>

                          <div>
                            <Input
                              label="Due Date"
                              type="date"
                              {...register('dueDate', {
                                required: 'Due date is required',
                                validate: (value, formValues) =>
                                  !formValues.invoiceDate ||
                                  value >= formValues.invoiceDate ||
                                  'Due date must be after invoice date',
                              })}
                              error={errors.dueDate?.message}
                              success={touchedFields.dueDate && !errors.dueDate}
                            />
                          </div>

                          <div>
                            <Select
                              label="Currency"
                              options={[
                                { label: 'Select', value: '' },
                                { label: 'INR', value: 'inr' },
                                { label: 'USD', value: 'usd' },
                              ]}
                              defaultValue=""
                              {...register('currency', {
                                required: 'Currency is required',
                              })}
                              error={errors.currency?.message}
                              success={
                                touchedFields.currency && !errors.currency
                              }
                            />
                          </div>

                          <div>
                            <Input
                              label="Payment Reference"
                              placeholder="XXXXXXXXXXXXXXX"
                              {...register('paymentReference', {
                                required: 'Payment Reference is required',
                                minLength: {
                                  value: 5,
                                  message: 'Minimum 5 characters',
                                },
                              })}
                              error={errors.paymentReference?.message}
                              success={
                                touchedFields.paymentReference &&
                                !errors.paymentReference
                              }
                            />
                          </div>

                          <div>
                            <Input
                              label="IBAN"
                              placeholder="XXXXXXXXXXXXXXX"
                              {...register('iban', {
                                required: 'IBAN is required',
                                pattern: {
                                  value: /^[A-Z0-9]{15,34}$/,
                                  message: 'Invalid IBAN format',
                                },
                              })}
                              error={errors.iban?.message}
                              success={touchedFields.iban && !errors.iban}
                            />
                          </div>

                          <div>
                            <Input
                              label="Tax ID"
                              placeholder="XXXXXXXXXXXXXXX"
                              {...register('taxId', {
                                required: 'Tax ID is required',
                              })}
                              error={errors.taxId?.message}
                              success={touchedFields.taxId && !errors.taxId}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-neutral-200 p-6">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <Select
                          label="Expense Classification"
                          fullWidth
                          hasToolTip
                          toolTipId="vendorTooltip"
                          toolTipContent="Must be unique per vendor"
                          {...register('expenseClassification', {
                            required: 'Expense classification is required',
                          })}
                          options={[
                            { label: 'Select', value: '' },
                            {
                              label: '6000 — Office Supplies',
                              value: 'officeSupplies',
                            },
                          ]}
                          error={errors.expenseClassification?.message}
                          success={
                            touchedFields.expenseClassification &&
                            !errors.expenseClassification
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-neutral-200 py-6">
                    <h2 className="mb-0" id="headingTwo">
                      <button
                        className="group [&:not([data-twe-collapse-collapsed])]:text-primary [&:not([data-twe-collapse-collapsed])]:shadow-border-b relative flex w-full cursor-pointer items-center border-0 px-4 text-base font-semibold transition [overflow-anchor:none] hover:z-2 focus:z-3 focus:outline-none sm:px-6 [&:not([data-twe-collapse-collapsed])]:bg-white"
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
                        <div className="custom-scroll max-w-3xs min-w-full overflow-x-auto rounded-xl border border-neutral-200">
                          <table className="min-w-full table-fixed text-left text-neutral-500">
                            <thead className="font-semibold">
                              <tr>
                                <th
                                  scope="col"
                                  className="py-2 ps-5 pe-3 text-xs whitespace-nowrap"
                                >
                                  Description
                                </th>
                                <th
                                  scope="col"
                                  className="py-2 ps-5 pe-3 text-xs whitespace-nowrap"
                                >
                                  Quantity
                                </th>
                                <th
                                  scope="col"
                                  className="py-2 ps-5 pe-3 text-xs whitespace-nowrap"
                                >
                                  Unit Price
                                </th>
                                <th
                                  scope="col"
                                  className="py-2 ps-5 pe-3 text-xs whitespace-nowrap"
                                >
                                  Tax Rate
                                </th>
                                <th
                                  scope="col"
                                  className="py-2 ps-5 pe-3 text-xs whitespace-nowrap"
                                >
                                  Account
                                </th>
                                <th
                                  scope="col"
                                  className="py-2 ps-5 pe-3 text-xs whitespace-nowrap"
                                >
                                  Discount
                                </th>
                                <th
                                  scope="col"
                                  className="py-2 ps-5 pe-3 text-xs whitespace-nowrap"
                                >
                                  Line Total
                                </th>
                                <th
                                  scope="col"
                                  className="py-2 ps-5 pe-3 text-xs"
                                >
                                  <div className="flex items-center gap-1">
                                    <div className="invisible flex cursor-pointer items-center justify-center rounded-sm p-1.5 duration-150 hover:bg-neutral-100">
                                      <Icon
                                        icon="mage:edit-pen"
                                        width="14px"
                                        height="14px"
                                        className="text-neutral-800"
                                      />
                                    </div>

                                    <div className="hover:bg-error-light flex cursor-pointer items-center justify-center rounded-sm p-1.5 duration-150">
                                      <Icon
                                        icon="fluent:delete-12-regular"
                                        width="14px"
                                        height="14px"
                                        className="text-error"
                                      />
                                    </div>
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Class for failed border-error border-y bg-error-light */}
                              {/* Class for Success border-success border-y bg-success-light */}
                              {/* Class for Need Review border-warning border-y bg-success-warning */}
                              {/* Class for Need Review border-y bg-primary-300 border-primary-600/10 */}

                              <tr className="border-t border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50">
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div className="min-w-28">
                                      Arbeitszeit Technik pro 1/4 std.
                                    </div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="w-full text-[10px] min-w-24 rounded-sm border bg-white px-2 py-1.5 outline-0"
                                  /> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>1</div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    className="w-full text-[10px] rounded-sm border bg-white px-2 py-1.5 outline-0"
                                  /> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>38.8</div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <input
                                    type="text"
                                    name="unitPrice"
                                    id="unitPrice"
                                    className="w-full text-[10px] rounded-sm border bg-white px-2 py-1.5 outline-0"
                                  /> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>7.7%</div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <select
                                    name="taxRate"
                                    id="taxRate"
                                    className="w-full text-[10px] rounded-sm border bg-white px-2 py-1.5 outline-0"
                                  >
                                    <option value="select">7.7</option>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                  </select> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>XXXXX</div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <select
                                    name="account"
                                    id="account"
                                    className="w-full rounded-sm border bg-white px-2 py-1.5 text-[10px] outline-0"
                                  >
                                    <option value="select">XXXXX</option>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                  </select> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>8%</div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <input
                                    type="number"
                                    name="discount"
                                    id="discount"
                                    className="w-full text-[10px] rounded-sm border bg-white px-2 py-1.5 outline-0"
                                  /> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>CHF XXX</div>
                                    {/* <input
                                    type="text"
                                    name="lineTotal"
                                    id="lineTotal"
                                    readOnly
                                    className="w-full rounded-sm border border-neutral-200 bg-white px-2 py-1.5 outline-0 read-only:bg-neutral-100"
                                    value={'CHF XXX'}
                                  /> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div className="flex items-center gap-1">
                                    <div className="flex cursor-pointer items-center justify-center rounded-sm p-1.5 duration-150 hover:bg-neutral-200">
                                      <Icon
                                        icon="mage:edit-pen"
                                        width="14px"
                                        height="14px"
                                        className="text-neutral-800"
                                      />
                                    </div>

                                    <div className="hover:bg-error-light flex cursor-pointer items-center justify-center rounded-sm p-1.5 duration-150">
                                      <Icon
                                        icon="fluent:delete-12-regular"
                                        width="14px"
                                        height="14px"
                                        className="text-error"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>

                              <tr className="border-t border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50">
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div className="min-w-28">
                                      Arbeitszeit Technik pro 1/4 std.
                                    </div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <input
                                    type="text"
                                    name="description"
                                    id="description"
                                    className="w-full text-[10px] min-w-24 rounded-sm border bg-white px-2 py-1.5 outline-0"
                                  /> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>1</div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <input
                                    type="number"
                                    name="quantity"
                                    id="quantity"
                                    className="w-full text-[10px] rounded-sm border bg-white px-2 py-1.5 outline-0"
                                  /> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>38.8</div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <input
                                    type="text"
                                    name="unitPrice"
                                    id="unitPrice"
                                    className="w-full text-[10px] rounded-sm border bg-white px-2 py-1.5 outline-0"
                                  /> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>7.7%</div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <select
                                    name="taxRate"
                                    id="taxRate"
                                    className="w-full text-[10px] rounded-sm border bg-white px-2 py-1.5 outline-0"
                                  >
                                    <option value="select">7.7</option>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                  </select> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>XXXXX</div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <select
                                    name="account"
                                    id="account"
                                    className="w-full rounded-sm border bg-white px-2 py-1.5 text-[10px] outline-0"
                                  >
                                    <option value="select">XXXXX</option>
                                    <option value="a">A</option>
                                    <option value="b">B</option>
                                  </select> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>8%</div>
                                    {/* Class for processing bg-primary-300
                                  border-primary-400 */}
                                    {/* Class for error bg-error-light
                                  border-error */}
                                    {/* Class for needs review bg-warning-light
                                  border-warning */}
                                    {/* Class for sucess bg-success-light
                                  border-success */}
                                    {/* <input
                                    type="number"
                                    name="discount"
                                    id="discount"
                                    className="w-full text-[10px] rounded-sm border bg-white px-2 py-1.5 outline-0"
                                  /> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div>
                                    <div>CHF XXX</div>
                                    {/* <input
                                    type="text"
                                    name="lineTotal"
                                    id="lineTotal"
                                    readOnly
                                    className="w-full rounded-sm border border-neutral-200 bg-white px-2 py-1.5 outline-0 read-only:bg-neutral-100"
                                    value={'CHF XXX'}
                                  /> */}
                                  </div>
                                </td>
                                <td className="py-2 ps-5 pe-3 text-xs">
                                  <div className="flex items-center gap-1">
                                    <div className="flex cursor-pointer items-center justify-center rounded-sm p-1.5 duration-150 hover:bg-neutral-200">
                                      <Icon
                                        icon="mage:edit-pen"
                                        width="14px"
                                        height="14px"
                                        className="text-neutral-800"
                                      />
                                    </div>

                                    <div className="hover:bg-error-light flex cursor-pointer items-center justify-center rounded-sm p-1.5 duration-150">
                                      <Icon
                                        icon="fluent:delete-12-regular"
                                        width="14px"
                                        height="14px"
                                        className="text-error"
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
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
                          <SuccessList items={validationChecksData} />
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
                          <SuccessList items={benefitsData} />
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

                  <div className="sticky bottom-0 z-10 flex flex-wrap justify-end gap-4 rounded-b-sm border-y border-neutral-200 bg-white px-6 py-4 md:py-6">
                    <Button variant="primary" type="submit">
                      Approve & Next
                    </Button>
                    <Button variant="secondary">Review Later</Button>
                    <Button
                      variant="tertiary"
                      data-twe-toggle="modal"
                      data-twe-target="#flagReviewModal"
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                    >
                      Flag for Manual Review
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Invoive Preview/Edit Section End */}
        </div>
      </section>
      {/* Invoice Batches Screen End */}

      <ManualReviewModal />
    </>
  );
};

export default Invoices;
