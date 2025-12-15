import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TO EXTRACT A USABLE URL FROM EVENT.COVERIMAGE
export function extractUrl(input: string): string {
  // Match the last occurrence of a complete URL
  const urls = input.match(/https?:\/\/[^\s)"\]]+/g);
  return urls ? urls[urls.length - 1] : input;
}

// GENERATE LOCATION SLUG
export function createLocationSlug(city: string, state: string) {
  if (!city || !state) return "";

  const citySlug = city.toLowerCase().replace(/\s+/g, "-");
  const stateSlug = state.toLowerCase().replace(/\s+/g, "-");

  return `${citySlug}-${stateSlug}`;
}
