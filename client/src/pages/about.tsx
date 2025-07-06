import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              We are passionate about improving the lives of pets and their families through innovative technology and heartwarming stories.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our mission is to bridge the gap between pets and their owners, providing tools for better health monitoring, safety, and emotional connection.
            </p>
            <p className="text-lg text-gray-600">
              Founded by pet lovers who understand the special bond between humans and their furry companions, we're dedicated to creating products that enhance this relationship.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}