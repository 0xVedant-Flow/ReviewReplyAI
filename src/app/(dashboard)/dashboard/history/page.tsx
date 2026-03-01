"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Calendar } from "lucide-react";

export default function HistoryPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function loadHistory() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from('generations')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (data) setHistory(data);
            setLoading(false);
        }
        loadHistory();
    }, [supabase]);

    if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-indigo-600" /></div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Response History</h1>

            <div className="space-y-4">
                {history.length === 0 ? (
                    <div className="rounded-xl border border-dashed p-12 text-center text-slate-500">
                        No history found. Generate some responses first!
                    </div>
                ) : (
                    history.map((item) => (
                        <div key={item.id} className="rounded-xl border bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4 border-b pb-4">
                                <div>
                                    <span className="font-medium text-slate-800">{item.platform}</span>
                                    <span className="ml-2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                        {item.star_rating} Stars
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-slate-500">
                                    <Calendar className="mr-1.5 h-4 w-4" />
                                    {new Date(item.created_at).toLocaleDateString()}
                                </div>
                            </div>
                            <p className="text-sm text-slate-600 italic border-l-4 border-slate-200 pl-4 mb-4">
                                "{item.review_text}"
                            </p>

                            <div className="space-y-2 mt-4 bg-slate-50 p-4 rounded-lg">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Generated Output</p>
                                {item.generated_responses?.map((resp: any, i: number) => (
                                    <p key={i} className="text-sm text-slate-700">{resp.text}</p>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
