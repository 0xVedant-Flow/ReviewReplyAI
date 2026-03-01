"use client";

import { useState } from "react";
import { Copy, Loader2, Sparkles, Wand2, User, Building2, Tags, CheckCircle2, RotateCcw, MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GeneratePage() {
    const [loading, setLoading] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [starRating, setStarRating] = useState<number>(0);
    const [platform, setPlatform] = useState("Google");
    const [tone, setTone] = useState("Auto ✨");

    const [advOpen, setAdvOpen] = useState(false);
    const [responses, setResponses] = useState<any>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const platforms = ["Google", "Facebook", "Yelp", "Trustpilot", "Amazon", "App Store"];
    const tones = ["Auto ✨", "Apologetic", "Friendly", "Professional", "Empathetic"];

    const handleGenerate = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!starRating || !reviewText.trim()) return alert("Please fill review text and select a star rating");

        setLoading(true);
        try {
            const res = await fetch("/api/v1/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ review_text: reviewText, star_rating: starRating, platform, tone_preference: tone.replace(" ✨", "") })
            });

            if (!res.ok) throw new Error("Failed to generate response");
            const data = await res.json();
            setResponses(data);
        } catch (error) {
            console.error(error);
            alert("Error generating responses");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]">

            {/* LEFT PANEL / INPUTS */}
            <div className="w-full lg:w-[45%] flex flex-col gap-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 overflow-y-auto shrink-0">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-900">
                        <span className="bg-gradient-to-br from-indigo-500 to-purple-500 text-transparent bg-clip-text inline-flex items-center gap-2">
                            <Wand2 className="w-6 h-6 text-purple-600" />
                            Generate AI Reply
                        </span>
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Paste any review in 95+ languages.</p>
                </div>

                <div className="space-y-6">
                    <div className="relative">
                        <label className="text-sm font-bold text-slate-800 flex items-center mb-2">
                            Customer Review <span className="text-red-500 ml-1">*</span>
                        </label>
                        <textarea
                            rows={6}
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none shadow-inner"
                            placeholder="Paste the customer review here...&#10;Supports Bengali, English, Arabic, Hindi, and 92+ more languages."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <span className="absolute bottom-3 right-4 text-[11px] font-medium text-slate-400">
                            {reviewText.length} chars
                        </span>

                        {reviewText.length > 10 && (
                            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-3 right-0 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 shadow-sm flex items-center gap-1">
                                🌍 Auto-Detect Active
                            </motion.div>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-800 mb-2 block">
                            Star Rating <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map(num => (
                                <button
                                    key={num}
                                    type="button"
                                    onClick={() => setStarRating(num)}
                                    className={`w-12 h-12 flex items-center justify-center rounded-2xl border-2 transition-all ${starRating >= num ? 'bg-amber-50 border-amber-400 shadow-sm shadow-amber-200/50 scale-105' : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}
                                >
                                    <svg className={`w-7 h-7 ${starRating >= num ? 'text-amber-400 fill-amber-400' : 'text-slate-300 fill-slate-200'}`} viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                </button>
                            ))}
                        </div>
                        {starRating > 0 && (
                            <p className="text-[11px] text-slate-500 font-medium mt-3 bg-slate-50 p-2 rounded-lg inline-block border border-slate-100">
                                {starRating <= 2 ? "Tone mapping: Apologetic suggested" : starRating === 3 ? "Tone mapping: Friendly & Professional options" : "Tone mapping: Enthusiastic & Grateful auto-applied"}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-800 mb-2 block">Platform</label>
                        <div className="flex flex-wrap gap-2">
                            {platforms.map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPlatform(p)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${platform === p ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/20' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-slate-800 mb-2 block">Tone Override</label>
                        <div className="flex flex-wrap gap-2">
                            {tones.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTone(t)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${tone === t ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200 shadow-sm" : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                        <button
                            onClick={() => setAdvOpen(!advOpen)}
                            className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors text-sm font-bold text-slate-700"
                        >
                            <span className="flex items-center gap-2">⚙️ Advanced Options <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded uppercase tracking-wider">PRO</span></span>
                            <svg className={`w-4 h-4 transition-transform ${advOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <AnimatePresence>
                            {advOpen && (
                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                                    <div className="p-4 space-y-4 border-t border-slate-100">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-1.5"><Building2 className="w-3 h-3" /> Business Name</label>
                                                <input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500" placeholder="e.g. Spice Garden" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-1.5"><User className="w-3 h-3" /> Sign off as</label>
                                                <input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500" placeholder="e.g. The Manager" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-1.5"><Tags className="w-3 h-3" /> SEO Keywords (comma separated)</label>
                                            <input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-indigo-500" placeholder="best restaurant, food delivery..." />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading || !starRating || !reviewText.trim()}
                        className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl py-4 flex items-center justify-center gap-2 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                        {loading ? "AI is generating magic..." : "Generate 5 AI Replies →"}
                    </button>
                </div>
            </div>

            {/* RIGHT PANEL / OUTPUTS */}
            <div className="w-full lg:w-[55%] h-full flex flex-col items-center">

                {!responses && !loading ? (
                    <div className="m-auto flex flex-col items-center justify-center text-center p-8 w-full max-w-md bg-white/50 rounded-3xl border border-dashed border-slate-300">
                        <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-pink-100 mb-6 group-hover:scale-110 transition-transform">
                            <Wand2 className="w-10 h-10 text-indigo-500 absolute z-10" />
                            <div className="absolute inset-2 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Your AI responses will appear here</h3>
                        <p className="text-sm text-slate-500 leading-relaxed text-balance">Fill in the form on the left and hit Generate to see the magic. Support 95+ languages automatically.</p>
                    </div>
                ) : loading ? (
                    <div className="w-full space-y-4 mt-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                                <div className="w-1/3 h-4 bg-slate-100 rounded-full mb-4"></div>
                                <div className="w-full h-3 bg-slate-50 rounded-full mb-2"></div>
                                <div className="w-5/6 h-3 bg-slate-50 rounded-full mb-2"></div>
                                <div className="w-2/3 h-3 bg-slate-50 rounded-full mb-4"></div>
                                <div className="border-t border-slate-50 pt-3 flex justify-end">
                                    <div className="w-16 h-6 bg-slate-100 rounded-lg"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-5 pb-10 overflow-y-auto pr-2 custom-scrollbar">

                        {/* Meta Banner */}
                        <div className="bg-white border text-center lg:text-left border-indigo-100 px-5 py-4 rounded-2xl shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4 sticky top-0 z-10 backdrop-blur-md bg-white/90">
                            <div className="flex items-center gap-3 justify-center lg:justify-start flex-wrap">
                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                                    🌍 {responses.language_detection?.language} ({responses.language_detection?.confidence})
                                </span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-md ${responses.sentiment_analysis?.overall === 'Positive' ? 'bg-emerald-100 text-emerald-700' :
                                    responses.sentiment_analysis?.overall === 'Negative' ? 'bg-red-100 text-red-700' :
                                        'bg-amber-100 text-amber-700'
                                    }`}>
                                    {responses.sentiment_analysis?.overall} Sentiment
                                </span>
                            </div>
                            {responses.sentiment_analysis?.main_complaint && (
                                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center lg:justify-end gap-1">
                                    Flag: <span className="lowercase text-red-500 bg-red-50 px-1 py-0.5 rounded">{responses.sentiment_analysis.main_complaint}</span>
                                </p>
                            )}
                        </div>

                        {/* Responses Map */}
                        <div className="space-y-4">
                            {responses.responses?.map((resp: any, i: number) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                    className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all hover:border-indigo-200 relative overflow-hidden"
                                >
                                    {/* Style border line */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="bg-slate-900 text-white text-[10px] space-x-0.5 font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                                {i + 1}
                                            </span>
                                            <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100 tracking-wide uppercase">
                                                {resp.tone}
                                            </span>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded flex items-center gap-1 bg-slate-50">
                                            <MessageSquareText className="w-3 h-3" /> {resp.word_count} words
                                        </span>
                                    </div>

                                    <p className="text-[15px] text-slate-800 leading-relaxed font-medium mb-5" dir="auto">
                                        {resp.text}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                        <div className="flex gap-2">
                                            {resp.seo_keyword_used && (
                                                <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-100 flex items-center gap-1">
                                                    🎯 SEO: {resp.seo_keyword_used}
                                                </span>
                                            )}
                                            <span className="text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-1 rounded-md border border-slate-100">
                                                Style: {resp.style}
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => copyToClipboard(resp.text, i)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all border ${copiedIndex === i
                                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 shadow-sm'
                                                }`}
                                        >
                                            {copiedIndex === i ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            {copiedIndex === i ? "Copied & Used" : "Copy to Clipboard"}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-4 flex justify-center pb-8">
                            <button onClick={() => setResponses(null)} className="text-slate-400 hover:text-indigo-600 text-sm font-bold flex items-center gap-1.5 transition-colors">
                                <RotateCcw className="w-4 h-4" /> Start Over
                            </button>
                        </div>

                    </motion.div>
                )}
            </div>

        </motion.div>
    );
}
