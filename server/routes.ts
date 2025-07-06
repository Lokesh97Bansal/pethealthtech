import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStorySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get approved stories
  app.get("/api/stories", async (req, res) => {
    try {
      const stories = await storage.getApprovedStories();
      res.json(stories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stories" });
    }
  });

  // Submit a new story
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

  const httpServer = createServer(app);
  return httpServer;
}
