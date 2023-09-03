import { Modal } from "@shopify/app-bridge-react";

type Props = {
  closeContextualSaveBarActionResultModal: () => void;
  contextualSaveBarActionResultModalContent: {
    status: string;
    isMergePdfAction: boolean;
    message: string;
  };
  capitalizeFirstLetter: (val: string) => string;
  redirectContextualSaveBarActionResultModal: () => void;
  open: boolean;
};
const ContextualSaveBarActionResultModal: React.FC<Props> = ({
  closeContextualSaveBarActionResultModal,
  contextualSaveBarActionResultModalContent,
  capitalizeFirstLetter,
  redirectContextualSaveBarActionResultModal,
  open,
}) => (
  <Modal
    message={
      contextualSaveBarActionResultModalContent.status === "failed"
        ? "This feature is available only for the customers who are using the paid version of the app."
        : contextualSaveBarActionResultModalContent.message
    }
    open={open}
    onClose={closeContextualSaveBarActionResultModal}
    title={
      !contextualSaveBarActionResultModalContent.isMergePdfAction
        ? capitalizeFirstLetter(
            contextualSaveBarActionResultModalContent.status,
          )
        : contextualSaveBarActionResultModalContent.status === "failed"
        ? "Upgrade Now"
        : "Bulk pdf"
    }
    primaryAction={{
      content:
        contextualSaveBarActionResultModalContent.status === "failed"
          ? "Start 7 days free trial now"
          : "Close",
      onAction:
        contextualSaveBarActionResultModalContent.status === "failed"
          ? redirectContextualSaveBarActionResultModal
          : closeContextualSaveBarActionResultModal,
    }}
  />
);

export default ContextualSaveBarActionResultModal;
