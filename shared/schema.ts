import { pgTable, text, serial, integer, boolean, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  ownerName: text("owner_name").notNull(),
  petName: text("pet_name").notNull(),
  petType: text("pet_type").notNull(),
  category: text("category").notNull(),
  story: text("story").notNull(),
  photoUrl: text("photo_url"),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vets = pgTable("vets", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  qualification: text("qualification").notNull(),
  collegeName: text("college_name").notNull(),
  workExperience: integer("work_experience").notNull(),
  clinicName: text("clinic_name").notNull(),
  clinicAddress: text("clinic_address").notNull(),
  profilePhotoUrl: text("profile_photo_url"),
  mapLocationLink: text("map_location_link"),
  testimonial: text("testimonial"),
  smartCareComments: text("smart_care_comments"),
  homeConsultation: boolean("home_consultation").default(false),
  phoneConsultation: boolean("phone_consultation").default(false),
  dietManagement: boolean("diet_management").default(false),
  phoneConsultationFee: integer("phone_consultation_fee"),
  clinicConsultationFee: integer("clinic_consultation_fee"),
  homeVisitFee: integer("home_visit_fee"),
  city: text("city").notNull(),
  latitude: real("latitude"),
  longitude: real("longitude"),
  approved: boolean("approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const petParents = pgTable("pet_parents", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  petName: text("pet_name").notNull(),
  petBreed: text("pet_breed").notNull(),
  petAge: integer("pet_age").notNull(),
  petWeight: real("pet_weight").notNull(),
  healthHistory: text("health_history"),
  allergies: text("allergies"),
  mapLocationLink: text("map_location_link"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  featuredImage: text("featured_image"),
  author: text("author").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertStorySchema = createInsertSchema(stories).pick({
  ownerName: true,
  petName: true,
  petType: true,
  category: true,
  story: true,
  photoUrl: true,
});

export const insertVetSchema = createInsertSchema(vets).pick({
  fullName: true,
  qualification: true,
  collegeName: true,
  workExperience: true,
  clinicName: true,
  clinicAddress: true,
  profilePhotoUrl: true,
  mapLocationLink: true,
  testimonial: true,
  smartCareComments: true,
  homeConsultation: true,
  phoneConsultation: true,
  dietManagement: true,
  phoneConsultationFee: true,
  clinicConsultationFee: true,
  homeVisitFee: true,
  city: true,
  latitude: true,
  longitude: true,
});

export const insertPetParentSchema = createInsertSchema(petParents).pick({
  fullName: true,
  petName: true,
  petBreed: true,
  petAge: true,
  petWeight: true,
  healthHistory: true,
  allergies: true,
  mapLocationLink: true,
  latitude: true,
  longitude: true,
});

export const insertBlogSchema = createInsertSchema(blogs).pick({
  title: true,
  slug: true,
  featuredImage: true,
  author: true,
  excerpt: true,
  content: true,
  category: true,
  tags: true,
  published: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;
export type InsertVet = z.infer<typeof insertVetSchema>;
export type Vet = typeof vets.$inferSelect;
export type InsertPetParent = z.infer<typeof insertPetParentSchema>;
export type PetParent = typeof petParents.$inferSelect;
export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogs.$inferSelect;
