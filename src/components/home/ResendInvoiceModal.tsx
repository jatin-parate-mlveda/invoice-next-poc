import { Modal } from '@shopify/app-bridge-react';
import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ForwardRefRenderFunction,
} from 'react';

export type ResendInvoiceModalRefType = {
  openModal: (temp: any) => void;
  closeModal: () => void;
};
const ResendInvoiceModal: ForwardRefRenderFunction<
  ResendInvoiceModalRefType,
  {
    sendMail: (invoice: any) => void;
  }
> = ({ sendMail }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);
  const closeModal = () => {
    setIsOpen(false);
  };
  const onYesClick = () => {
    closeModal();
    sendMail(invoice);
  };
  useImperativeHandle(
    ref,
    () => ({
      openModal: (temp: any) => {
        setInvoice(temp);
        setIsOpen(true);
      },
      closeModal,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <Modal
      message={
        invoice && invoice.isOrderCancelled
          ? 'This order is cancelled. Do you still want to re-send email?'
          : 'Do you want to resend this invoice?'
      }
      open={isOpen}
      onClose={closeModal}
      primaryAction={{
        content: 'Yes',
        onAction: onYesClick,
      }}
      secondaryActions={[
        {
          content: 'No',
          onAction: closeModal,
        },
      ]}
    />
  );
};
export default forwardRef(ResendInvoiceModal);
