export const dynamic = 'force-dynamic';

import { ServicesPage } from '../../views/ServicesPage';

export default function Page({ searchParams }: { searchParams?: { service?: string } }) {
  const scrollToService = searchParams?.service ?? undefined;

  return <ServicesPage scrollToService={scrollToService} />;
}
