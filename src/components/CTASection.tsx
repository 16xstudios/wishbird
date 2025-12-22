import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Calendar } from "lucide-react";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-cta opacity-5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-vibrant/20 rounded-full blur-3xl" />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 text-4xl"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [20, -20, 20], rotate: [10, -10, 10] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-40 right-20 text-3xl"
      >
        💜
      </motion.div>
      <motion.div
        animate={{ y: [-15, 15, -15] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 left-1/4 text-3xl"
      >
        🎂
      </motion.div>
      <motion.div
        animate={{ y: [15, -15, 15] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-32 right-1/3 text-4xl"
      >
        🎉
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Hearts */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Heart className="w-8 h-8 text-pink-vibrant fill-pink-vibrant animate-pulse" />
            <Sparkles className="w-10 h-10 text-gold" />
            <Heart className="w-8 h-8 text-pink-vibrant fill-pink-vibrant animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Start Sending Magical{" "}
            <span className="gradient-text">Greetings Today</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Let WishBird handle the wishing — you handle the smiling. 💜
          </p>

          <Button variant="hero" size="xl" className="group" onClick={() => navigate("/auth")}>
            <Calendar className="w-5 h-5 group-hover:animate-wiggle" />
            Schedule Your First Wish
            <Sparkles className="w-5 h-5" />
          </Button>

          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Start free today
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
