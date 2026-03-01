"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessageSquareText, Mail, Lock, Eye, EyeOff, Check, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const supabase = createClient();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // In this boilerplate we used Magic Link for login, and Password for Signup (or both)
        // Let's implement Password login here as per the new UI spec's input fields
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            // Try magic link if password fails or just show error
            setError(error.message);
            setLoading(false);
        } else {
            window.location.href = "/dashboard";
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'facebook') => {
        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-indigo-100 selection:text-indigo-600 overflow-hidden">

            {/* LEFT PANEL: Branding & Visuals */}
            <div className="hidden lg:flex w-1/2 bg-[#0F0F1A] relative flex-col justify-center px-16 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6366F1]/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#EC4899]/20 blur-[120px] rounded-full animate-pulse [animation-delay:2s]"></div>

                <div className="relative z-10 flex flex-col gap-12">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <MessageSquareText className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-extrabold text-white tracking-tight">ReviewReply AI</span>
                    </Link>

                    <h2 className="text-5xl font-extrabold text-white leading-tight">
                        Reply to Every Review <br />
                        <span className="text-gradient">in 10 Seconds</span>
                    </h2>

                    <div className="space-y-6">
                        <AuthFeature text="95+ languages auto-detected" />
                        <AuthFeature text="5 AI responses generated instantly" />
                        <AuthFeature text="Auto-post to Google & Facebook" />
                    </div>

                    {/* Floating Mockup */}
                    <motion.div initial={{ y: 20, rotate: 2 }} animate={{ y: 0, rotate: -2 }} transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4 }} className="mt-8 scale-90 origin-left">
                        <div className="glass-card p-6 shadow-2xl relative">
                            <div className="bg-white/10 rounded-lg p-3 mb-4 border border-white/10">
                                <p className="text-white text-xs font-bold mb-1 opacity-50 uppercase tracking-widest">Customer Review (Bengali)</p>
                                <p className="text-white text-sm font-medium">"খাবার ছিল একদম বাজে, সার্ভিস ও ভালো না"</p>
                            </div>
                            <div className="space-y-2 opacity-60">
                                <div className="h-10 bg-indigo-500/20 rounded-lg border border-indigo-500/30"></div>
                                <div className="h-10 bg-indigo-500/20 rounded-lg border border-indigo-500/30 translate-x-4"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <p className="absolute bottom-12 left-16 text-slate-500 text-sm font-medium">
                    Joining 10,000+ businesses worldwide.
                </p>
            </div>

            {/* RIGHT PANEL: Authentication Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F8F7FF]">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-sm bg-white p-10 rounded-[40px] shadow-2xl shadow-indigo-900/5">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back 👋</h1>
                        <p className="text-slate-500 font-medium">Sign in to your ReviewReply AI account</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 hover:border-slate-200 py-3.5 rounded-2xl transition-all shadow-sm group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 48 48"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976d2" d="M43.611,20.083L43.595,20L24,20v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                            <span className="text-sm font-bold text-slate-700">Continue with Google</span>
                        </button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-slate-100"></div>
                            <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">— or continue with email —</span>
                            <div className="flex-grow border-t border-slate-100"></div>
                        </div>

                        <form className="space-y-4" onSubmit={handleEmailLogin}>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email" required placeholder="Email address"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-400"
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"} required placeholder="Password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder-slate-400"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>

                            <div className="flex justify-end">
                                <Link href="#" className="text-xs font-bold text-indigo-600 hover:opacity-80 transition-opacity">Forgot password?</Link>
                            </div>

                            {error && <p className="bg-red-50 text-red-600 text-[11px] font-bold p-3 rounded-xl border border-red-100">{error}</p>}
                            {message && <p className="bg-emerald-50 text-emerald-600 text-[11px] font-bold p-3 rounded-xl border border-emerald-100">{message}</p>}

                            <button
                                disabled={loading}
                                className="w-full bg-gradient-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
                            </button>
                        </form>

                        <div className="text-center pt-6">
                            <p className="text-slate-500 text-sm font-medium">
                                Don't have an account? <Link href="/signup" className="text-indigo-600 font-bold hover:underline">Start free →</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
    );
}

function AuthFeature({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-4 text-white/50 text-lg font-bold group hover:text-white transition-colors cursor-default">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500 transition-colors">
                <Check className="w-4 h-4 text-emerald-500 group-hover:text-white" />
            </div>
            {text}
        </div>
    );
}
