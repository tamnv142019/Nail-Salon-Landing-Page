'use client';

import { useRouter } from 'next/navigation';
import { PrivacyPolicyPage } from '../../views/PrivacyPolicyPage';

export default function Page() {
  const router = useRouter();

  return <PrivacyPolicyPage onNavigateBack={() => router.push('/')} />;
}
