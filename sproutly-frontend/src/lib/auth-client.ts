import { expoClient } from '@better-auth/expo/client';
import { usernameClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

import { env } from '@/lib/env';

export const authClient = createAuthClient({
  baseURL: env.apiUrl,
  plugins: [
    usernameClient(),
    expoClient({
      scheme: env.scheme,
      storagePrefix: env.scheme,
      storage: SecureStore,
    }),
  ],
});

export const { useSession, signIn, signUp, signOut } = authClient;
