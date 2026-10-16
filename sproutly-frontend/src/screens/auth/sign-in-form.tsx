import { useRef, useState } from 'react';
import type { TextInput } from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/button';
import { TextField } from '@/components/text-field';
import { signIn } from '@/lib/auth-client';

import { AuthScaffold } from './auth-scaffold';
import { useGoogleSignIn } from './use-google-sign-in';

const schema = z.object({
  email: z.email('Enter a valid email.'),
  password: z.string().min(1, 'Enter your password.'),
});

type Fields = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

export function SignInForm() {
  const [fields, setFields] = useState<Fields>({ email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const passwordRef = useRef<TextInput>(null);
  const google = useGoogleSignIn(setFormError);

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    // Clear a field's error as soon as the user starts fixing it.
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit() {
    setFormError(undefined);
    const parsed = schema.safeParse(fields);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Fields] ??= issue.message;
      setErrors(next);
      return;
    }

    setSubmitting(true);
    // On success the session updates and the root layout's guards swap to the app.
    const { error } = await signIn.email({ email: fields.email.trim(), password: fields.password });
    setSubmitting(false);

    if (error) {
      setFormError(
        error.status === 401
          ? 'That email and password do not match. Check them and try again.'
          : (error.message ?? 'Sign in did not work. Try again.'),
      );
    }
  }

  return (
    <AuthScaffold
      title="Welcome back"
      lead="Sign in to see what your garden needs today."
      formError={formError}
      onGoogle={google.start}
      googleLoading={google.loading}
      switchPrompt="New to Sproutly?"
      switchLabel="Create an account"
      switchHref="/sign-up"
      submit={<Button title="Sign in" loading={submitting} onPress={onSubmit} block />}>
      <TextField
        label="Email"
        value={fields.email}
        onChangeText={set('email')}
        error={errors.email}
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <TextField
        ref={passwordRef}
        label="Password"
        value={fields.password}
        onChangeText={set('password')}
        error={errors.password}
        secureTextEntry
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={onSubmit}
      />
    </AuthScaffold>
  );
}
