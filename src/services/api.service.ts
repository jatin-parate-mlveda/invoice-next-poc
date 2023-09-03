import { AppBridgeState, ClientApplication } from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge/utilities';
import axios, { AxiosResponse } from 'axios';
import { GlobalPlan, LanguageData, allPlan } from '@/types/api.types';

import { apiEndpointWithTrailingSlash } from '@/utils/constant';

const axiosInstance = axios.create({
  headers: {
    frontend: '1',
  },
  baseURL: apiEndpointWithTrailingSlash,
});

export const httpInterceptor = axiosInstance;

const addOrderDataToSettingsRes = (res: AxiosResponse): void => {
  const tempOrder = { ...res.data.orders };
  tempOrder.note = 'This invoice is for your P.O. 4356 ';
  tempOrder.total_refunded_amount = {
    shop_money: {
      amount: '10.00',
      currency_code: 'INR',
    },
    presentment_money: {
      amount: '10.00',
      currency_code: 'INR',
    },
  };

  tempOrder.total_tip_received = {
    shop_money: {
      amount: '0.00',
      currency_code: res.data.storeCurrency,
    },
    presentment_money: {
      amount: '0.00',
      currency_code: res.data.storeCurrency,
    },
  };
  tempOrder.netPaymentSet = {
    shop_money: {
      amount: '0.00',
      amountNumber: 0,
      currency_code: res.data.storeCurrency,
    },
    presentment_money: {
      amount: '0.00',
      amountNumber: 0,
      currency_code: res.data.storeCurrency,
    },
  };
  tempOrder.outstandingSet = {
    shop_money: {
      amount: '254.98',
      amountNumber: 254.98,
      currency_code: res.data.storeCurrency,
    },
    presentment_money: {
      amount: '254.98',
      amountNumber: 254.98,
      currency_code: res.data.storeCurrency,
    },
  };
  tempOrder.refunds = [
    {
      id: 509562969,
      order_id: 450789469,
      created_at: '2019-07-04T15:12:40-04:00',
      note: 'it broke during shipping',
      user_id: 799407056,
      processed_at: '2019-07-04T15:12:40-04:00',
      restock: true,
      admin_graphql_api_id: 'gid://shopify/Refund/509562969',
      refund_line_items: [
        {
          id: 104689539,
          quantity: 1,
          line_item_id: 703073504,
          location_id: 487838322,
          restock_type: 'legacy_restock',
          subtotal: 199.0,
          total_tax: 3.98,
          subtotal_set: {
            shop_money: {
              amount: '199.00',
              currency_code: 'USD',
            },
            presentment_money: {
              amount: '199.00',
              currency_code: 'USD',
            },
          },
          total_tax_set: {
            shop_money: {
              amount: '3.98',
              currency_code: 'USD',
            },
            presentment_money: {
              amount: '3.98',
              currency_code: 'USD',
            },
          },
          line_item: {
            id: 703073504,
            variant_id: 457924702,
            title: 'IPod Nano - 8gb',
            quantity: 1,
            sku: 'IPOD2008BLACK',
            variant_title: 'black',
            vendor: null,
            product_id: 632910392,
            requires_shipping: true,
            taxable: true,
            gift_card: false,
            name: 'IPod Nano - 8gb - black',
            variant_inventory_management: 'shopify',
            properties: [],
            product_exists: true,
            fulfillable_quantity: 1,
            grams: 200,
            price: '199.00',
            total_discount: '0.00',
            fulfillment_status: null,
            price_set: {
              shop_money: {
                amount: '199.00',
                currency_code: 'USD',
              },
              presentment_money: {
                amount: '199.00',
                currency_code: 'USD',
              },
            },
            total_discount_set: {
              shop_money: {
                amount: '0.00',
                currency_code: 'USD',
              },
              presentment_money: {
                amount: '0.00',
                currency_code: 'USD',
              },
            },
            discount_allocations: [],
            admin_graphql_api_id: 'gid://shopify/LineItem/703073504',
            tax_lines: [
              {
                title: 'State Tax',
                price: '3.98',
                rate: 0.06,
                price_set: {
                  shop_money: {
                    amount: '3.98',
                    currency_code: 'USD',
                  },
                  presentment_money: {
                    amount: '3.98',
                    currency_code: 'USD',
                  },
                },
              },
            ],
          },
        },
        {
          id: 709875399,
          quantity: 1,
          line_item_id: 466157049,
          location_id: 487838322,
          restock_type: 'legacy_restock',
          subtotal: 199.0,
          total_tax: 3.98,
          subtotal_set: {
            shop_money: {
              amount: '199.00',
              currency_code: 'USD',
            },
            presentment_money: {
              amount: '199.00',
              currency_code: 'USD',
            },
          },
          total_tax_set: {
            shop_money: {
              amount: '3.98',
              currency_code: 'USD',
            },
            presentment_money: {
              amount: '3.98',
              currency_code: 'USD',
            },
          },
          line_item: {
            id: 466157049,
            variant_id: 39072856,
            title: 'IPod Nano - 8gb',
            quantity: 2,
            sku: 'IPOD2008GREEN',
            variant_title: 'green',
            vendor: null,
            product_id: 632910392,
            requires_shipping: true,
            taxable: true,
            gift_card: false,
            name: 'IPod Nano - 8gb - green',
            variant_inventory_management: 'shopify',
            properties: [
              {
                name: 'Custom Engraving Front',
                value: 'Happy Birthday',
              },
              {
                name: 'Custom Engraving Back',
                value: 'Merry Christmas',
              },
            ],
            product_exists: true,
            fulfillable_quantity: 1,
            grams: 200,
            price: '199.00',
            total_discount: '0.00',
            fulfillment_status: null,
            price_set: {
              shop_money: {
                amount: '199.00',
                currency_code: 'USD',
              },
              presentment_money: {
                amount: '199.00',
                currency_code: 'USD',
              },
            },
            total_discount_set: {
              shop_money: {
                amount: '0.00',
                currency_code: 'USD',
              },
              presentment_money: {
                amount: '0.00',
                currency_code: 'USD',
              },
            },
            discount_allocations: [],
            admin_graphql_api_id: 'gid://shopify/LineItem/466157049',
            tax_lines: [
              {
                title: 'State Tax',
                price: '3.98',
                rate: 0.06,
                price_set: {
                  shop_money: {
                    amount: '3.98',
                    currency_code: 'USD',
                  },
                  presentment_money: {
                    amount: '3.98',
                    currency_code: 'USD',
                  },
                },
              },
            ],
          },
        },
      ],
      transactions: [
        {
          id: 179259969,
          order_id: 450789469,
          kind: 'refund',
          gateway: 'bogus',
          status: 'success',
          message: null,
          created_at: '2005-08-05T12:59:12-04:00',
          test: false,
          authorization: 'authorization-key',

          location_id: null,

          user_id: null,

          parent_id: 801038806,

          processed_at: '2005-08-05T12:59:12-04:00',

          device_id: null,

          receipt: {},

          error_code: null,

          source_name: 'web',

          amount: '10.00',

          currency: 'USD',

          admin_graphql_api_id: 'gid://shopify/OrderTransaction/179259969',
        },
      ],

      order_adjustments: [],
    },
  ];

  tempOrder.transactions = [
    {
      id: 179259969,

      order_id: 450789469,

      kind: 'refund',

      gateway: 'bogus',

      status: 'success',

      message: null,

      created_at: '2005-08-05T12:59:12-04:00',

      test: false,

      authorization: 'authorization-key',

      location_id: null,

      user_id: null,

      parent_id: 801038806,

      processed_at: '2005-08-05T12:59:12-04:00',

      device_id: null,

      receipt: {},

      error_code: null,

      source_name: 'web',

      amount: '10.00',

      currency: 'INR',

      admin_graphql_api_id: 'gid://shopify/OrderTransaction/179259969',

      payment_details: {
        credit_card_bin: null,

        avs_result_code: null,

        cvv_result_code: null,

        credit_card_number: '•••• •••• •••• 4242',

        credit_card_company: 'Visa',
      },
    },
  ];

  tempOrder.netPaymentSet = {
    presentment_money: {
      amount: '0.00',

      currency_code: res.data.storeCurrency,
    },

    shop_money: {
      amount: '0.00',

      currency_code: res.data.storeCurrency,
    },
  };

  tempOrder.paidByCustomerSet = {
    presentment_money: {
      amount: '10.00',

      currency_code: res.data.storeCurrency,
    },

    shop_money: {
      amount: '10.00',

      currency_code: res.data.storeCurrency,
    },
  };

  tempOrder.gateway = 'Bank transfer';

  tempOrder.payment_details = {
    credit_card_bin: null,

    avs_result_code: null,

    cvv_result_code: null,

    credit_card_number: '•••• •••• •••• 4242',

    credit_card_company: 'Visa',
  };

  tempOrder.invoicehero_vatNumber = 'GB123456789';

  for (let i = 0; i < tempOrder.line_items.length; i += 1) {
    if (i === 0) {
      tempOrder.line_items[i].barcode = '12345 00010';

      tempOrder.line_items[i].countryOfOrigin = 'US';

      tempOrder.line_items[i].hsCode = '900410';

      tempOrder.line_items[i].productWeight = '10 g';

      tempOrder.line_items[i].productImg =
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/sunglasses.jpg';
    } else {
      tempOrder.line_items[i].barcode = '12345 00011';

      tempOrder.line_items[i].countryOfOrigin = 'US';

      tempOrder.line_items[i].hsCode = '900412';

      tempOrder.line_items[i].productWeight = '20 g';

      tempOrder.line_items[i].productImg =
        'https://mlveda-shopifyapps.s3.amazonaws.com/invoice-hero/noImage.png';
    }
  }

  res.data.orders = tempOrder;
};

