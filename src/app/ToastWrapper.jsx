'use client'
// import dynamic from 'next/dynamic';
import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import ReduxProviders from './ReduxProvider';

// const ReduxProviders = dynamic(() => import('./ReduxProvider.jsx'), {
//   ssr: false, // Disable server-side rendering for this component
// });

export default function Wrapper({ children }) {
  return (
    <>
      <ReduxProviders>{children}</ReduxProviders>
      <Toaster position="top-right" />
    </>
  );
}