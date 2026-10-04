"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeProvider';
interface NavigationProps { onBookClick: () => void; onNavigateHome?: () => boolean | void; transparentOnTop?: boolean; }
const links = [['Services', '/services'], ['Our salon', '/queens-nails-hair-skincare'], ['Gallery', '/gallery'], ['Reviews', '/reviews'], ['Journal', '/blog'], ['Visit us', '/contact']];
export function Navigation(_props: NavigationProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="studio-header"><nav className="studio-nav" aria-label="Main navigation">
    <Link href="/" className="studio-brand" aria-label="Queen’s Nails Hair and Skincare home"><span className="studio-monogram" aria-hidden="true">Q.</span><span>Queen’s<span className="studio-brand-sub">NAILS · HAIR · SKINCARE</span></span></Link>
    <div className="studio-desktop-links">{links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? 'page' : undefined}>{label}</Link>)}</div>
    <div className="studio-nav-actions"><button className="studio-icon" onClick={toggleTheme} aria-label={isDark ? 'Use light appearance' : 'Use dark appearance'}>{isDark ? <Sun size={18} /> : <Moon size={18} />}</button><Link href="/book" className="studio-button studio-button-small">Book a visit <span aria-hidden="true">↗</span></Link><button className="studio-icon studio-menu-toggle" aria-expanded={open} aria-controls="studio-mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button></div>
  </nav>{open && <nav id="studio-mobile-menu" className="studio-mobile-menu" aria-label="Mobile navigation">{links.map(([label, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={pathname === href ? 'page' : undefined}>{label}<span aria-hidden="true">↗</span></Link>)}</nav>}</header>;
}
