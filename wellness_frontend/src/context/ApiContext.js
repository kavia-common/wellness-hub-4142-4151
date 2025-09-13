import React, { createContext, useContext } from 'react';
import * as api from '../api/client';

const ApiCtx = createContext(null);

// PUBLIC_INTERFACE
export function ApiProvider({ children }) {
  /** Provides API client through React Context. */
  return <ApiCtx.Provider value={api}>{children}</ApiCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useApi() {
  /** Hook to access API client. */
  const ctx = useContext(ApiCtx);
  if (!ctx) throw new Error('useApi must be used within ApiProvider');
  return ctx;
}
