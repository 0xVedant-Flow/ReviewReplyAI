import { NextRequest, NextResponse } from 'next/server';
import { generateReviewResponse } from '@/lib/gemini';
import { createClient } from '@/lib/supabase/server';
import { ReviewInput } from '@/types';

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        const supabase = await createClient();
        let userId = null;

        // Handle Bearer Token (API Keys)
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7, authHeader.length);
            const { data: apiKeyData, error } = await supabase
                .from('api_keys')
                .select('user_id')
                .eq('key', token)
                .single();

            if (error || !apiKeyData) {
                return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
            }
            userId = apiKeyData.user_id;

            // Update last_used_at
            await supabase.from('api_keys').update({ last_used_at: new Date().toISOString() }).eq('key', token);

        } else {
            // Handle Session Authentication (Dashboard)
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            userId = user.id;
        }

        // Check Plan limits
        const { data: profile } = await supabase
            .from('profiles')
            .select('plan, responses_used_this_month')
            .eq('id', userId)
            .single();

        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        const isLimited = profile.plan === 'free' || profile.plan === 'starter';
        const limit = profile.plan === 'free' ? 10 : profile.plan === 'starter' ? 200 : Infinity;

        if (isLimited && profile.responses_used_this_month >= limit) {
            return NextResponse.json({ error: "Monthly usage limit reached. Please upgrade your plan." }, { status: 429 });
        }

        const body: ReviewInput = await req.json();

        if (!body.review_text || !body.star_rating) {
            return NextResponse.json({ error: "Missing required fields: review_text, star_rating" }, { status: 400 });
        }

        // Call Gemini AI Master Prompt
        const result = await generateReviewResponse(body);

        // Increment Usage (RPC)
        try {
            const { error: rpcError } = await supabase.rpc('increment_response_usage', { user_id_param: userId });
            if (rpcError) console.warn("Usage increment failed:", rpcError);
        } catch (e) {
            console.warn("Usage increment exception:", e);
        }

        // Save History
        try {
            const { error: insertError } = await supabase.from('generations').insert({
                user_id: userId,
                review_text: body.review_text,
                star_rating: body.star_rating,
                platform: body.platform || "Unknown",
                business_name: body.business_name,
                tone_preference: body.tone_preference || "Auto",
                language_detected: result.language_detection?.language,
                sentiment: result.sentiment_analysis?.overall,
                generated_responses: result.responses
            });
            if (insertError) console.warn("Save history failed:", insertError);
        } catch (e) {
            console.warn("Save history exception:", e);
        }

        return NextResponse.json(result, { status: 200 });

    } catch (error: any) {
        console.error('CRITICAL API ERROR:', error);
        return NextResponse.json({
            error: error.message || "Internal Server Error",
            details: process.env.NODE_ENV === 'development' ? error : undefined
        }, { status: 500 });
    }
}

