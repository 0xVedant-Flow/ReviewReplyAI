"use client";

import { useEffect, useState } from "react";
import { Copy, Plus, Key } from "lucide-react";

export default function ApiKeysPage() {
    const [keys, setKeys] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchKeys();
    }, []);

    const fetchKeys = async () => {
        const res = await fetch("/api/v1/api-keys");
        if (res.ok) setKeys(await res.json());
    };

    const createKey = async () => {
        setLoading(true);
        const res = await fetch("/api/v1/api-keys", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: `Key_${Date.now().toString().slice(-4)}` })
        });
        if (res.ok) fetchKeys();
        setLoading(false);
    }

    const copyKey = (key: string) => {
        navigator.clipboard.writeText(key);
        alert("Copied API Key to clipboard!");
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">API Keys</h1>
                <button
                    onClick={createKey}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    <Plus className="h-4 w-4" />
                    Create New Key
                </button>
            </div>

            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Key</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Created</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                        {keys.map(k => (
                            <tr key={k.id}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                                    <div className="flex items-center gap-2">
                                        <Key className="h-4 w-4 text-slate-400" />
                                        {k.name}
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-4">
                                        <code className="bg-slate-100 px-2 py-1 rounded text-slate-800 font-mono text-xs">
                                            {k.key.substring(0, 12)}...
                                        </code>
                                        <button onClick={() => copyKey(k.key)} className="text-indigo-600 hover:text-indigo-900">
                                            <Copy className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                    {new Date(k.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                        {keys.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-sm text-slate-500">
                                    No API keys generated yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
