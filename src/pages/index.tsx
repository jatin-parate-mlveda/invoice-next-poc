import DashboardLoadingCom from "@/components/home/LoadingScreen";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import { Suspense } from "react";
// import DashBoardPage from "@/components/home/Index";
import { AppProvider } from "@shopify/polaris";
import AppQueryClientProvider from "@/contexts/react-query.context";
import dynamic from "next/dynamic";

const DashboardPageDynamic = dynamic(() => import('@/components/home/Index'));

function DashboardPage() {
  if (typeof window === "undefined") {
    return (
      <AppProvider i18n={{}}>
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
        <AppProvider i18n={{}}>
          <Suspense fallback={<DashboardLoadingCom />}>
            <DashboardPageDynamic />
          </Suspense>
        </AppProvider>
      </AppBridgeProvider>
    </AppQueryClientProvider>
  );
}

export default DashboardPage;
