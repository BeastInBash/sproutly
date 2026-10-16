import { useQuery } from '@tanstack/react-query';

import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { authClient } from '@/lib/auth-client';
import { normalizeUsername, validateUsername } from '@/lib/username';

export type UsernameStatus =
  | { state: 'idle' }
  | { state: 'invalid'; message: string }
  | { state: 'checking' }
  | { state: 'available' }
  | { state: 'taken' }
  | { state: 'unknown' };

export const usernameQueryKey = (username: string) => ['username-available', username] as const;

/**
 * Checks a username while the user types: validates locally first, then asks the server
 * once typing pauses for 400ms. Results are cached so backspacing doesn't re-request.
 */
export function useUsernameAvailability(raw: string): UsernameStatus {
  const username = normalizeUsername(raw);
  const debounced = useDebouncedValue(username, 400);
  const problem = username ? validateUsername(username) : undefined;
  const settled = debounced === username;

  const query = useQuery({
    queryKey: usernameQueryKey(debounced),
    queryFn: async () => {
      const { data, error } = await authClient.isUsernameAvailable({ username: debounced });
      if (error) throw new Error(error.message ?? 'Username check failed');
      return data.available;
    },
    enabled: !!debounced && !validateUsername(debounced),
    staleTime: 30_000,
    retry: false,
  });

  if (!username) return { state: 'idle' };
  if (problem) return { state: 'invalid', message: problem };
  if (!settled || query.isFetching) return { state: 'checking' };
  if (query.isError) return { state: 'unknown' };
  if (query.data === true) return { state: 'available' };
  if (query.data === false) return { state: 'taken' };
  return { state: 'checking' };
}
