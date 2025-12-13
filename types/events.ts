import { Id } from "@/convex/_generated/dataModel";

export interface IExploreEvent {
  _id: Id<"events">;
  _creationTime: number;
  address?: string | undefined;
  state?: string | undefined;
  createdAt?: number | undefined;
  updatedAt?: number | undefined;
  locationType?: "physical" | "online" | undefined;
  venue?: string | undefined;
  ticketPrice?: number | undefined;
  coverImage?: string | undefined;
  themeColor?: string | undefined;
  title: string;
  city: string;
  country: string;
  description: string;
  slug: string;
  organiserId: Id<"users">;
  organiserName: string;
  category: string;
  tags: string[];
  startDate: number;
  endDate: number;
  timeZone: string;
  capacity: number;
  ticketType: "free" | "paid";
  registrationCount: number;
}
