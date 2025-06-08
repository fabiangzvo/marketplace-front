"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ToastProvider } from "@heroui/toast";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Spinner } from "@heroui/spinner";

import { store, persist } from "@/lib/store";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <div className="flex items-center justify-center h-screen w-screen">
            <Spinner size="lg" />
          </div>
        }
        persistor={persist}
      >
        <SessionProvider>
          <HeroUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>
              <ToastProvider
                placement="top-right"
                toastProps={{
                  classNames: {
                    title: "font-bold text-xl",
                    description: "text-lg",
                  },
                }}
              />
              {children}
            </NextThemesProvider>
          </HeroUIProvider>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}
