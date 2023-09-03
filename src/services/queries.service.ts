import { useAppBridge } from "@shopify/app-bridge-react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  fetchSettings,
  fetchAllPlans,
  fetchShopData,
  fetchLanguageData,
  fetchGlobalPlans,
  fetchEmailSettings,
  fetchCustomPricingPlans,
  fetchDefaultStringData,
  fetchFontFamiliesData,
  fetchTemplateData,
  fetchInvoices,
  fetchTotalOrders,
} from "./api.service";

export const useSettingsQueryTags = ["settings"];
export const useShopDataQueryTags = ["shopData"];
export const useAllPlansQueryTags = ["allPlans"];
export const useGlobalPlansQueryTags = ["globalPlans"];
export const useEmailSettingsQueryTags = ["email-settings"];
export const useLanguageQueryTags = ["languageData"];
export const useDefaultStringDataQueryTags = ["default"];
export const useFontFamiliesQueryTags = ["fontFamilies"];
export const useTemplateDataQueryTags = ["template"];
export const useInvoicesQueryTags = ["invoices"];
export const useTotalOrdersCountQueryTags = ["total-orders"];

export const useSettingsQuery = (
  options?: Omit<
    UseQueryOptions<any, any, any, string[]>,
    "queryKey" | "queryFn"
  >,
) => {
  const appInstance = useAppBridge();
  return useQuery(
    useSettingsQueryTags,
    () => fetchSettings(appInstance),
    options,
  );
};

export const useShopDataQuery = () => {
  const appInstance = useAppBridge();
  return useQuery(useShopDataQueryTags, () => fetchShopData(appInstance));
};

// use: pricing page
export const useAllPlansQuery = () => {
  const appInstance = useAppBridge();
  const data = useQuery(useAllPlansQueryTags, () => fetchAllPlans(appInstance));
  return data;
};

//  use:pricingOfferPage
export const useGlobalPlansQuery = () => {
  const appInstance = useAppBridge();
  return useQuery(useGlobalPlansQueryTags, () => fetchGlobalPlans(appInstance));
};

export const useEmailSettingsQuery = () => {
  const appInstance = useAppBridge();
  return useQuery(useEmailSettingsQueryTags, () =>
    fetchEmailSettings(appInstance),
  );
};
// use: onboarding step2
export const useLanguagesDataQuery = () => {
  const appInstance = useAppBridge();
  return useQuery(useLanguageQueryTags, () => fetchLanguageData(appInstance));
};

export const useTemplateDataQuery = () => {
  const appInstance = useAppBridge();
  return useQuery(useTemplateDataQueryTags, () =>
    fetchTemplateData(appInstance),
  );
};
export const useFontFamiliesDataQuery = () => {
  const appInstance = useAppBridge();
  return useQuery(useFontFamiliesQueryTags, () =>
    fetchFontFamiliesData(appInstance),
  );
};
export const useSelectedLanguageStringDataQuery = (
  selectedLangCode: string,
) => {
  const [isChangedFirstTime, setIsChangedFirstTime] = useState(false);

  const appInstance = useAppBridge();
  const queryResult = useQuery(
    [...useDefaultStringDataQueryTags, selectedLangCode],
    () => fetchDefaultStringData(appInstance, selectedLangCode),
    {
      enabled: !!selectedLangCode,
      suspense: !isChangedFirstTime,
      keepPreviousData: true,
    },
  );

  const { isSuccess } = queryResult;

  useEffect(() => {
    setIsChangedFirstTime(true);
  }, [isSuccess]);

  return queryResult;
};
// use: pricing customPricing
const useCustomPricingPlansQueryTags = ["customPricingPlans"];

export const useCustomPricingPlansQuery = () => {
  const appInstance = useAppBridge();
  const data = useQuery(useCustomPricingPlansQueryTags, () =>
    fetchCustomPricingPlans(appInstance),
  );
  return data;
};

// export const useAllPlansQuery = () => {
//   const appInstance = useAppBridge();
//   const data = useQuery(useAllPlansQueryTags, () => fetchAllPlans(appInstance));
//   return data;
// };

export const useTotalOrdersQuery = (
  options?: Omit<
    UseQueryOptions<any, any, any, string[]>,
    "queryKey" | "queryFn"
  >,
) => {
  const appInstance = useAppBridge();
  return useQuery(
    useTotalOrdersCountQueryTags,
    () => fetchTotalOrders(appInstance),
    options,
  );
};

export const useInvoicesDataQuery = (
  parameters: any,
  options?: Omit<UseQueryOptions<any, any, any, any[]>, "queryKey" | "queryFn">,
) => {
  const appInstance = useAppBridge();
  const par = Object.values(parameters);
  return useQuery(
    [...useInvoicesQueryTags, ...par],
    () => fetchInvoices(appInstance, parameters),
    {
      keepPreviousData: true,
      ...options,
    },
  );
};
