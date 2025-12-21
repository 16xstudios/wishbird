-- Add credits column to profiles and update default subscription plan
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS credits numeric NOT NULL DEFAULT 10,
ADD COLUMN IF NOT EXISTS plan_expires_at timestamp with time zone;

-- Create subscription_plans enum
DO $$ BEGIN
    CREATE TYPE public.subscription_plan AS ENUM ('free', 'basic', 'pro', 'premium');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update subscription_plan column type
ALTER TABLE public.profiles 
ALTER COLUMN subscription_plan SET DEFAULT 'free';

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    razorpay_order_id text NOT NULL,
    razorpay_payment_id text,
    razorpay_signature text,
    amount integer NOT NULL,
    currency text NOT NULL DEFAULT 'INR',
    plan text NOT NULL,
    credits_purchased integer NOT NULL,
    status text NOT NULL DEFAULT 'pending',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- RLS policies for payments
CREATE POLICY "Users can view their own payments"
ON public.payments
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payments"
ON public.payments
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Service role can update payments (for webhook)
CREATE POLICY "Service role can update payments"
ON public.payments
FOR UPDATE
USING (true);

-- Create trigger for updated_at on payments
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update existing profiles to have 10 credits if they have 0
UPDATE public.profiles SET credits = 10 WHERE credits = 0 OR credits IS NULL;