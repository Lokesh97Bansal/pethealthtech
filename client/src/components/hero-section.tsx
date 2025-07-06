import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@assets/image_1751736538072.png";
import { useState, useEffect, useRef } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const slides = [
    {
      image: heroImage,
      quote: "They protect, they wait, they love—unconditionally.",
      description: "Every moment with them is a gift of pure devotion"
    },
    {
      image: "https://images.unsplash.com/photo-1518155317743-a8ff43ea6a5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
      quote: "Guardians of our hearts, defenders of our homes.",
      description: "Silent protectors who ask for nothing but love in return"
    },
    {
      image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
      quote: "In their eyes, we see the reflection of unconditional love.",
      description: "A bond that transcends words, deeper than any ocean"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToNext = () => {
    const element = document.querySelector("#unspoken");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden scroll-snap-section">
      {/* Background Slides with Parallax */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <motion.div 
            style={{ 
              y,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${slide.image})`
            }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          />
        </motion.div>
      ))}
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight"
          >
            {slides[currentSlide].quote}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-white/80 mb-12 font-light"
          >
            {slides[currentSlide].description}
          </motion.p>
        </motion.div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? "bg-white w-8" 
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
}
