import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-white text-slate-900">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-slate-50/50">
                <div className="mx-auto max-w-6xl p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
