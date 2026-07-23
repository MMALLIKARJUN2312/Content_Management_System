'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import Logo from './Logo';
import Container from './Container';
import Button from './ui/Button';
import { cn } from '@/lib/cn';

const NAV_LINKS = [
  { label: 'Buyers', href: '#' },
  { label: 'Suppliers', href: '#' },
  {
    label: 'Climate & Us',
    dropdown: [
      { label: 'Overview', href: '#' },
      { label: 'Impact Reports', href: '#' },
    ],
  },
  {
    label: 'Science',
    dropdown: [
      { label: 'Methodology', href: '#' },
      { label: 'Research', href: '#' },
    ],
  },
  { label: 'Standards', href: '/standards' },
  { label: 'Contact Us', href: '#' },
];

function NavDropdown({ label, items }) {
  const [open, setOpen] = useState(false);
  const menuId = `nav-dropdown-${label.replace(/\s+/g, '-').toLowerCase()}`;

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-ink-900"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
      >
        {label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      {open && (
        <div
          id={menuId}
          className="absolute left-0 top-full z-20 mt-2 w-48 rounded-lg border border-ink-100 bg-surface-card py-2 shadow-lg"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-2 text-sm text-ink-700 hover:bg-ink-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => href !== '#' && pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-surface-card/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((item) =>
            item.dropdown ? (
              <NavDropdown key={item.label} label={item.label} items={item.dropdown} />
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'text-sm font-medium hover:text-ink-900',
                  isActive(item.href) ? 'text-brand-600' : 'text-ink-700',
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden md:block">
          <Button size="sm">Registry</Button>
        </div>

        <button
          type="button"
          className="text-ink-900 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </Container>

      {mobileOpen && (
        <div id="mobile-nav-menu" className="border-t border-ink-100 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-ink-900">{item.label}</span>
                  {item.dropdown.map((sub) => (
                    <Link key={sub.label} href={sub.href} className="pl-3 text-sm text-ink-700">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium',
                    isActive(item.href) ? 'text-brand-600' : 'text-ink-700',
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Button size="sm" className="w-fit">
              Registry
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
