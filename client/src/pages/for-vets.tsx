import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Stethoscope, 
  Activity, 
  MapPin, 
  Clock, 
  Users, 
  BarChart3, 
  Shield, 
  Smartphone,
  Star,
  Heart,
  ChevronRight,
  Phone,
  Home,
  Calendar
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Featured vets data for the slider
const featuredVets = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    experience: "8 years",
    city: "Noida",
    photo: "/api/placeholder/150/150",
    specialization: "Emergency Care & Surgery"
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    experience: "12 years", 
    city: "Bangalore",
    photo: "/api/placeholder/150/150",
    specialization: "Preventive Medicine"
  },
  {
    id: 3,
    name: "Dr. Anita Verma",
    experience: "6 years",
    city: "Mumbai",
    photo: "/api/placeholder/150/150",
    specialization: "Exotic Animals"
  },
  {
    id: 4,
    name: "Dr. Vikram Singh",
    experience: "15 years",
    city: "Delhi",
    photo: "/api/placeholder/150/150",
    specialization: "Orthopedics"
  },
  {
    id: 5,
    name: "Dr. Meera Patel",
    experience: "9 years",
    city: "Pune",
    photo: "/api/placeholder/150/150",
    specialization: "Dermatology"
  },
  {
    id: 6,
    name: "Dr. Suresh Reddy",
    experience: "11 years",
    city: "Hyderabad",
    photo: "/api/placeholder/150/150",
    specialization: "Cardiology"
  }
];

// Vet testimonials data
const vetTestimonials = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    clinic: "PetCare Plus Clinic, Noida",
    photo: "/api/placeholder/120/120",
    testimonial: "Smart pet monitoring devices have revolutionized how I practice veterinary medicine. The continuous health data helps me detect issues early and provide better care to my patients."
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar", 
    clinic: "Animal Wellness Center, Bangalore",
    photo: "/api/placeholder/120/120",
    testimonial: "The GPS tracking and health monitoring features have helped countless pet parents in emergencies. I highly recommend these smart solutions for modern pet care."
  },
  {
    id: 3,
    name: "Dr. Anita Verma",
    clinic: "Mumbai Pet Hospital",
    photo: "/api/placeholder/120/120",
    testimonial: "Technology like this bridges the gap between regular vet visits, ensuring continuous care for our furry patients. It's the future of veterinary practice."
  }
];

// Health plans data
const healthPlans = [
  {
    id: 1,
    name: "Weight Management Plan",
    price: "₹1,000",
    duration: "per month",
    features: [
      "Diet chart preparation",
      "2 online consultations",
      "Weekly progress tracking",
      "Nutrition guidance"
    ],
    popular: false
  },
  {
    id: 2,
    name: "Health Management Plan", 
    price: "₹2,000",
    duration: "per month",
    features: [
      "Diet chart preparation",
      "2 home visits",
      "24/7 emergency support",
      "Comprehensive health monitoring"
    ],
    popular: true
  }
];

export default function ForVets() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Stethoscope className="h-16 w-16 text-blue-600" />
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Professional Tools for <span className="text-blue-600">Veterinarians</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join our network of verified veterinarians and help pet parents provide 
                exceptional care for their furry family members.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/vet-registration">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Stethoscope className="h-5 w-5 mr-2" />
                    Join as Vet
                  </Button>
                </Link>
                <Link href="/pet-parent-registration">
                  <Button size="lg" variant="outline">
                    <Heart className="h-5 w-5 mr-2" />
                    Join as a Pet Family
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Showcase of Registered Vets */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Registered Veterinarians</h2>
              <p className="text-xl text-gray-600">Trusted professionals across India</p>
            </div>
            
            {/* Continuous Moving Slider */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex space-x-6"
                animate={{
                  x: [0, -1800]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear"
                  }
                }}
              >
                {[...featuredVets, ...featuredVets].map((vet, index) => (
                  <motion.div
                    key={`${vet.id}-${index}`}
                    className="flex-shrink-0 w-80"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="h-full shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="relative mx-auto w-24 h-24 mb-4">
                          <img 
                            src={vet.photo} 
                            alt={vet.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                          <div className="absolute -bottom-2 -right-2 p-1 bg-green-500 rounded-full">
                            <Shield className="h-4 w-4 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{vet.name}</h3>
                        <p className="text-blue-600 font-medium mb-1">{vet.specialization}</p>
                        <p className="text-gray-600 mb-2">{vet.experience} experience</p>
                        <div className="flex items-center justify-center text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{vet.city}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Vet Testimonials */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What Veterinarians Say</h2>
              <p className="text-xl text-gray-600">Trusted by professionals across India</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {vetTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="h-full p-6 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-4">
                        <img 
                          src={testimonial.photo} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.clinic}</p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic">"{testimonial.testimonial}"</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Health Plans */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Health Management Plans</h2>
              <p className="text-xl text-gray-600">Comprehensive care packages for pet families</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {healthPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-blue-600 text-white px-4 py-1">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {plan.price}
                        <span className="text-lg text-gray-500 font-normal"> {plan.duration}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        size="lg" 
                        className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        Subscribe Now
                        <ChevronRight className="h-5 w-5 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Options Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Consultation Options</h2>
              <p className="text-xl text-gray-600">Flexible consultation modes to serve pet families</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone Consultation</h3>
                <p className="text-3xl font-bold text-green-600 mb-2">₹50</p>
                <p className="text-gray-600 mb-4">Quick advice and guidance over the phone</p>
                <Button variant="outline" size="sm">Learn More</Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">In-Clinic Visit</h3>
                <p className="text-3xl font-bold text-blue-600 mb-2">₹500-600</p>
                <p className="text-gray-600 mb-4">Comprehensive examination at clinic</p>
                <Button variant="outline" size="sm">Book Now</Button>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Home Visit</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">₹800-1000</p>
                <p className="text-gray-600 mb-4">Convenient consultation at your home</p>
                <Button variant="outline" size="sm">Schedule</Button>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}