"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquareText, History, BarChart3, Receipt, KeyRound, LogOut, Settings, Zap, Key, Bell } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function Sidebar() {
    const pathname = usePathname();
    const supabase = createClient();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                setProfile(data);
            }
        }
        loadProfile();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login";
    };

    const isFreePlan = profile?.plan === 'free' || !profile?.plan;

    return (
        <div className="flex flex-col w-64 h-full bg-white border-r border-[#E5E7EB] bg-gradient-to-b from-white to-purple-50/30 font-sans">

            {/* Logo Section */}
            <div className="px-5 py-6">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        <MessageSquareText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-lg text-[#0F0F1A] tracking-tight leading-none">
                            ReviewReply <span className="text-gradient">AI</span>
                        </span>
                        <span className="mt-1 flex text-[9px] font-bold tracking-widest text-slate-500 uppercase bg-slate-100 rounded-full px-2 py-0.5 w-fit border border-slate-200">
                            {profile?.plan || 'Free'} Plan
                        </span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto pt-2 custom-scrollbar">
                <NavLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" active={pathname === '/dashboard'} />

                {/* Core Action: Generate Reply */}
                <Link href="/dashboard/generate" className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-all group/gen
                    ${pathname.includes('generate')
                        ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 border-l-2 border-indigo-500 shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600 font-medium"}
                `}>
                    <div className="flex items-center gap-3">
                        <MessageSquareText className={`w-4 h-4 ${pathname.includes('generate') ? "fill-indigo-100" : "group-hover/gen:text-indigo-600"}`} />
                        <span className={`text-sm ${pathname.includes('generate') ? 'font-bold' : 'font-semibold'}`}>Generate Reply</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                        New
                    </span>
                </Link>

                <NavLink href="/dashboard/history" icon={History} label="History" active={pathname.includes('history')} />
                <NavLink href="/dashboard/analytics" icon={BarChart3} label="Analytics" active={pathname.includes('analytics')} />

                <div className="pt-5 pb-2">
                    <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">— Account —</p>
                </div>

                <NavLink href="/dashboard/api-keys" icon={Key} label="API Keys" active={pathname.includes('api-keys')} isLocked={isFreePlan} />
                <NavLink href="/dashboard/billing" icon={Receipt} label="Billing & Plan" active={pathname.includes('billing')} />
                <NavLink href="/dashboard/settings" icon={Settings} label="Settings" active={pathname.includes('settings')} />
            </nav>

            {/* Upgrade Card */}
            {isFreePlan && (
                <div className="mx-3 mb-4 rounded-2xl bg-gradient-primary p-5 text-white shadow-xl shadow-indigo-500/10 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Zap className="h-6 w-6 text-amber-300 mb-2 fill-amber-300 drop-shadow-sm" />
                    <h4 className="font-bold text-[13px]">Unlock Auto-Reply</h4>
                    <p className="text-white/80 text-[11px] mt-1 mb-4 leading-relaxed font-medium">Post to 100+ platforms automatically with AI.</p>
                    <Link href="/dashboard/billing" className="block w-full rounded-xl bg-white text-indigo-600 text-xs font-bold text-center py-2.5 hover:scale-105 active:scale-95 transition-all shadow-md">
                        Upgrade →
                    </Link>
                </div>
            )}

            {/* Profile Footer */}
            <div className="border-t border-slate-100 px-3 py-4">
                <div className="flex items-center justify-between p-2 rounded-xl group transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white">
                            {profile?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex flex-col truncate">
                            <span className="text-[13px] font-bold text-slate-800 truncate leading-none mb-1">{profile?.full_name || 'User Name'}</span>
                            <span className="text-[10px] font-medium text-slate-500 truncate">{profile?.email || 'user@email.com'}</span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <button className="relative text-slate-400 hover:text-indigo-600 transition-colors">
                            <Bell className="w-4 h-4" />
                            <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                            title="Log Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

function NavLink({ href, icon: Icon, label, active, isLocked }: any) {
    return (
        <Link
            href={href}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all group
                ${active
                    ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 font-bold border-l-2 border-indigo-500 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600 font-semibold"
                }`}
        >
            <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${active ? 'fill-indigo-100' : 'group-hover:text-indigo-600'}`} />
                <span>{label}</span>
            </div>
            {isLocked && <KeyRound className="w-3 h-3 text-slate-300 group-hover:text-indigo-300" />}
        </Link>
    );
}
