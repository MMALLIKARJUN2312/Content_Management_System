'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { loginAdmin } from '@/store/slices/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  const isLoading = status === 'loading';

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginAdmin(form));
    if (loginAdmin.fulfilled.match(result)) {
      router.push('/dashboard');
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-background px-6">
      <Card className="w-full max-w-sm p-8">
        <Link href="/" className="mb-8 flex items-center gap-1.5 text-lg font-semibold">
          <CheckCircle2 className="h-4 w-4 text-brand-500" />
          <span className="text-ink-900">Renew</span>
          <span className="text-brand-500">Cred</span>
        </Link>

        <h1 className="text-xl font-semibold text-ink-900">Admin login</h1>
        <p className="mt-1 text-sm text-ink-500">Sign in to manage RenewCred content.</p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="you@renewcred.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
            {isLoading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </Card>
    </main>
  );
}
