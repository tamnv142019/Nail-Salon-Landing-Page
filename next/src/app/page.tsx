'use client';

import { useRouter } from 'next/navigation';
import { HomePage } from '../views/HomePage';

export default function Page() {
  const router = useRouter();

  return (
    <HomePage
      onNavigateToServices={(serviceId?: string) => {
        if (serviceId) {
          router.push(`/services?service=${encodeURIComponent(serviceId)}`);
          return;
        }
        router.push('/services');
      }}
      onNavigateToPrivacy={() => router.push('/privacy')}
      onNavigateToTerms={() => router.push('/terms')}
    />
  );
}
