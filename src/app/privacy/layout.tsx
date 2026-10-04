import { pageMetadata } from '../../lib/page-metadata';
import { ClientHeader } from '../../components/ClientHeader';
import { Footer } from '../../components/Footer';
export const metadata = pageMetadata("Privacy Policy", "Learn how we handle your contact details, booking information and website data.", '/privacy');
export default function Layout({ children }: { children: React.ReactNode }) { return <><ClientHeader />{children}<Footer /></>; }
