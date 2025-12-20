import { DashboardNav } from '@/components/dashboard/nav';
import { DashboardShell } from '@/components/dashboard/shell';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav user={session.user} />
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
