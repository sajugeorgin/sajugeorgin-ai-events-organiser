"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/convex/useConvexQuery";

// USE THE CUSTOM QUERY HOOK WHICH I BUILT ON CONVEX USEQEURY
// NOW ALSO PROVIDES ADDITONAL FUNCTIONALITY - ISLOADING AND ERROR STATES

// CALL THE EXPLORE API'S CREATED IN THE CONVEX FOLDER

const ExplorePage = () => {
  // FETCH CURRENT USER FOR LOCATION
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);

  // FETCH FEATURED EVENTS AND LOADING STATE
  const { data: featuredEvents, isLoading: loadingFeaturedEvents } =
    useConvexQuery(api.explore.getFeaturedEvents, { limit: 1 });

  // FETCH EVENTS BY LOCATION (CITY/ STATE)
  const { data: localEvents, isLoading: loadingLocalEvents } = useConvexQuery(
    api.explore.getEventsByLocation,
    {
      city: currentUser?.location?.city || "London",
      state: currentUser?.location?.state || "Greater London",
      limit: 1,
    }
  );

  // FETCH POPULAR EVENTS (BASED ON REGISTRATION COUNT)
  const { data: popularEvents, isLoading: loadingPopularEvents } =
    useConvexQuery(api.explore.getPopularEvents, { limit: 1 });

  // FETCH THE NUMBER OF EVENTS IN EACH CATEGORY
  const { data: categoryCounts } = useConvexQuery(
    api.explore.getCategoryCounts
  );

  return (
    <div className="max-w-7xl overflow-hidden">
      <></>
      <pre>{JSON.stringify(categoryCounts, null, 2)}</pre>
    </div>
  );
};

export default ExplorePage;
