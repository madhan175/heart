import { Redirect } from 'expo-router';
import { useAuth } from '@/store/auth';
import { ReadableStream } from 'web-streams-polyfill';

// Cast the polyfilled ReadableStream to the expected type
global.ReadableStream = ReadableStream as typeof global.ReadableStream;

export default function Index() {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? (
    <Redirect href="/(tabs)" />
  ) : (
    <Redirect href="/(auth)/login" />
  );
}