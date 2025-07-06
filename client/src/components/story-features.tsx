import { motion } from "framer-motion";
import { Shield, Heart, Users } from "lucide-react";

export default function StoryFeatures() {
  const features = [
    {
      icon: Shield,
      title: "Protection & Loyalty",
      description: "Stories of incredible loyalty and protection, where pets become heroes in their families' lives, watching over loved ones with unwavering dedication.",
      buttonText: "Read Protection Stories",
      delay: 0,
    },
    {
      icon: Heart,
      title: "Comfort & Healing",
      description: "Heartwarming tales of emotional support and healing, showing how pets intuitively provide comfort during life's most challenging moments.",
      buttonText: "Read Healing Stories",
      delay: 0.2,
    },
    {
      icon: Users,
      title: "Pure Companionship",
      description: "Celebrate the joy of everyday moments shared with our furry friends, from morning walks to quiet evenings together.",
      buttonText: "Read Companion Stories",
      delay: 0.4,
    },
  ];

  return (
    <section id="stories" className="py-20 bg-gradient-to-b from-cream to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-warm-brown mb-6">
            The Many Ways Pets Show Love
          </h2>
          <p className="text-xl text-dark-slate max-w-3xl mx-auto leading-relaxed">
            From protective instincts to gentle comfort, discover how our beloved companions enrich our lives in countless ways
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300"
              >
                <div className="text-soft-coral text-4xl mb-6 text-center">
                  <Icon size={48} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-warm-brown mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-dark-slate leading-relaxed mb-6">
                  {feature.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-warm-brown hover:bg-opacity-90 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                >
                  {feature.buttonText}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
