"use client";

import { LayoutProvider } from "@once-ui-system/core";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
