import { pageMetadata } from '../../lib/page-metadata';
import { ClientHeader } from '../../components/ClientHeader';
import { Footer } from '../../components/Footer';
export const metadata = pageMetadata("Terms of Service", "Read the terms for using our website and requesting salon appointments.", '/terms');
export default function Layout({ children }: { children: React.ReactNode }) { return <><ClientHeader />{children}<Footer /></>; }
