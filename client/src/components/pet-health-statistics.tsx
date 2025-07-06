import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, TrendingDown, Search, Dog, Clock, Home } from "lucide-react";

// Counter animation component
function AnimatedCounter({ value, suffix = "%", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // Animation duration in ms
      const increment = value / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-warm-brown to-soft-coral bg-clip-text text-transparent">
      {prefix}{count}{suffix}
    </span>
  );
}

export default function PetHealthStatistics() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-cream-light to-white relative overflow-hidden scroll-snap-section">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-soft-coral rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-warm-brown rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <Dog className="w-16 h-16 text-soft-coral mx-auto" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-warm-brown mb-6">
            The Unspoken Pet Crisis: What the Studies Reveal
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-dark-slate/80 max-w-4xl mx-auto leading-relaxed">
            Our pets love us unconditionally, but are we giving them the care they deserve?
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {/* Obesity Crisis */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80"
                alt="Overweight pet looking tired"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white mb-2">Obesity Crisis</h3>
                <p className="text-white/90 text-sm">Silent suffering in plain sight</p>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-4 mb-6">
                <div>
                  <AnimatedCounter value={61} />
                  <p className="text-lg text-dark-slate/80 font-medium">of cats are overweight</p>
                </div>
                <div className="h-px bg-gray-200" />
                <div>
                  <AnimatedCounter value={59} />
                  <p className="text-lg text-dark-slate/80 font-medium">of dogs are overweight</p>
                </div>
              </div>
              <p className="text-sm text-dark-slate/60 italic border-t pt-4">
                Association for Pet Obesity Prevention (APOP, 2022)
              </p>
            </div>
          </motion.div>

          {/* Hidden Health Risks */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1601758260592-22dc353668ed?w=800&q=80"
                alt="Elderly dog resting peacefully"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white mb-2">Hidden Health Risks</h3>
                <p className="text-white/90 text-sm">Time we can't get back</p>
              </div>
            </div>
            <div className="p-8">
              <div className="text-center mb-6">
                <Clock className="w-12 h-12 text-soft-coral mx-auto mb-4" />
                <p className="text-5xl md:text-6xl font-bold text-warm-brown mb-2">
                  2.5
                </p>
                <p className="text-xl text-dark-slate/80 font-medium">
                  years less lifespan for overweight pets
                </p>
              </div>
              <div className="bg-cream-light rounded-xl p-4 mb-4">
                <p className="text-sm text-dark-slate/80 font-medium mb-3">
                  Obesity increases the risk of:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="text-xs bg-white/80 px-3 py-1.5 rounded-full shadow-sm">🩺 Diabetes</span>
                  <span className="text-xs bg-white/80 px-3 py-1.5 rounded-full shadow-sm">🦴 Arthritis</span>
                  <span className="text-xs bg-white/80 px-3 py-1.5 rounded-full shadow-sm">❤️ Heart Disease</span>
                </div>
              </div>
              <p className="text-sm text-dark-slate/60 italic border-t pt-4">
                Study: Veterinary Practice UK, 2022
              </p>
            </div>
          </motion.div>

          {/* Lost Pets Tragedy */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
          >
            <div className="relative h-64 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80"
                alt="Lost pet poster on fence"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white mb-2">The Lost Pets Tragedy</h3>
                <p className="text-white/90 text-sm">Every family's worst nightmare</p>
              </div>
            </div>
            <div className="p-8">
              <div className="text-center mb-6">
                <Home className="w-12 h-12 text-soft-coral mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-bold text-warm-brown mb-2">
                  10 million
                </p>
                <p className="text-xl text-dark-slate/80 font-medium">
                  pets go missing each year
                </p>
              </div>
              <div className="bg-cream-light rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-dark-slate/80">Reunited with family</span>
                  <span className="font-bold text-warm-brown text-lg">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                  <motion.div 
                    className="bg-gradient-to-r from-soft-coral to-warm-brown h-3 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "20%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
                <p className="text-xs text-dark-slate/70 text-center">
                  💡 Microchips triple reunion chances
                </p>
              </div>
              <p className="text-sm text-dark-slate/60 italic border-t pt-4">
                Source: American Humane Society
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* References Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 p-8 bg-white rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-warm-brown mb-6 text-center">
            Sources and Studies
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <a 
              href="https://petobesityprevention.org" 
              className="flex items-start gap-3 p-4 rounded-lg hover:bg-cream-light transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-2 h-2 bg-soft-coral rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-dark-slate">Association for Pet Obesity Prevention, 2022</p>
                <p className="text-sm text-dark-slate/60">petobesityprevention.org</p>
              </div>
            </a>
            <a 
              href="https://veterinary-practice.com" 
              className="flex items-start gap-3 p-4 rounded-lg hover:bg-cream-light transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-2 h-2 bg-soft-coral rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-dark-slate">Veterinary Practice UK, 2022</p>
                <p className="text-sm text-dark-slate/60">veterinary-practice.com</p>
              </div>
            </a>
            <a 
              href="https://time.com" 
              className="flex items-start gap-3 p-4 rounded-lg hover:bg-cream-light transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-2 h-2 bg-soft-coral rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-dark-slate">Banfield Pet Hospital Report, 2016</p>
                <p className="text-sm text-dark-slate/60">time.com</p>
              </div>
            </a>
            <a 
              href="https://wired.com" 
              className="flex items-start gap-3 p-4 rounded-lg hover:bg-cream-light transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-2 h-2 bg-soft-coral rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-dark-slate">American Humane Society</p>
                <p className="text-sm text-dark-slate/60">wired.com</p>
              </div>
            </a>
            <a 
              href="https://pubmed.ncbi.nlm.nih.gov" 
              className="flex items-start gap-3 p-4 rounded-lg hover:bg-cream-light transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-2 h-2 bg-soft-coral rounded-full mt-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-dark-slate">PubMed Pet Obesity Review, 2024</p>
                <p className="text-sm text-dark-slate/60">pubmed.ncbi.nlm.nih.gov</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}