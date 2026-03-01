"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export default function BillingPage() {
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const plans = [
        {
            name: "Starter", price: 29, limits: "200 Responses/mo",
            features: ["Sentiment Analysis", "Auto-Language detect", "Email Support"],
            priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || "prod_U4PMR0pwaOXyOe"
        },
        {
            name: "Pro", price: 59, limits: "Unlimited Responses",
            features: ["Everything in Starter", "API Access", "Priority Support"],
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "prod_U4PIUCOTyXPkf8"
        },
        {
            name: "Agency", price: 199, limits: "Unlimited Responses",
            features: ["Everything in Pro", "White-label reports", "Dedicated Account Manager"],
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
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Billing & Plans</h1>

            <div className="mt-8 grid gap-8 md:grid-cols-3">
                {plans.map((plan) => (
                    <div key={plan.name} className="flex flex-col justify-between rounded-2xl border bg-white p-8 shadow-sm">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                            <p className="mt-4 flex items-baseline text-slate-900">
                                <span className="text-4xl font-extrabold tracking-tight">${plan.price}</span>
                                <span className="ml-1 text-sm font-medium text-slate-500">/mo</span>
                            </p>
                            <p className="mt-2 text-sm text-indigo-600 font-medium">{plan.limits}</p>

                            <ul className="mt-8 space-y-4">
                                {plan.features.map(feat => (
                                    <li key={feat} className="flex items-center text-sm text-slate-600">
                                        <Check className="mr-3 h-5 w-5 text-indigo-500" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button
                            onClick={() => handleCheckout(plan.priceId, plan.name)}
                            disabled={loadingId === plan.name}
                            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50"
                        >
                            {loadingId === plan.name ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                            {loadingId === plan.name ? "Redirecting..." : `Upgrade to ${plan.name}`}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
