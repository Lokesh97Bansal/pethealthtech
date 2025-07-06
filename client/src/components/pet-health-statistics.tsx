import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, TrendingDown, Search } from "lucide-react";

// Counter animation component
function AnimatedCounter({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev < value) {
            return Math.min(prev + 1, value);
          }
          clearInterval(timer);
          return value;
        });
      }, 20);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-6xl md:text-7xl font-bold text-warm-brown">
      {count}{suffix}
    </span>
  );
}

export default function PetHealthStatistics() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-cream-light to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-warm-brown mb-4">
            The Unspoken Pet Crisis: What the Studies Reveal
          </h2>
          <p className="text-lg md:text-xl text-dark-slate/80 max-w-3xl mx-auto">
            Our pets love us unconditionally, but are we giving them the care they deserve?
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Obesity Crisis */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="mb-6">
              <Heart className="w-16 h-16 mx-auto text-soft-coral opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold text-warm-brown mb-6">
              Obesity Crisis
            </h3>
            <div className="mb-4">
              <AnimatedCounter value={61} />
              <p className="text-lg text-dark-slate/70 mt-2">
                of cats and
              </p>
              <AnimatedCounter value={59} />
              <p className="text-lg text-dark-slate/70 mt-2">
                of dogs are overweight or obese
              </p>
            </div>
            <p className="text-sm text-dark-slate/60 italic">
              Association for Pet Obesity Prevention (APOP, 2022)
            </p>
            <div className="mt-6">
              <img 
                src="https://images.unsplash.com/photo-1581888227599-779811939961?w=400"
                alt="Overweight pet"
                className="w-full h-48 object-cover rounded-lg opacity-80"
              />
            </div>
          </motion.div>

          {/* Hidden Health Risks */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="mb-6">
              <TrendingDown className="w-16 h-16 mx-auto text-soft-coral opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold text-warm-brown mb-6">
              Hidden Health Risks
            </h3>
            <div className="mb-4">
              <p className="text-4xl md:text-5xl font-bold text-warm-brown mb-2">
                2.5 years
              </p>
              <p className="text-lg text-dark-slate/70">
                less lifespan for overweight pets
              </p>
            </div>
            <p className="text-sm text-dark-slate/60 italic mb-4">
              Study: Veterinary Practice UK, 2022
            </p>
            <div className="bg-cream-light rounded-lg p-4 mt-4">
              <p className="text-sm text-dark-slate/80">
                Obesity increases the risk of:
              </p>
              <div className="flex justify-center gap-4 mt-3">
                <span className="text-xs bg-white px-3 py-1 rounded-full">Diabetes</span>
                <span className="text-xs bg-white px-3 py-1 rounded-full">Arthritis</span>
                <span className="text-xs bg-white px-3 py-1 rounded-full">Heart Disease</span>
              </div>
            </div>
          </motion.div>

          {/* Lost Pets Tragedy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="mb-6">
              <Search className="w-16 h-16 mx-auto text-soft-coral opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold text-warm-brown mb-6">
              The Lost Pets Tragedy
            </h3>
            <div className="mb-4">
              <p className="text-4xl md:text-5xl font-bold text-warm-brown mb-2">
                10 million
              </p>
              <p className="text-lg text-dark-slate/70">
                pets go missing each year
              </p>
            </div>
            <p className="text-sm text-dark-slate/60 italic mb-4">
              Source: American Humane Society
            </p>
            <div className="bg-cream-light rounded-lg p-4 mt-4">
              <p className="text-sm text-dark-slate/80 mb-2">
                Only <span className="font-bold text-warm-brown">20%</span> are reunited
              </p>
              <p className="text-xs text-dark-slate/70">
                But microchips triple their chances of returning home
              </p>
            </div>
            <div className="mt-6">
              <img 
                src="https://images.unsplash.com/photo-1544568100-847a948585b9?w=400"
                alt="Lost pet"
                className="w-full h-48 object-cover rounded-lg opacity-80 grayscale"
              />
            </div>
          </motion.div>
        </div>

        {/* References Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <h3 className="text-lg font-semibold text-warm-brown mb-4">
            Sources and Studies
          </h3>
          <ul className="text-sm text-dark-slate/60 space-y-2">
            <li>• Association for Pet Obesity Prevention, 2022: petobesityprevention.org</li>
            <li>• Veterinary Practice UK, 2022: veterinary-practice.com</li>
            <li>• Banfield Pet Hospital Report, 2016: time.com</li>
            <li>• American Humane Society: wired.com</li>
            <li>• PubMed review, 2024: pubmed.ncbi.nlm.nih.gov</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}