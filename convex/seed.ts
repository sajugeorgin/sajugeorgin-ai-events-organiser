import { internalMutation } from "./_generated/server";

// Sample events data with Unsplash images
const SAMPLE_EVENTS = [
  {
    title: "React 19 Workshop: Master the New Features",
    description:
      "Hands-on React 19 workshop. Actions API, Server Components, use() patterns, asset loading, and migration tips. Bring your laptop. Limited seats.",
    category: "tech",
    tags: ["tech", "react", "javascript", "frontend"],
    city: "London",
    state: "Greater London",
    venue:
      "[https://maps.google.com/?q=WeWork+Moorgate+London](https://maps.google.com/?q=WeWork+Moorgate+London)",
    address: "WeWork Moorgate, 131 Finsbury Pavement, London EC2A 1NT",
    capacity: 50,
    ticketType: "free",
    coverImage:
      "[https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80)",
    themeColor: "#4c1d95",
  },
  {
    title: "AI & Machine Learning Meetup: Building with LLMs",
    description:
      "LLM meetup with short talks, demos, and Q&A. APIs, prompt patterns, RAG basics, and practical use cases. Networking after.",
    category: "tech",
    tags: ["tech", "ai", "machine-learning", "llm"],
    city: "Manchester",
    state: "England",
    venue:
      "[https://maps.google.com/?q=Hatch+Oxford+Road+Manchester](https://maps.google.com/?q=Hatch+Oxford+Road+Manchester)",
    address: "Hatch, 103 Oxford Rd, Manchester M1 7ED",
    capacity: 100,
    ticketType: "free",
    coverImage:
      "[https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80](https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80)",
    themeColor: "#1e3a8a",
  },
  {
    title: "Indie Music Night: Acoustic Sessions",
    description:
      "Acoustic night with indie artists, open mic slots, and a relaxed set list. Food and drinks available at the venue.",
    category: "music",
    tags: ["music", "indie", "acoustic", "live"],
    city: "London",
    state: "Greater London",
    venue:
      "[https://maps.google.com/?q=Union+Chapel+London](https://maps.google.com/?q=Union+Chapel+London)",
    address: "Union Chapel, 19b Compton Terrace, London N1 2UN",
    capacity: 120,
    ticketType: "paid",
    ticketPrice: 12,
    coverImage:
      "[https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80](https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200&q=80)",
    themeColor: "#831843",
  },
  {
    title: "Startup Networking Breakfast",
    description:
      "Breakfast networking for founders and builders. Speed networking, pitch practice, and mentor chats. Coffee included.",
    category: "business",
    tags: ["business", "networking", "startup", "entrepreneurship"],
    city: "London",
    state: "Greater London",
    venue:
      "[https://maps.google.com/?q=Level39+London](https://maps.google.com/?q=Level39+London)",
    address: "Level39, One Canada Square, Canary Wharf, London E14 5AB",
    capacity: 40,
    ticketType: "paid",
    ticketPrice: 10,
    coverImage:
      "[https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80](https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80)",
    themeColor: "#065f46",
  },
  {
    title: "Weekend Photography Walk: Street Stories",
    description:
      "Street photography walk with composition prompts and short edits review. Phones welcome. Meet point near the market.",
    category: "art",
    tags: ["art", "photography", "culture", "walking-tour"],
    city: "London",
    state: "Greater London",
    venue:
      "[https://maps.google.com/?q=Borough+Market+London](https://maps.google.com/?q=Borough+Market+London)",
    address: "Borough Market, 8 Southwark St, London SE1 1TL",
    capacity: 25,
    ticketType: "paid",
    ticketPrice: 15,
    coverImage:
      "[https://images.unsplash.com/photo-1554080353-a576cf803bda?w=1200&q=80](https://images.unsplash.com/photo-1554080353-a576cf803bda?w=1200&q=80)",
    themeColor: "#92400e",
  },
  {
    title: "Full Stack Development Bootcamp: Day 1",
    description:
      "Beginner bootcamp day. Setup, Git basics, HTML and CSS foundations, and first JavaScript tasks. Laptop required.",
    category: "education",
    tags: ["education", "coding", "fullstack", "beginner"],
    city: "Birmingham",
    state: "England",
    venue:
      "[https://maps.google.com/?q=Innovation+Birmingham+Campus](https://maps.google.com/?q=Innovation+Birmingham+Campus)",
    address: "Innovation Birmingham Campus, Holt St, Birmingham B7 4BB",
    capacity: 30,
    ticketType: "free",
    coverImage:
      "[https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80)",
    themeColor: "#7f1d1d",
  },
  {
    title: "Sunday Football Tournament: 5-a-side",
    description:
      "5-a-side tournament with group stage and knockouts. Team and solo sign-ups. Referee on site. Prizes for top teams.",
    category: "sports",
    tags: ["sports", "football", "tournament", "fitness"],
    city: "Cardiff",
    state: "Wales",
    venue:
      "[https://maps.google.com/?q=Goals+Cardiff](https://maps.google.com/?q=Goals+Cardiff)",
    address: "Goals Cardiff, Lawrenny Ave, Cardiff CF11 8BR",
    capacity: 56,
    ticketType: "paid",
    ticketPrice: 8,
    coverImage:
      "[https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80](https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80)",
    themeColor: "#065f46",
  },
  {
    title: "Healthy Cooking Workshop: Plant-Based Cuisine",
    description:
      "Plant-based cooking session with five recipes, prep tips, and a take-home recipe sheet. Ingredients provided.",
    category: "food",
    tags: ["food", "cooking", "health", "vegan"],
    city: "Bristol",
    state: "England",
    venue:
      "[https://maps.google.com/?q=Bristol+Cookery+School](https://maps.google.com/?q=Bristol+Cookery+School)",
    address: "Bristol Cookery School, Chandos Rd, Bristol BS6 6PF",
    capacity: 20,
    ticketType: "paid",
    ticketPrice: 25,
    coverImage:
      "[https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80](https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1200&q=80)",
    themeColor: "#065f46",
  },
  {
    title: "Morning Yoga & Meditation Retreat",
    description:
      "Weekend session with yoga flow, breathwork, and guided meditation. Beginners welcome. Mats provided.",
    category: "health",
    tags: ["health", "yoga", "meditation", "wellness"],
    city: "Swansea",
    state: "Wales",
    venue:
      "[https://maps.google.com/?q=Singleton+Park+Swansea](https://maps.google.com/?q=Singleton+Park+Swansea)",
    address: "Singleton Park, Swansea SA2 9DU",
    capacity: 35,
    ticketType: "paid",
    ticketPrice: 12,
    coverImage:
      "[https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80](https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80)",
    themeColor: "#4c1d95",
  },
  {
    title: "Gaming Tournament: Valorant Championship",
    description:
      "Team bracket tournament with best-of matches and a live finals stream. Bring your own headset. Snacks available.",
    category: "gaming",
    tags: ["gaming", "esports", "valorant", "tournament"],
    city: "London",
    state: "Greater London",
    venue:
      "[https://maps.google.com/?q=Platform+Shoreditch+London](https://maps.google.com/?q=Platform+Shoreditch+London)",
    address: "Platform, 2 Finsbury Ave, London EC2M 2PA",
    capacity: 80,
    ticketType: "paid",
    ticketPrice: 10,
    coverImage:
      "[https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80](https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80)",
    themeColor: "#7f1d1d",
  },
  {
    title: "Women in Tech: Leadership Panel",
    description:
      "Panel with tech leaders on career growth, mentorship, and building inclusive teams. Q&A and networking after.",
    category: "networking",
    tags: ["networking", "women-in-tech", "leadership", "career"],
    city: "London",
    state: "Greater London",
    venue:
      "[https://maps.google.com/?q=Google+for+Startups+Campus+London](https://maps.google.com/?q=Google+for+Startups+Campus+London)",
    address: "Google for Startups Campus, 4-5 Bonhill St, London EC2A 4BX",
    capacity: 40,
    ticketType: "free",
    coverImage:
      "[https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80](https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80)",
    themeColor: "#831843",
  },
  {
    title: "Trekking Weekend: Peak District Day Hike",
    description:
      "Beginner-friendly hike with a guide, route brief, and rest stops. Bring water and a light jacket. Meet at the station.",
    category: "outdoor",
    tags: ["outdoor", "trekking", "adventure", "hiking"],
    city: "Edale",
    state: "England",
    venue:
      "[https://maps.google.com/?q=Edale+Railway+Station](https://maps.google.com/?q=Edale+Railway+Station)",
    address: "Edale Railway Station, Edale, Hope Valley S33 7ZA",
    capacity: 20,
    ticketType: "paid",
    ticketPrice: 18,
    coverImage:
      "[https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80](https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80)",
    themeColor: "#065f46",
  },
  {
    title: "Community Clean-up Drive: Beach Edition",
    description:
      "Beach clean-up with sorting tips and a short conservation talk. Gloves and bags provided. Certificate included.",
    category: "community",
    tags: ["community", "environment", "volunteer", "beach"],
    city: "Brighton",
    state: "England",
    venue:
      "[https://maps.google.com/?q=Brighton+Palace+Pier](https://maps.google.com/?q=Brighton+Palace+Pier)",
    address: "Brighton Palace Pier, Madeira Dr, Brighton BN2 1TW",
    capacity: 100,
    ticketType: "free",
    coverImage:
      "[https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80](https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80)",
    themeColor: "#1e3a8a",
  },
  {
    title: "JavaScript Performance Optimization Masterclass",
    description:
      "Advanced JS session on memory, event loop, workers, bundle tuning, and profiling. Bring a laptop with Node installed.",
    category: "tech",
    tags: ["tech", "javascript", "performance", "advanced"],
    city: "Leeds",
    state: "England",
    venue:
      "[https://maps.google.com/?q=University+of+Leeds](https://maps.google.com/?q=University+of+Leeds)",
    address: "University of Leeds, Woodhouse, Leeds LS2 9JT",
    capacity: 40,
    ticketType: "paid",
    ticketPrice: 20,
    coverImage:
      "[https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&q=80](https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&q=80)",
    themeColor: "#92400e",
  },
];

