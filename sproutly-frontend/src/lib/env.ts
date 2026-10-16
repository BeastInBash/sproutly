import Constants from 'expo-constants';
import { Platform } from 'react-native';

const API_PORT = 4000;

/**
 * Resolves the backend URL. Prefers EXPO_PUBLIC_API_URL; in development falls back to the
 * host running Metro so simulators and physical devices can reach the local backend.
 */
function resolveApiUrl() {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  if (!__DEV__) {
    throw new Error('EXPO_PUBLIC_API_URL must be set for production builds');
  }

  if (Platform.OS === 'web') return `http://localhost:${API_PORT}`;

  const host = Constants.expoConfig?.hostUri?.split(':')[0];
  if (host) return `http://${host}:${API_PORT}`;

  // Android emulator maps the host machine's localhost to 10.0.2.2.
  return Platform.OS === 'android' ? `http://10.0.2.2:${API_PORT}` : `http://localhost:${API_PORT}`;
}

export const env = {
  apiUrl: resolveApiUrl(),
  scheme: 'sproutly',
} as const;
