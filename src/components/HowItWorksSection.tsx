import { motion } from "framer-motion";
import { UserPlus, Palette, Wand2, Send, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "1",
    title: "Fill Recipient Details",
    description: "Name, number, occasion, date & time — we handle the rest.",
    color: "bg-primary/10 text-primary",
    iconBg: "bg-primary",
  },
  {
    icon: Palette,
    step: "2",
    title: "Add Your Personal Touch",
    description: "Upload photos, add text, or let AI write a beautiful message.",
    color: "bg-accent/10 text-accent",
    iconBg: "bg-accent",
  },
  {
    icon: Wand2,
    step: "3",
    title: "AI Creates The Magic",
    description: "Auto-generate greeting card, voice note, and translations.",
    color: "bg-primary/10 text-primary",
    iconBg: "bg-primary",
  },
  {
    icon: Send,
    step: "4",
    title: "Wish Delivered Automatically",
    description: "WhatsApp message sent exactly on time — even while you sleep.",
    color: "bg-accent/10 text-accent",
    iconBg: "bg-accent",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-4">
            <span className="text-sm font-semibold text-primary">Simple & Easy</span>
          </span>
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
            Four simple steps to send magical greetings that make people smile 💜
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) - Clean Blue to Teal */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-blue-400 to-accent transform -translate-y-1/2 z-0 opacity-30" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative z-10"
              >
                <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-glow transition-all duration-300 border border-border/50 h-full group relative z-10">
                  {/* Step Number */}
                  <div className={`w-12 h-12 rounded-full ${step.iconBg} flex items-center justify-center mb-4 shadow-button group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-6 h-6 text-primary-foreground" />
                  </div>

                  {/* Step Badge */}
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${step.color} text-xs font-bold mb-3`}>
                    Step {step.step}
                  </div>

                  <h3 className="font-sans text-xl font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Desktop) - Clean, centered, with background to hide line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-8 transform -translate-y-1/2 z-20 justify-center items-center">
                    <div className="bg-background rounded-full p-2 border border-border shadow-sm">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
