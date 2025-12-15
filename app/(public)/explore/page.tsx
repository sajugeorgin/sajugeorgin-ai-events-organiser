"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/convex/useConvexQuery";
import FeaturedEventsCarousel from "@/components/general/FeaturedEventsCarousel";
import Events from "@/components/general/Events";
import LoadingUI from "@/components/loading/LoadingUI";
import Categories from "@/components/general/Categories";
import { CATEGORIES } from "@/lib/data";
import { useRouter } from "next/navigation";
import CreateEventPrompt from "@/components/general/CreateEventPrompt";

// USE THE CUSTOM QUERY HOOK WHICH I BUILT ON CONVEX USEQEURY
// NOW ALSO PROVIDES ADDITONAL FUNCTIONALITY - ISLOADING AND ERROR STATES

// CALL THE EXPLORE API'S CREATED IN 'CONVEX'
const ExplorePage = () => {
  // FETCH CURRENT USER
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

  // ROUTER FOR NAVIGATION
  const router = useRouter();

  // HANDLE EVENT CLICK
  const handleEventClick = (eventSlug: string) => {
    router.push(`/events/${eventSlug}`);
  };

  // HANDLE CATEGORY CLICK
  const handleCategoryClick = (categoryId: string) => {
    router.push(`/events/${categoryId}`);
  };

  // CATEGORIES
  const categories = CATEGORIES.map((cat) => {
    return {
      ...cat,
      count: categoryCounts?.[cat.id] || 0,
    };
  });

  // DISPLAY CUSTOM LOADING UI WHEN THE CONVEX APIS ARE LOADING
  const isLoadingConvexApis =
    loadingFeaturedEvents || loadingLocalEvents || loadingPopularEvents;

  if (isLoadingConvexApis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingUI />
      </div>
    );
  }

  return (
    <>
      {/* TOP TEXT */}
      <div className="max-w-7xl overflow-hidden text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
        <p className="text-base text-muted-foreground max-w-3xl mx-auto">
          Explore featured events, find what&apos;s happening locally, or browse
          popular events across the {currentUser?.location?.country || "UK"}
        </p>
      </div>

      {/* FEATURED EVENTS CAROUSEL */}
      {featuredEvents && featuredEvents.length > 0 && (
        <div className="my-10 flex items-center justify-center">
          <FeaturedEventsCarousel
            featuredEvents={featuredEvents}
            handleFeaturedEventClick={handleEventClick}
          />
        </div>
      )}

      {/* LOCAL EVENTS */}
      {localEvents && localEvents.length > 0 && (
        <div>
          <Events
            events={localEvents}
            eventType="local"
            user={currentUser}
            handleEventClick={handleEventClick}
          />
        </div>
      )}

      {/* BROWSE BY CATEGORY */}
      <div>
        <Categories
          categories={categories}
          handleCategoryClick={handleCategoryClick}
        />
      </div>

      {/* POPULAR EVENTS ACROSS THE UK */}
      {popularEvents && popularEvents.length > 0 && (
        <div>
          <Events
            events={popularEvents}
            eventType="popular"
            showUserActions
            handleEventClick={handleEventClick}
          />
        </div>
      )}

      {/* EMPTY STATE - NO EVENTS ACROSS ALL CONVEX API CALLS */}
      {true && <CreateEventPrompt />}

      <section></section>
      <div></div>
    </>
  );
};

export default ExplorePage;
