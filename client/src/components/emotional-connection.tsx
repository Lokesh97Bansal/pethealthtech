import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function EmotionalConnection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const quotes = [
    {
      text: "Having a pet is not just companionship — it's a promise.",
      subtitle: "A promise to protect, care, and love until their last breath",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
    },
    {
      text: "They give us their entire lives. What do we give them?",
      subtitle: "Be worthy of their unconditional love",
      image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
    },
    {
      text: "In their eyes, we are their whole world.",
      subtitle: "Let's make their world a better place",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
    }
  ];

  return (
    <section ref={ref} className="relative min-h-screen bg-dark-brown scroll-snap-section">
      <motion.div style={{ opacity }} className="absolute inset-0">
        {quotes.map((quote, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2, delay: index * 3 }}
            viewport={{ once: true }}
            className="absolute inset-0"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <div className="relative h-screen flex items-center justify-center">
              <img
                src={quote.image}
                alt="Pet and owner connection"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
              
              <motion.div
                style={{ scale }}
                className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight"
                >
                  {quote.text}
                </motion.h2>
                {quote.subtitle && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl text-white/80 mt-6"
                  >
                    {quote.subtitle}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-20 h-screen flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <div className="w-1 h-20 bg-white/30 mx-auto rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}