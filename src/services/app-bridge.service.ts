import createApp, {
  AppBridgeState,
  ClientApplication,
} from "@shopify/app-bridge";
import { AppLink, NavigationMenu } from "@shopify/app-bridge/actions";

let appBridgeInstance: ClientApplication<AppBridgeState> | null = null;
let appNavigation: null | NavigationMenu.NavigationMenu = null;

export const initializeAppBridge = () => {
  appBridgeInstance = createApp({
    apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY!,
    host: new URLSearchParams(window.location.search).get("host")!,
  });
  appBridgeInstance.error((errData) => {
    console.log("Found error:", errData);
  });

  // @ts-ignore
  window.appBridgeInstance = appBridgeInstance;
};
export function createAppNavigation(isSetupCompleted = false) {
  if (!isSetupCompleted) return;
  if (appNavigation) {
    appNavigation.unsubscribe(true);
    appNavigation = null;
  }

  appNavigation = NavigationMenu.create(appBridgeInstance!, {
    items: [
      AppLink.create(appBridgeInstance!, {
        label: "Invoices",
        destination: "/",
      }),
      AppLink.create(appBridgeInstance!, {
        label: "Settings",
        destination: "/settings",
      }),
      AppLink.create(appBridgeInstance!, {
        label: "Pricing",
        destination: "/pricing",
      }),
      AppLink.create(appBridgeInstance!, {
        label: "Support",
        destination: "/support",
      }),
    ],
  });
}

export default function getAppBridgeInstance() {
  return appBridgeInstance;
}
