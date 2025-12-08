/*
A schema is a description of the tables in your Convex project & 
the type of documents within your tables.

Adding a schema.ts file will ensure that the documents in your tables are the correct type.
*/

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(), // Clerk user ID for authentication
    email: v.string(),
    imageUrl: v.optional(v.string()),

    // Onboarding completed
    hasCompletedOnboarding: v.boolean(),

    // Location Object
    location: v.object({
      city: v.optional(v.string()),
      state: v.optional(v.string()),
      country: v.optional(v.string()),
    }),

    interests: v.optional(v.array(v.string())), // Interests will be an array of strings

    freeEventsCreated: v.number(), // Track free tier event limit (1 free)

    // Timestamps
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]), // Use the tokenIdentifier field to index users for faster lookups
});
