export type Profile = {
    id: string;
    email: string | null;
    full_name: string | null;
    avatar_url: string | null;
    plan: 'free' | 'starter' | 'pro' | 'agency';
    stripe_customer_id: string | null;
    stripe_subscription_id: string | null;
    responses_used_this_month: number;
    created_at: string;
    updated_at: string;
};

export type Generation = {
    id: string;
    user_id: string;
    review_text: string;
    star_rating: number;
    platform: string | null;
    business_name: string | null;
    tone_preference: string | null;
    language_detected: string | null;
    sentiment: string | null;
    generated_responses: any;
    created_at: string;
};

export type ReviewInput = {
    review_text: string;
    star_rating: number;
    business_name?: string | null;
    business_type?: string | null;
    platform?: string;
    tone_preference?: string;
    brand_voice?: string | null;
    seo_keywords?: string[];
    response_count?: number;
    owner_name?: string | null;
};
