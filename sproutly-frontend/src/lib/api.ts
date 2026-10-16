import { Platform } from 'react-native';

import { authClient } from '@/lib/auth-client';
import { env } from '@/lib/env';

export type ApiErrorBody = {
  code: string;
  message: string;
  requestId?: string;
  details?: unknown;
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiErrorBody,
  ) {
    super(body.message);
    this.name = 'ApiError';
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown };

/**
 * Calls the Sproutly API (`/api/v1/*`). Unwraps the `{ success, data }` envelope and throws
 * `ApiError` for `{ success: false, error }` responses. Native sends the Better Auth session
 * cookie from SecureStore; web relies on the browser's cookies.
 */
export async function api<T>(path: string, { body, headers, ...init }: RequestOptions = {}) {
  const isNative = Platform.OS !== 'web';
  const cookie = isNative ? await authClient.getCookie() : undefined;

  const res = await fetch(`${env.apiUrl}/api/v1${path}`, {
    ...init,
    credentials: isNative ? 'omit' : 'include',
    headers: {
      Accept: 'application/json',
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...(cookie && { Cookie: cookie }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    throw new ApiError(
      res.status,
      json?.error ?? { code: 'NETWORK_ERROR', message: `Request failed (${res.status})` },
    );
  }

  return json.data as T;
}
