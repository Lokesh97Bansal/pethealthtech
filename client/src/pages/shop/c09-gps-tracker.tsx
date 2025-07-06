import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Star, MapPin, Battery, Wifi, Shield, Heart, Smartphone, Check } from "lucide-react";
import { motion } from "framer-motion";

const productImages = [
  "/api/placeholder/600/600",
  "/api/placeholder/600/600", 
  "/api/placeholder/600/600",
  "/api/placeholder/600/600"
];

const features = [
  {
    icon: MapPin,
    title: "Real-time GPS Tracking",
    description: "Know exactly where your pet is at all times with precise GPS location updates every 2-5 seconds."
  },
  {
    icon: Battery,
    title: "7-Day Battery Life",
    description: "Long-lasting battery ensures continuous tracking without frequent charging interruptions."
  },
  {
    icon: Wifi,
    title: "Worldwide Coverage",
    description: "Works in 175+ countries with global cellular network coverage and roaming capabilities."
  },
  {
    icon: Shield,
    title: "Waterproof Design",
    description: "IP67 rated protection against water, dirt, and rough play conditions."
  }
];

const reviews = [
  {
    name: "Sarah Martinez",
    rating: 5,
    date: "January 2025",
    comment: "Absolutely life-saving! Max got loose during a thunderstorm and we found him within 30 minutes thanks to the real-time tracking.",
    verified: true
  },
  {
    name: "David Chen",
    rating: 5,
    date: "December 2024", 
    comment: "The battery life is incredible. I only need to charge it once a week and the GPS accuracy is spot-on.",
    verified: true
  },
  {
    name: "Emily Rodriguez",
    rating: 4,
    date: "December 2024",
    comment: "Great product overall. Setup was easy and the app is intuitive. My only complaint is the size could be smaller for tiny dogs.",
    verified: true
  }
];

const faqs = [
  {
    question: "How accurate is the GPS tracking?",
    answer: "Our GPS tracker provides location accuracy within 3 meters in optimal conditions. In urban environments with tall buildings, accuracy may vary to 5-10 meters."
  },
  {
    question: "What is the monthly subscription cost?",
    answer: "Plans start at $5/month for basic tracking or $9/month for premium features including health monitoring and unlimited location history."
  },
  {
    question: "Is it safe for my pet to wear?",
    answer: "Absolutely! The device is made with pet-safe materials, has no sharp edges, and weighs only 35g. It's designed for comfortable all-day wear."
  },
  {
    question: "How long does the battery last?",
    answer: "Battery life depends on usage, but typically lasts 5-7 days with standard tracking. Power-saving mode can extend this to 2 weeks."
  },
  {
    question: "What if my pet is a strong swimmer?",
    answer: "The tracker is fully waterproof (IP67 rated) and continues to work even during swimming sessions or in heavy rain."
  }
];

export default function C09GPSTracker() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {productImages.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <img 
                      src={image} 
                      alt={`C09 GPS Tracker view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <Badge variant="secondary" className="mb-4">Best Seller</Badge>
                <h1 className="text-4xl font-bold mb-4">C09 GPS Tracker</h1>
                <p className="text-lg text-gray-600 mb-6">
                  Advanced GPS tracking device with real-time location monitoring, worldwide coverage, 
                  and week-long battery life. Perfect for pets who love adventure.
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">4.8</span>
                <span className="text-gray-500">(2,547 reviews)</span>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-bold text-blue-600">$149.99</span>
                  <span className="text-xl text-gray-500 line-through">$199.99</span>
                  <Badge variant="destructive">25% OFF</Badge>
                </div>
                <p className="text-sm text-gray-600">
                  + Monthly subscription starting at $5/month after 30-day free trial
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                {["Real-time GPS tracking", "7-day battery life", "Waterproof (IP67)", "Worldwide coverage"].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                  Add to Cart - $149.99
                </Button>
                <Button size="lg" variant="outline" className="w-full">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">2-Year Warranty</p>
                </div>
                <div className="text-center">
                  <Smartphone className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-sm font-medium">Free Mobile App</p>
                </div>
                <div className="text-center">
                  <Check className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="text-sm font-medium">30-Day Trial</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
              <p className="text-lg text-gray-600">Everything you need to keep your pet safe and secure</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-6">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <feature.icon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                          <p className="text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Customer Reviews</h2>
              <div className="flex items-center justify-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-xl font-semibold">4.8 out of 5</span>
                <span className="text-gray-500">(2,547 reviews)</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{review.name}</h4>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        {review.verified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{review.comment}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">Get answers to common questions about the C09 GPS Tracker</p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}