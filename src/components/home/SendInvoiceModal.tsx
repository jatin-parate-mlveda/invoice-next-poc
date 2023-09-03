import { Modal } from '@shopify/app-bridge-react';
import {
  forwardRef,
  useImperativeHandle,
  useState,
  type ForwardRefRenderFunction,
} from 'react';

export type SendInvoiceModalRefType = {
  openModal: (temp: any) => void;
  closeModal: () => void;
};

const SendInvoiceModal: ForwardRefRenderFunction<
  SendInvoiceModalRefType,
  {
    sendMail: (invoice: any) => any;
  }
> = ({ sendMail }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [invoice, setInvoice] = useState<any>(null);
  const closeModal = () => {
    setIsOpen(false);
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

  const onYesClick = () => {
    sendMail(invoice);
    closeModal();
  };

  return (
    <Modal
      message={
        invoice && invoice?.isOrderCancelled
          ? 'This order is cancelled. Do you still want to send email?'
          : 'Do you want to send this invoice?'
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
export default forwardRef(SendInvoiceModal);
