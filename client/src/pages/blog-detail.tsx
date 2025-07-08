import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Share2, Bookmark, Heart } from "lucide-react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

// Sample blog content for demonstration - this would come from API in real implementation
const blogContent = {
  "is-my-pet-sick-quiz": {
    title: "Is My Pet Sick? - Complete Health Assessment Quiz",
    content: `
# Understanding Pet Health: A Comprehensive Guide

As pet parents, we constantly worry about our furry companions' well-being. Sometimes it's difficult to determine whether your pet's behavior indicates illness or is just normal quirks.

## Key Signs to Watch For

### Physical Symptoms
- Changes in appetite or water consumption
- Lethargy or unusual tiredness
- Difficulty breathing or rapid breathing
- Vomiting or diarrhea
- Changes in urination habits

### Behavioral Changes
- Hiding or seeking excessive attention
- Aggression when previously gentle
- Restlessness or inability to settle
- Changes in grooming habits

## When to Consult a Veterinarian

If you notice any combination of these symptoms persisting for more than 24 hours, it's time to consult with a professional. Early intervention often leads to better outcomes.

### Emergency Signs
Seek immediate veterinary care if your pet shows:
- Difficulty breathing
- Severe lethargy or unresponsiveness
- Seizures
- Severe vomiting or diarrhea
- Signs of severe pain

## Smart Monitoring Technology

Modern pet health monitoring devices can help track vital signs and activity levels, providing valuable data for veterinary consultations. These devices can detect subtle changes that might not be immediately visible to pet parents.

### Benefits of Continuous Monitoring
- Early detection of health issues
- Objective data for veterinary visits
- Peace of mind for pet parents
- Improved quality of life for pets

## Preventive Care is Key

Regular veterinary check-ups, proper nutrition, exercise, and monitoring are essential components of maintaining your pet's health. Technology can supplement but never replace professional veterinary care.

Remember, you know your pet best. Trust your instincts - if something seems off, don't hesitate to seek professional advice.
    `,
    category: "Pet Health",
    author: "Dr. Priya Sharma",
    date: "January 15, 2025",
    readTime: "5 min read",
    featuredImage: "/api/placeholder/800/400",
    tags: ["Pet Health", "Veterinary Care", "Early Detection", "Symptoms"]
  }
};

export default function BlogDetail() {
  const { slug } = useParams();
  
  // In a real implementation, this would fetch from API
  const blog = blogContent[slug as keyof typeof blogContent];

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link href="/blogs">
              <Button>Back to Blogs</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Link href="/blogs">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Articles
                  </Button>
                </Link>
              </div>
              
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  {blog.category}
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {blog.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{blog.date}</span>
                  </div>
                  <span>{blog.readTime}</span>
                </div>

                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="aspect-video rounded-lg overflow-hidden shadow-lg"
              >
                <img 
                  src={blog.featuredImage} 
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg max-w-none"
              >
                <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {blog.content}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 pt-8 border-t"
              >
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              {/* Author Bio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12 p-6 bg-gray-50 rounded-lg"
              >
                <div className="flex items-start space-x-4">
                  <img 
                    src="/api/placeholder/80/80" 
                    alt={blog.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{blog.author}</h4>
                    <p className="text-gray-600">
                      Veterinary expert with over 10 years of experience in pet health and wellness. 
                      Passionate about preventive care and helping pet families understand their companions better.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Related Articles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-16"
              >
                <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <img 
                      src="/api/placeholder/300/200" 
                      alt="Related article"
                      className="w-full h-32 object-cover rounded mb-4"
                    />
                    <h4 className="font-semibold mb-2">Understanding Pet Behavior Changes</h4>
                    <p className="text-sm text-gray-600">Learn to recognize when behavior changes indicate health issues...</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <img 
                      src="/api/placeholder/300/200" 
                      alt="Related article"
                      className="w-full h-32 object-cover rounded mb-4"
                    />
                    <h4 className="font-semibold mb-2">Smart Monitoring for Better Pet Health</h4>
                    <p className="text-sm text-gray-600">How technology can help track your pet's health indicators...</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}