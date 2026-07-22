'use client';

import Link from 'next/link';
import { FacebookIcon, XIcon, LinkedinIcon, InstagramIcon } from './SocialIcons';
import Logo from './Logo';
import Container from './Container';
import Button from './ui/Button';

const FOOTER_LINKS = [
  { label: 'Buyer', href: '#' },
  { label: 'Supplier', href: '#' },
  { label: 'Climate & Us', href: '#' },
  { label: 'Science', href: '#' },
  { label: 'Standards', href: '/standards' },
  { label: 'Contact Us', href: '#' },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-surface-dark text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <Logo dark />
            <div className="space-y-1 text-sm text-white/60">
              <p>Indiranagar, Bengaluru, Karnataka, INDIA</p>
              <p>yp@renewcred.com</p>
              <p>There is no time to save the planet</p>
              <p>CIN No.: XXXXXXXXX</p>
            </div>
            <div className="flex gap-4 pt-2 text-white/60">
              <FacebookIcon className="h-4 w-4" />
              <XIcon className="h-4 w-4" />
              <LinkedinIcon className="h-4 w-4" />
              <InstagramIcon className="h-4 w-4" />
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm text-white/70">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="w-fit hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-3">
            <p className="font-display text-lg italic">No spam. Just pure climate intelligence.</p>
            <form
              className="flex gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Your Email Address Please!"
                className="w-full rounded-pill border border-white/20 bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <Button size="sm" className="shrink-0" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © 2026 Renewed. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Support</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
