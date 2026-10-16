import { useState } from 'react';
import { Platform } from 'react-native';

import { signIn } from '@/lib/auth-client';

/** Starts Google OAuth. Native opens an auth session and returns via the sproutly:// scheme. */
export function useGoogleSignIn(onError: (message: string) => void) {
  const [loading, setLoading] = useState(false);

  async function start() {
    setLoading(true);
    // Web redirects the whole page, so it needs an absolute URL back to the app.
    const callbackURL = Platform.OS === 'web' ? `${window.location.origin}/` : '/';
    const { error } = await signIn.social({ provider: 'google', callbackURL });
    setLoading(false);

    if (error) {
      const notConfigured = error.code === 'PROVIDER_NOT_FOUND';
      onError(
        notConfigured
          ? 'Google sign-in is not set up yet. Use your email for now.'
          : (error.message ?? 'Google sign-in did not finish. Try again.'),
      );
    }
  }

  return { start, loading };
}
