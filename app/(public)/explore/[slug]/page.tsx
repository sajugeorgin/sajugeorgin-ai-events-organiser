"use client";

import Events from "@/components/general/Events";
import LoadingUI from "@/components/loading/LoadingUI";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/convex/useConvexQuery";
import { CATEGORIES } from "@/lib/data";
import { parseLocationSlug } from "@/lib/utils";
import { notFound, useParams, useRouter } from "next/navigation";

const DynamicExplorePage = () => {
  const params = useParams();
  const router = useRouter();

  // EXTRACT SLUG FROM ROUTE PARAMS
  const slug = String(params.slug);

  // CHECK IF THE SLUG IS A CATEGORY AND, IF SO A VALID CATEGORY
  const categoryInfo = CATEGORIES.find((cat) => cat.id === slug);

  // MAKE TRUE/ FALSE USING !!
  const isCategory = !!categoryInfo;

  // IF NOT A CATEGORY E.G. TECH, IT MUST BE A LOCATION THEREFORE PARSE(CARDIFF-WALES)
  const { city, state, isValid } = !isCategory
    ? parseLocationSlug(slug)
    : { city: null, state: null, isValid: false };

  console.log("LOCATION SLUG:", city, state, isValid);

  // RETURN 404 NOT FOUND PAGE
  if (!isCategory && !isValid) {
    notFound();
  }

  // FETCH EVENTS BY CATEGORY OR LOCATION BY DYNAMICALLY CHOOSING THE CONVEX API
  // WHEN CATEGORY IS TRUE, USE 'GET EVENTS BY CATEGORY' API
  // WHEN CATEGORY IS FALSE, USE 'GET EVENTS BY LOCATION' API
  const { data: events, isLoading: isLoading } = useConvexQuery(
    isCategory
      ? api.explore.getEventsByCategory
      : api.explore.getEventsByLocation,
    isCategory
      ? { category: slug, limit: 50 }
      : city && state
        ? { city, state, limit: 50 }
        : "skip"
  );

  // ON CLICK HANDLER
  const handleEventClick = (eventSlug: string) => {
    router.push(`/events/${eventSlug}`);
  };

  // DISPLAY LOADING UI
  if (isLoading) {
    return <LoadingUI />;
  }

  // IF ROUTE IS CATEGORY BASED DISPLAY EVENTS BY CATEGORY
  if (isCategory) {
    return (
      <>
        <section className="w-full max-w-7xl mx-auto px-4 p-0 sm:px-6 lg:px-8 mt-5">
          {/* MAIN */}
          <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-center mb-4 border border-gray-950/50 dark:border-gray-700 p-5 rounded">
            <div className="flex items-center gap-4">
              <div className="text-5xl lg:text-6xl">{categoryInfo.icon}</div>

              <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold">{categoryInfo.label}</h1>

                <p className="text-base lg:text-lg text-muted-foreground">
                  {categoryInfo.description}.
                </p>

                {/* DYNAMIC TEXT */}
                {events && events.length > 0 && (
                  <p className="text-shadow-muted font-semibold">
                    {events.length} event{events.length !== 1 ? "s" : ""} found
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* EVENTS GRID */}
          {events && events.length > 0 ? (
            <Events
              events={events}
              eventType="popular"
              showHeader={false}
              handleEventClick={handleEventClick}
            />
          ) : (
            <p className="text-muted-foreground">
              No events found in this category.
            </p>
          )}
        </section>
      </>
    );
  }

  // ELSE IF ROUTE IS LOCATION BASED DISPLAY EVENTS BY LOCATION
  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 p-0 sm:px-6 lg:px-8 mt-5">
        {/* MAIN */}
        <div className="flex flex-col items-start gap-4 xl:flex-row xl:items-center mb-4 border border-gray-950/50 dark:border-gray-700 p-5 rounded">
          <div className="flex items-center gap-4">
            <div className="text-5xl lg:text-6xl">📍</div>

            <div className="flex flex-col gap-2">
              <div className="tracking-wide">
                <h1 className="text-base lg:text-lg text-muted-foreground">
                  {city},
                </h1>

                <p className="text-base lg:text-lg text-muted-foreground">
                  {state}, United Kingdom.
                </p>
              </div>

              {/* DYNAMIC TEXT */}
              {events && events.length > 0 && (
                <p className="text-shadow-muted font-semibold">
                  {events.length} event{events.length !== 1 ? "s" : ""} found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* EVENTS GRID */}
        {events && events.length > 0 ? (
          <Events
            events={events}
            eventType="popular"
            showHeader={false}
            handleEventClick={handleEventClick}
          />
        ) : (
          <p className="text-muted-foreground">
            No events found in this category.
          </p>
        )}
      </section>
    </>
  );
};

export default DynamicExplorePage;
