import { Button } from '@shopify/polaris';
import { ExternalMinor } from '@shopify/polaris-icons';
import { usePDFDataUploadMutation } from '@/services/mutations.service';

const ViewInvoiceButton: React.FC<{
  orderData: any;
  setOrderData: (tempInvoice: any) => void;
  invoice: any;
  setErrToast: any;
}> = ({ invoice, orderData, setErrToast, setOrderData }) => {
  const uploadGeneratePDFMutation = usePDFDataUploadMutation();

  const openPDF = () => {
    if (invoice.isPDFCreated) {
      const invoiceLink = new URL(invoice.invoiceLink);
      invoiceLink.searchParams.append('timestamp', Date.now().toString());
      window.open(invoiceLink.toString(), '_blank');
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

          window.open(data.link, '_blank');
        },
        onError: () => {
          setErrToast({ visible: true, message: 'Something went wrong' });
        },
      });
    }
  };
  return (
    <Button
      disabled={false}
      plain
      onClick={() => openPDF()}
      id=''
      icon={ExternalMinor}
    >
      {invoice.orderNum}
    </Button>
  );
};

export default ViewInvoiceButton;
