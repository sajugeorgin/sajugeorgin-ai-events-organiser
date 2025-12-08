import { mutation, query } from "./_generated/server";

// MUTATION: Convex helper to define a write function that runs on the server. Its a backend function that changes data.
// args (optional): defines the input expected from the client.
// handler: contains the logic for that API endpoint
// ctx: context object Convex gives you.

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    // Get details about the currently authenticated user
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before.
    // Note: If you don't want to define an index right away, you can use
    // ctx.db.query("users")
    //  .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
    //  .unique();

    // Use the index by_tokenIdentifier to find the row where tokenIdentifier
    // matches the current identity.
    // unique() means you expect at most one match.
    // Find a user by our index (token)
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        // Patch an existing document, shallow merging it with the given partial document
        await ctx.db.patch(user._id, {
          name: identity.name,
          updatedAt: Date.now(),
        });
      }
      return user._id; // Return the existing User ID
    }

    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email!,
      imageUrl: identity.pictureUrl!,
      hasCompletedOnboarding: false,
      location: {
        city: "",
        state: "",
        country: "",
      },
      interests: [],
      freeEventsCreated: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    // Get details about the currently authenticated user
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      return null;
    }

    // Query the users table with index and find the user with index of the current user
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("User not found.");
    }

    // Return the authenticated user
    return user;
  },
});
