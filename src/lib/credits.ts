// Credit costs for different features
export const CREDIT_COSTS = {
  text: 2.5,
  image: 3,
  audio: 4,
  video: 5,
};

// Plan configurations
export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    credits: 10,
    features: {
      text: true,
      textLanguages: ["English"],
      image: true,
      imageLimit: 1,
      video: false,
      audio: false,
      aiText: false,
      aiImage: false,
    },
  },
  basic: {
    name: "Basic",
    price: 49,
    credits: 15,
    features: {
      text: true,
      textLanguages: "all",
      image: true,
      imageLimit: "unlimited",
      video: false,
      audio: false,
      aiText: false,
      aiImage: false,
    },
  },
  pro: {
    name: "Pro",
    price: 99,
    credits: 35,
    features: {
      text: true,
      textLanguages: "all",
      image: true,
      imageLimit: "unlimited",
      video: true,
      audio: false,
      aiText: false,
      aiImage: false,
    },
  },
  premium: {
    name: "Premium",
    price: 199,
    credits: 80,
    features: {
      text: true,
      textLanguages: "all",
      image: true,
      imageLimit: "unlimited",
      video: true,
      audio: true,
      aiText: true,
      aiImage: true,
    },
  },
};

export type PlanType = keyof typeof PLANS;

// Calculate total credits needed for a wish
export function calculateWishCredits(hasText: boolean, hasImage: boolean, hasVideo: boolean, hasAudio: boolean): number {
  let total = 0;
  if (hasText) total += CREDIT_COSTS.text;
  if (hasImage) total += CREDIT_COSTS.image;
  if (hasVideo) total += CREDIT_COSTS.video;
  if (hasAudio) total += CREDIT_COSTS.audio;
  return total;
}

// Check if user can use a feature based on their plan
export function canUseFeature(plan: PlanType, feature: keyof typeof PLANS["free"]["features"]): boolean {
  const planConfig = PLANS[plan];
  if (!planConfig) return false;
  return Boolean(planConfig.features[feature]);
}

// Check if user has enough credits
export function hasEnoughCredits(userCredits: number, hasText: boolean, hasImage: boolean, hasVideo: boolean, hasAudio: boolean): boolean {
  const required = calculateWishCredits(hasText, hasImage, hasVideo, hasAudio);
  return userCredits >= required;
}

// Get feature restriction message
export function getFeatureRestrictionMessage(plan: PlanType, feature: string): string {
  const planNames: Record<string, string> = {
    video: "Pro",
    audio: "Pro",
    aiText: "Premium",
    aiImage: "Premium",
  };
  
  const requiredPlan = planNames[feature] || "Basic";
  return `Upgrade to ${requiredPlan} to unlock this feature`;
}
