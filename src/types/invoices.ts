export interface InvoicesProps {
  fileUrl: string;
}
export type InvoiceFormValues = {
  vendorName: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  paymentReference: string;
  iban: string;
  taxId: string;
  expenseClassification: string;
};

export type FlagReviewForm = {
  reason: string;
  notes?: string;
};
