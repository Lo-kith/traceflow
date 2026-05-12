
// This file defines TypeScript interfaces for the Traceflow client application.
export interface TraceflowConfig {
  apiUrl: string;
}

// Interface  error payload sent from the client to the server
export interface ErrorPayload {
  message: string;
  stack?: string;
  source?: string;
  lineno?: number;
  colno?: number;
}