// Helper functions
function getRandomFutureDate(minDays: number = 7, maxDays: number = 90) {
  const now = Date.now();
  const randomDays = Math.floor(Math.random() * (maxDays - minDays) + minDays);
  return now + randomDays * 24 * 60 * 60 * 1000;
}

function getEventEndTime(startTime: number) {
  const durationHours = Math.floor(Math.random() * 3) + 2;
  return startTime + durationHours * 60 * 60 * 1000;
}

function generateSlug(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    `-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`
  );
}

// RUN THIS DIRECTLY FROM CONVEX DASHBOARD
// Go to Dashboard > Functions > seed:run > Run
export const run = internalMutation({
  handler: async (ctx) => {
    // First, get or create a default organizer user
    let organiser = await ctx.db.query("users").first();

    if (!organiser) {
      // Create a default organiser if no users exist
      const organiserId = await ctx.db.insert("users", {
        email: "organizer1@eventive.com",
        tokenIdentifier: "seed-user-token",
        name: "Eventive Team",
        hasCompletedOnboarding: true,
        location: {
          city: "Cardiff",
          state: "Wales",
          country: "United Kingdom",
        },
        interests: ["tech", "music", "business"],
        freeEventsCreated: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      organiser = await ctx.db.get(organiserId);
    }

    if (!organiser) {
      throw new Error("Organiser not found.");
    }

    const createdEvents = [];

    for (const eventData of SAMPLE_EVENTS) {
      const startDate = getRandomFutureDate();

      const endDate = getEventEndTime(startDate);

      const registrationCount = Math.floor(
        Math.random() * eventData.capacity * 0.7
      );

      const locationType: "physical" | "online" = "physical";

      const ticketType: "paid" | "free" =
        eventData.ticketType === "paid" ? "paid" : "free";

      const event = {
        ...eventData,
        title: eventData.title,
        description: eventData.description,
        slug: generateSlug(eventData.title),

        organiserId: organiser._id,
        organiserName: organiser.name,

        category: eventData.category,
        tags: eventData.tags,

        startDate,
        endDate,
        timeZone: "Greenwich Mean Time",

        locationType,
        venue: eventData.venue,
        address: eventData.address,
        city: eventData.city,
        state: eventData.state,
        country: "United Kingdom",

        capacity: eventData.capacity,
        ticketType,
        ticketPrice: eventData.ticketPrice,
        registrationCount,

        coverImage: eventData.coverImage,
        themeColor: eventData.themeColor,

        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const eventId = await ctx.db.insert("events", event);

      createdEvents.push([eventId, eventData.title]);
    }

    console.log(`✅ Successfully seeded ${createdEvents.length} events!`);

    return {
      success: true,
      count: createdEvents.length,
      events: createdEvents,
    };
  },
});

// Optional: Clear all events
export const clear = internalMutation({
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    let count = 0;

    for (const event of events) {
      const regs = await ctx.db
        .query("registrations")
        .withIndex("by_event", (q) => q.eq("eventId", event._id))
        .collect();

      for (const reg of regs) {
        await ctx.db.delete(reg._id);
      }

      await ctx.db.delete(event._id);
      count++;
    }

    console.log(`🗑️ Cleared ${count} events`);
    return { success: true, deleted: count };
  },
});
