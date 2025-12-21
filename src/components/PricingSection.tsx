import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Crown, Building2, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/forever",
    description: "Get started with WishBot",
    helper: "",
    icon: Sparkles,
    features: [
      { text: "2 free wishes (one-time only)", included: true },
      { text: "Basic text messages", included: true },
      { text: "English language only", included: true },
      { text: "Standard delivery", included: true },
      { text: "Image upload", included: false },
      { text: "Video & Audio", included: false },
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Premium",
    price: "₹99",
    period: "/month",
    description: "For regular wishers",
    helper: "Best for individuals & couples",
    icon: Crown,
    features: [
      { text: "30 wishes per month", included: true },
      { text: "AI-generated text", included: true },
      { text: "Multi-language support", included: true },
      { text: "Image upload (≤25MB)", included: true },
      { text: "Priority delivery", included: true },
      { text: "Delivery confirmation", included: true },
    ],
    notIncluded: ["Video (add-on)", "Audio (add-on)", "AI Voice Note (add-on)"],
    cta: "Upgrade to Premium",
    variant: "hero" as const,
    popular: true,
  },
  {
    name: "Gold",
    price: "₹199",
    period: "/month",
    description: "For power users",
    helper: "Best for creators & power users",
    icon: Crown,
    features: [
      { text: "Unlimited wishes", included: true },
      { text: "Everything in Premium", included: true },
      { text: "Image + Video + Audio", included: true },
      { text: "AI greeting cards", included: true },
      { text: "AI voice messages", included: true },
      { text: "Premium emotional text styles", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Go Gold",
    variant: "golden" as const,
    popular: false,
  },
  {
    name: "Corporate",
    price: "Custom",
    period: "",
    description: "For teams, HR & customer engagement",
    helper: "Starts from ₹999 / month",
    icon: Building2,
    features: [
      { text: "Auto employee wishes", included: true },
      { text: "Customer anniversaries", included: true },
      { text: "CRM integration", included: true },
      { text: "Custom templates", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Dedicated support", included: true },
    ],
    cta: "Contact Sales",
    variant: "outline" as const,
    popular: false,
  },
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
            🎁 Start free — upgrade only when your wishes deserve more magic.
          </p>
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
              className={`relative bg-card rounded-2xl p-6 border ${plan.popular
                ? "border-primary shadow-glow scale-105 z-10"
                : plan.name === "Gold"
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

              {/* Gold Badge */}
              {plan.name === "Gold" && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gold rounded-full text-xs font-bold text-foreground flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Best Value
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl ${plan.popular ? "bg-gradient-cta" :
                plan.name === "Gold" ? "bg-gold" : "bg-indigo-light"
                } flex items-center justify-center mb-4`}>
                <plan.icon className={`w-6 h-6 ${plan.popular || plan.name === "Gold" ? "text-primary-foreground" : "text-primary"
                  }`} />
              </div>

              {/* Name & Price */}
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {plan.name}
              </h2>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {plan.description}
              </p>
              {plan.helper && (
                <p className="text-xs text-primary font-medium mb-4">
                  {plan.helper}
                </p>
              )}

              {/* Features */}
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.included ? "text-foreground" : "text-muted-foreground"}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Not Included (for Premium) */}
              {plan.notIncluded && (
                <div className="mb-4 pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Available as add-ons:</p>
                  <ul className="space-y-1">
                    {plan.notIncluded.map((item) => (
                      <li key={item} className="text-xs text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <Button
                variant={plan.variant}
                className={`w-full ${plan.name === "Gold" ? "bg-gold hover:bg-gold/90 text-foreground" : ""}`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;