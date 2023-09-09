import {
  IndexTable,
  useSetIndexFiltersMode,
  useIndexResourceState,
  ChoiceList,
  Badge,
  IndexFiltersMode,
  EmptySearchResult,
} from '@shopify/polaris';
import type { IndexFiltersProps } from '@shopify/polaris';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import formatDate from 'date-fns/format';
import { useDebounce } from 'usehooks-ts';
import {
  fulfillmentFilters,
  mailFilterOptions,
  orderStatusFilterOptions,
  paymentFilters,
} from '@/utils/constant';
import {
  useInvoicesDataQuery,
  useInvoicesQueryTags,
} from '@/services/queries.service';
import {
  useMergedPDFsToOwnerMutation,
  useSendPDFsToCustomersMutation,
  useSendPDFsToOwnerMutation,
} from '@/services/mutations.service';
import ActionPopover from './ActionPopover';
import DateRangePicker from './DatePicker';
import styles from './Dashboard.module.scss';
import ViewInvoiceButton from './ViewInvoiceButton';
import { useRouter } from 'next/router';
import HomeLayout from './HomeLayout';
import { Toast } from '@shopify/app-bridge-react';

const sortOptions: IndexFiltersProps['sortOptions'] = [
  { label: 'Invoice', value: 'orderNo asc', directionLabel: 'Ascending' },
  { label: 'Invoice', value: 'orderNo desc', directionLabel: 'Descending' },
  {
    label: 'Order',
    value: 'shopifyOrderNo asc',
    directionLabel: 'Ascending',
  },
  {
    label: 'Order',
    value: 'shopifyOrderNo desc',
    directionLabel: 'Descending',
  },
  {
    label: 'Date',
    value: 'invoiceDate asc',
    directionLabel: 'Oldest to newest',
  },
  {
    label: 'Date',
    value: 'invoiceDate desc',
    directionLabel: 'Newest to oldest',
  },
  { label: 'Customer', value: 'customerName asc', directionLabel: 'A-Z' },
  { label: 'Customer', value: 'customerName desc', directionLabel: 'Z-A' },
  { label: 'Total', value: 'total asc', directionLabel: 'Lowest to highest' },
  {
    label: 'Total',
    value: 'total desc',
    directionLabel: 'Highest to lowest',
  },
  { label: 'Payment', value: 'paymentStatus asc', directionLabel: 'A-Z' },
  { label: 'Payment', value: 'paymentStatus desc', directionLabel: 'Z-A' },
  {
    label: 'Fulfillment',
    value: 'fulfillmentStatus asc',
    directionLabel: 'A-Z',
  },
  {
    label: 'Fulfillment',
    value: 'fulfillmentStatus desc',
    directionLabel: 'Z-A',
  },
  {
    label: 'Status',
    value: 'status asc',
    directionLabel: 'A-Z',
  },
  {
    label: 'Status',
    value: 'status desc',
    directionLabel: 'Z-A',
  },
];

