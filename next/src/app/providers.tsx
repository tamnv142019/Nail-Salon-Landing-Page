'use client';

import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '../components/ThemeProvider';
import { LanguageProvider } from '../contexts/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
