import { ActionList, Button, Popover } from "@shopify/polaris";
import { useRef } from "react";
import StringConstants from "../../utils/stringConstants";
import ResendInvoiceModal, {
  ResendInvoiceModalRefType,
} from "./ResendInvoiceModal";
import SendInvoiceModal, { SendInvoiceModalRefType } from "./SendInvoiceModal";
import {
  useGeneratePDFAndSendEmailMutation,
  usePDFDataUploadMutation,
  useSendEmailMutation,
} from "@/services/mutations.service";

const ActionPopover: React.FC<{
  toggle: any;
  isOpen: boolean;
  isFetching: boolean;
  setOrderData: (tempInvoice: any) => void;
  orderData: any;
  invoice: any;
  setSuccessToastVisible: (flag: boolean) => void;
  setErrToast: any;
}> = ({
  toggle,
  isOpen,
  isFetching,
  setOrderData,
  orderData,
  invoice,
  setErrToast,
  setSuccessToastVisible,
}) => {
  const sendInvoiceModal = useRef<null | ResendInvoiceModalRefType>(null);
  const resendInvoiceModal = useRef<null | SendInvoiceModalRefType>(null);
  const uploadSendEmailMutation = useSendEmailMutation();
  const uploadGeneratePDFAndSendEmailMutation =
    useGeneratePDFAndSendEmailMutation();
  const uploadGeneratePDFMutation = usePDFDataUploadMutation();

  const sendMail = (tempInvoice: any) => {
    setOrderData(orderData);
    const reqData = {
      orderId: tempInvoice.orderId,
    };
    if (tempInvoice.isPDFCreated) {
      uploadSendEmailMutation.mutate(reqData, {
        onSuccess: (data: any) => {
          if (data.status === "Sent") setSuccessToastVisible(true);
          else if (data.message)
            setErrToast({ visible: true, message: data.message });
          else
            setErrToast({
              visible: true,
              message: StringConstants["toast.error.email"],
            });
          const tempInvoiceList = Object.assign([], orderData);
          const updatedItem = tempInvoiceList.find(
            (i: any) => i.orderId === tempInvoice.orderId,
          );
          if (updatedItem) {
            const index = tempInvoiceList.indexOf(updatedItem);
            if (index > -1) {
              tempInvoiceList[index].status =
                data.status || tempInvoiceList[index].status;
              setOrderData(tempInvoiceList);
            }
          }
        },
        onError: () => {
          setErrToast({ visible: true, message: "Something went wrong" });
        },
      });
    } else {
      uploadGeneratePDFAndSendEmailMutation.mutate(reqData, {
        onSuccess: (data: any) => {
          if (data.status === "Sent") {
            setSuccessToastVisible(true);
          } else if (data.message)
            setErrToast({ visible: true, message: data.message });
          else {
            setErrToast({
              visible: true,
              message: StringConstants["toast.error.email"],
            });
          }
          const tempInvoiceList = Object.assign([], orderData);
          const updatedItem = tempInvoiceList.find(
            (i: any) => i.orderId === tempInvoice.orderId,
          );
          if (updatedItem) {
            const index = tempInvoiceList.indexOf(updatedItem);
            if (index > -1) {
              tempInvoiceList[index].status =
                data.status || tempInvoiceList[index].status;
              setOrderData(tempInvoiceList);
            }
          }
        },
        onError: () => {
          setErrToast({ visible: true, message: "Something went wrong" });
        },
      });
    }
  };
  const regenerateInvoice = () => {
    const order = orderData.find(
      (tempOrder: any) => tempOrder.orderId === invoice.orderId,
    );
    if (!order) return;
    order.popoverActive = !order.popoverActive;
    setOrderData([...orderData]);
    uploadGeneratePDFMutation.mutate(
      { orderId: invoice.orderId },
      {
        onSuccess: (data: any) => {
          const tempInvoiceList = Object.assign([], orderData);
          const updatedItem = tempInvoiceList.find(
            (i: any) => i.orderId === invoice.orderId,
          );
          if (updatedItem) {
            const index = tempInvoiceList.indexOf(updatedItem);
            if (index > -1) {
              tempInvoiceList[index].isPDFCreated = true;
              setOrderData(tempInvoiceList);
            }
          }
          window.open(data.link, "_blank");
        },
        onError: () => {
          setErrToast({ visible: true, message: "Something went wrong" });
        },
      },
    );
  };
  const openPDF = () => {
    if (invoice.isPDFCreated) {
      const invoiceLink = new URL(invoice.invoiceLink);
      invoiceLink.searchParams.append("timestamp", Date.now().toString());
      window.open(invoiceLink.toString(), "_blank");
    } else {
      const reqData = {
        orderId: invoice.orderId,
      };
      uploadGeneratePDFMutation.mutate(reqData, {
        onSuccess: (data: any) => {
          const tempInvoiceList = Object.assign([], orderData);
          const updatedItem = tempInvoiceList.find(
            (i: any) => i.orderId === invoice.orderId,
          );
          if (updatedItem) {
            const index = tempInvoiceList.indexOf(updatedItem);
            if (index > -1) {
              tempInvoiceList[index].isPDFCreated = true;
              setOrderData(tempInvoiceList);
            }
          }

          window.open(data.link, "_blank");
        },
        onError: () => {
          setErrToast({ visible: true, message: "Something went wrong" });
        },
      });
    }
  };

  return (
    <div>
      <Popover
        active={isOpen}
        onClose={toggle}
        activator={
          <div
            className="dashboardPage__actionsBtn"
            role="none"
            onKeyDown={undefined}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Button
              loading={
                uploadGeneratePDFMutation.isLoading ||
                uploadGeneratePDFAndSendEmailMutation.isLoading ||
                uploadSendEmailMutation.isLoading
              }
              primary
              disclosure
              onClick={toggle}
            >
              Actions
            </Button>
          </div>
        }
      >
        <div
          className="dashboardPage__actionsBtn"
          role="none"
          onKeyDown={undefined}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <ActionList
            items={[
              {
                content: StringConstants["dashboard.actions.view"],
                onAction: () => {
                  openPDF();
                  const order = orderData.find(
                    (tempOrder: any) => tempOrder.orderId === invoice.orderId,
                  );
                  if (!order) return;
                  order.popoverActive = !order.popoverActive;
                  setOrderData([...orderData]);
                },
                disabled: isFetching,
              },
              {
                content:
                  invoice.status === "Sent"
                    ? StringConstants["dashboard.actions.resend"]
                    : StringConstants["dashboard.actions.send"],
                onAction: () => {
                  if (invoice.status === "Sent") {
                    resendInvoiceModal.current?.openModal(invoice);
                  } else sendInvoiceModal.current?.openModal(invoice);
                  const order = orderData.find(
                    (tempOrder: any) => tempOrder.orderId === invoice.orderId,
                  );
                  if (!order) return;
                  order.popoverActive = !order.popoverActive;
                  setOrderData([...orderData]);
                },
                disabled: isFetching,
              },
              {
                content: "Regenerate",
                onAction: () => regenerateInvoice(),
                disabled: isFetching,
              },
            ]}
          />
        </div>
      </Popover>
      <SendInvoiceModal
        sendMail={sendMail}
        key="sendInvoiceModal"
        ref={sendInvoiceModal}
      />
      <ResendInvoiceModal
        sendMail={sendMail}
        key="resendInvoiceModal"
        ref={resendInvoiceModal}
      />
    </div>
  );
};

export default ActionPopover;
