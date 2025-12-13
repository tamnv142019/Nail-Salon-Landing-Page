'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ServicesPage } from '../../views/ServicesPage';

function ServicesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollToService = searchParams?.get('service') ?? undefined;

  return (
    <ServicesPage
      onNavigateHome={() => router.push('/')}
      scrollToService={scrollToService}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ServicesPageInner />
    </Suspense>
  );
}
