"use client";

import { LayoutProvider } from "@once-ui-system/core";
import { ReactNode } from "react";

interface OnceUIProviderProps {
  children: ReactNode;
}

export function OnceUIProvider({ children }: OnceUIProviderProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}
