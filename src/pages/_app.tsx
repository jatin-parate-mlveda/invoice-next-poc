import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";
import AppQueryClientProvider from "@/contexts/react-query.context";

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window === "undefined") {
    const { LoadingScreen } = Component as any;
    return (
      <AppProvider i18n={enTranslations}>
        <LoadingScreen />
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
          <Component {...pageProps} />
        </AppProvider>
      </AppBridgeProvider>
    </AppQueryClientProvider>
  );
}
