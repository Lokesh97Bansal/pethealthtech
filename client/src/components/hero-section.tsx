import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroImage from "@assets/image_1751736538072.png";

export default function HeroSection() {
  const scrollToGallery = () => {
    const element = document.querySelector("#gallery");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToSubmit = () => {
    const element = document.querySelector("#submit");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})`
        }}
      />
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
        >
          Unconditional Love
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="block text-soft-coral"
          >
            Lives Here
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto font-light"
        >
          Discover heartwarming stories that celebrate the extraordinary bond between 
          pets and their families. Every tail wag, gentle nuzzle, and protective moment 
          tells a story of pure, unconditional love.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToSubmit}
            className="bg-soft-coral hover:bg-opacity-90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg"
          >
            Share Your Story
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToGallery}
            className="border-2 border-white text-white hover:bg-white hover:text-dark-slate px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
          >
            Explore Stories
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToGallery}
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
