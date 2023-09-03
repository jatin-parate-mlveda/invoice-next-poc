import type { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      useErrorBoundary: true,
      suspense: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

const AppQueryClientProvider = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default AppQueryClientProvider;
