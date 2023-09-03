import { useAppBridge } from '@shopify/app-bridge-react';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import {
  toggleSendInvoiceAutomaticApiCall,
  updatePlanDiscountApiCall,
  updatePlanUpgradedApiCall,
  updateSettingsApiCall,
  updateEmailSettingsApiCall,
  uploadImageApiCall,
  updateSetupDataApiCall,
  addPlanDeactivateMutation,
  updateLanguageChangeApiCall,
  fetchDefaultStringData,
  sendPDFsToOwnerApiCall,
  sendPDFsToCustomersApiCall,
  sendMergedPDFsToOwnerApiCall,
  generatePDFAndSendEmailApiCall,
  sendEmailApiCall,
  generatePDFApiCall,
  updateDashboardOpenedOnceAPiCall,
} from './api.service';
import {
  useEmailSettingsQueryTags,
  useSettingsQuery,
  useSettingsQueryTags,
} from './queries.service';

export const useToggleSendInvoiceAutomaticMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError, boolean>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const { data: settingsData } = useSettingsQuery();
  const queryClient = useQueryClient();

  return useMutation<any, Error | AxiosError, boolean>(
    sendInvoiceAuto =>
      toggleSendInvoiceAutomaticApiCall(
        settingsData,
        appInstance,
        sendInvoiceAuto,
      ),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData(useSettingsQueryTags, data);
        onSuccess?.(data, ...args);
      },
      useErrorBoundary: false,
    },
  );
};

// post call use:onboarding step 1
export const useSetupDataApiCallMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    (settingsData: object) => updateSetupDataApiCall(settingsData, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData(useSettingsQueryTags, data);
        onSuccess?.(data, ...args);
      },
    },
  );
};

// put call use:pricingOfferPage,  Onboarding step 2
export const useSettingsUpdateMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    (settingsData: object) => updateSettingsApiCall(settingsData, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData(useSettingsQueryTags, data);
        onSuccess?.(data, ...args);
      },
    },
  );
};

// post call use: pricingOfferPage,
export const usePlanDeactivateMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();

  return useMutation<any, Error | AxiosError, any>(
    data => addPlanDeactivateMutation(data, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData(useSettingsQueryTags, data);
        onSuccess?.(data, ...args);
      },
    },
  );
};

// post call use: pricingOfferPage
export const usePlanDiscountMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();

  return useMutation<any, Error | AxiosError, any>(
    ({ planName, isYearly, price }) =>
      updatePlanDiscountApiCall({ planName, isYearly, price }, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData(useSettingsQueryTags, data);
        onSuccess?.(data, ...args);
      },
      // useErrorBoundary: false,
    },
  );
};

// post call use: pricingOfferPage, pricingPage
export const usePlanUpgradedMutation = () => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();

  return useMutation<any, Error | AxiosError, { planId: string; data: any }>(
    ({ planId, data }) => updatePlanUpgradedApiCall(planId, data, appInstance),
    {
      onSuccess: data => {
        queryClient.setQueryData(useSettingsQueryTags, data);
      },
    },
  );
};

// put call for add new data use : onboarding step3
export const useEmailSettingUpdateMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    emailSettingsData =>
      updateEmailSettingsApiCall(emailSettingsData, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData(useEmailSettingsQueryTags, data);
        onSuccess?.(data, ...args);
      },
      useErrorBoundary: false,
    },
  );
};

export const useImageDataUploadMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    imageData => uploadImageApiCall(imageData, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData(useEmailSettingsQueryTags, data);
        onSuccess?.(data, ...args);
      },
      useErrorBoundary: false,
    },
  );
};

export const useChangeSelectedLanguageDataMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    languageObject => updateLanguageChangeApiCall(languageObject, appInstance),
    {
      onSuccess: (data, ...args) => {
        const emailSettingsQueryCache = queryClient
          .getQueryCache()
          .find(useEmailSettingsQueryTags);
        queryClient.setQueryData(useSettingsQueryTags, data);
        if (emailSettingsQueryCache) {
          queryClient.getQueryCache().remove(emailSettingsQueryCache);
        }
        onSuccess?.(data, ...args);
      },
      useErrorBoundary: false,
    },
  );
};

export const useFetchLanguageChangeDataMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  return useMutation<any, Error | AxiosError, any>(
    (val: any) => fetchDefaultStringData(appInstance, val),
    {
      onSuccess: (data, ...args) => {
        onSuccess?.(data, ...args);
      },
    },
  );
};

export const useUpdateDashboardOpenedOnceUpdateMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const { data: settingsData } = useSettingsQuery({ suspense: false });
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  const { isLoading, isSuccess, mutate } = useMutation<
    any,
    Error | AxiosError,
    any
  >(data => updateDashboardOpenedOnceAPiCall(data, appInstance), {
    onSuccess: (data, ...args) => {
      queryClient.setQueryData(useSettingsQueryTags, data);
      onSuccess?.(data, ...args);
    },
    useErrorBoundary: false,
  });

  useEffect(() => {
    if (
      settingsData &&
      !settingsData.isDashboardOpenedOnce &&
      !isSuccess &&
      !isLoading
    ) {
      mutate({ isDashboardOpenedOnce: true });
    }
  }, [isLoading, isSuccess, mutate, settingsData]);
};

export const usePDFDataUploadMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    settingsData => generatePDFApiCall(settingsData, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData([], data);
        onSuccess?.(data, ...args);
      },
      useErrorBoundary: false,
    },
  );
};
export const useSendEmailMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    invoice => sendEmailApiCall(invoice, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData([], data);
        onSuccess?.(data, ...args);
      },
      useErrorBoundary: false,
    },
  );
};

export const useGeneratePDFAndSendEmailMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    invoice => generatePDFAndSendEmailApiCall(invoice, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData([], data);
        onSuccess?.(data, ...args);
      },
      useErrorBoundary: false,
    },
  );
};

export const useMergedPDFsToOwnerMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    invoices => sendMergedPDFsToOwnerApiCall(invoices, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData([], data);
        onSuccess?.(data, ...args);
      },
      useErrorBoundary: false,
    },
  );
};

export const useSendPDFsToCustomersMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    invoices => sendPDFsToCustomersApiCall(invoices, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData([], data);
        onSuccess?.(data, ...args);
      },
      useErrorBoundary: false,
    },
  );
};
export const useSendPDFsToOwnerMutation = (
  onSuccess?: UseMutationOptions<any, Error | AxiosError>['onSuccess'],
) => {
  const appInstance = useAppBridge();
  const queryClient = useQueryClient();
  return useMutation<any, Error | AxiosError, any>(
    invoices => sendPDFsToOwnerApiCall(invoices, appInstance),
    {
      onSuccess: (data, ...args) => {
        queryClient.setQueryData([], data);
        onSuccess?.(data, ...args);
      },
      useErrorBoundary: false,
    },
  );
};
