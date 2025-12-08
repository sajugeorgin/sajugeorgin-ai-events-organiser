/*
A schema is a description of the tables in your Convex project & 
the type of documents within your tables.

Adding a schema.ts file will ensure that the documents in your tables are the correct type.
*/

// An index is a saved lookup path. It makes queries faster when you filter by that field.
// index: fast 'exact' filtering and sorting on structured fields, ids, categories, dates.
// searchIndex: search for text inside a string field, like title.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // TABLE 1: USERS
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

  // TABLE 2: EVENTS
  events: defineTable({
    title: v.string(),
    description: v.string(),
    slug: v.string(),

    // Organiser
    organiserId: v.id("users"), // Foreign Key
    organiserName: v.string(),

    // Event
    category: v.string(),
    tags: v.array(v.string()),

    // Date & Time
    startDate: v.number(),
    endDate: v.number(),
    timeZone: v.string(),

    // Location
    locationType: v.optional(
      v.union(v.literal("physical"), v.literal("online"))
    ),
    venue: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.string(),
    state: v.optional(v.string()),

    // Capacity & Ticketing
    capacity: v.number(),
    ticketType: v.union(v.literal("free"), v.literal("paid")),
    ticketPrice: v.optional(v.number()),
    registrationCount: v.number(),

    // Customisation
    coverImage: v.optional(v.string()),
    themeColor: v.optional(v.string()),

    // Timestamps
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  })
    .index("by_organiser", ["organiserId"])
    .index("by_category", ["category"])
    .index("by_start_date", ["startDate"])
    .index("by_slug", ["slug"])
    .searchIndex("search_title", { searchField: "title" }),

  // TABLE 3: REGISTRATIONS
  registrations: defineTable({
    eventId: v.id("events"), // Foreign Key
    userId: v.id("users"), // Foreign Key

    // Attendee Info
    attendeeName: v.string(),
    attendeeEmail: v.string(),

    // QR Code for Event Entry
    qrCode: v.string(), // Unique ID

    // Check-in
    checkedIn: v.boolean(),
    checkedInAt: v.optional(v.number()),

    // Status
    status: v.union(v.literal("confirmed"), v.literal("cancelled")),

    // Registration
    registeredAt: v.number(),
  })
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_event_user", ["eventId", "userId"])
    .index("by_qr_code", ["qrCode"]),
});
