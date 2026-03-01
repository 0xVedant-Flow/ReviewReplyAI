"use client";

import { motion } from "framer-motion";
import { Check, X, Star, Zap, ShieldCheck, ChevronDown, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: "Free",
            price: 0,
            description: "Get Started",
            features: ["10 AI Responses/mo", "Sentiment Analysis", "Language Detection", "Email Support", "History (7 days)"],
            notIncluded: ["Auto-Posting", "API Access", "Priority Support", "Advanced Tone Settings"],
            cta: "Start Free",
            color: "slate",
        },
        {
            name: "Starter",
            price: isAnnual ? 23 : 29,
            description: "For Growing Businesses",
            features: ["200 AI Responses/mo", "Auto-Posting (GMB/FB)", "Sentiment Analysis", "Custom Brand Voice", "Email Support", "Full History"],
            notIncluded: ["API Access", "Priority Support", "White-label reports"],
            cta: "Get Starter",
            color: "indigo",
        },
        {
            name: "Pro",
            price: isAnnual ? 47 : 59,
            description: "Most Popular for Teams",
            featured: true,
            features: ["Unlimited AI Responses", "Auto-Posting (100+ platforms)", "API Access (Beta)", "Dedicated Tone Modes", "SEO Keyword Injection", "Priority Support", "Performance Reports", "Brand Voice Profiles"],
            cta: "Get Pro →",
            color: "purple",
        },
        {
            name: "Agency",
            price: isAnnual ? 159 : 199,
            description: "For Digital Agencies",
            dark: true,
            features: ["Everything in Pro", "Manage 50+ Clients", "White-label Dashboard", "Custom Domain (Add-on)", "Dedicated Account Manager", "Batch Generation", "Unlimited History", "Full API Access"],
            cta: "Get Agency",
            color: "indigo",
        },
    ];

    return (
        <div className="pt-20">

            {/* HEADER SECTION */}
            <section className="bg-[#0F0F1A] text-white py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 text-xs font-bold text-gradient uppercase tracking-widest">
                        Simple Pricing
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Start Free. <span className="text-gradient">Scale When Ready.</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-12">
                        No hidden fees. No long-term contracts. Cancel anytime. <br />
                        Your first 10 responses are on us.
                    </p>

                    {/* TOGGLE */}
                    <div className="flex items-center justify-center gap-4">
                        <span className={`text-sm font-bold transition-colors ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="w-14 h-8 bg-white/10 rounded-full p-1 relative flex items-center transition-colors hover:bg-white/20"
                        >
                            <motion.div
                                animate={{ x: isAnnual ? 24 : 0 }}
                                className="w-6 h-6 bg-gradient-primary rounded-full shadow-lg"
                            />
                        </button>
                        <div className="flex items-center gap-3">
                            <span className={`text-sm font-bold transition-colors ${isAnnual ? 'text-white' : 'text-slate-500'}`}>Annual</span>
                            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest">Post-Launch: Save 20%</span>
                        </div>
                    </div>
                </div>
                {/* Shapes */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-indigo-600/20 blur-[100px] rounded-full"></div>
                    <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-600/20 blur-[100px] rounded-full"></div>
                </div>
            </section>

            {/* PRICING CARDS */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col justify-between p-8 rounded-[32px] border-2 transition-all hover:scale-[1.02] hover:shadow-2xl ${plan.featured
                                    ? 'bg-white border-indigo-200 shadow-xl shadow-indigo-100 ring-1 ring-indigo-500 z-10 scale-105'
                                    : plan.dark ? 'bg-[#1A1A2E] border-transparent text-white' : 'bg-white border-slate-100 hover:border-slate-200'
                                }`}
                        >
                            {plan.featured && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                    ⭐ Most Popular
                                </div>
                            )}

                            <div>
                                <h3 className={`text-xl font-bold mb-2 ${plan.dark ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                                <p className={`text-xs font-bold uppercase tracking-wider mb-6 opacity-60`}>{plan.description}</p>

                                <div className="flex items-baseline gap-1 mb-10">
                                    <span className={`text-5xl font-extrabold tracking-tight ${plan.dark ? 'text-white' : 'text-slate-900'}`}>${plan.price}</span>
                                    <span className="text-sm font-bold opacity-60">/mo</span>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {plan.features.map(f => (
                                        <li key={f} className="flex items-start gap-3 group">
                                            <div className="w-5 h-5 flex-shrink-0 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                                                <Check className="w-3 h-3 text-emerald-600 font-bold" />
                                            </div>
                                            <span className={`text-sm font-bold ${plan.dark ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>{f}</span>
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

                            <Link href="/signup" className={`w-full py-4 rounded-2xl text-center font-bold text-sm shadow-lg transition-all active:scale-95 ${plan.featured
                                    ? 'bg-gradient-primary text-white shadow-indigo-200 hover:shadow-indigo-300'
                                    : plan.dark ? 'bg-white text-[#1A1A2E] hover:bg-slate-50' : 'bg-slate-900 text-white hover:bg-slate-800'
                                }`}>
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* LIFETIME BANNER */}
            <section className="py-12 max-w-7xl mx-auto px-6">
                <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 p-10 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden group shadow-2xl shadow-orange-500/20">
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left">
                        <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform">
                            <Flame className="w-10 h-10 text-white animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-extrabold mb-1">Lifetime Deal — $99 One-Time Payment</h2>
                            <p className="text-white/80 font-bold">Get Pro plan features forever. Only 500 spots available.</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 relative z-10">
                        <div className="bg-red-500/20 border border-white/20 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest flex items-center gap-2">
                            ⏱️ 47 spots remaining
                        </div>
                        <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all outline outline-4 outline-white/10">
                            Grab Lifetime Deal →
                        </button>
                    </div>
                </div>
            </section>

            {/* MONEY BACK GUARANTEE */}
            <section className="py-24 text-center max-w-2xl mx-auto px-6">
                <div className="w-20 h-20 bg-indigo-50 flex items-center justify-center rounded-3xl mx-auto mb-8 shadow-inner">
                    <ShieldCheck className="w-10 h-10 text-indigo-500" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">30-Day Money-Back Guarantee</h2>
                <p className="text-slate-500 font-bold leading-relaxed">
                    Not satisfied with the results? We'll refund every single penny of your first month's subscription, no questions asked. We're that confident.
                </p>
            </section>

        </div>
    );
}
