"use client";

import { MessageSquarePlus } from "lucide-react";
import Link from "next/link";

export default function DashboardHome() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Welcome Card */}
                <div className="col-span-full rounded-xl border bg-white p-8 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                            <MessageSquarePlus className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">Welcome to ReviewReply AI</h2>
                            <p className="text-slate-500">Automate your customer reviews effortlessly.</p>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <Link
                            href="/dashboard/generate"
                            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                        >
                            Generate Response
                        </Link>
                        <Link
                            href="/dashboard/history"
                            className="inline-flex items-center justify-center rounded-lg border bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            View History
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
