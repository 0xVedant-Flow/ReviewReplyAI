import Link from "next/link";
import { Sparkles, MessageSquare, Zap, Globe2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <MessageSquare className="h-6 w-6" />
            ReviewReply AI
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-indigo-600">Login</Link>
            <Link href="/signup" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <div className="relative overflow-hidden pt-24 pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8 inline-flex items-center justify-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
              <Sparkles className="mr-2 h-4 w-4" />
              ReviewReply AI SaaS Boilerplate 1.0 Available
            </div>

            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
              Turn Reviews into Revenue in <span className="text-indigo-600">10 Seconds</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
              The world's most advanced multilingual review response engine. Connect Google, Yelp, Trustpilot and instantly generate SEO-optimized, brand-aligned replies.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <Link href="/login" className="rounded-lg bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1 hover:bg-indigo-700">
                Start for free today
              </Link>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-8 text-left border border-slate-100">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Globe2 className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">95+ Languages</h3>
                <p className="text-slate-600">Auto-detect the language of every customer review and dynamically respond in their native tongue.</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-8 text-left border border-slate-100">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">Sentiment Engine</h3>
                <p className="text-slate-600">Automatically map star ratings to emotions. Empathy for 1-stars, warmth & gratitude for 5-stars.</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-8 text-left border border-slate-100">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">API Access</h3>
                <p className="text-slate-600">Integrate our master AI pipeline straight into your native applications safely and securely.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