export const fetchSettings = async (
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('/api/settings', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  addOrderDataToSettingsRes(res);

  return res.data;
};

export const fetchShopData = async (
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('/api/shop', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const fetchEmailSettings = async (
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('/api/emailSettings', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return { ...res.data, additionalPDF: res.data.additionalPDF ?? [] };
};

// use: Onboarding step 2
export const fetchLanguageData = async (
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('/api/language', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data as LanguageData[];
};

export const fetchTemplateData = async (
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('/api/template', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const fetchFontFamiliesData = async (
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('/api/fontFamilies', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const fetchTotalOrders = async (
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('/api/order/count', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const fetchInvoices = async (
  appInstance: ClientApplication<AppBridgeState>,
  passedParameters: any,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('/api/order', {
    params: {
      OrderBy: passedParameters.direction,
      sortBy: passedParameters.column,
      limit: passedParameters.limit,
      searchText: passedParameters.searchText,
      pageNo: passedParameters.currentPage,
      paymentStatus: passedParameters.paymentStatus,
      fulfillmentStatus: passedParameters.fulfillmentStatus,
      mail: passedParameters.mailStatus,
      orderStatus: passedParameters.orderStatus,
      startDate: passedParameters.startDate,
      endDate: passedParameters.endDate,
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};
// use: Onboarding step 2, step 3, pricingPage, pricingOfferPage
export const updateSettingsApiCall = async (
  settingsData: object,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);

  const res = await axiosInstance.put('/api/settings', settingsData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  addOrderDataToSettingsRes(res);
  return res.data;
};

export const uploadImageApiCall = async (
  imageData: any,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const bodyFormData = new FormData();
  bodyFormData.append('emailMessageImage', imageData);
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post(
    '/api/emailSettings/uploadImageForMessage',
    bodyFormData,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return res.data;
};

export const toggleSendInvoiceAutomaticApiCall = async (
  settingsData: any,
  appInstance: ClientApplication<AppBridgeState>,
  checkFlag: boolean,
) => {
  const { firstTimeSendInvoiceAutomaticEvent } = settingsData.invoiceSettings;

  return updateSettingsApiCall(
    checkFlag!
      ? {
          invoiceSettings: {
            sendInvoiceAutomatic: true,
            orderCreateSendInvoiceAutomatic:
              firstTimeSendInvoiceAutomaticEvent === 'CREATED',
            orderRefundSendInvoiceAutomatic: true,
            orderCancelSendInvoiceAutomatic: true,
            orderEditSendInvoiceAutomatic: true,
            orderAddressChangeSendInvoiceAutomatic: false,
            orderEmailChangeSendInvoiceAutomatic: false,
          },
        }
      : {
          invoiceSettings: {
            sendInvoiceAutomatic: false,
            orderCreateSendInvoiceAutomatic: false,
            orderRefundSendInvoiceAutomatic: false,
            orderCancelSendInvoiceAutomatic: false,
            orderEditSendInvoiceAutomatic: false,
            orderAddressChangeSendInvoiceAutomatic: false,
            orderEmailChangeSendInvoiceAutomatic: false,
          },
        },
    appInstance,
  );
};

export const fetchAllPlans = async (
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('/plan', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data as allPlan[];
};

// Onboarding step1
export const updateSetupDataApiCall = async (
  settingsData: object,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.put('/api/settings', settingsData, {
    headers: { Authorization: `Bearer ${jwt}` },
  });
  return res.data;
};

// use: pricingOfferPage
export const fetchGlobalPlans = async (
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('/plan/global', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data as GlobalPlan[];
};

// post call use: pricingOfferPage
export const addPlanDeactivateMutation = async (
  data: any,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);

  const res = await axiosInstance.post('plan/deactivate', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const fetchDefaultStringData = async (
  appInstance: ClientApplication<AppBridgeState>,
  languageCode: any,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get(
    `/api/settings/defaultInvoiceMultiLangkeys/${languageCode}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return res.data;
};

// post call use : onboarding step2
export const updateLanguageChangeApiCall = async (
  language: object,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post(
    '/api/settings/changelanguage',
    language,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return res.data;
};

// post call use : onboarding step 2
export const addSetupSettingChangeLanguageApiCall = async (
  languageData: {
    name: any;
    code: any;
    direction: any;
  },
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post(
    '/api/settings/changelanguage',
    languageData,
    {
      headers: { Authorization: `Bearer ${jwt}` },
    },
  );
  addOrderDataToSettingsRes(res);

  return res.data;
};

// post call use: pricingOfferPage
export const updatePlanDiscountApiCall = async (
  discountState: object,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post('plan/discount', discountState, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

// use: onboarding step3
export const updateEmailSettingsApiCall = async (
  emailSettingsData: any,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.put('/api/emailSettings', emailSettingsData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

// post add call use : pricingOfferPage, pricingPage
export const updatePlanUpgradedApiCall = async (
  planId: string,
  // data is object
  data: {
    isPlanUpgraded: boolean;
  },
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post(`plan/${planId}`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

// use: pricing customPricing
export const fetchCustomPricingPlans = async (
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.get('api/custom-price', {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const updateDashboardOpenedOnceAPiCall = async (
  data: {
    isDashboardOpenedOnce: boolean;
  },
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.put('/api/settings', data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const generatePDFApiCall = async (
  reqData: object,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post('/api/order/generatePDF', reqData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};
export const sendEmailApiCall = async (
  reqData: object,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post('/api/order/sendEmail', reqData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const generatePDFAndSendEmailApiCall = async (
  reqData: object,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post(
    '/api/order/generatePDFAndSendEmail',
    reqData,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
  );
  return res.data;
};

export const sendMergedPDFsToOwnerApiCall = async (
  ordersData: object,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post('/api/order/bulk/print', ordersData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const sendPDFsToCustomersApiCall = async (
  ordersData: object,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post('/api/order/bulk/send', ordersData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const sendPDFsToOwnerApiCall = async (
  ordersData: object,
  appInstance: ClientApplication<AppBridgeState>,
) => {
  const jwt = await getSessionToken(appInstance);
  const res = await axiosInstance.post('/api/order/bulk', ordersData, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};
