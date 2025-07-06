import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Activity, Wifi, Battery, Shield } from "lucide-react";
import { motion } from "framer-motion";

// Partner logos data - easily updatable
const partners = [
  { name: "YourStory", logo: "/api/placeholder/120/60" },
  { name: "Economic Times", logo: "/api/placeholder/120/60" },
  { name: "Hindustan Times", logo: "/api/placeholder/120/60" },
  { name: "NDTV", logo: "/api/placeholder/120/60" },
  { name: "Indian Express", logo: "/api/placeholder/120/60" },
  { name: "Times of India", logo: "/api/placeholder/120/60" }
];

// Feature phone screens data
const featureScreens = [
  {
    title: "Live GPS Tracking",
    description: "Real-time location monitoring with precise GPS technology",
    image: "/api/placeholder/200/400",
    icon: MapPin
  },
  {
    title: "Location History",
    description: "View detailed movement patterns and favorite spots",
    image: "/api/placeholder/200/400",
    icon: Activity
  },
  {
    title: "Health Monitoring",
    description: "Track vital signs and activity levels 24/7",
    image: "/api/placeholder/200/400",
    icon: Activity
  }
];

// Product data with Maven.pet style features
const products = [
  {
    id: "c09",
    name: "C09 GPS Tracker",
    image: "/api/placeholder/600/400",
    rating: 4.8,
    reviews: 2547,
    features: [
      { text: "Real-time GPS tracking", position: "top-1/4 left-1/4" },
      { text: "Waterproof design", position: "top-1/2 right-1/4" },
      { text: "7-day battery life", position: "bottom-1/4 left-1/3" },
      { text: "Safe zone alerts", position: "bottom-1/3 right-1/4" }
    ],
    description: "Advanced GPS tracking device with real-time location monitoring and comprehensive safety features for pets of all sizes.",
    price: "$149.99",
    shopUrl: "/shop/c09-gps-tracker"
  },
  {
    id: "c08",
    name: "C08 Sleep & Health Monitor",
    image: "/api/placeholder/600/400",
    rating: 4.7,
    reviews: 1839,
    features: [
      { text: "Sleep pattern analysis", position: "top-1/4 left-1/4" },
      { text: "Heart rate monitoring", position: "top-1/2 right-1/4" },
      { text: "Activity tracking", position: "bottom-1/4 left-1/3" },
      { text: "Health insights", position: "bottom-1/3 right-1/4" }
    ],
    description: "Comprehensive health monitoring system that tracks sleep patterns, activity levels, and vital signs.",
    price: "$199.99",
    shopUrl: "/shop/c08-health-monitor"
  },
  {
    id: "smart-feeder",
    name: "Smart Feeder",
    image: "/api/placeholder/600/400",
    rating: 4.9,
    reviews: 3241,
    features: [
      { text: "Automated feeding", position: "top-1/4 left-1/4" },
      { text: "Portion control", position: "top-1/2 right-1/4" },
      { text: "Schedule management", position: "bottom-1/4 left-1/3" },
      { text: "Mobile notifications", position: "bottom-1/3 right-1/4" }
    ],
    description: "Intelligent feeding system with automated portion control and customizable feeding schedules.",
    price: "$249.99",
    shopUrl: "/shop/smart-feeder"
  },
  {
    id: "smart-litter",
    name: "Smart Littering Device",
    image: "/api/placeholder/600/400",
    rating: 4.6,
    reviews: 1567,
    features: [
      { text: "Self-cleaning system", position: "top-1/4 left-1/4" },
      { text: "Odor control", position: "top-1/2 right-1/4" },
      { text: "Health monitoring", position: "bottom-1/4 left-1/3" },
      { text: "Usage analytics", position: "bottom-1/3 right-1/4" }
    ],
    description: "Revolutionary self-cleaning litter system with health monitoring and odor control technology.",
    price: "$399.99",
    shopUrl: "/shop/smart-litter"
  }
];

export default function Products() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section - FitBark Style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="absolute inset-0">
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Pet with owner" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Introducing the Smartest<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
              GPS & Health Tracker
            </span><br />
            for Pets
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Advanced monitoring technology that keeps your furry family safe and healthy
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-3">
            Explore Products
          </Button>
        </motion.div>
      </section>

      {/* Supporting Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-8">Trusted by Leading Media</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-center"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights with Smartphone Screens */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Smart Features in Your Pocket</h2>
            <p className="text-xl text-gray-600">Monitor, track, and care for your pet with advanced mobile technology</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featureScreens.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="relative mb-6 inline-block">
                  <div className="w-48 h-96 mx-auto bg-gray-900 rounded-3xl p-2 shadow-2xl group-hover:shadow-3xl transition-shadow">
                    <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 p-3 bg-blue-600 rounded-full shadow-lg">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Sections - Maven.pet Style */}
      {products.map((product, index) => (
        <section key={product.id} className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full rounded-2xl shadow-xl"
                  />
                  {/* Feature callouts overlaid on image */}
                  {product.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + featureIndex * 0.1 }}
                      className={`absolute ${feature.position} transform -translate-x-1/2 -translate-y-1/2`}
                    >
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-blue-200">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm font-medium text-gray-800">{feature.text}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <div className="space-y-6">
                  <div>
                    <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
                    <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 mb-8">
                    {product.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{feature.text}</span>
                        <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                          Learn More
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-3xl font-bold text-blue-600">{product.price}</div>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
}