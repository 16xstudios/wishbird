import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Crown, Star, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/forever",
    description: "Get started with WishBot",
    helper: "10 credits included",
    icon: Sparkles,
    features: [
      { text: "10 credits (one-time)", included: true },
      { text: "Basic text messages", included: true },
      { text: "English language only", included: true },
      { text: "1 image per wish", included: true },
      { text: "Video messages", included: false },
      { text: "Audio messages", included: false },
      { text: "AI text generation", included: false },
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
    planKey: "free",
  },
  {
    name: "Basic",
    price: "₹49",
    period: "/month",
    description: "For regular wishers",
    helper: "15 credits per month",
    icon: Star,
    features: [
      { text: "15 credits per month", included: true },
      { text: "Multi-language support", included: true },
      { text: "Unlimited images", included: true },
      { text: "Priority delivery", included: true },
      { text: "Video messages", included: false },
      { text: "Audio messages", included: false },
      { text: "AI generation", included: false },
    ],
    cta: "Get Basic",
    variant: "outline" as const,
    popular: false,
    planKey: "basic",
  },
  {
    name: "Pro",
    price: "₹99",
    period: "/month",
    description: "For power users",
    helper: "35 credits per month",
    icon: Crown,
    features: [
      { text: "35 credits per month", included: true },
      { text: "Everything in Basic", included: true },
      { text: "Video messages", included: true },
      { text: "Delivery confirmation", included: true },
      { text: "Priority support", included: true },
      { text: "Audio messages", included: false },
      { text: "AI generation", included: false },
    ],
    cta: "Go Pro",
    variant: "hero" as const,
    popular: true,
    planKey: "pro",
  },
  {
    name: "Premium",
    price: "₹199",
    period: "/month",
    description: "Unlimited magic",
    helper: "80 credits + free AI",
    icon: Crown,
    features: [
      { text: "80 credits per month", included: true },
      { text: "Everything in Pro", included: true },
      { text: "Audio/Voice messages", included: true },
      { text: "AI text generation (free)", included: true },
      { text: "AI image generation (free)", included: true },
      { text: "Premium templates", included: true },
      { text: "24/7 support", included: true },
    ],
    cta: "Go Premium",
    variant: "golden" as const,
    popular: false,
    planKey: "premium",
  },
];

const creditUsage = [
  { feature: "Text Wish", emoji: "📝", credits: "2.5" },
  { feature: "Image Attachment", emoji: "🖼️", credits: "+3" },
  { feature: "Audio / Voice", emoji: "🔊", credits: "+4" },
  { feature: "Video Greeting", emoji: "🎥", credits: "+5" },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-pricing">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-light border border-primary/20 mb-4">
            <span className="text-sm font-medium text-primary">Simple Pricing</span>
          </span>
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            🎁 Start free with 10 credits — upgrade when you need more magic.
          </p>
        </motion.div>

        {/* Credit Usage Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="bg-card rounded-xl p-6 border border-border/50">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              🪙 Credit Usage
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {creditUsage.map((item) => (
                <div key={item.feature} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm text-foreground flex items-center gap-2">
                    <span>{item.emoji}</span>
                    {item.feature}
                  </span>
                  <span className="text-sm font-bold text-primary">{item.credits} credits</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-card rounded-2xl p-6 border ${
                plan.popular
                  ? "border-primary shadow-glow scale-105 z-10"
                  : plan.name === "Premium"
                  ? "border-gold/50 shadow-card"
                  : "border-border/50 shadow-card"
              } transition-all duration-300 hover:shadow-glow`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-cta rounded-full text-xs font-bold text-primary-foreground flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              {/* Premium Badge */}
              {plan.name === "Premium" && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gold rounded-full text-xs font-bold text-foreground flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Best Value
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${
                  plan.popular
                    ? "bg-gradient-cta"
                    : plan.name === "Premium"
                    ? "bg-gold"
                    : "bg-indigo-light"
                } flex items-center justify-center mb-4`}
              >
                <plan.icon
                  className={`w-6 h-6 ${
                    plan.popular || plan.name === "Premium" ? "text-primary-foreground" : "text-primary"
                  }`}
                />
              </div>

              {/* Name & Price */}
              <h3 className="text-2xl font-bold tracking-tight text-foreground">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{plan.description}</p>
              {plan.helper && <p className="text-xs text-primary font-medium mb-4">{plan.helper}</p>}

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.variant}
                className={`w-full ${
                  plan.name === "Premium" ? "bg-gold hover:bg-gold/90 text-foreground" : ""
                }`}
                onClick={() => {
                  if (plan.planKey === "free") {
                    window.location.href = "/auth";
                  } else {
                    window.location.href = `/auth?plan=${plan.planKey}`;
                  }
                }}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Value Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-12"
        >
          <div className="bg-card rounded-xl p-6 border border-border/50">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              📊 Value Comparison
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-2 text-muted-foreground font-medium">Pack</th>
                    <th className="text-center py-2 text-muted-foreground font-medium">Price</th>
                    <th className="text-center py-2 text-muted-foreground font-medium">Credits</th>
                    <th className="text-center py-2 text-muted-foreground font-medium">₹ / Credit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/30">
                    <td className="py-3 text-foreground">Basic</td>
                    <td className="py-3 text-center text-foreground">₹49</td>
                    <td className="py-3 text-center text-foreground">15</td>
                    <td className="py-3 text-center text-foreground">₹3.26</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="py-3 text-foreground flex items-center gap-1">
                      Pro <Star className="w-3 h-3 text-gold" />
                    </td>
                    <td className="py-3 text-center text-foreground">₹99</td>
                    <td className="py-3 text-center text-foreground">35</td>
                    <td className="py-3 text-center text-foreground">₹2.83</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-foreground">Premium</td>
                    <td className="py-3 text-center text-foreground">₹199</td>
                    <td className="py-3 text-center text-foreground">80</td>
                    <td className="py-3 text-center text-primary font-bold">₹2.48</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
