import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { State, City } from "country-state-city";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. TO EXTRACT A USABLE URL FROM EVENT.COVERIMAGE
export function extractUrl(input: string): string {
  // Match the last occurrence of a complete URL
  const urls = input.match(/https?:\/\/[^\s)"\]]+/g);
  return urls ? urls[urls.length - 1] : input;
}

// 2. GENERATE LOCATION SLUG
export function createLocationSlug(city: string, state: string) {
  if (!city || !state) return "";

  const citySlug = city.toLowerCase().replace(/\s+/g, "-");
  const stateSlug = state.toLowerCase().replace(/\s+/g, "-");

  return `${citySlug}-${stateSlug}`;
}

// 3. PARSE LOCATION SLUG
export function parseLocationSlug(slug: string) {
  if (!slug || typeof slug !== "string") {
    return { city: null, state: null, isValid: false };
  }

  // London, England
  const parts = slug.split("-");

  // Must have atleast 2 parts (city-state)
  if (parts.length < 2) {
    return { city: null, state: null, isValid: false };
  }

  // Parse city (first part)
  const cityName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

  // Parse state (remaining parts joined)
  const stateName = parts
    .slice(1)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

  // Get all GB states
  const states = State.getStatesOfCountry("GB");

  // The 'country-state-city' library does not have a state named “Greater London”.
  // Therefore, we can store compatible state names for GB
  // const STATE_ALIASES: Record<string, string> = {
  //   "greater london": "England",
  //   "city of london": "England",
  // };

  // const normalisedState = STATE_ALIASES[stateName.toLowerCase()] ?? stateName;

  // Validate state exists
  const stateObj = states.find(
    (s) => s.name.toLowerCase() === stateName.toLowerCase()
  );

  if (!stateObj) {
    return { city: null, state: null, isValid: false };
  }

  // Get all GB cities
  const cities = City.getCitiesOfState("GB", stateObj.isoCode);

  // Validate city exists
  const cityExists = cities.some(
    (c) => c.name.toLowerCase() === cityName.toLowerCase()
  );

  if (!cityExists) {
    return { city: null, state: null, isValid: false };
  }

  return { city: cityName, state: stateName, isValid: true };
}
