import { query } from "./_generated/server";
import { v } from "convex/values";

// args (optional): defines the input expected from the client.
// handler: contains the logic for that API endpoint
// ctx: context object Convex gives you.

// API FOR GETTING FEATURED EVENTS
export const getFeaturedEvents = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Get all the events
    const events = await ctx.db
      .query("events")
      .withIndex("by_start_date")
      .filter((q) => q.gte(q.field("startDate"), now))
      .order("desc")
      .collect();

    if (!events) {
      throw new Error("No General Events.");
    }

    // Sort the events based on registration count and return only the top 'limit=3'
    const featuredEvents = events
      .sort((a, b) => b.registrationCount - a.registrationCount)
      .slice(0, args.limit ?? 3);

    if (!featuredEvents) {
      throw new Error("No Featured Events.");
    }

    return featuredEvents;
  },
});

// API FOR GETTING EVENTS BY LOCATION
export const getEventsByLocation = query({
  args: {
    city: v.optional(v.string()),
    state: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Get all the events
    let events = await ctx.db
      .query("events")
      .withIndex("by_start_date")
      .filter((q) => q.gte(q.field("startDate"), now))
      .collect();

    // Filter events by city OR state
    if (args.city) {
      events = events.filter(
        (e) => e.city.toLowerCase() === args.city?.toLowerCase()
      );
    } else if (args.state) {
      events = events.filter(
        (e) => e.state?.toLowerCase === args.state?.toLowerCase()
      );
    }

    // Return events
    return events.slice(0, args.limit ?? 4);
  },
});

// API FOR GETTING POPULAR EVENTS (HIGH REGISTRATION COUNT)
export const getPopularEvents = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Get all the events
    const events = await ctx.db
      .query("events")
      .withIndex("by_start_date")
      .filter((q) => q.gte(q.field("startDate"), now))
      .collect();

    // Filter events by registration count
    const popularEvents = events
      .sort((a, b) => b.registrationCount - a.registrationCount)
      .slice(0, args.limit ?? 6);

    // Return events
    return popularEvents;
  },
});

// API FOR GETTING EVENTS BY CATEGORY
export const getEventsByCategory = query({
  args: {
    category: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Get all the events by category index
    const events = await ctx.db
      .query("events")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((q) => q.gte(q.field("startDate"), now))
      .collect();

    // Return events
    return events.slice(0, args.limit ?? 12);
  },
});

// API FOR GETTING THE NUMBER OF EVENTS IN A CATEGORY
export const getCategoryCounts = query({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Get all the events with respect to start date index
    const events = await ctx.db
      .query("events")
      .withIndex("by_start_date")
      .filter((q) => q.gte(q.field("startDate"), now))
      .collect();

    // Frequency map
    // Key: the category string, like "music" or "tech"
    // Value: the count for that category, like 4 or 12
    // Record<string, number>
    const counts: Record<string, number> = {};

    for (const event of events) {
      counts[event.category] = (counts[event.category] || 0) + 1;
    }

    return counts;
  },
});
