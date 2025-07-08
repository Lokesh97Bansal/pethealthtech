import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, MapPin, Activity, Shield, Smartphone, Zap, Wifi, Clock, Users, Globe, Award } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "SmartCollar Pro C08",
    price: "₹8,999",
    originalPrice: "₹12,999",
    image: "/api/placeholder/600/400",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 324,
    weight: "16g",
    battery: "3-4 weeks",
    features: [
      { name: "Live GPS Tracking", icon: MapPin, description: "Real-time location tracking with unlimited range" },
      { name: "Health Monitoring", icon: Activity, description: "24/7 activity, sleep and health tracking" },
      { name: "Location History", icon: Clock, description: "View where your pet has been throughout the day" },
      { name: "Safe Place Alerts", icon: Shield, description: "Get notified when your pet enters or exits safe zones" },
      { name: "Waterproof Design", icon: Shield, description: "100% waterproof for all adventures" },
      { name: "Long Battery Life", icon: Zap, description: "Weeks of battery life on a single charge" }
    ],
    description: "The smallest and most advanced pet GPS & health tracker. Trusted by pet parents in 150+ countries and used by 100+ vet schools in clinical research."
  },
  {
    id: 2,
    name: "SmartCollar Lite C09",
    price: "₹5,999",
    originalPrice: "₹8,999",
    image: "/api/placeholder/600/400",
    badge: "Popular Choice",
    rating: 4.6,
    reviews: 189,
    weight: "12g",
    battery: "2-3 weeks",
    features: [
      { name: "GPS Tracking", icon: MapPin, description: "Reliable GPS tracking for your peace of mind" },
      { name: "Activity Monitor", icon: Activity, description: "Track daily activity and exercise patterns" },
      { name: "Basic Health Insights", icon: Activity, description: "Monitor essential health metrics" },
      { name: "Safe Zone Alerts", icon: Shield, description: "Instant notifications for safe zone activity" },
      { name: "Lightweight Design", icon: Heart, description: "Ultra-lightweight for smaller pets" },
      { name: "Extended Battery", icon: Zap, description: "Long-lasting battery for continuous tracking" }
    ],
    description: "Lightweight and affordable smart collar perfect for smaller pets with essential tracking features and health monitoring capabilities."
  }
];

const testimonials = [
  {
    text: "After Dean spent the night outside, countless hours of searching and a sleepless night for me, I purchased this. Seriously, best decision ever.",
    author: "Christina H.",
    source: "Amazon Review"
  },
  {
    text: "The peace of mind this device gives me is priceless. I can check on my dog anytime, anywhere.",
    author: "Rajesh M.",
    source: "Verified Purchase"
  },
  {
    text: "Amazing battery life and the health insights helped us catch a health issue early. Highly recommend!",
    author: "Priya S.",
    source: "Google Review"
  }
];

export default function ProductsEnhanced() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section - FitBark Style */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Meet the Smallest Pet GPS & Health Tracker
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Revolutionary technology to keep your pets safe, healthy, and happy. 
                  GPS tracking, health monitoring, and smart insights all in one lightweight device.
                </p>
                <div className="flex justify-center space-x-4 mb-12">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Buy SmartCollar GPS
                  </Button>
                </div>
              </motion.div>

              {/* Feature Icons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl mx-auto"
              >
                {[
                  { icon: MapPin, label: "Live GPS Tracking" },
                  { icon: Clock, label: "Location History" },
                  { icon: Activity, label: "Health Monitoring" },
                  { icon: Shield, label: "Safe Place Alerts" },
                  { icon: Zap, label: "Long Battery Life" },
                  { icon: Globe, label: "Global Coverage" }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">{feature.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted by pet parents in 150+ countries</h2>
              <div className="flex justify-center items-center space-x-8 text-gray-600">
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  <span className="font-semibold">50,000+ Happy Customers</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-6 w-6 mr-2" />
                  <span className="font-semibold">100+ Vet Schools</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-6 w-6 mr-2" />
                  <span className="font-semibold">150+ Countries</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase - Enhanced FitBark Style */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {products.map((product, productIndex) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: productIndex * 0.2 }}
                className={`flex flex-col ${productIndex % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 mb-32 max-w-7xl mx-auto`}
              >
                {/* Product Image */}
                <div className="flex-1">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                    />
                    <Badge className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 text-sm font-semibold">
                      {product.badge}
                    </Badge>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-8">
                  <div>
                    <h2 className="text-4xl font-bold mb-4">{product.name}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.description}</p>
                    
                    {/* Specs */}
                    <div className="flex space-x-8 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{product.weight}</div>
                        <div className="text-sm text-gray-500">Ultra Light</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{product.battery}</div>
                        <div className="text-sm text-gray-500">Battery Life</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{product.rating}</div>
                        <div className="text-sm text-gray-500">Rating ({product.reviews})</div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center space-x-4 mb-8">
                      <span className="text-3xl font-bold text-blue-600">{product.price}</span>
                      <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 px-3 py-1">
                        Save ₹{parseInt(product.originalPrice.slice(1).replace(',', '')) - parseInt(product.price.slice(1).replace(',', ''))}
                      </Badge>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex space-x-4">
                      <Link href={`/shop/c0${product.id + 7}-gps-tracker`}>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4">
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Shop {product.name}
                        </Button>
                      </Link>
                      <Button size="lg" variant="outline" className="px-8 py-4">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Deep Dive */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Advanced Features for Modern Pet Parents</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every feature is designed with your pet's safety and your peace of mind in focus.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products[0].features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full p-6 hover:shadow-xl transition-all duration-300 border-none bg-white">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                        <feature.icon className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{feature.name}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What Pet Parents Say</h2>
              <p className="text-xl text-gray-600">Real reviews from real pet families</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="h-full p-6 bg-blue-50 border-none">
                    <CardContent className="p-0">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                        "{testimonial.text}"
                      </blockquote>
                      <div className="text-sm">
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-gray-500">{testimonial.source}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section - FitBark Style */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">Try SmartCollar GPS today</h2>
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">2-Year Warranty</div>
                  <div className="text-blue-100">Complete protection</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">30-Day Money Back</div>
                  <div className="text-blue-100">Risk-free trial</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">Free Shipping</div>
                  <div className="text-blue-100">On orders ₹1500+</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-semibold mb-2">24/7 Support</div>
                  <div className="text-blue-100">Always here to help</div>
                </div>
              </div>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-lg font-semibold">
                <ShoppingCart className="h-6 w-6 mr-3" />
                Buy Now
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}