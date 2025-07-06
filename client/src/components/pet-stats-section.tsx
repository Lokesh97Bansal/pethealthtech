import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, MapPin, Heart, Dog, Activity, AlertCircle } from "lucide-react";

// Circular Progress Component
function CircularProgress({ percentage, color, size = 200 }: { percentage: number; color: string; size?: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setProgress(percentage);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage]);
  
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className={`${color.split(' ')[0]} text-opacity-100`} />
            <stop offset="100%" className={`${color.split(' ')[2]} text-opacity-100`} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-4xl font-bold text-warm-brown"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {progress}%
        </motion.span>
      </div>
    </div>
  );
}

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
      percentage: 59,
      title: "of dogs are overweight",
      subtitle: "61% of cats too",
      description: "Living 2.5 years less on average",
      color: "text-orange-600 to text-red-600",
      bgColor: "bg-orange-50",
      image: "https://images.unsplash.com/photo-1601758260892-a62c486ace97?w=600&q=80"
    },
    {
      icon: MapPin,
      percentage: 33,
      title: "of pets will get lost",
      subtitle: "10 million annually",
      description: "Only 20% reunited without microchips",
      color: "text-red-600 to text-pink-600",
      bgColor: "bg-red-50",
      image: "https://images.unsplash.com/photo-1587559045816-8b0e38f1eecb?w=600&q=80"
    },
    {
      icon: Heart,
      percentage: 85,
      title: "need preventive care",
      subtitle: "But rarely get it",
      description: "Early detection saves lives & money",
      color: "text-purple-600 to text-indigo-600",
      bgColor: "bg-purple-50",
      image: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=600&q=80"
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
      className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={stat.image} 
          alt={stat.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-6 right-6">
          <Icon className="w-10 h-10 text-white mb-2" />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8">
        {/* Circular Progress */}
        <div className="flex justify-center mb-6">
          <CircularProgress percentage={stat.percentage} color={stat.color} size={160} />
        </div>
        
        {/* Text Content */}
        <h3 className="text-xl font-bold text-warm-brown mb-2">{stat.title}</h3>
        {stat.subtitle && (
          <p className="text-lg text-dark-slate/70 font-medium mb-3">{stat.subtitle}</p>
        )}
        <p className="text-sm text-dark-slate/60">{stat.description}</p>
        
        {/* Visual Indicator */}
        <div className={`mt-6 p-4 rounded-lg ${stat.bgColor}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs text-dark-slate/70 font-medium">Impact Level</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-8 rounded-full transition-all duration-300 ${
                    i < 4 ? 'bg-gradient-to-t ' + stat.color : 'bg-gray-200'
                  }`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}