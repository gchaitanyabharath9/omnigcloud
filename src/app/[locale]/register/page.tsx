'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Building, Phone, ArrowRight, Loader2 } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            setLoading(false);
            return;
        }

        try {
            // Call your registration API
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    company: formData.company,
                    phone: formData.phone,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            // Auto sign-in after registration
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Registration successful, but auto-login failed. Please sign in manually.');
                router.push('/api/auth/signin');
            } else {
                router.push('/app');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleOAuthSignIn = async (provider: string) => {
        setLoading(true);
        await signIn(provider, { callbackUrl: '/app' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'var(--background)' }}>
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                        Create your account
                    </h2>
                    <p className="mt-2" style={{ color: 'var(--muted)' }}>
                        Start managing your multi-cloud infrastructure
                    </p>
                </div>

                {/* OAuth Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => handleOAuthSignIn('google')}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        style={{ background: 'white', color: '#000' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <button
                        onClick={() => handleOAuthSignIn('azure-ad')}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        style={{ background: 'white', color: '#000' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 23 23">
                            <path fill="#f25022" d="M1 1h10v10H1z" />
                            <path fill="#00a4ef" d="M12 1h10v10H12z" />
                            <path fill="#7fba00" d="M1 12h10v10H1z" />
                            <path fill="#ffb900" d="M12 12h10v10H12z" />
                        </svg>
                        Continue with Microsoft
                    </button>

                    <button
                        onClick={() => handleOAuthSignIn('github')}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        style={{ background: 'white', color: '#000' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                        Continue with GitHub
                    </button>
                </div>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t" style={{ borderColor: 'var(--card-border)' }}></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2" style={{ background: 'var(--background)', color: 'var(--muted)' }}>
                            Or register with email
                        </span>
                    </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    {error && (
                        <div className="p-3 rounded-lg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444' }}>
                            <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>
                        </div>
                    )}

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                            Full Name *
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: 'var(--muted)' }} />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--card-border)',
                                    color: 'var(--foreground)',
                                }}
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                            Work Email *
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: 'var(--muted)' }} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--card-border)',
                                    color: 'var(--foreground)',
                                }}
                                placeholder="john@company.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                            Company Name *
                        </label>
                        <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: 'var(--muted)' }} />
                            <input
                                id="company"
                                name="company"
                                type="text"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--card-border)',
                                    color: 'var(--foreground)',
                                }}
                                placeholder="Acme Inc."
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                            Phone Number (Optional)
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: 'var(--muted)' }} />
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--card-border)',
                                    color: 'var(--foreground)',
                                }}
                                placeholder="+1 (555) 123-4567"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                            Password *
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: 'var(--muted)' }} />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--card-border)',
                                    color: 'var(--foreground)',
                                }}
                                placeholder="Min. 8 characters"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>
                            Confirm Password *
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2" size={18} style={{ color: 'var(--muted)' }} />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border"
                                style={{
                                    background: 'var(--card-bg)',
                                    borderColor: 'var(--card-border)',
                                    color: 'var(--foreground)',
                                }}
                                placeholder="Re-enter password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Creating account...
                            </>
                        ) : (
                            <>
                                Create Account
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <p className="text-center text-sm" style={{ color: 'var(--muted)' }}>
                        By registering, you agree to our{' '}
                        <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </form>

                {/* Sign In Link */}
                <p className="text-center text-sm" style={{ color: 'var(--muted)' }}>
                    Already have an account?{' '}
                    <Link href="/api/auth/signin" className="font-medium hover:underline" style={{ color: 'var(--primary)' }}>
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}
