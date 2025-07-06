import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, MapPin, Heart } from "lucide-react";

export default function PetStatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  
  const stats = [
    {
      icon: TrendingUp,
      percentage: "50",
      title: "of pets are overweight",
      description: "and prone to diseases",
      color: "text-orange-600"
    },
    {
      icon: MapPin,
      percentage: "33",
      title: "of pets will get lost",
      description: "at some point in their life",
      color: "text-red-600"
    },
    {
      icon: Heart,
      percentage: "70",
      title: "of pets experience anxiety",
      description: "when left alone",
      color: "text-purple-600"
    }
  ];

  return (
    <section ref={ref} className="relative min-h-screen py-20 bg-gradient-to-b from-cream to-white overflow-hidden">
      <motion.div 
        style={{ opacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-dark-brown mb-6">
            The Reality We Often Miss
          </h2>
          <p className="text-xl text-dark-slate max-w-3xl mx-auto">
            Behind every joyful moment, there are silent struggles our pets face every day
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} delay={index * 0.2} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src="https://images.unsplash.com/photo-1601758174493-45d0a4d3e407?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600"
            alt="Sad looking dog"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="absolute bottom-12 left-12 right-12 text-white text-center"
          >
            <p className="text-2xl md:text-3xl font-light italic">
              "Every statistic represents a beloved companion who depends on us completely"
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatCard({ stat, delay }: { stat: any, delay: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const Icon = stat.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = parseInt(stat.percentage) / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= parseInt(stat.percentage)) {
              setCount(parseInt(stat.percentage));
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [stat.percentage, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300"
    >
      <Icon className={`w-16 h-16 mx-auto mb-6 ${stat.color}`} />
      <div className="mb-4">
        <span className={`text-6xl font-bold ${stat.color}`}>{count}%</span>
      </div>
      <h3 className="text-xl font-semibold text-dark-brown mb-2">
        {stat.title}
      </h3>
      <p className="text-dark-slate">
        {stat.description}
      </p>
    </motion.div>
  );
}