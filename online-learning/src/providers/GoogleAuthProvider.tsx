"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from "react";

type GoogleConfig = {
  isConfigured: boolean;
};

const GoogleConfigContext = createContext<GoogleConfig>({
  isConfigured: false,
});

const fallbackClientId = "missing-google-client-id";

export function useGoogleConfig() {
  return useContext(GoogleConfigContext);
}

export default function GoogleAuthProvider({
  children,
}: PropsWithChildren) {
  const configuredClientId = useMemo(
    () => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ?? "",
    []
  );

  const isConfigured = configuredClientId.length > 0;
  const clientId = isConfigured ? configuredClientId : fallbackClientId;

  if (!isConfigured && process.env.NODE_ENV !== "production") {
    console.warn("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured.");
  }

  const contextValue = useMemo<GoogleConfig>(
    () => ({ isConfigured }),
    [isConfigured]
  );

  return (
    <GoogleConfigContext.Provider value={contextValue}>
      <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
    </GoogleConfigContext.Provider>
  );
}
