"use client";

import { ConfigProvider, TConfig } from "@/store/config";
import { AppProgressBar } from "next-nprogress-bar";
import React from "react";

interface ProvidersProps {
  children: React.ReactNode;
  config: TConfig;
}

export default function Providers({ children, config }: ProvidersProps) {
  return (
    <>
      <ConfigProvider config={config}>
        <AppProgressBar
          height="4px"
          color={"#000000"}
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </ConfigProvider>
    </>
  );
}
