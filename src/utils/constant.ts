export const apiEndpointWithTrailingSlash =
  process.env.NEXT_PUBLIC_API_ENDPOINT!.endsWith('/')
    ? process.env.NEXT_PUBLIC_API_ENDPOINT
    : `${process.env.NEXT_PUBLIC_API_ENDPOINT}/`;

export const autoSendInAllCountriesOption = 'ALL';

/**
 *
 * @type {Record<string, string>}
 */
export const allowedCustomerFilterOptions = {
  currency: 'CURRENCY',
  country: 'COUNTRY',
};

/**
 *
 * @type {Record<string, string>}
 */
export const allowedInvoiceCurrencyForAutoSend = {
  store: 'STORE',
  nonStore: 'NON-STORE',
  all: 'ALL',
};

/**
 * @type {Array<{ label: string, value: string }>}
 */
export const allowedFirstTimeInvoiceSendEvents = [
  { label: 'created', value: 'CREATED' },
  { label: 'paid', value: 'PAID' },
  { label: 'fulfilled', value: 'FULFILLED' },
  { label: 'not paid', value: 'NOT_PAID' },
];

export const sendInvoiceWhenOptions = [
  {
    value: 'created',
    label: 'Created',
  },
  {
    value: 'paid',
    label: 'Paid',
  },
  {
    value: 'fulfilled',
    label: 'Fulfilled',
  },
];

export const invoiceNumberOptions = [
  {
    value: 'same_as_order_number',
    label: 'Same as the order number (highly recommended)',
  },
  {
    value: 'custom_invoice_format',
    label: 'Custom invoice number',
  },
];

export const invoiceNumberFormatConst = 'same_as_order_number';

export const generateInvoiceOnOptions = [
  {
    labelId: 'usePresentmentCurrency',
    value: 'presentment_money',
    label: "Use customer's checkout or payment currency on the invoices",
  },
  {
    labelId: 'useStoreCurrency',
    value: 'shop_money',
    label: 'Use store currency on the invoices',
  },
];

export const maxAllowedID = 5;

export const orderVariables = [
  { tagName: '{{ number }}', description: 'Invoice number' },
  { tagName: '{{ link }}', description: 'Link to online version' },
  { tagName: '{{ amount }}', description: 'Invoice amount' },
  // { tagName: "{{ due_date }}", description: "	Invoice due date" },
  { tagName: '{{ client.name }}', description: "Client's company name" },
  { tagName: '{{ client.first_name }}', description: "Client's first name" },
  { tagName: '{{ client.last_name }}', description: "Client's last name" },
  { tagName: '{{ account.name }}', description: 'My company name' },
  { tagName: '{{ user.name }}', description: "Shop owner's name" },
  { tagName: '{{ note }}', description: 'Order note' },
  {
    tagName: '{{ email }}',
    description: "Customer's email id (shipping/billing)",
  },
  {
    tagName: '{{ customer_email }}',
    description: "Customer's account email id",
  },
  { tagName: '{{ support_email }}', description: 'Support email id' },
];

export const systemLanguage = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'es',
    label: 'Spanish Española',
  },
];

export const invoiceLanguage = [
  {
    _id: '5e7307801ef53d1e0441a3ad',
    code: 'en',
    name: 'English',
    __v: 0,
    direction: 'ltr',
    popularity: 1,
  },
];

export const allowedLetterSizes = [
  {
    key: 'a4',
    value: 'A4',
    label: 'A4 Letter',
  },
  {
    key: 'letter',
    value: 'Letter',
    label: 'US Letter',
  },
];

export const paymentFilters = {
  pending: 'Pending',
  voided: 'Voided',
  partially_paid: 'Partially paid',
  authorized: 'Authorized',
  refunded: 'Refunded',
  partially_refunded: 'Partially refunded',
  paid: 'Paid',
};

export const fulfillmentFilters = {
  fulfilled: 'Fulfilled',
  null: 'Unfulfilled',
  partial: 'Partially Fulfilled',
  restocked: 'Restocked',
};

export const mailFilterOptions = [
  {
    label: 'Sent',
    value: 'Sent',
  },
  {
    label: 'Draft',
    value: 'Draft',
  },
];

export const orderStatusFilterOptions = [
  {
    label: 'Open',
    value: 'open',
  },
  {
    label: 'Cancelled',
    value: 'cancelled',
  },
];

export const allowedDateFormate = [
  'MM/DD/YYYY',
  'DD/MM/YYYY',
  'YYYY-MM-DD',
].map(val => ({ key: val, value: val, label: val }));

export const polarisSettingsBreadcrumbs = [
  { url: '/settings', content: 'Settings' },
];
