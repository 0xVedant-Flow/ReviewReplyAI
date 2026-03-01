"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AnalyticsPage() {
    const [profile, setProfile] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        async function loadData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(data);
        }
        loadData();
    }, [supabase]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytics</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-slate-500">Responses Generated (This Month)</h3>
                    <p className="mt-2 text-3xl font-bold text-slate-900">{profile?.responses_used_this_month || 0}</p>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h3 className="text-sm font-medium text-slate-500">Current Plan</h3>
                    <p className="mt-2 text-3xl font-bold text-slate-900 capitalize">{profile?.plan || 'Free'}</p>
                </div>
            </div>
        </div>
    );
}
