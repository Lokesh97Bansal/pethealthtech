import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, User, ArrowRight, Search, Filter } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Enhanced blog posts data replicating Maven.pet structure
const blogPosts = [
  {
    id: 1,
    title: "Is My Pet Sick? - Complete Health Assessment Quiz",
    slug: "is-my-pet-sick-quiz",
    excerpt: "If you're wondering 'is my pet sick?', we're here to help - take our quiz and figure out if something needs attention.",
    category: "Pet Health",
    categorySlug: "pet-health",
    author: "Dr. Priya Sharma",
    date: "January 15, 2025",
    readTime: "5 min read",
    featuredImage: "/api/placeholder/600/400",
    featured: true
  },
  {
    id: 2,
    title: "The Normal Pet Heart Rate, and Detecting Hidden Health Issues Through Monitoring",
    slug: "normal-pet-heart-rate-monitoring",
    excerpt: "What's the normal pet heart rate? Why is it important to monitor, and how can it help uncover hidden health issues?",
    category: "Health Monitoring",
    categorySlug: "health-monitoring",
    author: "Dr. Rajesh Kumar",
    date: "January 12, 2025",
    readTime: "7 min read",
    featuredImage: "/api/placeholder/600/400",
    featured: true
  },
  {
    id: 3,
    title: "Max's Story: How Smart Monitoring Helped Detect Dog Anxiety",
    slug: "max-story-dog-anxiety",
    excerpt: "Like many dogs, Max is sensitive to changes in routine... Learn how smart monitoring helped his pet parent uncover he was suffering from anxiety.",
    category: "Success Stories",
    categorySlug: "success-stories",
    author: "Dr. Anita Verma",
    date: "January 10, 2025",
    readTime: "6 min read",
    featuredImage: "/api/placeholder/600/400",
    featured: false
  },
  {
    id: 4,
    title: "Bella's Story: Cat Anxiety Uncovered Through Smart Monitoring",
    slug: "bella-story-cat-anxiety",
    excerpt: "Bella is a six-year-old feline who started exhibiting strange symptoms... Smart monitoring helped uncover she was suffering from cat anxiety.",
    category: "Success Stories",
    categorySlug: "success-stories",
    author: "Dr. Meera Patel",
    date: "January 8, 2025",
    readTime: "4 min read",
    featuredImage: "/api/placeholder/600/400",
    featured: false
  },
  {
    id: 5,
    title: "Why Is My Dog Barking at Nothing? Understanding the Hidden Triggers",
    slug: "why-dog-barking-at-nothing",
    excerpt: "Is it really nothing, or are our buddies sensing something we simply can't detect? Let's explore the reasons behind this behavior.",
    category: "Dog Behaviors",
    categorySlug: "dog-behaviors",
    author: "Dr. Vikram Singh",
    date: "January 5, 2025",
    readTime: "5 min read",
    featuredImage: "/api/placeholder/600/400",
    featured: false
  },
  {
    id: 6,
    title: "Why Is My Cat Not Eating? What Pet Parents Need to Know",
    slug: "why-cat-not-eating",
    excerpt: "Understanding the answer to the question 'why is my cat not eating?' is crucial. Let's look into some of the most common reasons.",
    category: "Cat Behaviors",
    categorySlug: "cat-behaviors",
    author: "Dr. Suresh Reddy",
    date: "January 3, 2025",
    readTime: "6 min read",
    featuredImage: "/api/placeholder/600/400",
    featured: false
  }
];

const categories = [
  { name: "All Categories", slug: "all" },
  { name: "Pet Health", slug: "pet-health" },
  { name: "Health Monitoring", slug: "health-monitoring" },
  { name: "Success Stories", slug: "success-stories" },
  { name: "Dog Behaviors", slug: "dog-behaviors" },
  { name: "Cat Behaviors", slug: "cat-behaviors" },
  { name: "GPS Tracking", slug: "gps-tracking" },
  { name: "Smart Feeding", slug: "smart-feeding" }
];

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.categorySlug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  // Featured posts (first 2 posts)
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = currentPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section - Maven.pet style */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">All About Pets</h1>
              <p className="text-xl text-gray-600 mb-8">
                A blog by PetStories, focusing on your pet's quality of life.
              </p>
              <div className="flex justify-center">
                <Link href="/about">
                  <Button variant="outline" size="lg">About us</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 border-b bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">Filter by:</span>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section - Large cards like Maven.pet */}
        {featuredPosts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
                <div className="grid lg:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                          <div className="aspect-[16/10] overflow-hidden">
                            <img 
                              src={post.featuredImage} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {post.category}
                              </Badge>
                              <span className="text-sm text-gray-500">{post.readTime}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
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
                              <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Posts Grid - Maven.pet style */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Latest Articles</h2>
                <span className="text-gray-600">{filteredPosts.length} articles found</span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white">
                        <div className="aspect-[4/3] overflow-hidden">
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{post.readTime}</span>
                          </div>
                          <h3 className="font-bold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="h-3 w-3 mr-1" />
                            <span className="mr-3">{post.author}</span>
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{post.date}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        onClick={() => setCurrentPage(i + 1)}
                        size="sm"
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}