import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, Calendar, Briefcase } from "lucide-react";

export default function EmpathyBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  const busyLifeIcons = [
    { icon: Clock, label: "Meetings" },
    { icon: Calendar, label: "Errands" },
    { icon: Briefcase, label: "Deadlines" }
  ];

  return (
    <section ref={ref} className="relative min-h-screen py-20 bg-gradient-to-b from-white via-cream to-soft-coral/10">
      <motion.div 
        style={{ opacity, y }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-dark-brown mb-8">
            You Love Your Pet. You Care Deeply.
          </h2>
          <p className="text-2xl md:text-3xl text-dark-slate font-light">
            But life gets busy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {busyLifeIcons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="inline-block"
              >
                <item.icon className="w-20 h-20 text-warm-brown mx-auto mb-4" />
              </motion.div>
              <p className="text-xl text-dark-slate font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-serif text-warm-brown mb-8 leading-relaxed"
          >
            "Let us help. We'll be there for your little pumpkin."
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-lg text-dark-slate">
              Because every pet deserves the care they give us—unconditionally.
            </p>
            <p className="text-lg text-dark-slate/80 italic">
              Together, we can ensure they're never alone, never forgotten, always loved.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-soft-coral/20"
          >
            <div className="w-8 h-8 rounded-full bg-soft-coral animate-pulse" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}