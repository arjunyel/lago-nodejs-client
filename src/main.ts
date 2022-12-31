// deno-lint-ignore-file no-explicit-any
import { Api, ApiConfig, HttpResponse } from "./swagger/client.ts";

export const Client = (apiKey: string, apiConfig?: ApiConfig) => {
  const api = new Api({
    securityWorker: (apiKey) =>
      apiKey ? { headers: { Authorization: `Bearer ${apiKey}` } } : {},
    ...apiConfig,
  });
  api.setSecurityData(apiKey);
  return api;
};

type ExtractLagoError<E> = E extends (
  ...args: any
) => Promise<HttpResponse<infer T, infer P>> ? P
  : never;

// deno-lint-ignore require-await
export async function getLagoError<T>(error: any) {
  if (error instanceof Response) {
    if (!error.bodyUsed) {
      return error.json() as ExtractLagoError<T>;
    }
    return (error as HttpResponse<any, any>).error as ExtractLagoError<T>;
  }
  throw new Error(error);
}

export * from "./swagger/client.ts";
