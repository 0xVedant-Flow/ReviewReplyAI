import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from "@supabase/supabase-js";

// We need an admin-level root access since Webhooks can't authenticate as the user
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia'
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    const rawBody = await req.text();
    const sig = req.headers.get('stripe-signature');

    let event;

    try {
        if (!sig || !endpointSecret) throw new Error("Missing sig or endpointSecret");
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    try {
        // Handle the event flow
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.user_id;

                if (!userId) break;

                // Attempt to determine the plan from the subscription
                const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
                const priceId = subscription.items.data[0].price.id;

                let plan = 'free';
                if (priceId === process.env.STRIPE_STARTER_PRICE_ID) plan = 'starter';
                else if (priceId === process.env.STRIPE_PRO_PRICE_ID) plan = 'pro';
                else if (priceId === process.env.STRIPE_AGENCY_PRICE_ID) plan = 'agency';

                await supabaseAdmin.from('profiles').update({
                    plan: plan,
                    stripe_subscription_id: subscription.id,
                }).eq('id', userId);
                break;
            }
            case 'customer.subscription.deleted': {
                // User canceled and period ended
                const subscription = event.data.object as Stripe.Subscription;
                const { data: profiles } = await supabaseAdmin.from('profiles').select('id').eq('stripe_subscription_id', subscription.id);

                if (profiles && profiles.length > 0) {
                    await supabaseAdmin.from('profiles').update({ plan: 'free', stripe_subscription_id: null }).eq('id', profiles[0].id);
                }
                break;
            }
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error("Webhook processing error:", error);
        return NextResponse.json({ error: "Webhook Failed execution" }, { status: 500 });
    }
}
