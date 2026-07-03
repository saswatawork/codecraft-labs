import { NextRequest } from 'next/server';
import { describe, expect, it, vi } from 'vitest';

const authMock = vi.fn();
vi.mock('@/lib/auth', () => ({ auth: authMock }));

describe('middleware', () => {
  it('lets non-admin routes through without checking auth', async () => {
    const { middleware } = await import('./middleware');
    const request = new NextRequest('https://example.com/blog');

    const response = await middleware(request);

    expect(authMock).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  it('lets the login page through without checking auth', async () => {
    const { middleware } = await import('./middleware');
    const request = new NextRequest('https://example.com/admin/login');

    const response = await middleware(request);

    expect(authMock).not.toHaveBeenCalled();
    expect(response.status).toBe(200);
  });

  it('redirects unauthenticated requests to /admin to the login page', async () => {
    authMock.mockResolvedValueOnce(null);
    const { middleware } = await import('./middleware');
    const request = new NextRequest('https://example.com/admin/dashboard');

    const response = await middleware(request);

    expect(response.status).toBe(307);
    const location = new URL(response.headers.get('location') ?? '');
    expect(location.pathname).toBe('/admin/login');
    expect(location.searchParams.get('callbackUrl')).toBe('/admin/dashboard');
  });

  it('returns 403 for authenticated non-admin users on /admin routes', async () => {
    authMock.mockResolvedValueOnce({ user: { role: 'USER' } });
    const { middleware } = await import('./middleware');
    const request = new NextRequest('https://example.com/admin/dashboard');

    const response = await middleware(request);

    expect(response.status).toBe(403);
  });

  it('lets authenticated admin users through to /admin routes', async () => {
    authMock.mockResolvedValueOnce({ user: { role: 'ADMIN' } });
    const { middleware } = await import('./middleware');
    const request = new NextRequest('https://example.com/admin/dashboard');

    const response = await middleware(request);

    expect(response.status).toBe(200);
  });
});
