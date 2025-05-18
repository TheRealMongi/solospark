import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { trpc } from '../lib/trpc-client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default trpc.withTRPC(MyApp);
