import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { api } from '@/lib/api';

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export const meQueryKey = ['users', 'me'] as const;

export function useMe() {
  return useQuery({ queryKey: meQueryKey, queryFn: () => api<User>('/users/me') });
}

export function useUpdateMe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<Pick<User, 'name' | 'image'>>) =>
      api<User>('/users/me', { method: 'PATCH', body: input }),
    onSuccess: (user) => queryClient.setQueryData(meQueryKey, user),
  });
}
