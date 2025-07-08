import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStorySchema, insertVetSchema, insertPetParentSchema, insertBlogSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Stories API
  app.get("/api/stories", async (req, res) => {
    try {
      const stories = await storage.getApprovedStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  app.post("/api/stories", async (req, res) => {
    try {
      const validatedData = insertStorySchema.parse(req.body);
      const story = await storage.createStory(validatedData);
      res.status(201).json({ 
        message: "Story submitted successfully! It will be reviewed before being published.",
        story 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to submit story" });
      }
    }
  });

  // Vets API
  app.get("/api/vets", async (req, res) => {
    try {
      const vets = await storage.getAllVets();
      res.json(vets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vets" });
    }
  });

  app.get("/api/vets/approved", async (req, res) => {
    try {
      const vets = await storage.getApprovedVets();
      res.json(vets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch approved vets" });
    }
  });

  app.get("/api/vets/city/:city", async (req, res) => {
    try {
      const { city } = req.params;
      const vets = await storage.getVetsByCity(city);
      res.json(vets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch vets by city" });
    }
  });

  app.get("/api/vets/nearby", async (req, res) => {
    try {
      const { lat, lng, radius } = req.query;
      if (!lat || !lng) {
        return res.status(400).json({ message: "Latitude and longitude are required" });
      }
      
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lng as string);
      const maxDistance = radius ? parseInt(radius as string) : 50;
      
      const vets = await storage.getNearbyVets(latitude, longitude, maxDistance);
      res.json(vets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch nearby vets" });
    }
  });

  app.post("/api/vets", async (req, res) => {
    try {
      const validatedData = insertVetSchema.parse(req.body);
      const vet = await storage.createVet(validatedData);
      res.status(201).json({ 
        message: "Vet registration submitted successfully! It will be reviewed.",
        vet 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to register vet" });
      }
    }
  });

  // Pet Parents API
  app.get("/api/pet-parents", async (req, res) => {
    try {
      const petParents = await storage.getAllPetParents();
      res.json(petParents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pet parents" });
    }
  });

  app.post("/api/pet-parents", async (req, res) => {
    try {
      const validatedData = insertPetParentSchema.parse(req.body);
      const petParent = await storage.createPetParent(validatedData);
      res.status(201).json({ 
        message: "Pet parent registration successful!",
        petParent 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to register pet parent" });
      }
    }
  });

  // Blogs API
  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await storage.getPublishedBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  app.get("/api/blogs/all", async (req, res) => {
    try {
      const blogs = await storage.getAllBlogs();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch all blogs" });
    }
  });

  app.get("/api/blogs/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const blog = await storage.getBlogBySlug(slug);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog" });
    }
  });

  app.get("/api/blogs/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const blogs = await storage.getBlogsByCategory(category);
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blogs by category" });
    }
  });

  app.post("/api/blogs", async (req, res) => {
    try {
      const validatedData = insertBlogSchema.parse(req.body);
      const blog = await storage.createBlog(validatedData);
      res.status(201).json({ 
        message: "Blog created successfully!",
        blog 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to create blog" });
      }
    }
  });

  app.put("/api/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertBlogSchema.partial().parse(req.body);
      const blog = await storage.updateBlog(parseInt(id), validatedData);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json({ message: "Blog updated successfully!", blog });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to update blog" });
      }
    }
  });

  app.delete("/api/blogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteBlog(parseInt(id));
      if (!success) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json({ message: "Blog deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
