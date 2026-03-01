"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Star, Globe, MessageSquareText, ShieldCheck, Download, Calendar } from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
    PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';
import { motion } from "framer-motion";

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(true);

    // MOCK DATA for Recharts
    const volumeData = [
        { name: 'Feb 20', reviews: 4, responses: 3 },
        { name: 'Feb 21', reviews: 7, responses: 6 },
        { name: 'Feb 22', reviews: 5, responses: 5 },
        { name: 'Feb 23', reviews: 12, responses: 10 },
        { name: 'Feb 24', reviews: 8, responses: 8 },
        { name: 'Feb 25', reviews: 15, responses: 14 },
        { name: 'Feb 26', reviews: 18, responses: 17 },
    ];

    const sentimentData = [
        { name: 'Positive', value: 65, color: '#10B981' },
        { name: 'Negative', value: 15, color: '#EF4444' },
        { name: 'Neutral', value: 12, color: '#6B7280' },
        { name: 'Mixed', value: 8, color: '#F59E0B' },
    ];

    const starData = [
        { stars: '5★', count: 42 },
        { stars: '4★', count: 28 },
        { stars: '3★', count: 12 },
        { stars: '2★', count: 8 },
        { stars: '1★', count: 5 },
    ];

    const languages = [
        { lang: 'Bengali', code: 'BN', count: 24, percent: 48, flag: '🇧🇩' },
        { lang: 'English', code: 'EN', count: 16, percent: 32, flag: '🇬🇧' },
        { lang: 'Arabic', code: 'AR', count: 6, percent: 12, flag: '🇦🇪' },
        { lang: 'Hindi', code: 'HI', count: 4, percent: 8, flag: '🇮🇳' },
    ];

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full" />
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-12">

            {/* HEADER SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0F0F1A] flex items-center gap-3">
                        <BarChart3 className="w-8 h-8 text-indigo-500" />
                        Analytics
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Deep insights into your reputation performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                        <Calendar className="w-4 h-4 text-slate-400 mr-2" />
                        <span className="text-sm font-bold text-slate-700">March 2026</span>
                        <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
                    </div>
                    <button className="flex items-center bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-200 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </button>
                </div>
            </div>

            {/* ROW 1: 4 STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Reviews" value="147" trend="+12%" up icon={<MessageSquareText className="text-purple-600" />} bg="bg-purple-100" />
                <StatCard title="Avg Star Rating" value="4.1 ⭐" trend="Stable" icon={<Star className="text-amber-600" />} bg="bg-amber-100" />
                <StatCard title="Response Rate" value="98%" trend="+4%" up icon={<TrendingUp className="text-emerald-600" />} bg="bg-emerald-100" />
                <StatCard title="Languages Detected" value="4" trend="+1" up icon={<Globe className="text-cyan-600" />} bg="bg-cyan-100" />
            </div>

            {/* ROW 2: MAIN CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                {/* VOLUME CHART */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 mb-8">Review Volume Over Time</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={volumeData}>
                                <defs>
                                    <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="reviews" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorReviews)" />
                                <Area type="monotone" dataKey="responses" stroke="#06B6D4" strokeWidth={3} fillOpacity={0} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* SENTIMENT PIE */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 mb-8">Sentiment Distribution</h3>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={sentimentData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={8} dataKey="value">
                                    {sentimentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* ROW 3: STAR BREAKDOWN & LANGUAGES */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">

                {/* BAR CHART: STARS */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 mb-8 text-center sm:text-left">Star Rating Breakdown</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={starData} layout="vertical" margin={{ left: -20, right: 20 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="stars" type="category" stroke="#0F0F1A" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#F8F7FF' }} />
                                <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={32}>
                                    {starData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index < 2 ? '#10B981' : index === 2 ? '#F59E0B' : '#EF4444'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* TABLE: LANGUAGES */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <h3 className="font-bold text-lg text-slate-900 mb-8">Top Languages</h3>
                    <div className="space-y-6">
                        {languages.map((l, i) => (
                            <div key={l.code}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{l.flag}</span>
                                        <span className="text-sm font-extrabold text-slate-900">{l.lang} ({l.code})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-slate-900">{l.count} reviews</span>
                                        <span className="text-xs text-slate-400 font-medium">({l.percent}%)</span>
                                    </div>
                                </div>
                                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${l.percent}%` }} transition={{ duration: 1, ease: 'easeOut' }} className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </motion.div>
    );
}

function StatCard({ title, value, trend, up, icon, bg }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${bg} group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                {trend && (
                    <span className={`text-[11px] font-bold px-2 py-1 rounded-lg ${up ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
                <h4 className="text-3xl font-extrabold text-slate-900">{value}</h4>
            </div>
        </div>
    );
}

function ChevronDown(props: any) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
    );
}
