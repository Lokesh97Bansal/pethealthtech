import { 
  users, 
  stories, 
  vets,
  petParents,
  blogs,
  type User, 
  type InsertUser, 
  type Story, 
  type InsertStory,
  type Vet,
  type InsertVet,
  type PetParent,
  type InsertPetParent,
  type Blog,
  type InsertBlog
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createStory(story: InsertStory): Promise<Story>;
  getApprovedStories(): Promise<Story[]>;
  getAllStories(): Promise<Story[]>;
  
  // Vet management
  createVet(vet: InsertVet): Promise<Vet>;
  getApprovedVets(): Promise<Vet[]>;
  getAllVets(): Promise<Vet[]>;
  getVetsByCity(city: string): Promise<Vet[]>;
  getNearbyVets(latitude: number, longitude: number, maxDistance?: number): Promise<Vet[]>;
  
  // Pet parent management
  createPetParent(petParent: InsertPetParent): Promise<PetParent>;
  getAllPetParents(): Promise<PetParent[]>;
  
  // Blog management
  createBlog(blog: InsertBlog): Promise<Blog>;
  getPublishedBlogs(): Promise<Blog[]>;
  getAllBlogs(): Promise<Blog[]>;
  getBlogBySlug(slug: string): Promise<Blog | undefined>;
  getBlogsByCategory(category: string): Promise<Blog[]>;
  updateBlog(id: number, blog: Partial<InsertBlog>): Promise<Blog | undefined>;
  deleteBlog(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  private vets: Map<number, Vet>;
  private petParents: Map<number, PetParent>;
  private blogs: Map<number, Blog>;
  private currentUserId: number;
  private currentStoryId: number;
  private currentVetId: number;
  private currentPetParentId: number;
  private currentBlogId: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.vets = new Map();
    this.petParents = new Map();
    this.blogs = new Map();
    this.currentUserId = 1;
    this.currentStoryId = 1;
    this.currentVetId = 1;
    this.currentPetParentId = 1;
    this.currentBlogId = 1;
    
    // Initialize sample data
    this.initializeFeaturedStories();
    this.initializeFeaturedVets();
    this.initializeFeaturedBlogs();
  }

  private initializeFeaturedStories() {
    const featuredStories: Omit<Story, 'id'>[] = [
      {
        ownerName: "Sarah Martinez",
        petName: "Max",
        petType: "Dog",
        category: "Protection & Loyalty",
        story: "When we brought our newborn home, Max immediately appointed himself as her guardian. He would lie beside her crib every night, never moving until morning. One night, he woke us with gentle whimpering - our daughter had developed a fever. Max's vigilance helped us get her the care she needed.",
        photoUrl: null,
        isApproved: true,
        createdAt: new Date()
      },
      {
        ownerName: "Eleanor Washington",
        petName: "Luna",
        petType: "Cat",
        category: "Comfort & Healing",
        story: "After my husband passed, I fell into deep depression. Luna, our rescue cat, seemed to sense my pain. She would curl up on my chest every morning, purring softly until I found the strength to get up. Her unwavering presence helped me heal and find joy in life again.",
        photoUrl: null,
        isApproved: true,
        createdAt: new Date()
      }
    ];

    featuredStories.forEach(story => {
      const id = this.currentStoryId++;
      this.stories.set(id, { ...story, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.currentStoryId++;
    const story: Story = {
      ...insertStory,
      id,
      photoUrl: insertStory.photoUrl || null,
      isApproved: false,
      createdAt: new Date()
    };
    this.stories.set(id, story);
    return story;
  }

  async getApprovedStories(): Promise<Story[]> {
    return Array.from(this.stories.values()).filter(story => story.isApproved);
  }

  async getAllStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }

  // Vet management methods
  async createVet(insertVet: InsertVet): Promise<Vet> {
    const id = this.currentVetId++;
    const vet: Vet = {
      ...insertVet,
      id,
      approved: false,
      createdAt: new Date(),
      profilePhotoUrl: insertVet.profilePhotoUrl || null,
      mapLocationLink: insertVet.mapLocationLink || null,
      testimonial: insertVet.testimonial || null,
      smartCareComments: insertVet.smartCareComments || null,
      phoneConsultationFee: insertVet.phoneConsultationFee || null,
      clinicConsultationFee: insertVet.clinicConsultationFee || null,
      homeVisitFee: insertVet.homeVisitFee || null,
      latitude: insertVet.latitude || null,
      longitude: insertVet.longitude || null
    };
    this.vets.set(id, vet);
    return vet;
  }

  async getApprovedVets(): Promise<Vet[]> {
    return Array.from(this.vets.values()).filter(vet => vet.approved);
  }

  async getAllVets(): Promise<Vet[]> {
    return Array.from(this.vets.values());
  }

  async getVetsByCity(city: string): Promise<Vet[]> {
    return Array.from(this.vets.values()).filter(vet => 
      vet.approved && vet.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  async getNearbyVets(latitude: number, longitude: number, maxDistance: number = 50): Promise<Vet[]> {
    return Array.from(this.vets.values())
      .filter(vet => vet.approved && vet.latitude && vet.longitude)
      .filter(vet => {
        const distance = this.calculateDistance(latitude, longitude, vet.latitude!, vet.longitude!);
        return distance <= maxDistance;
      })
      .sort((a, b) => {
        const distanceA = this.calculateDistance(latitude, longitude, a.latitude!, a.longitude!);
        const distanceB = this.calculateDistance(latitude, longitude, b.latitude!, b.longitude!);
        return distanceA - distanceB;
      });
  }

  // Pet parent management methods
  async createPetParent(insertPetParent: InsertPetParent): Promise<PetParent> {
    const id = this.currentPetParentId++;
    const petParent: PetParent = {
      ...insertPetParent,
      id,
      createdAt: new Date(),
      healthHistory: insertPetParent.healthHistory || null,
      allergies: insertPetParent.allergies || null,
      mapLocationLink: insertPetParent.mapLocationLink || null,
      latitude: insertPetParent.latitude || null,
      longitude: insertPetParent.longitude || null
    };
    this.petParents.set(id, petParent);
    return petParent;
  }

  async getAllPetParents(): Promise<PetParent[]> {
    return Array.from(this.petParents.values());
  }

  // Blog management methods
  async createBlog(insertBlog: InsertBlog): Promise<Blog> {
    const id = this.currentBlogId++;
    const blog: Blog = {
      ...insertBlog,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      featuredImage: insertBlog.featuredImage || null,
      excerpt: insertBlog.excerpt || null,
      tags: insertBlog.tags || null,
      published: insertBlog.published ?? false
    };
    this.blogs.set(id, blog);
    return blog;
  }

  async getPublishedBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values()).filter(blog => blog.published);
  }

  async getAllBlogs(): Promise<Blog[]> {
    return Array.from(this.blogs.values());
  }

  async getBlogBySlug(slug: string): Promise<Blog | undefined> {
    return Array.from(this.blogs.values()).find(blog => blog.slug === slug);
  }

  async getBlogsByCategory(category: string): Promise<Blog[]> {
    return Array.from(this.blogs.values()).filter(blog => 
      blog.published && blog.category.toLowerCase() === category.toLowerCase()
    );
  }

  async updateBlog(id: number, updateData: Partial<InsertBlog>): Promise<Blog | undefined> {
    const existingBlog = this.blogs.get(id);
    if (!existingBlog) return undefined;

    const updatedBlog: Blog = {
      ...existingBlog,
      ...updateData,
      id,
      updatedAt: new Date()
    };
    this.blogs.set(id, updatedBlog);
    return updatedBlog;
  }

  async deleteBlog(id: number): Promise<boolean> {
    return this.blogs.delete(id);
  }

  // Helper methods
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in kilometers
    return d;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  // Initialize sample vets
  private initializeFeaturedVets() {
    const featuredVets: Omit<Vet, 'id'>[] = [
      {
        fullName: "Dr. Priya Sharma",
        qualification: "BVSc & AH, MVSc",
        collegeName: "Indian Veterinary Research Institute",
        workExperience: 8,
        clinicName: "PetCare Plus Clinic",
        clinicAddress: "Sector 18, Noida, Uttar Pradesh",
        profilePhotoUrl: "/api/placeholder/150/150",
        mapLocationLink: "https://maps.google.com/?q=28.5706,77.3261",
        testimonial: "Smart pet monitoring devices have revolutionized how I practice veterinary medicine. The continuous health data helps me detect issues early and provide better care.",
        smartCareComments: "These devices are game-changers for preventive pet healthcare. They provide invaluable insights that help both vets and pet parents.",
        homeConsultation: true,
        phoneConsultation: true,
        dietManagement: true,
        phoneConsultationFee: 50,
        clinicConsultationFee: 500,
        homeVisitFee: 800,
        city: "Noida",
        latitude: 28.5706,
        longitude: 77.3261,
        approved: true,
        createdAt: new Date()
      },
      {
        fullName: "Dr. Rajesh Kumar",
        qualification: "BVSc & AH",
        collegeName: "College of Veterinary Science, Bangalore",
        workExperience: 12,
        clinicName: "Animal Wellness Center",
        clinicAddress: "Koramangala, Bangalore, Karnataka",
        profilePhotoUrl: "/api/placeholder/150/150",
        mapLocationLink: "https://maps.google.com/?q=12.9279,77.6271",
        testimonial: "The GPS tracking and health monitoring features have helped countless pet parents in emergencies. I highly recommend these smart solutions.",
        smartCareComments: "Technology like this bridges the gap between regular vet visits, ensuring continuous care for our furry patients.",
        homeConsultation: true,
        phoneConsultation: true,
        dietManagement: false,
        phoneConsultationFee: 50,
        clinicConsultationFee: 600,
        homeVisitFee: 1000,
        city: "Bangalore",
        latitude: 12.9279,
        longitude: 77.6271,
        approved: true,
        createdAt: new Date()
      }
    ];

    featuredVets.forEach(vet => {
      const id = this.currentVetId++;
      this.vets.set(id, { ...vet, id });
    });
  }

  // Initialize sample blogs
  private initializeFeaturedBlogs() {
    const featuredBlogs: Omit<Blog, 'id'>[] = [
      {
        title: "10 Essential Tips for GPS Tracking Your Pet",
        slug: "10-essential-tips-gps-tracking-pet",
        featuredImage: "/api/placeholder/600/400",
        author: "Dr. Sarah Johnson",
        excerpt: "Learn how to effectively use GPS trackers to keep your furry friends safe and secure.",
        content: "GPS tracking technology has revolutionized pet safety...",
        category: "GPS Tracking",
        tags: ["GPS", "Safety", "Technology"],
        published: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Understanding Your Pet's Sleep Patterns",
        slug: "understanding-pet-sleep-patterns",
        featuredImage: "/api/placeholder/600/400",
        author: "Dr. Michael Chen",
        excerpt: "Discover what your pet's sleep behavior reveals about their health and wellbeing.",
        content: "Sleep is crucial for pet health and recovery...",
        category: "Health Monitoring",
        tags: ["Sleep", "Health", "Monitoring"],
        published: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    featuredBlogs.forEach(blog => {
      const id = this.currentBlogId++;
      this.blogs.set(id, { ...blog, id });
    });
  }
}

export const storage = new MemStorage();
