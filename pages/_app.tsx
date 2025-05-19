import type { AppProps } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import { trpc } from '../lib/trpc-client';
import { ToastContainer } from '@/components/ui/Toast';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  // Client-side only rendering for ToastContainer
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
      {mounted && <ToastContainer />}
    </ClerkProvider>
  );
}

export default trpc.withTRPC(MyApp);
