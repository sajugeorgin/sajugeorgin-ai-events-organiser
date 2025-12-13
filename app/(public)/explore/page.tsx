/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/convex/useConvexQuery";
import FeaturedEventsCarousel from "@/components/general/FeaturedEventsCarousel";

// USE THE CUSTOM QUERY HOOK WHICH I BUILT ON CONVEX USEQEURY
// NOW ALSO PROVIDES ADDITONAL FUNCTIONALITY - ISLOADING AND ERROR STATES

// CALL THE EXPLORE API'S CREATED IN 'CONVEX'
const ExplorePage = () => {
  // FETCH CURRENT USER FOR LOCATION
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  // FETCH FEATURED EVENTS AND LOADING STATE
  const { data: featuredEvents, isLoading: loadingFeaturedEvents } =
    useConvexQuery(api.explore.getFeaturedEvents, { limit: 3 });

  // FETCH EVENTS BY LOCATION (CITY/ STATE)
  const { data: localEvents, isLoading: loadingLocalEvents } = useConvexQuery(
    api.explore.getEventsByLocation,
    {
      city: currentUser?.location?.city || "London",
      state: currentUser?.location?.state || "Greater London",
      limit: 4,
    }
  );

  // FETCH POPULAR EVENTS (BASED ON REGISTRATION COUNT)
  const { data: popularEvents, isLoading: loadingPopularEvents } =
    useConvexQuery(api.explore.getPopularEvents, { limit: 6 });

  // FETCH THE NUMBER OF EVENTS IN EACH CATEGORY
  const { data: categoryCounts } = useConvexQuery(
    api.explore.getCategoryCounts
  );

  return (
    <>
      {/* TOP TEXT */}
      <div className="max-w-7xl overflow-hidden text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
        <p className="text-base text-muted-foreground max-w-3xl mx-auto">
          Explore featured events, find what&apos;s happening locally, or browse
          events across the UK
        </p>
        {/* <pre>{JSON.stringify(categoryCounts, null, 2)}</pre> */}
      </div>

      {/* FEATURED EVENTS CAROUSEL */}
      {featuredEvents && featuredEvents.length > 0 && (
        <div className="my-10 flex items-center justify-center">
          <FeaturedEventsCarousel featuredEvents={featuredEvents} />
        </div>
      )}

      {/* LOCAL EVENTS */}

      {/* BROWSE BY CATEGORY */}

      {/* POPULAR EVENTS ACROSS THE UK */}

      {/* EMPTY STATE - NO EVENTS :( */}

      <section></section>
      <div></div>
    </>
  );
};

export default ExplorePage;
