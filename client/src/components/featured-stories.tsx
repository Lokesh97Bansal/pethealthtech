import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Story } from "@shared/schema";

export default function FeaturedStories() {
  const { data: stories, isLoading } = useQuery<Story[]>({
    queryKey: ["/api/stories"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-warm-brown mb-6">
              Featured Stories
            </h2>
            <p className="text-xl text-dark-slate max-w-2xl mx-auto">
              Real stories from real families about the extraordinary bonds they share with their pets
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-gradient-to-br from-cream to-white rounded-2xl shadow-xl overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-8">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="ml-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredStories = stories?.slice(0, 2) || [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-warm-brown mb-6">
            Featured Stories
          </h2>
          <p className="text-xl text-dark-slate max-w-2xl mx-auto">
            Real stories from real families about the extraordinary bonds they share with their pets
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {featuredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-cream to-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300"
            >
              <div className="h-64 bg-gradient-to-br from-warm-brown to-medium-brown flex items-center justify-center">
                <div className="text-white text-center">
                  <Heart size={48} className="mx-auto mb-4 text-soft-coral" />
                  <p className="text-lg font-semibold">{story.petName}</p>
                  <p className="text-sm opacity-80">{story.petType}</p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-warm-brown mb-4">
                  {story.petName}'s Story
                </h3>
                <p className="text-dark-slate leading-relaxed mb-6">
                  "{story.story}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-medium-brown rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.ownerName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-warm-brown">{story.ownerName}</p>
                    <p className="text-sm text-dark-slate">{story.petType} Parent</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-soft-coral hover:bg-opacity-90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg"
          >
            Read More Stories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function Heart({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