function DashBoardPage() {
  const [errToast, setErrToast] = useState<{
    visible: boolean;
    message: string;
  }>({
    visible: false,
    message: 'Something went wrong',
  });
  const dateFilterFormat = 'd MMM yyyy';
  // const windowWidth = useRef(window.innerWidth);
  const [successToastVisible, setSuccessToastVisible] =
    useState<boolean>(false);
  // const [currentOrder, setCurrentOrder] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sort, setSort] = useState({
    column: 'invoiceDate',
    direction: 'desc',
  });
  const sendMergedPDFsToOwnerMutation = useMergedPDFsToOwnerMutation();
  const sendPDFsToCustomersMutation = useSendPDFsToCustomersMutation();
  const sendPDFsToOwnerMutation = useSendPDFsToOwnerMutation();
  const [queryValue, setQueryValue] = useState<string>('');
  const debouncedQueryValue = useDebounce<string>(queryValue, 500);
  const [totalEntryOnPage, setTotalEntryOnPage] = useState<number>(25);
  const [params, setParams] = useState({
    direction: sort.direction,
    column: sort.column,
    currentPage: 1,
    searchText: queryValue!.trim().replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'),
    limit: totalEntryOnPage,
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const [sortColumnIndex, setSortColumnIndex] = useState(2);
  const { data: invoicesData, isFetching } = useInvoicesDataQuery(params);
  const [hasNext, setHasNext] = useState(invoicesData.metadata[0].hasNext);
  const [orderData, setOrderData] = useState(invoicesData.orderData);
  // useUpdateDashboardOpenedOnceUpdateMutation();
  const [selected, setSelected] = useState(0);
  const [
    isContextualSaveBarActionResultModalActive,
    setIsContextualSaveBarActionResultModalActive,
  ] = useState(false);
  const closeContextualSaveBarActionResultModal = () => {
    setIsContextualSaveBarActionResultModalActive(false);
  };
  const redirectContextualSaveBarActionResultModal = () => {
    router.push('/pricing');
  };
  const [sortDirection, setSortDirection] = useState<
    'ascending' | 'descending'
  >('ascending');
  const [
    contextualSaveBarActionResultModalContent,
    setContextualSaveBarActionResultModalContent,
  ] = useState({
    isMergePdfAction: false,
    status: '',
    message: '',
  });
  const resourceIDResolver = (order: any) => order.orderId;

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
    clearSelection,
  } = useIndexResourceState(orderData, { resourceIDResolver });
  const { mode, setMode } = useSetIndexFiltersMode(IndexFiltersMode.Default);

  const [paymentStatus, setPaymentStatus] = useState<string[]>([]);
  const [fulfillmentStatus, setFulfillmentStatus] = useState<string[]>([]);
  const [mailStatus, setMailStatus] = useState<string[]>([]);
  const [orderStatus, setOrderStatus] = useState<string[]>([]);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [startDateChanged, setStartDateChanged] = useState(false);
  const [endDateChanged, setEndDateChanged] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [extraQueryParams, setExtraQueryParams] = useState<{
    paymentStatus: string[];
    fulfillmentStatus: string[];
    mailStatus: string;
    orderStatus: string;
    startDate?: any;
    endDate?: any;
  }>({
    paymentStatus: [],
    fulfillmentStatus: [],
    mailStatus: '',
    orderStatus: '',
  });
  const limitOptions = ['25', '50', '75', '100'].map(option => ({
    label: option,
    value: option,
  }));
  const paymentStatusBadgeStatus = {
    paid: undefined,
    authorized: 'attention',
    partially_refunded: undefined,
    refunded: undefined,
    partially_paid: 'warning',
    pending: 'warning',
    voided: 'critical',
  };
  const paymentStatusProgressStatus = {
    paid: 'complete',
    authorized: 'attention',
    partially_refunded: 'partiallyComplete',
    refunded: 'complete',
    partially_paid: 'partiallyComplete',
    pending: 'incomplete',
    voided: 'complete',
  };

  const fulfillmentStatusProgressStatus = {
    unfulfilled: 'incomplete',
    fulfilled: 'complete',
    partial: 'partiallyIncomplete',
    restocked: 'partiallyIncomplete',
  };
  const fulfillmentStatusBadgeStatus = {
    unfulfilled: 'attention',
    fulfilled: 'info',
    partial: 'warning',
    restocked: 'info',
  };
  const monthNames = useMemo(
    () => [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    [],
  );
  const columnNames = useMemo(
    () => [
      'orderNo',
      'shopifyOrderNo',
      'invoiceDate',
      'customerName',
      'total',
      'paymentStatus',
      'fulfillmentStatus',
      'status',
    ],
    [],
  );

  const onTotalEntryOnPageChange = (value: number) => {
    setTotalEntryOnPage(value);
    setParams(prev => ({
      ...prev,
      limit: value,
    }));
  };
  const onSort = (headingIndex: number) => {
    let tempDirection = '';
    if (sort.column) {
      tempDirection = sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      tempDirection = 'desc';
    }
    const tempColumn = columnNames[headingIndex];
    setParams({
      direction: tempDirection,
      column: tempColumn,
      currentPage: 1,
      searchText: queryValue!.trim().replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'),
      limit: totalEntryOnPage,
    });
    setSort({ direction: tempDirection, column: tempColumn });
  };
  const handlePaymentStatusChange = (value: string[]) => {
    const tempExtraQueryParams = {
      ...extraQueryParams,
      paymentStatus: value,
    };
    setParams(prev => ({
      ...prev,
      ...tempExtraQueryParams,
    }));
    setPaymentStatus(value);
    setExtraQueryParams(tempExtraQueryParams);
  };
  const handleFulfillmentStatusChange = (value: string[]) => {
    const tempExtraQueryParams = {
      ...extraQueryParams,
      fulfillmentStatus: value,
    };
    setParams(prev => ({
      ...prev,
      ...tempExtraQueryParams,
    }));
    setExtraQueryParams(tempExtraQueryParams);
    setFulfillmentStatus(value);
  };
  const handleMailStatusChange = (value: string[]) => {
    const tempExtraQueryParams = {
      ...extraQueryParams,
      mailStatus: value[0],
    };
    setParams(prev => ({
      ...prev,
      ...tempExtraQueryParams,
    }));
    setExtraQueryParams(tempExtraQueryParams);
    setMailStatus(value);
  };
  const onStartDateChange = (val: any) => {
    setStartDateChanged(true);
    const startingDate = new Date(val);
    startingDate.setHours(0, 0, 0, 0);
    const tempExtraQueryParams = {
      ...extraQueryParams,
      startDate: startingDate.toUTCString(),
    };
    setParams(prev => ({
      ...prev,
      ...tempExtraQueryParams,
    }));
    setExtraQueryParams(tempExtraQueryParams);
  };
  const onEndDateChange = (val: any) => {
    setEndDateChanged(true);
    const endingDate = new Date(val);
    endingDate.setHours(23, 59, 59, 999);
    const tempExtraQueryParams = {
      ...extraQueryParams,
      endDate: endingDate.toUTCString(),
    };
    setParams(prev => ({
      ...prev,
      ...tempExtraQueryParams,
    }));
    setExtraQueryParams(tempExtraQueryParams);
  };
  const sendToCustomers = () => {
    sendPDFsToCustomersMutation.mutate(
      {
        ids: Object.values(selectedResources).map(
          stringKey => Number(stringKey),
          {},
        ),
      },
      {
        onSuccess: (data: any) => {
          setContextualSaveBarActionResultModalContent({
            ...data,
            isMergePdfAction: false,
          });
          setIsContextualSaveBarActionResultModalActive(true);
          clearSelection();
        },
      },
    );
  };
  const printPDFs = () => {
    sendMergedPDFsToOwnerMutation.mutate(
      {
        ids: Object.values(selectedResources).map(
          stringKey => Number(stringKey),
          {},
        ),
      },
      {
        onSuccess: (data: any) => {
          setContextualSaveBarActionResultModalContent({
            ...data,
            isMergePdfAction: true,
          });
          setIsContextualSaveBarActionResultModalActive(true);
          clearSelection();
        },
      },
    );
  };
  const sendToMe = () => {
    sendPDFsToOwnerMutation.mutate(
      {
        ids: Object.values(selectedResources).map(
          stringKey => Number(stringKey),
          {},
        ),
      },
      {
        onSuccess: (data: any) => {
          setContextualSaveBarActionResultModalContent({
            ...data,
            isMergePdfAction: false,
          });
          clearSelection();
          setIsContextualSaveBarActionResultModalActive(true);
        },
      },
    );
  };
  const promotedBulkActions = [
    {
      content: 'Send invoices to customers',
      onAction: () => sendToCustomers(),
    },
    {
      content: 'Send merged invoices to me',
      onAction: () => printPDFs(),
    },
  ];
  const bulkActions = [
    {
      content: 'Send individual invoices to me',
      onAction: () => sendToMe(),
    },
  ];
  const handleOrderStatusChange = (value: string[]) => {
    const tempExtraQueryParams = {
      ...extraQueryParams,
      orderStatus: value[0],
    };
    setParams(prev => ({
      ...prev,
      ...tempExtraQueryParams,
    }));
    setExtraQueryParams(tempExtraQueryParams);
    setOrderStatus(value);
  };
  const handleQueryValueChange = (value: string) => {
    setQueryValue(value);
    // setParams(prev => ({
    //   ...prev,
    //   searchText: value.trim().replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'),
    // }));
  };
  const handlePaymentStatusRemove = () => {
    setPaymentStatus([]);
    setExtraQueryParams(prev => ({
      ...prev,
      paymentStatus: [],
    }));
    setParams(prev => ({
      ...prev,
      currentPage: 1,
      paymentStatus: [],
    }));
  };
  const handleFulfillmentStatusRemove = () => {
    setFulfillmentStatus([]);
    setExtraQueryParams(prev => ({
      ...prev,
      fulfillmentStatus: [],
    }));
    setParams(prev => ({
      ...prev,
      currentPage: 1,
      fulfillmentStatus: [],
    }));
  };
  const handleMailStatusRemove = () => {
    setExtraQueryParams(prev => ({
      ...prev,
      mailStatus: '',
    }));
    setParams(prev => ({
      ...prev,
      currentPage: 1,
      mailStatus: '',
    }));
    setMailStatus([]);
  };
  const handleOrderStatusRemove = () => {
    setExtraQueryParams(prev => ({
      ...prev,
      orderStatus: '',
    }));
    setParams(prev => ({
      ...prev,
      currentPage: 1,
      orderStatus: '',
    }));
    setOrderStatus([]);
  };
  const handleDateRangeRemove = () => {
    setExtraQueryParams(prev => ({
      ...prev,
      startDate: '',
      endDate: '',
    }));
    setStartDateChanged(false);
    setEndDateChanged(false);
    setSelectedStartDate(new Date());
    setSelectedEndDate(new Date());
    setParams(prev => ({
      ...prev,
      currentPage: 1,
      startDate: '',
      endDate: '',
    }));
  };
  const handleQueryValueRemove = useCallback(() => {
    setQueryValue('');
    setParams(prev => ({
      ...prev,
      searchText: '',
    }));
  }, []);
  const handleFiltersClearAll = () => {
    handlePaymentStatusRemove();
    handleFulfillmentStatusRemove();
    handleMailStatusRemove();
    handleOrderStatusRemove();
    handleQueryValueRemove();
    handleDateRangeRemove();
  };
  const onHandleCancel = () => {
    handleFiltersClearAll();
  };

  const getInvoiceDate = (date: any) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const dateNew = `${day < 10 ? `0${day}` : day} ${
      monthNames[month]
    } ${year}`;
    return dateNew.toString();
  };
  const filters = [
    {
      key: 'paymentStatus',
      oncancel: () => {
        handlePaymentStatusRemove();
      },
      label: 'Payment status',
      filter: (
        <ChoiceList
          title='Payment status'
          titleHidden
          choices={Object.keys(paymentFilters).map(key => ({
            value: key,
            label: paymentFilters[key as keyof typeof paymentFilters],
          }))}
          selected={paymentStatus || []}
          onChange={handlePaymentStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'fulfillmentStatus',
      label: 'Fulfillment status',
      filter: (
        <ChoiceList
          title='Fulfillment status'
          titleHidden
          choices={Object.keys(fulfillmentFilters).map(key => ({
            value: key,
            label: fulfillmentFilters[key as keyof typeof fulfillmentFilters],
          }))}
          selected={fulfillmentStatus || []}
          onChange={handleFulfillmentStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'mailStatus',
      label: 'Mail status',
      filter: (
        <ChoiceList
          title='Mail status'
          titleHidden
          choices={mailFilterOptions}
          selected={mailStatus || []}
          onChange={handleMailStatusChange}
        />
      ),
      shortcut: true,
    },
    {
      key: 'orderStatus',
      label: 'Order Status',
      filter: (
        <ChoiceList
          title='Order status'
          titleHidden
          choices={orderStatusFilterOptions}
          selected={orderStatus || []}
          onChange={handleOrderStatusChange}
        />
      ),
    },
    {
      key: 'datePickerRange',
      label: 'Date',
      filter: (
        <DateRangePicker
          startDateChanged={startDateChanged}
          endDateChanged={endDateChanged}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          setSelectedEndDate={setSelectedEndDate}
          setSelectedStartDate={setSelectedStartDate}
          onEndDateChange={onEndDateChange}
          onStartDateChange={onStartDateChange}
        />
      ),
    },
  ];
  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const disambiguateLabel = (key: string, value: string | string[]): string => {
    switch (key) {
      case 'paymentStatus':
        return `Payment: ${(value as string[])
          .map(val => capitalizeFirstLetter(val.split('_').join(' ')))
          .join(', ')}`;
      case 'fulfillmentStatus':
        return `Fulfillment: ${(value as string[])
          .map(val => {
            if (val === 'null') return 'Unfulfilled';
            return capitalizeFirstLetter(val.split('_').join(' '));
          })
          .join(', ')}`;
      case 'mailStatus':
        return `Mail: ${(value as string[])
          .map(val => capitalizeFirstLetter(val.split('_').join(' ')))
          .join(', ')}`;
      case 'orderStatus':
        return `Order: ${(value as string[])
          .map(val => capitalizeFirstLetter(val.split('_').join(' ')))
          .join(', ')}`;
      default:
        return value as string;
    }
  };
  const disambiguateLabelForDateRange = (start: any, end: any) => {
    let label = 'Order date: ';
    if (start && end) {
      label += `${formatDate(new Date(start), dateFilterFormat)} - ${formatDate(
        new Date(end),
        dateFilterFormat,
      )}`;
    } else if (start) {
      label += `Starting ${formatDate(new Date(start), dateFilterFormat)}`;
    } else if (end) {
      label += `Ending ${formatDate(new Date(end), dateFilterFormat)}`;
    }
    return label;
  };
  function isEmpty(value: string | string[]): boolean {
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return value === '' || value == null;
  }

  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];
  if (paymentStatus && !isEmpty(paymentStatus)) {
    const key = 'paymentStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, paymentStatus),
      onRemove: handlePaymentStatusRemove,
    });
  }
  if (fulfillmentStatus && !isEmpty(fulfillmentStatus)) {
    const key = 'fulfillmentStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, fulfillmentStatus),
      onRemove: handleFulfillmentStatusRemove,
    });
  }
  if (mailStatus && !isEmpty(mailStatus)) {
    const key = 'mailStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, mailStatus),
      onRemove: handleMailStatusRemove,
    });
  }
  if (orderStatus && !isEmpty(orderStatus)) {
    const key = 'orderStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, orderStatus),
      onRemove: handleOrderStatusRemove,
    });
  }
  if (extraQueryParams.startDate || extraQueryParams.endDate) {
    const key = 'datePickerRange';
    appliedFilters.push({
      key,
      label: disambiguateLabelForDateRange(
        extraQueryParams.startDate,
        extraQueryParams.endDate,
      ),
      onRemove: handleDateRangeRemove,
    });
  }
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };
  const rowMarkup = orderData.map((invoice: any, index: number) => (
    <IndexTable.Row
      id={invoice.orderId}
      key={invoice.orderId}
      selected={selectedResources.includes(invoice.orderId)}
      position={index}
    >
      <IndexTable.Cell>
        <div
          className={
            invoice.isOrderCancelled ? styles.invoiceCancelledViewBtn : ''
          }
          role='none'
          onKeyDown={undefined}
          onClick={event => {
            event.stopPropagation();
          }}
          // style={{ textDecoration= 'li'  }}
        >
          <ViewInvoiceButton
            orderData={orderData}
            setOrderData={setOrderData}
            setErrToast={setErrToast}
            invoice={invoice}
          />
        </div>
      </IndexTable.Cell>
      <IndexTable.Cell
        className={invoice.isOrderCancelled ? styles.isOrderCancelled : ''}
      >
        {invoice.shopifyOrderNum !== invoice.orderNum
          ? invoice.shopifyOrderNum
          : '-'}
      </IndexTable.Cell>
      <IndexTable.Cell
        className={invoice.isOrderCancelled ? styles.isOrderCancelled : ''}
      >
        {getInvoiceDate(invoice.invoiceDate)}
      </IndexTable.Cell>
      <IndexTable.Cell
        className={invoice.isOrderCancelled ? styles.isOrderCancelled : ''}
      >
        {invoice.customerName || '-'}
      </IndexTable.Cell>
      <IndexTable.Cell
        className={`${
          invoice.isOrderCancelled ? styles.isOrderCancelled : ''
        } ${styles.tableColumnTextAlignedRight}`}
      >
        {invoice.totalAmount}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge
          progress={
            paymentStatusProgressStatus[
              invoice.paymentStatus as keyof typeof paymentStatusProgressStatus
            ] as any
          }
          status={
            paymentStatusBadgeStatus[
              invoice.paymentStatus as keyof typeof paymentStatusBadgeStatus
            ] as any
          }
        >
          {capitalizeFirstLetter(invoice.paymentStatus.split('_').join(' '))}
        </Badge>
      </IndexTable.Cell>
      <IndexTable.Cell className={styles.fulfillmentColumn}>
        <Badge
          progress={
            fulfillmentStatusProgressStatus[
              invoice.fulfillmentStatus as keyof typeof fulfillmentStatusProgressStatus
            ] as any
          }
          status={
            fulfillmentStatusBadgeStatus[
              invoice.fulfillmentStatus as keyof typeof fulfillmentStatusBadgeStatus
            ] as any
          }
        >
          {capitalizeFirstLetter(
            invoice.fulfillmentStatus.split('_').join(' '),
          )}
        </Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {invoice.status === 'Sent' ? (
          <Badge status='success'>{invoice.status}</Badge>
        ) : (
          <Badge>{invoice.status}</Badge>
        )}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <ActionPopover
          setSuccessToastVisible={setSuccessToastVisible}
          isOpen={invoice.popoverActive}
          toggle={() => {
            // const order = orderData.find(
            //   (tempOrder: any) => tempOrder.orderId === invoice.orderId,
            // );
            const tempOrders = orderData.map((temp: any) => ({
              ...temp,
              popoverActive:
                temp.orderId === invoice.orderId && !temp.popoverActive,
            }));
            // setCurrentOrder(invoice.orderId);
            // if (!order) return;
            // order.popoverActive = !order.popoverActive;
            setOrderData([...tempOrders]);
          }}
          key={invoice.orderId}
          setErrToast={setErrToast}
          isFetching={isFetching}
          orderData={orderData}
          setOrderData={setOrderData}
          invoice={invoice}
        />
        {/* </div> */}
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setParams(prev => ({
      ...prev,
      currentPage: page,
    }));
  };
  useEffect(() => {
    setParams(prev => ({
      ...prev,
      searchText: debouncedQueryValue
        .trim()
        .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'),
    }));
  }, [debouncedQueryValue]);

  useEffect(() => {
    queryClient.invalidateQueries(useInvoicesQueryTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    setOrderData(invoicesData.orderData);
    setHasNext(invoicesData.metadata[0].hasNext);
  }, [invoicesData]);

  useEffect(() => {
    setSortColumnIndex(
      columnNames.findIndex((element: string) => element === sort.column),
    );
    setSortDirection(sort.direction === 'asc' ? 'ascending' : 'descending');
  }, [sort, columnNames]);
  useEffect(() => {
    clearSelection();
    setCurrentPage(params.currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.currentPage]);

  return (
    <>
      {errToast.visible && (
        <Toast
          onDismiss={() => {
            setErrToast({ visible: false, message: 'Something went wrong' });
          }}
          error
          content={errToast.message}
          duration={2000}
        />
      )}
      {successToastVisible && (
        <Toast
          onDismiss={() => {
            setSuccessToastVisible(false);
          }}
          content='Mail sent successfully'
          duration={2000}
        />
      )}
      <HomeLayout
        onPageChange={() => {
          onPageChange(currentPage - 1);
        }}
        currentPage={currentPage}
        hasNext={hasNext}
        hasPreviousPage={currentPage !== 1}
        onSelectChange={val => onTotalEntryOnPageChange(Number(val))}
        totalEntryOnPage={totalEntryOnPage}
        filterProps={{
          sortOptions: sortOptions,
          loading:
            isFetching ||
            sendMergedPDFsToOwnerMutation.isLoading ||
            sendPDFsToCustomersMutation.isLoading ||
            sendPDFsToOwnerMutation.isLoading,
          sortSelected: [`${sort.column} ${sort.direction}`],
          onSort: val => {
            const tempDirection = val[0].split(' ')[1];
            const tempColumn = val[0].split(' ')[0];
            setParams(prev => ({
              ...prev,
              direction: tempDirection,
              column: tempColumn,
              currentPage: 1,
            }));
            setSort({ direction: tempDirection, column: tempColumn });
          },
          queryValue: queryValue,
          onQueryChange: handleQueryValueChange,
          onQueryClear: () => {
            setQueryValue('');
            setParams(prev => ({
              ...prev,
              searchText: ''.trim().replace(/[\\^$.*+?()[\]{}|]/g, '\\$&'),
            }));
          },
          cancelAction: {
            onAction: onHandleCancel,
            disabled: false,
            loading: false,
          },
          selected: selected,
          onSelect: setSelected,
          filters: filters,
          appliedFilters: appliedFilters,
          onClearAll: handleFiltersClearAll,
          mode: mode,
          setMode: setMode,
        }}
      >
        <IndexTable
          // condensed={windowWidth.current < 460}
          bulkActions={bulkActions}
          promotedBulkActions={promotedBulkActions}
          emptyState={
            <EmptySearchResult
              title='No orders with the applied filters'
              description='Try changing the filters or search term'
              withIllustration
            />
          }
          sortDirection={sortDirection}
          sortColumnIndex={sortColumnIndex}
          onSort={val => {
            onSort(val);
          }}
          sortable={[true, true, true, true, true, true, true, true, false]}
          resourceName={resourceName}
          itemCount={orderData.length}
          selectedItemsCount={
            allResourcesSelected ? 'All' : selectedResources.length
          }
          onSelectionChange={handleSelectionChange}
          headings={[
            { title: 'Invoice' },
            { title: 'Order' },
            { title: 'Date' },
            { title: 'Name' },
            { title: 'Total', alignment: 'end' },
            { title: 'Payment' },
            { title: 'Fulfillment' },
            { title: 'Status' },
            { title: '' },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </HomeLayout>
    </>
  );
}

export default DashBoardPage;
