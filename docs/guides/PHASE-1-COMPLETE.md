# Phase 1 Setup Complete! 🎉

## What We've Built

✅ **Database Schema** - Prisma models for:
- Users (NextAuth authentication)
- Blogs (posts with full metadata)
- Categories & Tags (organization)
- Media (image uploads)
- Analytics (page views)

✅ **Authentication** - NextAuth.js v5 with:
- GitHub OAuth integration
- Admin role system
- Protected routes middleware
- Session management

✅ **Admin Foundation** - Basic admin pages:
- Login page (`/admin/login`)
- Dashboard (`/admin`)
- Route protection (non-admins blocked)

## 🚀 Next Steps to Test

### 1. Start the Database

The local Prisma Postgres database needs to be running:

```bash
cd apps/portfolio
pnpm exec prisma dev
```

This will start a local PostgreSQL instance on ports 51213-51215.

**Leave this terminal running!**

### 2. Run Database Migration

In a **new terminal**, apply the database schema:

```bash
cd apps/portfolio
pnpm exec prisma migrate dev --name init_blog_system
```

This creates all tables (users, blogs, tags, etc.) in the database.

### 3. Create GitHub OAuth App

Before authentication works, you need to create a GitHub OAuth application:

1. Go to: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   - **Application name**: CodeCraft Labs Blog (Local Dev)
   - **Homepage URL**: `http://localhost:4500`
   - **Authorization callback URL**: `http://localhost:4500/api/auth/callback/github`
4. Click **"Register application"**
5. Copy the **Client ID**
6. Click **"Generate a new client secret"** and copy it

### 4. Update Environment Variables

Edit `apps/portfolio/.env`:

```bash
# Replace these with your GitHub OAuth credentials:
GITHUB_CLIENT_ID="your-actual-client-id-here"
GITHUB_CLIENT_SECRET="your-actual-client-secret-here"
```

### 5. Start the Development Server

```bash
cd apps/portfolio
pnpm dev
```

This starts Next.js on http://localhost:4500

### 6. Test Authentication

1. **Visit**: http://localhost:4500/admin
2. You'll be redirected to `/admin/login`
3. Click **"Sign in with GitHub"**
4. Authorize the OAuth app
5. You'll be redirected back

**First time:** You'll see "Access Denied" because your account isn't marked as ADMIN yet.

### 7. Make Yourself Admin

After signing in once, your user is created in the database. Now promote yourself to admin:

```bash
cd apps/portfolio
npx prisma dev
pnpm exec prisma studio
```

This opens Prisma Studio (database GUI) at http://localhost:5555

1. Click **"User"** table
2. Find your user (by email)
3. Click the row to edit
4. Change `role` from **"USER"** to **"ADMIN"**
5. Click **"Save 1 change"**

### 8. Test Admin Access

1. Go back to http://localhost:4500/admin/login
2. Sign in with GitHub again
3. ✅ **Success!** You should now see the Admin Dashboard

## 📁 Files Created

```
apps/portfolio/
├── prisma/
│   └── schema.prisma              # Database schema (8 models)
├── src/
│   ├── lib/
│   │   ├── auth.ts                # NextAuth configuration
│   │   └── prisma.ts              # Prisma client singleton
│   ├── types/
│   │   └── next-auth.d.ts         # NextAuth TypeScript types
│   ├── middleware.ts              # Route protection middleware
│   └── app/
│       ├── api/
│       │   └── auth/
│       │       └── [...nextauth]/
│       │           └── route.ts   # NextAuth API handler
│       └── admin/
│           ├── login/
│           │   └── page.tsx       # Admin login page
│           └── page.tsx           # Admin dashboard
├── .env                            # Environment variables
└── .env.example                    # Environment template
```

## 🎯 What's Next? (Phase 2)

Once authentication is working, we'll build:

1. **Blog Editor** - Rich MDX editor with preview
2. **Image Upload** - Cloudinary integration
3. **Blog Management** - Create, edit, delete posts
4. **Draft System** - Auto-save, version history
5. **Category/Tag Management** - Organize content

## 🐛 Troubleshooting

### "Can't reach database server"
- Make sure `pnpm exec prisma dev` is running
- Check that ports 51213-51215 are available

### "Access Denied" after login
- Use Prisma Studio to change your role to "ADMIN"
- Sign out and sign in again

### "GitHub OAuth error"
- Verify CLIENT_ID and CLIENT_SECRET in `.env`
- Check callback URL matches exactly: `http://localhost:4500/api/auth/callback/github`

### TypeScript errors
- Run: `pnpm exec prisma generate` to generate Prisma client types

## 📊 Database Schema Overview

**Users**: Admin accounts (GitHub OAuth)  
**Blogs**: Blog posts with content, SEO metadata, publish status  
**Categories**: Group blogs by topic  
**Tags**: Label blogs (many-to-many)  
**Media**: Uploaded images (Cloudinary URLs)  
**PageViews**: Analytics tracking

## 🔐 Security Features

✅ GitHub OAuth (no password storage)  
✅ HTTPS-only in production  
✅ httpOnly session cookies  
✅ CSRF protection (NextAuth)  
✅ Role-based access control  
✅ Protected API routes  

---

**Ready to test?** Follow steps 1-8 above to see your admin panel in action! 🚀
