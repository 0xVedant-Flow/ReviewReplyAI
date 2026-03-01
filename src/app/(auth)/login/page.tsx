"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Sparkles, Mail } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: `${location.origin}/auth/callback` },
        });
        alert("Check your email for the login link!");
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl border border-slate-100">
                <div className="text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                        <Sparkles className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Sign in to ReviewReply AI
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-lg border border-slate-300 pl-10 px-3 py-3 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-indigo-700 shadow-sm"
                        >
                            Sign in with Email
                        </button>
                    </div>

                    <div className="mt-6">
                        <div className="relative border-b border-gray-200">
                            <div className="absolute inset-x-0 -top-3 flex justify-center">
                                <span className="bg-white px-4 text-sm text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${location.origin}/auth/callback` } })}
                            className="mt-6 flex w-full justify-center rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="mr-2 h-5 w-5" />
                            Continue with Google
                        </button>

                        <button
                            type="button"
                            onClick={() => supabase.auth.signInWithOAuth({ provider: "facebook", options: { redirectTo: `${location.origin}/auth/callback` } })}
                            className="mt-3 flex w-full justify-center rounded-lg border border-slate-300 bg-[#1877F2] text-white px-4 py-3 text-sm font-medium hover:bg-blue-600 transition-all shadow-sm"
                        >
                            <svg className="mr-2 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                            Continue with Facebook
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
