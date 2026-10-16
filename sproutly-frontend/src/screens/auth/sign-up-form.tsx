import { useQueryClient } from '@tanstack/react-query';
import { Check, X } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { ActivityIndicator, type TextInput } from 'react-native';
import Animated, { useReducedMotion } from 'react-native-reanimated';
import { z } from 'zod';

import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { TextField, type FieldMessage } from '@/components/text-field';
import { colors } from '@/constants/theme';
import { popIn } from '@/constants/motion';
import { usernameQueryKey, useUsernameAvailability, type UsernameStatus } from '@/hooks/use-username-availability';
import { signUp } from '@/lib/auth-client';
import { normalizeUsername, usernameHint, validateUsername } from '@/lib/username';

import { AuthScaffold } from './auth-scaffold';
import { useGoogleSignIn } from './use-google-sign-in';

const schema = z.object({
  username: z.string().superRefine((value, ctx) => {
    const problem = validateUsername(value.trim());
    if (problem) ctx.addIssue({ code: 'custom', message: problem });
  }),
  email: z.email('Enter a valid email.'),
  password: z.string().min(8, 'Use at least 8 characters.').max(128, 'Use 128 characters or fewer.'),
});

type Fields = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

function usernameMessage(status: UsernameStatus, value: string): FieldMessage {
  const handle = `@${normalizeUsername(value)}`;
  switch (status.state) {
    case 'idle':
      return { text: usernameHint, tone: 'muted' };
    case 'invalid':
      return { text: status.message, tone: 'error' };
    case 'checking':
      return { text: `Checking ${handle}`, tone: 'muted' };
    case 'available':
      return { text: `${handle} is free.`, tone: 'success' };
    case 'taken':
      return { text: `${handle} is taken. Try another.`, tone: 'error' };
    case 'unknown':
      return { text: 'We could not check right now. We will check again when you sign up.', tone: 'muted' };
  }
}

function UsernameMark({ status }: { status: UsernameStatus }) {
  const reducedMotion = useReducedMotion();
  const mark =
    status.state === 'checking' ? (
      <ActivityIndicator size="small" color={colors.textMuted} />
    ) : status.state === 'available' ? (
      <Icon icon={Check} size={22} color="primary" />
    ) : status.state === 'taken' ? (
      <Icon icon={X} size={22} color="urgent" />
    ) : null;

  if (!mark) return null;
  return (
    <Animated.View key={status.state} entering={popIn(reducedMotion)}>
      {mark}
    </Animated.View>
  );
}

export function SignUpForm() {
  const queryClient = useQueryClient();
  const [fields, setFields] = useState<Fields>({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const google = useGoogleSignIn(setFormError);
  const availability = useUsernameAvailability(fields.username);

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit() {
    setFormError(undefined);
    const parsed = schema.safeParse(fields);
    const next: FieldErrors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) next[issue.path[0] as keyof Fields] ??= issue.message;
    }
    if (availability.state === 'taken') next.username = usernameMessage(availability, fields.username).text;
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    const username = fields.username.trim();
    setSubmitting(true);
    // On success the session updates and the root layout's guards swap to the app.
    const { error } = await signUp.email({
      username,
      displayUsername: username,
      name: username,
      email: fields.email.trim(),
      password: fields.password,
    });
    setSubmitting(false);

    if (!error) return;
    if (error.code === 'USERNAME_IS_ALREADY_TAKEN') {
      // Someone claimed it between the live check and submit.
      queryClient.setQueryData(usernameQueryKey(normalizeUsername(username)), false);
      setErrors({ username: `@${normalizeUsername(username)} was just taken. Try another.` });
    } else if (error.code === 'USER_ALREADY_EXISTS' || error.code === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL') {
      setErrors({ email: 'An account with this email already exists. Sign in instead.' });
    } else {
      setFormError(error.message ?? 'Sign up did not work. Try again.');
    }
  }

  return (
    <AuthScaffold
      title="Start your garden"
      lead="Pick a username and we will set up your terrace."
      formError={formError}
      onGoogle={google.start}
      googleLoading={google.loading}
      switchPrompt="Already growing with us?"
      switchLabel="Sign in"
      switchHref="/sign-in"
      submit={
        <Button
          title="Create account"
          loading={submitting}
          disabled={availability.state === 'taken'}
          onPress={onSubmit}
          block
        />
      }>
      <TextField
        label="Username"
        value={fields.username}
        onChangeText={set('username')}
        error={errors.username}
        message={usernameMessage(availability, fields.username)}
        trailing={<UsernameMark status={availability} />}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="username-new"
        textContentType="username"
        maxLength={30}
        returnKeyType="next"
        submitBehavior="submit"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <TextField
        ref={emailRef}
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
        message={{ text: 'At least 8 characters.', tone: 'muted' }}
        secureTextEntry
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        onSubmitEditing={onSubmit}
      />
    </AuthScaffold>
  );
}
