import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Stethoscope, 
  Activity, 
  MapPin, 
  Clock, 
  Users, 
  BarChart3, 
  Shield, 
  Smartphone 
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-time Health Monitoring",
    description: "Access continuous health data from your patients' smart devices to make better informed decisions."
  },
  {
    icon: MapPin,
    title: "Location History & Safety",
    description: "Help pet owners with safety recommendations based on GPS tracking data and location patterns."
  },
  {
    icon: BarChart3,
    title: "Health Analytics Dashboard",
    description: "Comprehensive health analytics and trends to support your diagnostic and treatment decisions."
  },
  {
    icon: Clock,
    title: "Emergency Alerts",
    description: "Receive immediate notifications when pets show unusual activity or health patterns."
  }
];

const benefits = [
  {
    title: "Enhanced Patient Care",
    description: "Make data-driven decisions with continuous health monitoring between visits.",
    badge: "Clinical Excellence"
  },
  {
    title: "Improved Client Communication",
    description: "Share real-time insights with pet owners to improve treatment compliance.",
    badge: "Client Relations"
  },
  {
    title: "Early Detection",
    description: "Identify health issues before they become serious problems.",
    badge: "Preventive Care"
  },
  {
    title: "Practice Efficiency",
    description: "Streamline consultations with pre-visit health data analysis.",
    badge: "Workflow"
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
                Access advanced pet health monitoring data to enhance your practice and provide 
                exceptional care for your patients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Request Demo Access
                </Button>
                <Button size="lg" variant="outline">
                  Download Clinical Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Professional Features</h2>
              <p className="text-xl text-gray-600">
                Comprehensive tools designed specifically for veterinary professionals
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
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
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Benefits for Your Practice</h2>
              <p className="text-xl text-gray-600">
                See how smart pet monitoring enhances veterinary care
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{benefit.badge}</Badge>
                    </div>
                    <CardTitle>{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto p-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="p-0">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white/20 rounded-full">
                    <Users className="h-12 w-12" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  Join the Future of Veterinary Care
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Connect with pet owners and their smart devices to provide better, 
                  more informed care for your patients.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary">
                    <Smartphone className="h-5 w-5 mr-2" />
                    Get Professional Access
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    <Shield className="h-5 w-5 mr-2" />
                    Learn About Security
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}