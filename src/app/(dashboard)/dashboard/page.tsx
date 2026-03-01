"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessageSquareText, TrendingUp, Star, Globe, ChevronRight, Wand2, Zap, Bell, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function DashboardHome() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>(null);
    const [recentGenerations, setRecentGenerations] = useState<any[]>([]);
    const supabase = createClient();

    const [greeting, setGreeting] = useState("Good morning");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 12 && hour < 17) setGreeting("Good afternoon");
        else if (hour >= 17 || hour < 5) setGreeting("Good evening");
        else setGreeting("Good morning");

        async function loadData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const [{ data: pData }, { data: gData }] = await Promise.all([
                supabase.from('profiles').select('*').eq('id', user.id).single(),
                supabase.from('generations').select('*').eq('id', user.id).order('created_at', { ascending: false }).limit(5)
            ]);

            setProfile(pData);
            setRecentGenerations(gData || []);
            setLoading(false);
        }
        loadData();
    }, [supabase]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full" />
        </div>
    );

    const isFreePlan = profile?.plan === 'free';
    const limit = 10;
    const usage = profile?.responses_used_this_month || 0;
    const percentage = Math.min((usage / limit) * 100, 100);

    const sentimentData = [
        { name: 'Positive', value: 65, color: '#10B981' },
        { name: 'Negative', value: 15, color: '#EF4444' },
        { name: 'Neutral', value: 20, color: '#6B7280' },
    ];

    const platformData = [
        { name: 'Google', count: 24, color: '#4285F4' },
        { name: 'Facebook', count: 18, color: '#1877F2' },
        { name: 'Yelp', count: 12, color: '#FF1A1A' },
        { name: 'Trustpilot', count: 8, color: '#00B67A' },
    ];

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-10">

            {/* HEADER ROW */}
            <div className="flex justify-between items-center bg-white/50 backdrop-blur pb-6 border-b border-slate-200/60 sticky top-0 z-10 pt-8 -mt-8">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-[#0F0F1A] flex items-center gap-3">
                        {greeting}, {profile?.full_name?.split(' ')[0] || 'User'} 👋
                    </h1>
                    <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="relative p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors shadow-sm">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <Link href="/dashboard/generate" className="hidden sm:flex items-center gap-2 bg-gradient-primary hover:scale-[1.02] shadow-xl shadow-indigo-500/10 text-white px-6 py-3 rounded-xl font-bold transition-all">
                        <Wand2 className="w-4 h-4" />
                        Generate Reply →
                    </Link>
                </div>
            </div>

            {/* TOP STATS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Responses" value={`${usage} / ${isFreePlan ? limit : '∞'}`}
                    subtext={isFreePlan ? `${limit - usage} remaining this month` : "Unlimited responses active"}
                    icon={<MessageSquareText className="text-purple-600" />} bg="bg-purple-100"
                    progress={isFreePlan ? percentage : null}
                    badge={isFreePlan ? "Free Plan" : "Pro Plan"}
                />
                <StatCard
                    title="Total Handled" value="47" trend="+12" up icon={<TrendingUp className="text-emerald-600" />} bg="bg-emerald-100"
                    subtext="+34% increase this week"
                />
                <StatCard
                    title="Avg Star Rating" value="3.8 ⭐" subtext="Across all platforms"
                    icon={<Star className="text-amber-600" />} bg="bg-amber-100"
                />
                <StatCard
                    title="Languages" value="4"
                    icon={<Globe className="text-cyan-600" />} bg="bg-cyan-100"
                    languages={['🇧🇩 BN', '🇬🇧 EN', '🇦🇪 AR', '🇮🇳 HI']}
                />
            </div>

            {/* UPGRADE BANNER (Free plan only) */}
            {isFreePlan && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-primary rounded-3xl p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-500/20">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                                <Zap className="w-8 h-8 text-white fill-white animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-1">Unlock Unlimited Responses</h3>
                                <p className="text-indigo-100 font-medium">Post to 100+ platforms automatically and remove the {limit} monthly limit.</p>
                            </div>
                        </div>
                        <Link href="/dashboard/billing" className="bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/5 whitespace-nowrap">
                            Upgrade Now →
                        </Link>
                    </div>
                    {/* Decorative blobs */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 blur-3xl rounded-full group-hover:scale-110 transition-transform"></div>
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 blur-3xl rounded-full"></div>
                </motion.div>
            )}

            {/* MAIN CONTENT: 2-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* RECENT REVIEWS */}
                <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-lg text-slate-900">Recent Reviews</h3>
                        <Link href="/dashboard/history" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                            View History →
                        </Link>
                    </div>

                    {recentGenerations.length === 0 ? (
                        <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6">
                                <MessageSquareText className="w-10 h-10 text-slate-200" />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2">No reviews yet</h4>
                            <p className="text-slate-500 max-w-xs mx-auto mb-8">Generate your first AI-powered response to see it here.</p>
                            <Link href="/dashboard/generate" className="bg-gradient-primary text-white font-bold px-8 py-3 rounded-2xl shadow-xl shadow-indigo-500/10 hover:scale-105 transition-all">
                                Generate Your First Reply →
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {recentGenerations.map((gen, i) => (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} key={i} className="p-6 hover:bg-slate-50/80 transition-all border-l-4 border-transparent hover:border-indigo-500 group cursor-pointer flex items-center justify-between">
                                    <div className="flex-1 min-w-0 pr-6">
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <div className="flex text-amber-400 text-xs">{"★".repeat(gen.star_rating)}{"☆".repeat(5 - gen.star_rating)}</div>
                                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-widest border ${gen.platform === 'Google' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                    gen.platform === 'Facebook' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                                        'bg-slate-50 text-slate-600 border-slate-200'
                                                }`}>{gen.platform || 'Google'}</span>
                                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-widest border ${gen.sentiment === 'Positive' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                    gen.sentiment === 'Negative' ? 'bg-red-50 text-red-600 border-red-100' :
                                                        'bg-slate-50 text-slate-500 border-slate-200'
                                                }`}>{gen.sentiment || 'Neutral'}</span>
                                        </div>
                                        <p className="text-slate-800 font-bold text-sm truncate leading-relaxed">"{gen.review_text}"</p>
                                        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest bg-slate-100 px-1.5 py-0.5 rounded inline-block">2 hours ago</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* RIGHT STACK */}
                <div className="lg:col-span-2 space-y-8">

                    {/* QUICK GENERATE */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm group">
                        <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Wand2 className="w-4 h-4 text-purple-600" />
                            </div>
                            Quick Generate
                        </h3>
                        <textarea
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-400 mb-4"
                            placeholder="Paste a review..."
                        ></textarea>
                        <Link href="/dashboard/generate" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                            Continue to Generator →
                        </Link>
                    </div>

                    {/* SENTIMENT CHART */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-900 mb-6">Sentiment Overview</h3>
                        <div className="h-[180px] w-full mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                                        {sentimentData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {sentimentData.map(s => (
                                <div key={s.name} className="text-center">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{s.name}</div>
                                    <div className="text-sm font-extrabold text-slate-900">{s.value}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION: PLATFORM ACTIVITY */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mt-8">
                <h3 className="font-bold text-lg text-slate-900 mb-8">Reviews by Platform</h3>
                <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={platformData} layout="vertical" margin={{ left: -20, right: 20 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" stroke="#0F0F1A" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                            <Tooltip cursor={{ fill: '#F8F7FF' }} />
                            <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={24}>
                                {platformData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </motion.div>
    );
}

function StatCard({ title, value, subtext, icon, bg, trend, up, progress, badge, languages }: any) {
    return (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl ${bg} group-hover:rotate-6 transition-transform shadow-sm`}>
                    {icon}
                </div>
                {badge && (
                    <span className="bg-slate-100 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border border-slate-200">
                        {badge}
                    </span>
                )}
                {trend && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 ${up ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                        {up ? '↑' : ''} {trend}%
                    </span>
                )}
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
                <h4 className="text-3xl font-extrabold text-[#0F0F1A] tracking-tight">{value}</h4>
                {progress !== null && progress !== undefined && (
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-4 mb-2">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className={`h-full rounded-full ${progress > 80 ? 'bg-amber-400' : 'bg-indigo-500'}`} />
                    </div>
                )}
                {languages && (
                    <div className="flex gap-1.5 flex-wrap mt-4">
                        {languages.map((l: string) => (
                            <span key={l} className="text-[9px] bg-slate-50 px-2 py-0.5 rounded font-bold border border-slate-200 text-slate-600">{l}</span>
                        ))}
                    </div>
                )}
                {subtext && <p className="text-[11px] text-slate-500 font-bold mt-3 leading-tight">{subtext}</p>}
            </div>
        </div>
    );
}
