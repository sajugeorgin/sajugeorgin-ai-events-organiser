import { Id } from "@/convex/_generated/dataModel";

// Interface = Structure Definition

// When creating an interface, only define the structure,
// not how it might be null/ undefined in usage.

export interface User {
  _id: Id<"users">;
  _creationTime: number;
  imageUrl?: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  interests?: string[];
  createdAt?: number;
  updatedAt?: number;
  name: string;
  tokenIdentifier: string;
  email: string;
  hasCompletedOnboarding: boolean;
  freeEventsCreated: number;
}
