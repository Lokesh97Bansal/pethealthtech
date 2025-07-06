import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function PetsUnspokenSide() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-cream">
      <motion.div 
        style={{ opacity, y }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif text-dark-brown mb-8"
        >
          The Silent Suffering
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <p className="text-xl md:text-2xl text-dark-slate leading-relaxed mb-6">
              Pets never ask for care. Often, they suffer in silence.
            </p>
            <p className="text-lg text-dark-slate/80 leading-relaxed">
              Behind every wagging tail and purring companion lies a creature who can't tell us when something's wrong. 
              They bear their pain quietly, loving us through their discomfort.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1587402092301-725e37c70fd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800"
                alt="Dog looking thoughtful"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-8 right-8 text-white"
              >
                <p className="text-lg font-light italic">
                  "They give us their absolute all. We are the center of their universe."
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}