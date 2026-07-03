import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/prisma', () => ({ prisma: {} }));
vi.mock('@auth/prisma-adapter', () => ({ PrismaAdapter: () => ({}) }));
vi.mock('next-auth/providers/github', () => ({ default: vi.fn(() => ({ id: 'github' })) }));
vi.mock('next-auth', () => ({
  default: () => ({ handlers: {}, auth: vi.fn(), signIn: vi.fn(), signOut: vi.fn() }),
}));

describe('authConfig.callbacks.session', () => {
  it('defaults role to USER when the adapter user has no role', async () => {
    const { authConfig } = await import('./auth');
    const session = { user: { id: '', email: 'a@example.com' } };
    const user = { id: 'user-1', email: 'a@example.com' };

    // biome-ignore lint/suspicious/noExplicitAny: exercising the callback with a minimal fixture
    const result = await authConfig.callbacks.session({ session, user } as any);

    expect(result.user.id).toBe('user-1');
    expect(result.user.role).toBe('USER');
  });

  it('preserves an explicit role from the adapter user', async () => {
    const { authConfig } = await import('./auth');
    const session = { user: { id: '', email: 'a@example.com' } };
    const user = { id: 'user-1', email: 'a@example.com', role: 'ADMIN' };

    // biome-ignore lint/suspicious/noExplicitAny: exercising the callback with a minimal fixture
    const result = await authConfig.callbacks.session({ session, user } as any);

    expect(result.user.role).toBe('ADMIN');
  });

  it('is a no-op when the session has no user', async () => {
    const { authConfig } = await import('./auth');
    const session = { user: undefined };
    const user = { id: 'user-1', role: 'ADMIN' };

    // biome-ignore lint/suspicious/noExplicitAny: exercising the callback with a minimal fixture
    const result = await authConfig.callbacks.session({ session, user } as any);

    expect(result.user).toBeUndefined();
  });
});
