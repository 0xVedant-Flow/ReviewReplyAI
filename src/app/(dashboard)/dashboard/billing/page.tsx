"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Sparkles, Zap, ShieldCheck, Flame, CreditCard, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function BillingPage() {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [profile, setProfile] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setProfile(data);
        }
        loadProfile();
    }, [supabase]);

    const plans = [
        {
            name: "Starter", price: 29, limits: "200 Responses/mo",
            description: "For Growing Businesses",
            features: ["200 AI Responses/mo", "Auto-Posting (GMB/FB)", "Sentiment Analysis", "Custom Brand Voice", "Email Support", "Full History"],
            notIncluded: ["API Access", "Priority Support", "White-label reports"],
            priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "prod_U4PMR0pwaOXyOe"
        },
        {
            name: "Pro", price: 59, limits: "Unlimited Responses",
            featured: true,
            description: "Most Popular for Teams",
            features: ["Unlimited AI Responses", "Auto-Posting (100+ platforms)", "API Access (Beta)", "Dedicated Tone Modes", "SEO Keyword Injection", "Priority Support", "Performance Reports", "Brand Voice Profiles"],
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "prod_U4PIUCOTyXPkf8"
        },
        {
            name: "Agency", price: 199, limits: "Unlimited Responses",
            description: "For Digital Agencies",
            features: ["Everything in Pro", "Manage 50+ Clients", "White-label Dashboard", "Batch Generation", "Unlimited History", "Full API Access"],
            priceId: process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID
        }
    ];

    const handleCheckout = async (priceId: string | undefined, planName: string) => {
        if (!priceId) {
            alert(`Stripe integration price ID missing for ${planName}.`);
            return;
        }

        setLoadingId(planName);
        try {
            const res = await fetch("/api/v1/stripe/checkout", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ priceId })
            });

            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert(data.error || "Failed to initialize checkout session");
            }
        } catch (err) {
            console.error(err);
            alert("Failed to reach server.");
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-12 overflow-hidden">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-[#0F0F1A] flex items-center gap-3">
                        <CreditCard className="w-8 h-8 text-indigo-500" />
                        Billing & Plans
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Manage your subscription and usage limits.</p>
                </div>

                {/* CURRENT PLAN BADGE */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <Star className="w-5 h-5 text-indigo-600 fill-indigo-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Current Plan</p>
                        <p className="text-sm font-extrabold text-slate-900 uppercase">{profile?.plan || 'Free'}</p>
                    </div>
                </div>
            </div>

            {/* USAGE METRIC */}
            {profile?.plan === 'free' && (
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-amber-600 fill-amber-600" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-amber-900">You're near your limit</h4>
                            <p className="text-sm text-amber-700 font-medium">You've used {profile?.responses_used_this_month || 0} / 10 free responses. Upgrade to Pro for unlimited.</p>
                        </div>
                    </div>
                    <div className="w-full md:w-48 bg-amber-200/50 h-2.5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${(profile?.responses_used_this_month || 0) * 10}%` }} className="h-full bg-amber-500 rounded-full" />
                    </div>
                </div>
            )}

            {/* PRICING GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {plans.map((plan, i) => (
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative flex flex-col justify-between p-8 rounded-[32px] border-2 transition-all hover:scale-[1.02] hover:shadow-2xl ${plan.featured
                                ? 'bg-white border-indigo-200 shadow-xl shadow-indigo-100 ring-4 ring-indigo-50/50 z-10'
                                : 'bg-white border-slate-100 hover:border-slate-200'
                            }`}
                    >
                        {plan.featured && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                ⭐ Most Popular
                            </div>
                        )}

                        <div>
                            <h3 className="text-xl font-bold mb-1 text-slate-900">{plan.name}</h3>
                            <p className="text-xs font-bold uppercase tracking-wider mb-6 opacity-60 text-slate-500">{plan.description}</p>

                            <div className="flex items-baseline gap-1 mb-10">
                                <span className="text-5xl font-extrabold tracking-tight text-slate-900">${plan.price}</span>
                                <span className="text-sm font-bold opacity-60 text-slate-500">/mo</span>
                            </div>

                            <ul className="space-y-4 mb-10">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-start gap-3 group">
                                        <div className="w-5 h-5 flex-shrink-0 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform shadow-sm">
                                            <Check className="w-3 h-3 text-emerald-600 font-bold" />
                                        </div>
                                        <span className="text-sm font-extrabold text-slate-600 leading-relaxed">{f}</span>
                                    </li>
                                ))}
                                {plan.notIncluded && plan.notIncluded.map(f => (
                                    <li key={f} className="flex items-start gap-3 opacity-30">
                                        <div className="w-5 h-5 flex-shrink-0 bg-slate-100 rounded-full flex items-center justify-center mt-0.5">
                                            <X className="w-3 h-3 text-slate-400" />
                                        </div>
                                        <span className="text-sm font-bold leading-relaxed">{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={() => handleCheckout(plan.priceId, plan.name)}
                            disabled={loadingId === plan.name || profile?.plan === plan.name.toLowerCase()}
                            className={`w-full py-4 rounded-2xl text-center font-bold text-sm shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${profile?.plan === plan.name.toLowerCase()
                                    ? 'bg-slate-100 text-slate-400 cursor-default border border-slate-200'
                                    : plan.featured
                                        ? 'bg-gradient-primary text-white shadow-indigo-200 hover:shadow-indigo-300'
                                        : 'bg-slate-900 text-white hover:bg-slate-800'
                                }`}
                        >
                            {loadingId === plan.name ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            {profile?.plan === plan.name.toLowerCase() ? "Current Plan ✓" : loadingId === plan.name ? "Redirecting..." : `Get ${plan.name} →`}
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* LIFETIME DEAL & GUARANTEE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 pb-10">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-8 rounded-[32px] text-white relative overflow-hidden group shadow-xl shadow-orange-500/10">
                    <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <Flame className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h4 className="text-xl font-extrabold">Lifetime Pro DEAL</h4>
                                <p className="text-white/80 font-bold text-sm">Pay $99 once, get Pro forever.</p>
                            </div>
                        </div>
                        <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all">
                            Grab Offer →
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 p-8 rounded-[32px] flex items-center gap-6 shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 flex items-center justify-center rounded-2xl flex-shrink-0">
                        <ShieldCheck className="w-10 h-10 text-indigo-500" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-900">30-Day Money-Back</h4>
                        <p className="text-slate-500 text-sm font-medium">Not satisfied? We'll refund your first month, no questions asked.</p>
                    </div>
                </div>
            </div>

        </motion.div>
    );
}
