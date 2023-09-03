import DashboardLoadingCom from "@/components/home/LoadingScreen";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import { Suspense } from "react";
import DashBoardPage from "@/components/home/Index";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import AppQueryClientProvider from "@/contexts/react-query.context";

function DashboardPage() {
  if (typeof window === "undefined") {
    return (
      <AppProvider i18n={enTranslations}>
        <DashboardLoadingCom />
      </AppProvider>
    );
  }

  return (
    <AppQueryClientProvider>
      <AppBridgeProvider
        config={{
          forceRedirect: true,
          host: new URLSearchParams(window.location.search).get("host")!,
          apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
        }}
      >
        <AppProvider i18n={enTranslations}>
          <Suspense fallback={<DashboardLoadingCom />}>
            <DashBoardPage />
          </Suspense>
        </AppProvider>
      </AppBridgeProvider>
    </AppQueryClientProvider>
  );
}

export default DashboardPage;
