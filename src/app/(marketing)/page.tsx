"use client";

import { motion } from "framer-motion";
import { MessageSquareText, Wand2, Send, Check, X, ClipboardPaste, Globe, Star, ArrowRight, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function LandingPage() {
    const [demoInput, setDemoInput] = useState("");
    const [demoStep, setDemoStep] = useState(0);

    const demoReviews = [
        { bn: "খাবার ছিল একদম বাজে, সার্ভিস ও ভালো না", en: "Food was terrible, service was bad too", star: 1 },
        { bn: "Amazing experience! Will definitely come back", en: "Amazing experience! Will definitely come back", star: 5 },
        { bn: "الخدمة كانت ممتازة جداً شكراً لكم", en: "The service was excellent, thank you", star: 5 }
    ];

    return (
        <div className="pt-20">

            {/* SECTION 2: HERO */}
            <section className="relative min-h-[90vh] flex items-center bg-[#0F0F1A] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse [animation-delay:2s]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-20">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 hover:border-indigo-500/50 transition-colors group cursor-default">
                            <span className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2">
                                🚀 Now supporting 95+ languages
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <span className="text-gradient">shimmer active</span>
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8">
                            Reply to Every Review <br />
                            <span className="text-gradient">in 10 Seconds</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 max-w-lg mb-10 leading-relaxed">
                            The world's first AI that generates perfect review responses AND auto-posts them globally. Save 87% of your time.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-5">
                            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-gradient-primary text-white font-bold rounded-2xl shadow-2xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all text-center">
                                Start for Free →
                            </Link>
                            <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                                </div>
                                Watch Demo
                            </button>
                        </div>

                        <p className="mt-8 text-sm text-slate-400 font-medium flex gap-6 flex-wrap">
                            <span>✓ No credit card required</span>
                            <span>✓ 10 free responses</span>
                            <span>✓ Setup in 2 minutes</span>
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.8, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative hidden lg:block">
                        <div className="glass-card p-8 shadow-2xl relative z-10 scale-105">
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                            </div>

                            <div className="bg-white/5 rounded-xl p-5 mb-6 border border-white/10 group cursor-default hover:border-indigo-500 transition-colors">
                                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2 uppercase">1-Star Review (Bengali)</div>
                                <p className="text-white text-lg font-medium">"খাবার ছিল বাজে, একদমই ভাল না"</p>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { tone: "Apologetic", text: "আমরা আপনার অভিজ্ঞতার জন্য সত্যিই দুঃখিত। খাবারের মান উন্নয়নে..." },
                                    { tone: "Professional", text: "আপনার মতামতের জন্য ধন্যবাদ। আমরা বিষয়টি গুরুত্বের সাথে..." }
                                ].map((r, i) => (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + (i * 0.2) }} key={i} className="bg-indigo-500/10 rounded-xl p-4 border border-indigo-500/20 flex gap-4">
                                        <div className="flex-1">
                                            <div className="text-[10px] font-bold text-indigo-400 mb-1 uppercase tracking-widest">{r.tone}</div>
                                            <p className="text-white/80 text-sm leading-relaxed">{r.text}</p>
                                        </div>
                                        <button className="bg-indigo-500 text-white p-2 rounded-lg self-end hover:scale-110 transition-transform">
                                            <Send className="w-3.5 h-3.5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-10 bg-indigo-600/30 blur-[100px] z-0"></div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 1: TRUST BAR */}
            <section className="bg-white py-16 border-y border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Trusted by businesses on these platforms</p>
                    <div className="flex justify-between items-center gap-10 opacity-40 hover:opacity-100 transition-opacity flex-wrap md:flex-nowrap">
                        {['Google', 'Facebook', 'Yelp', 'Trustpilot', 'Amazon', 'Shopify'].map(p => (
                            <span key={p} className="text-xl font-extrabold text-slate-800 grayscale hover:grayscale-0 transition-all cursor-default">{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 4: PROBLEM → SOLUTION */}
            <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-red-50/50 p-10 rounded-3xl border border-red-100 group hover:-translate-y-2 transition-transform">
                    <h3 className="text-2xl font-bold text-red-900 mb-8 flex items-center gap-3">
                        The Nightmare <X className="text-red-500 w-6 h-6" />
                    </h3>
                    <ul className="space-y-6">
                        <ListItem icon={<X className="text-red-400" />} text="4+ hours/week manually replying to reviews" />
                        <ListItem icon={<X className="text-red-400" />} text="Missing reviews on 8+ different platforms" />
                        <ListItem icon={<X className="text-red-400" />} text="70% of global reviews are non-English" />
                        <ListItem icon={<X className="text-red-400" />} text="Enterprise tools cost $299+/month" />
                    </ul>
                </div>

                <div className="bg-emerald-50/50 p-10 rounded-3xl border border-emerald-100 group hover:-translate-y-2 transition-transform shadow-xl shadow-emerald-900/5">
                    <h3 className="text-2xl font-bold text-emerald-900 mb-8 flex items-center gap-3">
                        The Solution <Check className="text-emerald-500 w-6 h-6" />
                    </h3>
                    <ul className="space-y-6">
                        <ListItem icon={<Check className="text-emerald-500" />} text="Generate 5 perfect replies in 3 seconds" />
                        <ListItem icon={<Check className="text-emerald-500" />} text="Auto-post to 100+ platforms simultaneously" />
                        <ListItem icon={<Check className="text-emerald-500" />} text="95+ languages detected automatically" />
                        <ListItem icon={<Check className="text-emerald-500" />} text="Starting at just $29/month" />
                    </ul>
                </div>
            </section>

            {/* SECTION 5: HOW IT WORKS */}
            <section className="bg-[#0F0F1A] py-24 text-white">
                <div className="max-w-7xl mx-auto px-6 text-center mb-20">
                    <h2 className="text-4xl font-extrabold mb-4">From Review to Reply in 3 Steps</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">Our advanced AI engine handles the heavy lifting while you scale your reputation.</p>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                    <div className="absolute top-1/3 left-1/4 right-1/4 h-[2px] border-t-2 border-dashed border-white/10 hidden md:block"></div>

                    <Step
                        number="1" icon={<ClipboardPaste className="w-8 h-8" />}
                        title="Paste the Review"
                        text="Copy any review from any platform and paste it. Our AI instantly detects the language."
                    />
                    <Step
                        number="2" icon={<Wand2 className="w-8 h-8" />}
                        title="AI Generates 5 Replies"
                        text="Get 5 unique, professional responses tailored to the rating and sentiment."
                    />
                    <Step
                        number="3" icon={<Send className="w-8 h-8" />}
                        title="Copy or Auto-Post"
                        text="One-click copy or connect your accounts and let ReviewReply AI post automatically."
                    />
                </div>
            </section>

            {/* SECTION 7: LIVE DEMO WIDGET */}
            <section className="py-24 max-w-4xl mx-auto px-6">
                <div className="bg-white border-2 border-slate-100 shadow-2xl rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden group">
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>

                    <h2 className="text-3xl font-extrabold mb-4 text-slate-900">Try It Live — No Sign Up Needed</h2>
                    <p className="text-slate-500 mb-10">Paste a review in ANY language and see the magic.</p>

                    <div className="space-y-6 max-w-2xl mx-auto">
                        <textarea
                            value={demoInput}
                            onChange={(e) => setDemoInput(e.target.value)}
                            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-inner"
                            placeholder="e.g. খাবার ছিল একদম বাজে..."
                        ></textarea>

                        <div className="flex justify-center gap-3">
                            {demoReviews.map((r, i) => (
                                <button key={i} onClick={() => setDemoInput(r.bn)} className="text-[10px] font-bold bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors px-3 py-1.5 rounded-lg border border-slate-200">
                                    {r.star}★ Example
                                </button>
                            ))}
                        </div>

                        <button className="w-full bg-gradient-primary text-white font-bold h-16 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] shadow-xl shadow-indigo-500/20 active:scale-95 transition-all">
                            Generate Replies →
                        </button>
                    </div>

                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-4 bg-slate-50 rounded animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 10: CTA BANNER */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#EC4899] rounded-[40px] py-16 px-10 text-center text-white relative overflow-hidden shadow-2xl shadow-purple-500/30">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Start Replying Smarter Today</h2>
                        <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg">Join 10,000+ businesses. Get your first 10 responses free without a credit card.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/signup" className="px-10 py-4 bg-white text-[#6366F1] font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                                Get Started Free →
                            </Link>
                            <button className="px-10 py-4 border border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors backdrop-blur">
                                Book a Demo
                            </button>
                        </div>
                    </div>
                    {/* Shapes */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 blur-[60px] rounded-full"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 blur-[60px] rounded-full"></div>
                </div>
            </section>

        </div>
    );
}

function ListItem({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <li className="flex items-center gap-4 text-slate-700 font-semibold group-hover:scale-105 origin-left transition-transform">
            <div className="w-6 h-6 flex-shrink-0">{icon}</div>
            {text}
        </li>
    );
}

function Step({ number, icon, title, text }: { number: string, icon: React.ReactNode, title: string, text: string }) {
    return (
        <div className="relative text-center group">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-full -translate-y-4 px-3 py-1 bg-white/10 backdrop-blur border border-white/20 rounded-full text-xs font-bold tracking-widest text-[#6366F1]">
                STEP 0{number}
            </div>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[240px] mx-auto">{text}</p>
        </div>
    );
}
