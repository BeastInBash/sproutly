/** Keep in sync with USERNAME_RULES in sproutly-backend/src/lib/auth.ts. */
export const USERNAME_RULES = { min: 3, max: 20, pattern: /^[a-zA-Z0-9_]+$/ } as const;

export const usernameHint = `${USERNAME_RULES.min} to ${USERNAME_RULES.max} letters, numbers or underscores.`;

/** Returns a problem to show the user, or undefined when the username is well-formed. */
export function validateUsername(value: string): string | undefined {
  if (value.length < USERNAME_RULES.min) return `Use at least ${USERNAME_RULES.min} characters.`;
  if (value.length > USERNAME_RULES.max) return `Use ${USERNAME_RULES.max} characters or fewer.`;
  if (!USERNAME_RULES.pattern.test(value)) return 'Use only letters, numbers and underscores.';
  return undefined;
}

/** Usernames are unique case-insensitively; the server stores them lowercased. */
export const normalizeUsername = (value: string) => value.trim().toLowerCase();
