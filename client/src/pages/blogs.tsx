import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for GPS Tracking Your Pet",
    excerpt: "Learn how to effectively use GPS trackers to keep your furry friends safe and secure.",
    category: "GPS Tracking",
    author: "Dr. Sarah Johnson",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 2,
    title: "Understanding Your Pet's Sleep Patterns",
    excerpt: "Discover what your pet's sleep behavior reveals about their health and wellbeing.",
    category: "Health Monitoring",
    author: "Dr. Michael Chen",
    date: "Jan 12, 2025",
    readTime: "7 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "Smart Feeding: The Future of Pet Nutrition",
    excerpt: "How automated feeding systems are revolutionizing pet care and nutrition management.",
    category: "Smart Feeding",
    author: "Lisa Rodriguez",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "Creating a Safe Indoor Environment for Cats",
    excerpt: "Essential tips for designing cat-friendly spaces that promote health and happiness.",
    category: "Cat Care",
    author: "Dr. Emily Parker",
    date: "Jan 8, 2025",
    readTime: "4 min read",
    image: "/api/placeholder/400/250"
  }
];

export default function Blogs() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Pet Care Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert insights, tips, and stories to help you provide the best care for your furry companions.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg">Load More Articles</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}