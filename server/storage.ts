import { users, stories, type User, type InsertUser, type Story, type InsertStory } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createStory(story: InsertStory): Promise<Story>;
  getApprovedStories(): Promise<Story[]>;
  getAllStories(): Promise<Story[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  private currentUserId: number;
  private currentStoryId: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.currentUserId = 1;
    this.currentStoryId = 1;
    
    // Add some sample featured stories
    this.initializeFeaturedStories();
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
}

export const storage = new MemStorage();
