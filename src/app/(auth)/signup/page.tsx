"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessageSquareText, Mail, Lock, Eye, EyeOff, User, Building2, Check, Loader2, PartyPopper } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    business_name: businessName,
                }
            }
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F7FF] p-6">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto mb-8 relative">
                        <Check className="w-10 h-10 text-emerald-600 animate-[draw_0.5s_ease-out]" />
                        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Check your email! 🚀</h1>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed text-balance">
                        We've sent a magic activation link to <span className="text-indigo-600 font-bold">{email}</span>. Click it to start generating 10 free responses.
                    </p>
                    <Link href="/login" className="block w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                        Go to Sign In →
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-white font-sans selection:bg-indigo-100 selection:text-indigo-600 overflow-hidden">

            {/* LEFT PANEL */}
            <div className="hidden lg:flex w-1/2 bg-[#0F0F1A] relative flex-col justify-center px-16">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pin-900/40 backdrop-blur-3xl animate-pulse"></div>

                <div className="relative z-10 flex flex-col gap-10">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                            <MessageSquareText className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-extrabold text-white">ReviewReply AI</span>
                    </Link>

                    <h2 className="text-5xl font-extrabold text-white leading-tight">
                        Start for free 🚀
                        <div className="inline-flex mt-4 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm font-bold text-gradient uppercase tracking-widest whitespace-nowrap">
                            ✨ 10 responses/month included
                        </div>
                    </h2>

                    <div className="space-y-6">
                        <AuthFeature text="Instant setup in 2 minutes" />
                        <AuthFeature text="No credit card required" />
                        <AuthFeature text="Cancel or upgrade anytime" />
                    </div>

                    <p className="text-slate-500 text-sm font-medium mt-10">
                        Joining 10,000+ businesses worldwide.
                    </p>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F8F7FF]">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-sm bg-white p-8 rounded-[40px] shadow-2xl shadow-indigo-900/5 overflow-y-auto max-h-[90vh] py-10 custom-scrollbar">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account 🚀</h1>
                        <p className="text-slate-500 font-medium text-sm">Join the #1 review response engine</p>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={() => {/* Mocked same as login */ }}
                            className="w-full flex items-center justify-center gap-3 border-2 border-slate-100 py-3.5 rounded-2xl hover:bg-slate-50 transition-all font-bold text-sm text-slate-700"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 48 48">
                                <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Continue with Google
                        </button>

                        <div className="flex items-center px-4 py-2">
                            <div className="h-px bg-slate-100 flex-1"></div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mx-3">Or use email</span>
                            <div className="h-px bg-slate-100 flex-1"></div>
                        </div>

                        <form className="space-y-4" onSubmit={handleSignup}>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    required placeholder="Full Name"
                                    value={fullName} onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="email" required placeholder="Email Address"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="password" required placeholder="Password"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>

                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    placeholder="Business Name (Optional)"
                                    value={businessName} onChange={(e) => setBusinessName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                />
                            </div>

                            <div className="flex items-start gap-3 p-2">
                                <input type="checkbox" required className="mt-1 w-4 h-4 border-slate-200 rounded text-indigo-600 focus:ring-indigo-500" />
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                    By signing up, you agree to our <span className="text-indigo-600 font-bold hover:underline">Terms of Service</span> and <span className="text-indigo-600 font-bold hover:underline">Privacy Policy</span>.
                                </p>
                            </div>

                            {error && <p className="bg-red-50 text-red-600 font-bold text-[11px] p-3 rounded-xl border border-red-100">{error}</p>}

                            <button
                                disabled={loading}
                                className="w-full bg-gradient-primary text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Free Account →"}
                            </button>
                        </form>

                        <div className="text-center pt-6 pb-2">
                            <p className="text-slate-500 text-sm font-medium">
                                Already have an account? <Link href="/login" className="text-indigo-600 font-bold hover:underline">Sign in</Link>
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
