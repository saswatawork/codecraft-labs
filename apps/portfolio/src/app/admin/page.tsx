import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
    const session = await auth();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="mt-6 bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Welcome, {session.user.name}!
                    </h2>
                    <p className="text-gray-600">
                        You're logged in as an admin. Here's your profile:
                    </p>
                    <div className="mt-4 space-y-2">
                        <p>
                            <strong>Email:</strong> {session.user.email}
                        </p>
                        <p>
                            <strong>Role:</strong> {session.user.role}
                        </p>
                        <p>
                            <strong>User ID:</strong> {session.user.id}
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-900">Total Posts</h3>
                            <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-green-900">Published</h3>
                            <p className="text-3xl font-bold text-green-600 mt-2">0</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-yellow-900">Drafts</h3>
                            <p className="text-3xl font-bold text-yellow-600 mt-2">0</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <p className="text-sm text-gray-500">
                            🚧 Blog editor and post management coming in Phase 2...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
