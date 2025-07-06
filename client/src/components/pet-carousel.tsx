import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function PetCarousel() {
  const petImages = [
    // Row 1 - Left to Right
    [
      { src: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@goldenbuddy" },
      { src: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@autumnpaws" },
      { src: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@whiskerhugs" },
      { src: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@loyalguardian" },
      { src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@tinycompanion" },
      { src: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@activebuddy" },
      { src: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@windowwatcher" },
      { src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@waterdog" },
    ],
    // Row 2 - Right to Left
    [
      { src: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@basketnaps" },
      { src: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@snowguardian" },
      { src: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@therapyhealer" },
      { src: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@gardenhopper" },
      { src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@playfulpup" },
      { src: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@shoulderbuddy" },
      { src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@wisesoul" },
      { src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@comfortcompanion" },
    ],
    // Row 3 - Left to Right (Slower)
    [
      { src: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@babyguard" },
      { src: "https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@rescuestory" },
      { src: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@farmherder" },
      { src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@gentlegiant" },
      { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@healingpaws" },
      { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@servicehelper" },
      { src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@graduationjoy" },
      { src: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", handle: "@adventurepal" },
    ],
  ];

  const CarouselRow = ({ images, direction, speed }: { images: typeof petImages[0], direction: "left" | "right", speed: string }) => {
    // Duplicate images for seamless infinite scroll
    const duplicatedImages = [...images, ...images];

    return (
      <div className="flex gap-4 mb-4 overflow-hidden">
        <motion.div
          className="flex gap-4 flex-shrink-0"
          animate={direction === "left" ? { x: ["0%", "-100%"] } : { x: ["-100%", "0%"] }}
          transition={{
            duration: parseInt(speed),
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className="min-w-[200px] h-[200px] rounded-xl overflow-hidden shadow-lg bg-gray-100 flex-shrink-0"
            >
              <img
                src={image.src}
                alt="Pet story"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="p-2 bg-white">
                <p className="text-sm text-dark-slate text-center font-medium">
                  {image.handle}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section id="gallery" className="py-16 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-warm-brown mb-4">
          See what the Pet Pack has to say
        </h2>
        <div className="flex items-center justify-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" />
            ))}
          </div>
        </div>
        <p className="text-lg text-dark-slate">12,000+ heartwarming stories shared</p>
      </motion.div>

      {/* First Row - Left to Right */}
      <CarouselRow images={petImages[0]} direction="left" speed="40" />

      {/* Second Row - Right to Left */}
      <CarouselRow images={petImages[1]} direction="right" speed="35" />

      {/* Third Row - Left to Right (Slower) */}
      <CarouselRow images={petImages[2]} direction="left" speed="50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-warm-brown hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg"
        >
          View All Stories
        </motion.button>
      </motion.div>
    </section>
  );
}
