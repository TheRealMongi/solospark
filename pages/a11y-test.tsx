import React from 'react';
import Head from 'next/head';
import AccessibilityTest from '../components/a11y/AccessibilityTest';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

/**
 * Accessibility Test Page
 * This page is used to test the accessibility of UI components
 */
export default function A11yTestPage() {
  return (
    <>
      <Head>
        <title>Accessibility Test | SoloSpark</title>
        <meta name="description" content="Test the accessibility of SoloSpark UI components" />
      </Head>
      
      <SignedIn>
        <div className="min-h-screen bg-background">
          <AccessibilityTest />
        </div>
      </SignedIn>
      
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
