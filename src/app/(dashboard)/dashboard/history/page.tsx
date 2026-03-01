"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { History, Search, Filter, Globe, Star, ChevronDown, Copy, CheckCircle2, MoreVertical, Trash2, Calendar, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function HistoryPage() {
    const [loading, setLoading] = useState(true);
    const [generations, setGenerations] = useState<any[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        async function loadHistory() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('generations')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (data) setGenerations(data);
            setLoading(false);
        }
        loadHistory();
    }, [supabase]);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-12">

            {/* HEADER SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0F0F1A] flex items-center gap-3">
                        <History className="w-8 h-8 text-indigo-500" />
                        Generation History
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Review and reuse your AI-generated responses.</p>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl text-indigo-700 font-bold border border-indigo-100">
                    <span className="text-sm">{generations.length}</span>
                    <span className="text-[10px] uppercase tracking-widest text-indigo-400">Total Reviews</span>
                </div>
            </div>

            {/* FILTER BAR */}
            <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col lg:flex-row items-center gap-4">
                <div className="relative flex-1 w-full lg:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search reviews by content..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-400" />
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <FilterSelect label="All Platforms" icon={<Filter className="w-3.5 h-3.5" />} />
                    <FilterSelect label="All Stars" icon={<Star className="w-3.5 h-3.5" />} />
                    <FilterSelect label="All Sentiments" />
                    <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors px-3">Clear Filters</button>
                </div>
            </div>

            {/* REVIEWS LIST */}
            <div className="space-y-4">
                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white border border-slate-100 rounded-2xl animate-pulse" />)}
                    </div>
                ) : generations.length === 0 ? (
                    <div className="text-center py-32 bg-white/50 border-2 border-dashed border-slate-200 rounded-[32px]">
                        <History className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No history yet</h3>
                        <p className="text-slate-500 mb-8 max-w-sm mx-auto">Your AI responses will appear here as soon as you generate them. Try generating your first reply now!</p>
                        <Link href="/dashboard/generate" className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all inline-block shadow-lg shadow-indigo-100">
                            Generate Reply →
                        </Link>
                    </div>
                ) : (
                    generations.map((gen) => (
                        <div key={gen.id} className={`bg-white border rounded-2xl transition-all ${expandedId === gen.id ? 'border-indigo-400 shadow-xl' : 'border-slate-200 hover:border-slate-300 shadow-sm'}`}>

                            {/* Summary Bar */}
                            <div
                                onClick={() => setExpandedId(expandedId === gen.id ? null : gen.id)}
                                className="p-5 flex items-center justify-between cursor-pointer group"
                            >
                                <div className="flex items-center gap-6 min-w-0 flex-1">
                                    <div className="flex flex-col items-center flex-shrink-0">
                                        <div className="flex text-amber-400 text-[10px] mb-1">
                                            {"★".repeat(gen.star_rating)}{"☆".repeat(5 - gen.star_rating)}
                                        </div>
                                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded border uppercase tracking-widest ${gen.platform === 'Google' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            gen.platform === 'Yelp' ? 'bg-red-50 text-red-600 border-red-100' :
                                                'bg-indigo-50 text-indigo-600 border-indigo-100'
                                            }`}>
                                            {gen.platform || "Google"}
                                        </span>
                                    </div>

                                    <div className="min-w-0 pr-10">
                                        <p className="text-slate-800 font-bold text-sm truncate leading-relaxed">
                                            "{gen.review_text}"
                                        </p>
                                        <div className="flex items-center gap-3 mt-1.5 opacity-60">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                                🌍 {gen.language_detected || "English"}
                                            </span>
                                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                                                {gen.sentiment || "Positive"} Sentiment
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="hidden lg:flex flex-col items-end">
                                        <span className="text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-full mb-1">
                                            {Array.isArray(gen.generated_responses) ? gen.generated_responses.length : 5} Response Variations
                                        </span>
                                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {new Date(gen.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className={`p-2 rounded-full transition-all group-hover:bg-indigo-50 ${expandedId === gen.id ? 'rotate-180 bg-indigo-50 text-indigo-600' : 'text-slate-300'}`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Content */}
                            <AnimatePresence>
                                {expandedId === gen.id && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-slate-50/50 rounded-b-2xl border-t border-slate-100">
                                        <div className="p-8">

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {Array.isArray(gen.generated_responses) && gen.generated_responses.map((resp: any, idx: number) => (
                                                    <div key={idx} className="bg-white border border-slate-200 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow relative group/card">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded uppercase tracking-widest border border-indigo-100">
                                                                {resp.tone || "Professional"}
                                                            </span>
                                                            <span className="text-[10px] font-bold text-slate-400">
                                                                {resp.word_count || 50} words
                                                            </span>
                                                        </div>
                                                        <p className="text-slate-800 text-sm font-medium leading-relaxed mb-6" dir="auto">
                                                            {resp.text}
                                                        </p>
                                                        <div className="flex justify-between items-center opacity-0 group-hover/card:opacity-100 transition-opacity">
                                                            <div className="flex gap-2">
                                                                <button className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Edit Inline</button>
                                                                <button className="text-[10px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">Mark as Used</button>
                                                            </div>
                                                            <button
                                                                onClick={() => copyToClipboard(resp.text, `${gen.id}-${idx}`)}
                                                                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all border ${copiedId === `${gen.id}-${idx}`
                                                                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20'
                                                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                                                    }`}
                                                            >
                                                                {copiedId === `${gen.id}-${idx}` ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                                {copiedId === `${gen.id}-${idx}` ? "Copied" : "Copy"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-8 flex justify-between items-center border-t border-slate-200 pt-6">
                                                <button className="flex items-center gap-2 text-slate-400 hover:text-red-500 text-xs font-bold transition-colors">
                                                    <Trash2 className="w-4 h-4" /> Delete this record
                                                </button>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    ID: <span className="text-slate-200">{gen.id}</span>
                                                </p>
                                            </div>

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))
                )}
            </div>

        </motion.div>
    );
}

function FilterSelect({ label, icon }: any) {
    return (
        <div className="flex items-center bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm text-sm font-bold text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors whitespace-nowrap">
            {icon && <span className="mr-2 opacity-50">{icon}</span>}
            {label}
            <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
        </div>
    );
}
