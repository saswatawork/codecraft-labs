import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const config = {
  providers: [
    // Development credentials provider - remove in production
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // This is for development only - use proper auth in production
        if (credentials?.email) {
          return {
            id: '1',
            email: credentials.email as string,
            name: 'Dev User',
            image: null,
          };
        }
        return null;
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
              params: {
                scope:
                  'openid email profile https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube',
              },
            },
          }),
        ]
      : []),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_SECRET
      ? [
          GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET,
          }),
        ]
      : []),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      if (profile) {
        token.id = profile.sub || profile.id;
        token.email = profile.email;
      }
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Map email to database user ID
      const emailToUserId: Record<string, string> = {
        'thinkingquietly7@gmail.com': 'thinking-quietly-user',
        'saswata.career@gmail.com': 'saswata-career-user',
      };

      const email = (token.email || session.user?.email) as string;
      const userId = emailToUserId[email] || 'user-123'; // fallback to default

      if (session.user) {
        session.user.id = userId;
        session.user.email = email;
      }
      session.accessToken = token.accessToken as string;
      session.provider = token.provider as string;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  trustHost: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
