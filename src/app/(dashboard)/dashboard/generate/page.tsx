"use client";

import { useState } from "react";
import { Copy, Loader2, Sparkles, Check } from "lucide-react";

export default function GeneratePage() {
    const [loading, setLoading] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [starRating, setStarRating] = useState<number>(5);
    const [platform, setPlatform] = useState("Google");
    const [responses, setResponses] = useState<any>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/v1/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ review_text: reviewText, star_rating: starRating, platform })
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
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">AI Response Generator</h1>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Input Form */}
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <form onSubmit={handleGenerate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Customer Review</label>
                            <textarea
                                required
                                rows={5}
                                className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Paste the customer's review here..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Star Rating</label>
                                <select
                                    className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    value={starRating}
                                    onChange={(e) => setStarRating(Number(e.target.value))}
                                >
                                    {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">Platform</label>
                                <select
                                    className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                >
                                    <option>Google</option>
                                    <option>Yelp</option>
                                    <option>Facebook</option>
                                    <option>Trustpilot</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !reviewText.trim()}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                            {loading ? "Generating Output..." : "Generate Responses"}
                        </button>
                    </form>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    {!responses ? (
                        <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-slate-50 p-6 text-center text-slate-500">
                            <Sparkles className="mb-4 h-10 w-10 text-slate-300" />
                            <p>Provide a review and click generate to see AI-crafted responses.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg bg-indigo-50 px-4 py-3">
                                <div className="text-sm">
                                    <span className="font-medium text-indigo-900">Sentiment:</span>
                                    <span className="ml-2 text-indigo-700">{responses.sentiment_analysis?.overall}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="font-medium text-indigo-900">Language:</span>
                                    <span className="ml-2 text-indigo-700">{responses.language_detection?.language}</span>
                                </div>
                            </div>

                            {responses.responses?.map((resp: any, i: number) => (
                                <div key={i} className="group relative rounded-xl border bg-white p-5 shadow-sm transition-all hover:border-indigo-200">
                                    <p className="text-sm text-slate-600 mb-3">{resp.text}</p>
                                    <div className="flex items-center justify-between border-t pt-3">
                                        <span className="text-xs font-medium text-slate-400">Tone: {resp.tone}</span>
                                        <button
                                            onClick={() => copyToClipboard(resp.text, i)}
                                            className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"
                                        >
                                            {copiedIndex === i ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                                            {copiedIndex === i ? "Copied" : "Copy"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
