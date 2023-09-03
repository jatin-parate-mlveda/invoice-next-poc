export type allPlan = {
  _id: string;
  originalPrice: number;
  trialDays: null;
  noOfFreeInvoices: number;
  priceAfterFreeInvoice: null;
  isYearlyPlan: boolean;
  yearlyPlanFor: null;
  planDescription: string;
  planId: string;
  planName: string;
  price: number;
  __v: number;
  offeredDiscountedPrice: null;
  isBestValue: boolean;
};

export type GlobalPlan = {
  _id: string;
  originalPrice: number;
  trialDays: any;
  noOfFreeInvoices: number;
  priceAfterFreeInvoice: any;
  isYearlyPlan: boolean;
  yearlyPlanFor: any;
  planDescription: string;
  planId: string;
  planName: string;
  price: number;
  __v: number;

  offeredDiscountedPrice: any;
};

export type LanguageData = {
  _id: '5ef9b8e6a51e81506d9b36d3';
  direction: 'ltr';
  code: 'bn';
  name: 'Bengali';
  popularity: 1;
  __v: 0;
};
