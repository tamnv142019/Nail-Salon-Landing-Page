'use client';

import { useRouter } from 'next/navigation';
import { TermsOfServicePage } from '../../views/TermsOfServicePage';

export default function Page() {
  const router = useRouter();

  return <TermsOfServicePage onNavigateBack={() => router.push('/')} />;
}
